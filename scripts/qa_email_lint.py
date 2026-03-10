#!/usr/bin/env python3
"""
NorthStar Synergy — Email QA Linter
Run automated quality checks on outreach emails before send.
Usage: python qa_email_lint.py <email_file.txt> OR pipe email content

Returns exit code 0 if PASS, 1 if FAIL with issues listed.
"""

import sys
import re
import argparse
from typing import List, Tuple

# Spam trigger words (case-insensitive)
SPAM_TRIGGERS = [
    'free', 'urgent', 'act now', 'limited time', 'guarantee', 
    'click here', 'buy now', 'order now', 'special offer',
    'risk free', 'no obligation', 'winner', 'congratulations',
    'double your', 'earn extra', 'save big'
]

# Placeholder patterns
PLACEHOLDER_PATTERNS = [
    r'\{\{[^}]+\}\}',           # {{variable}}
    r'\[\[?[A-Z_]+\]?\]',       # [VARIABLE] or [[VARIABLE]]
    r'\[FILL[^]]*\]',           # [FILL IN]
    r'\[INSERT[^]]*\]',         # [INSERT]
    r'XXX+',                     # XXX placeholder
    r'\$\d+(?:/mo)?(?:\s|$)',   # Pricing like $299/mo (only in first-touch context)
]

# CRITICAL encoding errors (actual corruption - auto-fail)
ENCODING_ERRORS_CRITICAL = [
    r"[a-zA-Z]\?[a-zA-Z]",      # I?ll, won?t, etc. (garbled apostrophe)
    r"[a-zA-Z]\?s\b",           # company?s
    r"[a-zA-Z]\?ve\b",          # I?ve
    r"[a-zA-Z]\?re\b",          # you?re
    r"[a-zA-Z]\?m\b",           # I?m
    r"[a-zA-Z]\?d\b",           # I?d
    r'�',                        # Actual garbled character
]

# WARNING encoding patterns (may not render in some clients, but not broken)
ENCODING_WARNINGS = [
    r'[–—]',                    # Em/en dashes - may render as hyphen in plain text
    r'[""]',                    # Smart quotes - usually fine but risky
    r"['']",                    # Smart apostrophes - usually fine but risky
    r'…',                       # Ellipsis character
]

# Generic AI phrases to avoid
AI_PHRASES = [
    r'i hope this (?:email )?finds you well',
    r'i\'?d like to introduce myself',
    r'i wanted to reach out',
    r'i came across your (?:company|business)',
    r'leverage synergies',
    r'optimize value proposition',
    r'enterprise-grade solutions',
    r'streamline your workflow',
    r'take your business to the next level',
    r'game.?changer',
    r'circle back',
    r'touch base',
]

class QAResult:
    def __init__(self):
        self.critical_failures: List[str] = []
        self.warnings: List[str] = []
        self.passes: List[str] = []
        self.word_count: int = 0
        self.has_link: bool = False
        
    @property
    def score(self) -> float:
        total_checks = len(self.critical_failures) + len(self.warnings) + len(self.passes)
        if total_checks == 0:
            return 0.0
        passed = len(self.passes)
        return (passed / total_checks) * 100
    
    @property
    def verdict(self) -> str:
        if self.critical_failures:
            return "🛑 REJECT (Critical Failure)"
        if self.score >= 90:
            return "✅ APPROVED"
        if self.score >= 80:
            return "⚠️ CONDITIONAL (Fix & Rescan)"
        return "❌ REVISE (Major Issues)"
    
    def is_passing(self) -> bool:
        return not self.critical_failures and self.score >= 80


def check_encoding_errors_critical(text: str) -> List[str]:
    """Check for critical encoding errors (actual corruption - D1 Critical)"""
    issues = []
    for pattern in ENCODING_ERRORS_CRITICAL:
        matches = re.findall(pattern, text)
        if matches:
            for match in matches[:3]:  # Limit examples
                issues.append(f"Encoding error (corruption): '{match}'")
    return issues


def check_encoding_warnings(text: str) -> List[str]:
    """Check for encoding that may not render in all clients (D1 Warning)"""
    issues = []
    for pattern in ENCODING_WARNINGS:
        matches = re.findall(pattern, text)
        if matches:
            unique_matches = list(set(matches))[:2]  # Dedupe and limit
            for match in unique_matches:
                issues.append(f"Special character (may not render in plain text): '{match}'")
    return issues


def check_placeholders(text: str) -> List[str]:
    """Check for unfilled placeholder text (Critical - D4)"""
    issues = []
    for pattern in PLACEHOLDER_PATTERNS:
        matches = re.findall(pattern, text, re.IGNORECASE)
        if matches:
            for match in matches[:3]:
                issues.append(f"Placeholder found: '{match}'")
    return issues


def check_pricing_first_touch(text: str, is_first_touch: bool = True) -> List[str]:
    """Check for pricing in first-touch email (Critical - C1)"""
    if not is_first_touch:
        return []
    
    issues = []
    # Match dollar amounts
    price_patterns = [
        r'\$\d+(?:,\d{3})*(?:\.\d{2})?(?:/mo(?:nth)?)?',
        r'\d+\s*(?:dollars|USD)',
        r'starting at \$',
        r'only \$',
        r'just \$',
    ]
    for pattern in price_patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        if matches:
            for match in matches[:2]:
                issues.append(f"Pricing in first-touch email: '{match}'")
    return issues


def check_spam_triggers(text: str) -> List[str]:
    """Check for spam trigger words (C4)"""
    issues = []
    text_lower = text.lower()
    for trigger in SPAM_TRIGGERS:
        if trigger.lower() in text_lower:
            issues.append(f"Spam trigger word: '{trigger}'")
    return issues


def check_word_count(text: str) -> Tuple[int, List[str]]:
    """Check email body word count (A3 - should be ≤100)"""
    # Remove signature (after common sign-offs)
    body = re.split(r'\n(?:thanks|best|regards|cheers|john|sincerely)', text, flags=re.IGNORECASE)[0]
    words = len(body.split())
    issues = []
    if words > 120:
        issues.append(f"Email too long: {words} words (target: ≤100)")
    elif words > 100:
        issues.append(f"Email slightly long: {words} words (target: ≤100)")
    return words, issues


def check_ai_phrases(text: str) -> List[str]:
    """Check for generic AI-sounding phrases (A2)"""
    issues = []
    text_lower = text.lower()
    for pattern in AI_PHRASES:
        if re.search(pattern, text_lower):
            match = re.search(pattern, text_lower)
            issues.append(f"Generic AI phrase: '{match.group()}'")
    return issues


def check_links(text: str) -> Tuple[bool, List[str]]:
    """Check for presence of links (C7)"""
    issues = []
    # Find URLs
    url_pattern = r'https?://[^\s<>"{}|\\^`\[\]]+'
    urls = re.findall(url_pattern, text)
    
    has_link = len(urls) > 0
    
    if not has_link:
        issues.append("No visual proof link found (required for web design outreach)")
    
    # Check for shortened URLs (spam signal)
    shortened = ['bit.ly', 'tinyurl', 'goo.gl', 't.co', 'ow.ly']
    for url in urls:
        for short in shortened:
            if short in url.lower():
                issues.append(f"Shortened URL detected (spam flag): {url}")
    
    return has_link, issues


def check_cta_hardness(text: str) -> List[str]:
    """Check if CTA is soft vs hard (C2)"""
    issues = []
    hard_ctas = [
        r'book a call',
        r'schedule (?:a )?(?:call|meeting|demo)',
        r'reply (?:yes|now)',
        r'sign up',
        r'register (?:now|today)',
        r'click (?:here|now|below)',
    ]
    text_lower = text.lower()
    for pattern in hard_ctas:
        if re.search(pattern, text_lower):
            match = re.search(pattern, text_lower)
            issues.append(f"Hard CTA detected (use soft question instead): '{match.group()}'")
    return issues


def check_signature(text: str) -> List[str]:
    """Check for complete signature (D6)"""
    issues = []
    # Look for common signature elements
    has_name = bool(re.search(r'\n[A-Z][a-z]+(?:\s[A-Z][a-z]+)?$', text, re.MULTILINE))
    has_phone = bool(re.search(r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', text))
    has_company = bool(re.search(r'northstar\s*synergy', text, re.IGNORECASE))
    
    if not has_phone:
        issues.append("Missing phone number in signature")
    if not has_company:
        issues.append("Missing company name in signature")
    
    return issues


def run_qa_checks(email_text: str, is_first_touch: bool = True) -> QAResult:
    """Run all QA checks on email text"""
    result = QAResult()
    
    # === CRITICAL CHECKS (auto-fail) ===
    
    # D1: Encoding errors (critical = actual corruption)
    encoding_critical = check_encoding_errors_critical(email_text)
    if encoding_critical:
        result.critical_failures.extend([f"[D1] {i}" for i in encoding_critical])
    else:
        result.passes.append("[D1] No encoding corruption")
    
    # D4: Placeholder text
    placeholder_issues = check_placeholders(email_text)
    if placeholder_issues:
        result.critical_failures.extend([f"[D4] {i}" for i in placeholder_issues])
    else:
        result.passes.append("[D4] No placeholder text")
    
    # C1: Pricing in first touch
    if is_first_touch:
        pricing_issues = check_pricing_first_touch(email_text, is_first_touch)
        if pricing_issues:
            result.critical_failures.extend([f"[C1] {i}" for i in pricing_issues])
        else:
            result.passes.append("[C1] No pricing in first-touch")
    
    # === WARNING CHECKS ===
    
    # D1 (warning): Special characters that may not render
    encoding_warnings = check_encoding_warnings(email_text)
    if encoding_warnings:
        result.warnings.extend([f"[D1w] {i}" for i in encoding_warnings])
    
    # A3: Word count
    word_count, wc_issues = check_word_count(email_text)
    result.word_count = word_count
    if wc_issues:
        result.warnings.extend([f"[A3] {i}" for i in wc_issues])
    else:
        result.passes.append(f"[A3] Word count OK ({word_count} words)")
    
    # A2: AI phrases
    ai_issues = check_ai_phrases(email_text)
    if ai_issues:
        result.warnings.extend([f"[A2] {i}" for i in ai_issues])
    else:
        result.passes.append("[A2] No generic AI phrases")
    
    # C4: Spam triggers
    spam_issues = check_spam_triggers(email_text)
    if spam_issues:
        result.warnings.extend([f"[C4] {i}" for i in spam_issues])
    else:
        result.passes.append("[C4] No spam trigger words")
    
    # C7: Visual proof link
    has_link, link_issues = check_links(email_text)
    result.has_link = has_link
    if link_issues:
        result.warnings.extend([f"[C7] {i}" for i in link_issues])
    else:
        result.passes.append("[C7] Visual proof link present")
    
    # C2: CTA softness
    cta_issues = check_cta_hardness(email_text)
    if cta_issues:
        result.warnings.extend([f"[C2] {i}" for i in cta_issues])
    else:
        result.passes.append("[C2] Soft CTA used")
    
    # D6: Signature
    sig_issues = check_signature(email_text)
    if sig_issues:
        result.warnings.extend([f"[D6] {i}" for i in sig_issues])
    else:
        result.passes.append("[D6] Signature complete")
    
    return result


def print_report(result: QAResult, email_preview: str = ""):
    """Print formatted QA report"""
    print("\n" + "=" * 60)
    print("  NORTHSTAR SYNERGY — EMAIL QA REPORT")
    print("=" * 60)
    
    if email_preview:
        print(f"\nEmail Preview (first 100 chars):")
        print(f"  {email_preview[:100]}...")
    
    print(f"\nWord Count: {result.word_count}")
    print(f"Has Visual Link: {'Yes' if result.has_link else 'No'}")
    
    if result.critical_failures:
        print("\n🛑 CRITICAL FAILURES (Must fix before send):")
        for fail in result.critical_failures:
            print(f"   ❌ {fail}")
    
    if result.warnings:
        print("\n⚠️  WARNINGS (Should fix):")
        for warn in result.warnings:
            print(f"   ⚠️  {warn}")
    
    if result.passes:
        print("\n✅ PASSED:")
        for p in result.passes:
            print(f"   ✓ {p}")
    
    print("\n" + "-" * 60)
    print(f"  SCORE: {result.score:.0f}%")
    print(f"  VERDICT: {result.verdict}")
    print("-" * 60 + "\n")
    
    return result.is_passing()


def main():
    parser = argparse.ArgumentParser(description='QA Lint for outreach emails')
    parser.add_argument('file', nargs='?', help='Email file to check (or pipe via stdin)')
    parser.add_argument('--follow-up', '-f', action='store_true', 
                        help='This is a follow-up email (pricing allowed)')
    args = parser.parse_args()
    
    # Read email content
    if args.file:
        try:
            with open(args.file, 'r', encoding='utf-8') as f:
                email_text = f.read()
        except FileNotFoundError:
            print(f"Error: File not found: {args.file}")
            sys.exit(1)
    elif not sys.stdin.isatty():
        email_text = sys.stdin.read()
    else:
        print("Usage: python qa_email_lint.py <email_file.txt>")
        print("   or: cat email.txt | python qa_email_lint.py")
        sys.exit(1)
    
    is_first_touch = not args.follow_up
    result = run_qa_checks(email_text, is_first_touch)
    is_passing = print_report(result, email_text)
    
    sys.exit(0 if is_passing else 1)


if __name__ == '__main__':
    main()
