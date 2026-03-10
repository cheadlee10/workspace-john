param(
  [string]$WorkspaceRoot = ".."
)

$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot $WorkspaceRoot)
$fixtures = Join-Path $PSScriptRoot "fixtures"
$sim = Join-Path $PSScriptRoot "scripts/simulate_webhook.js"
$jobs = Join-Path $root "jobs.jsonl"
$idem = Join-Path $PSScriptRoot "idempotency_keys.jsonl"
$dead = Join-Path $PSScriptRoot "dead_letter_events.jsonl"
$incidents = Join-Path $PSScriptRoot "payment_incidents.jsonl"

# Reset local artifacts for deterministic test run
"" | Set-Content -NoNewline $jobs
"" | Set-Content -NoNewline $idem
"" | Set-Content -NoNewline $dead
"" | Set-Content -NoNewline $incidents

Write-Host "TC-001 paid event should process once"
node $sim (Join-Path $fixtures "stripe_checkout_completed_paid.json")

Write-Host "TC-003 duplicate same event id should no-op"
node $sim (Join-Path $fixtures "stripe_checkout_completed_paid.json")

Write-Host "TC-007 unsupported event should no-op"
node $sim (Join-Path $fixtures "stripe_unsupported_event.json")

Write-Host "unpaid event should no-op"
node $sim (Join-Path $fixtures "stripe_checkout_completed_unpaid.json")

$jobsCount = (Get-Content $jobs | Where-Object { $_.Trim() -ne "" }).Count
$idemCount = (Get-Content $idem | Where-Object { $_.Trim() -ne "" }).Count

if ($jobsCount -ne 1) { throw "Expected exactly 1 jobs row, got $jobsCount" }
if ($idemCount -ne 1) { throw "Expected exactly 1 idempotency row, got $idemCount" }

$runDir = Join-Path $PSScriptRoot "test_runs"
New-Item -ItemType Directory -Force -Path $runDir | Out-Null
$stamp = Get-Date -Format "yyyy-MM-dd"
$runFile = Join-Path $runDir "$stamp.md"

@"
# Webhook Test Run - $stamp

- TC-001: pass
- TC-003: pass
- TC-007: pass
- unpaid no-op: pass
- jobs.jsonl rows: $jobsCount
- idempotency_keys.jsonl rows: $idemCount
"@ | Set-Content $runFile

Write-Host "PASS: webhook smoke tests complete -> $runFile"
