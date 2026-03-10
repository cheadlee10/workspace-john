#!/usr/bin/env python3
"""
Verification harness for automation claims:
1) Lead qualification logic
2) Deduplication correctness
3) Outreach queue generation
4) Webhook idempotency

Usage:
  python scripts/verification/verify_automation_claims.py
  python scripts/verification/verify_automation_claims.py --out scripts/verification/output
"""

from __future__ import annotations

import argparse
import json
import hashlib
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple


# -----------------------------
# Core automation logic under test
# -----------------------------

def score_lead(lead: Dict[str, Any]) -> int:
    """Simple deterministic scoring model (0-100)."""
    score = 0
    if lead.get("website"):
        score += 20
    if lead.get("email"):
        score += 15
    if lead.get("phone"):
        score += 10

    # Business fit
    industries = {"landscaping", "home services", "contractor", "local service"}
    if str(lead.get("industry", "")).strip().lower() in industries:
        score += 20

    # Intent signals
    if lead.get("has_no_website"):
        score += 15
    if lead.get("needs_automation"):
        score += 20

    # Penalties
    if lead.get("do_not_contact"):
        score -= 100

    return max(0, min(100, score))


def qualifies_lead(lead: Dict[str, Any], threshold: int = 55) -> Tuple[bool, Dict[str, Any]]:
    """Qualification rule: contact channel + score threshold + not DNC."""
    channels = [bool(lead.get("email")), bool(lead.get("phone")), bool(lead.get("linkedin"))]
    has_channel = any(channels)
    score = score_lead(lead)
    dnc = bool(lead.get("do_not_contact"))

    qualified = has_channel and score >= threshold and not dnc
    reason = {
        "has_channel": has_channel,
        "score": score,
        "threshold": threshold,
        "dnc": dnc,
    }
    return qualified, reason


def normalize_phone(phone: Optional[str]) -> str:
    if not phone:
        return ""
    digits = "".join(ch for ch in phone if ch.isdigit())
    # Normalize US country code variants (+1XXXXXXXXXX vs XXXXXXXXXX)
    if len(digits) == 11 and digits.startswith("1"):
        digits = digits[1:]
    return digits


def dedupe_key(lead: Dict[str, Any]) -> str:
    email = str(lead.get("email", "")).strip().lower()
    phone = normalize_phone(lead.get("phone"))
    company = str(lead.get("company", "")).strip().lower()
    name = str(lead.get("name", "")).strip().lower()

    if email:
        return f"email:{email}"
    if phone:
        return f"phone:{phone}"
    return f"name_company:{name}|{company}"


def dedupe_leads(leads: List[Dict[str, Any]]) -> Tuple[List[Dict[str, Any]], Dict[str, Any]]:
    """Keep the highest-scoring lead for each dedupe key."""
    chosen: Dict[str, Dict[str, Any]] = {}
    collisions: List[Dict[str, Any]] = []

    for lead in leads:
        key = dedupe_key(lead)
        score = score_lead(lead)
        lead = {**lead, "_score": score, "_dedupe_key": key}

        if key not in chosen:
            chosen[key] = lead
            continue

        existing = chosen[key]
        if lead["_score"] > existing["_score"]:
            chosen[key] = lead
            kept, dropped = lead, existing
        else:
            kept, dropped = existing, lead

        collisions.append(
            {
                "key": key,
                "kept_id": kept.get("id"),
                "dropped_id": dropped.get("id"),
                "kept_score": kept.get("_score"),
                "dropped_score": dropped.get("_score"),
            }
        )

    return list(chosen.values()), {"collision_count": len(collisions), "collisions": collisions}


def generate_outreach_queue(leads: List[Dict[str, Any]], daily_cap: int = 5) -> List[Dict[str, Any]]:
    """Queue only qualified + not contacted + not queued + not DNC, sorted by score/value."""
    eligible = []
    for lead in leads:
        qualified, reason = qualifies_lead(lead)
        if not qualified:
            continue
        if lead.get("status") in {"contacted", "proposal_sent", "closed", "lost"}:
            continue
        if lead.get("already_queued"):
            continue

        ranked = {**lead, "_score": reason["score"], "_queue_reason": reason}
        eligible.append(ranked)

    eligible.sort(key=lambda x: (x.get("_score", 0), x.get("estimated_value", 0)), reverse=True)
    return eligible[:daily_cap]


class WebhookIdempotencyStore:
    """In-memory key store for idempotency verification."""

    def __init__(self) -> None:
        self._seen = set()

    def _key_for(self, event: Dict[str, Any]) -> str:
        if event.get("idempotency_key"):
            return f"idk:{event['idempotency_key']}"
        if event.get("event_id"):
            return f"eid:{event['event_id']}"
        payload_hash = hashlib.sha256(json.dumps(event, sort_keys=True).encode("utf-8")).hexdigest()
        return f"hash:{payload_hash}"

    def process(self, event: Dict[str, Any]) -> Dict[str, Any]:
        key = self._key_for(event)
        duplicate = key in self._seen
        if not duplicate:
            self._seen.add(key)

        return {
            "idempotency_key": key,
            "accepted": not duplicate,
            "status": "processed" if not duplicate else "duplicate_ignored",
        }


# -----------------------------
# Test vectors
# -----------------------------

def qualification_vectors() -> List[Dict[str, Any]]:
    return [
        {
            "name": "Qualified lead with email and strong fit",
            "input": {
                "id": "q1",
                "company": "Evergreen Landscaping",
                "email": "owner@evergreen.com",
                "industry": "landscaping",
                "has_no_website": True,
                "needs_automation": True,
            },
            "expected": True,
        },
        {
            "name": "Fails without contact channel",
            "input": {
                "id": "q2",
                "company": "No Contact Co",
                "industry": "landscaping",
                "has_no_website": True,
                "needs_automation": True,
            },
            "expected": False,
        },
        {
            "name": "Fails do-not-contact",
            "input": {
                "id": "q3",
                "company": "DNC Services",
                "email": "owner@dnc.com",
                "industry": "home services",
                "needs_automation": True,
                "do_not_contact": True,
            },
            "expected": False,
        },
    ]


def dedupe_vectors() -> Dict[str, Any]:
    leads = [
        {"id": "d1", "company": "Alpha", "email": "sales@alpha.com", "industry": "landscaping", "needs_automation": True},
        {"id": "d2", "company": "Alpha Duplicate", "email": "SALES@alpha.com", "industry": "landscaping"},
        {"id": "d3", "company": "Beta", "phone": "(425) 600-2267", "industry": "contractor", "needs_automation": True},
        {"id": "d4", "company": "Beta Duplicate", "phone": "+1 425-600-2267", "industry": "contractor"},
        {"id": "d5", "name": "Jane Doe", "company": "Gamma"},
        {"id": "d6", "name": "jane doe", "company": "gamma"},
    ]
    return {
        "input": leads,
        "expected_unique_count": 3,
        "expected_kept_ids": {"d1", "d3", "d5"},
    }


def outreach_vectors() -> Dict[str, Any]:
    leads = [
        {"id": "o1", "company": "Top Lead", "email": "a@top.com", "industry": "landscaping", "needs_automation": True, "has_no_website": True, "estimated_value": 2000, "status": "new"},
        {"id": "o2", "company": "Already Contacted", "email": "a@contacted.com", "industry": "landscaping", "needs_automation": True, "estimated_value": 2500, "status": "contacted"},
        {"id": "o3", "company": "Queued", "email": "a@queued.com", "industry": "landscaping", "needs_automation": True, "estimated_value": 1800, "status": "new", "already_queued": True},
        {"id": "o4", "company": "High Value 2", "email": "a@hv2.com", "industry": "home services", "needs_automation": True, "has_no_website": True, "estimated_value": 1900, "status": "new"},
        {"id": "o5", "company": "Weak Fit", "email": "a@weak.com", "industry": "unknown", "estimated_value": 500, "status": "new"},
        {"id": "o6", "company": "Good Fit 3", "phone": "4251112222", "industry": "contractor", "needs_automation": True, "has_no_website": True, "estimated_value": 1200, "status": "new"},
    ]
    return {
        "input": leads,
        "daily_cap": 3,
        "expected_ids_in_order": ["o1", "o4", "o6"],
    }


def webhook_vectors() -> List[Dict[str, Any]]:
    return [
        {"name": "First event accepted", "event": {"event_id": "evt_001", "type": "lead.created", "lead_id": "L-1"}, "expected_status": "processed"},
        {"name": "Duplicate event_id ignored", "event": {"event_id": "evt_001", "type": "lead.created", "lead_id": "L-1"}, "expected_status": "duplicate_ignored"},
        {"name": "Custom idempotency key accepted", "event": {"idempotency_key": "abc-123", "type": "lead.updated", "lead_id": "L-1"}, "expected_status": "processed"},
        {"name": "Duplicate custom key ignored", "event": {"idempotency_key": "abc-123", "type": "lead.updated", "lead_id": "L-1"}, "expected_status": "duplicate_ignored"},
    ]


# -----------------------------
# Harness runner + proof log
# -----------------------------

@dataclass
class TestResult:
    area: str
    name: str
    passed: bool
    input_data: Any
    expected: Any
    actual: Any
    evidence: Dict[str, Any]


class Harness:
    def __init__(self) -> None:
        self.results: List[TestResult] = []

    def add(self, result: TestResult) -> None:
        self.results.append(result)

    def summary(self) -> Dict[str, Any]:
        total = len(self.results)
        passed = sum(1 for r in self.results if r.passed)
        failed = total - passed
        return {
            "total": total,
            "passed": passed,
            "failed": failed,
            "pass_rate": round((passed / total) * 100, 2) if total else 0,
        }



def run_harness() -> Harness:
    h = Harness()

    # 1) Qualification logic tests
    for vector in qualification_vectors():
        actual, reason = qualifies_lead(vector["input"])
        h.add(
            TestResult(
                area="lead_qualification",
                name=vector["name"],
                passed=(actual == vector["expected"]),
                input_data=vector["input"],
                expected=vector["expected"],
                actual=actual,
                evidence=reason,
            )
        )

    # 2) Dedupe tests
    dv = dedupe_vectors()
    unique, info = dedupe_leads(dv["input"])
    unique_ids = {x["id"] for x in unique}
    pass_count = len(unique) == dv["expected_unique_count"]
    pass_ids = unique_ids == dv["expected_kept_ids"]
    h.add(
        TestResult(
            area="dedupe",
            name="Unique count is correct",
            passed=pass_count,
            input_data=dv["input"],
            expected=dv["expected_unique_count"],
            actual=len(unique),
            evidence={"unique_ids": sorted(unique_ids), **info},
        )
    )
    h.add(
        TestResult(
            area="dedupe",
            name="Correct records retained after collisions",
            passed=pass_ids,
            input_data=dv["input"],
            expected=sorted(dv["expected_kept_ids"]),
            actual=sorted(unique_ids),
            evidence={"collisions": info["collisions"]},
        )
    )

    # 3) Outreach queue tests
    ov = outreach_vectors()
    queue = generate_outreach_queue(ov["input"], daily_cap=ov["daily_cap"])
    queue_ids = [x["id"] for x in queue]
    h.add(
        TestResult(
            area="outreach_queue",
            name="Queue includes only eligible leads and sorted by priority",
            passed=(queue_ids == ov["expected_ids_in_order"]),
            input_data=ov["input"],
            expected=ov["expected_ids_in_order"],
            actual=queue_ids,
            evidence={"queue": queue},
        )
    )

    # 4) Webhook idempotency tests
    store = WebhookIdempotencyStore()
    for vector in webhook_vectors():
        actual = store.process(vector["event"])
        h.add(
            TestResult(
                area="webhook_idempotency",
                name=vector["name"],
                passed=(actual["status"] == vector["expected_status"]),
                input_data=vector["event"],
                expected=vector["expected_status"],
                actual=actual["status"],
                evidence=actual,
            )
        )

    return h


def _md_codeblock(obj: Any) -> str:
    return "```json\n" + json.dumps(obj, indent=2, ensure_ascii=False) + "\n```"


def write_proof_logs(harness: Harness, out_dir: Path) -> Dict[str, Path]:
    out_dir.mkdir(parents=True, exist_ok=True)
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")

    summary = harness.summary()
    json_path = out_dir / f"proof_log_{ts}.json"
    md_path = out_dir / f"proof_log_{ts}.md"

    payload = {
        "timestamp": datetime.now().isoformat(),
        "summary": summary,
        "results": [
            {
                "area": r.area,
                "name": r.name,
                "passed": r.passed,
                "input": r.input_data,
                "expected": r.expected,
                "actual": r.actual,
                "evidence": r.evidence,
            }
            for r in harness.results
        ],
    }
    json_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")

    lines = [
        "# Automation Verification Proof Log",
        "",
        f"- Timestamp: `{payload['timestamp']}`",
        f"- Total Tests: **{summary['total']}**",
        f"- Passed: **{summary['passed']}**",
        f"- Failed: **{summary['failed']}**",
        f"- Pass Rate: **{summary['pass_rate']}%**",
        "",
        "## Results",
        "",
        "| Area | Test | Status |",
        "|---|---|---|",
    ]

    for r in harness.results:
        status = "✅ PASS" if r.passed else "❌ FAIL"
        lines.append(f"| {r.area} | {r.name} | {status} |")

    lines.append("")
    lines.append("## Evidence")
    lines.append("")

    for i, r in enumerate(harness.results, start=1):
        lines.extend(
            [
                f"### {i}. {r.area} — {r.name}",
                f"**Status:** {'PASS' if r.passed else 'FAIL'}",
                "",
                "**Input**",
                _md_codeblock(r.input_data),
                "",
                "**Expected**",
                _md_codeblock(r.expected),
                "",
                "**Actual**",
                _md_codeblock(r.actual),
                "",
                "**Pass/Fail Evidence**",
                _md_codeblock(r.evidence),
                "",
            ]
        )

    md_path.write_text("\n".join(lines), encoding="utf-8")

    return {"json": json_path, "markdown": md_path}


def main() -> int:
    parser = argparse.ArgumentParser(description="Run verification harness for automation claims")
    parser.add_argument("--out", default="scripts/verification/output", help="Output directory for proof logs")
    args = parser.parse_args()

    harness = run_harness()
    summary = harness.summary()
    paths = write_proof_logs(harness, Path(args.out))

    print("=== AUTOMATION VERIFICATION HARNESS ===")
    print(json.dumps(summary, indent=2))
    print(f"Proof log (JSON): {paths['json']}")
    print(f"Proof log (MD):   {paths['markdown']}")

    return 0 if summary["failed"] == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
