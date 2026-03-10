# Gateway Auto-Restart Watchdog — SKILL.md
*Created: 2026-02-26 | Author: John | Status: ACTIVE*

## Purpose
Automatically detect and recover from Discord WebSocket 1005 resume loops
and other gateway degradation without human intervention.

---

## Architecture

### Layer 1: Cron Watchdog (Primary — Automated)
- **Cron job:** `discord-health-watchdog`
- **Interval:** Every 15 minutes
- **Action:** Isolated agent turn checks gateway health
- **Auto-restart trigger:** If WebSocket 1005 loop detected or gateway unresponsive
- **Tool used:** `gateway(action='restart', reason='Watchdog: ...')`
- **Delivery:** Silent (mode: none) — only alerts Craig if restart fails

### Layer 2: Heartbeat Detection (Secondary — Passive)
- All agents already run heartbeats every 55 minutes
- If heartbeat fails to deliver → gateway is likely down
- Agents can self-restart on next successful wake via `gateway` tool

### Layer 3: Manual Restart (Fallback — Human)
If both automated layers fail (e.g., entire Node process crashed):

**Option A — From any agent session (Discord/WhatsApp/webchat):**
```
/restart
```
OpenClaw native command (already enabled: `commands.restart: true`)

**Option B — From PowerShell on the host:**
```powershell
openclaw gateway restart
```

**Option C — Kill and restart process:**
```powershell
# Find the gateway process
Get-Process -Name node | Where-Object { $_.StartTime -gt (Get-Date).AddDays(-1) }

# Kill it
Stop-Process -Name node -Force

# Restart
openclaw gateway start
```

**Option D — Windows Service Manager (if registered):**
```powershell
Restart-Service openclaw-gateway
```

---

## Detection Signals

| Signal | Severity | Action |
|--------|----------|--------|
| WebSocket code 1005 in logs | 🔴 HIGH | Auto-restart immediately |
| No heartbeat response >2 cycles | 🟡 MED | Restart + alert Craig |
| Gateway process not found | 🔴 HIGH | Start gateway + alert Craig |
| Config validation fails | 🟡 MED | Alert Craig, do NOT restart |
| Multiple restarts in <1hr | 🔴 CRITICAL | Stop restarting, alert Craig |

## Circuit Breaker
- Max 3 auto-restarts per hour
- If 3rd restart triggered within 60 min → STOP auto-restart
- Alert Craig: "Gateway unstable — 3 restarts in <1hr. Manual investigation needed."
- Log to `memory/security_log.md`

---

## Cron Job Details

**Job ID:** `3b875630-6bd5-40c2-a4cc-75afb4276b20`
**Name:** `discord-health-watchdog`
**Schedule:** Every 900,000ms (15 min)
**Session target:** isolated
**Payload:** agentTurn — checks gateway, restarts if needed
**Delivery:** none (silent unless escalation needed)

---

## Testing Protocol

1. **Verify cron is active:** `cron(action='list')` → confirm `discord-health-watchdog` enabled
2. **Test restart capability:** `gateway(action='restart', reason='test')` → confirm PID changes
3. **Simulate failure:** Wait for next watchdog cycle → confirm HEARTBEAT_OK logged
4. **Verify recovery:** After restart → confirm Discord messages flow

---

## Files
- This skill: `skills/gateway-watchdog.md`
- Cron job: managed via OpenClaw cron system
- Logs: `memory/observations.md` (restart events)
- Security: `memory/security_log.md` (circuit breaker trips)
