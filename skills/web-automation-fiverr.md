# WEB AUTOMATION - FIVERR GIG POSTING
## Robust Browser Control for High-Volume Operations

**Purpose:** Automate Fiverr seller operations without manual intervention

---

## CRITICAL BROWSER RELAY RULES

### 1. Always Use Chrome Profile
```
profile: "chrome"
```
Never use "openclaw" profile - it's isolated. Chrome profile = your actual Chrome with login sessions.

### 2. Keep Tab Open
- Browser relay REQUIRES the tab to stay open
- If tab closes = connection lost
- If you navigate away = connection lost
- **Solution:** Open Fiverr in dedicated Chrome window, leave it open

### 3. Snapshot Before Every Action
```
1. snapshot (get page state + refs)
2. act (click/type using refs from snapshot)
3. snapshot again (verify result)
```

### 4. Use refs, Not Selectors
- Browser returns refs (e.g., "e123")
- Use those refs in act commands
- Don't try to use CSS selectors directly

---

## FIVERR AUTOMATION WORKFLOW

### Phase 1: Profile Setup (One-Time)

**Step 1: Navigate to seller onboarding**
```
navigate → https://www.fiverr.com/seller_onboarding/0
```

**Step 2: Check current state**
```
snapshot → see what's on page
```

**Step 3: Fill profile manually OR skip**
If onboarding screen appears:
- Click "Fill out profile manually"
- Fill in fields step by step
- Or: Upload LinkedIn PDF (faster)

### Phase 2: Create Gig (Repeatable)

**Step 1: Navigate to gig creation**
```
navigate → https://www.fiverr.com/gigs/create
```

**Step 2: Fill gig form**
Use refs from snapshot to:
- Type into title field
- Select category dropdown
- Type description
- Set pricing (3 tiers)
- Add tags
- Upload images (if supported)

**Step 3: Publish**
Click "Publish" button ref

### Phase 3: Monitor Orders (24/7)

**Step 1: Check dashboard**
```
navigate → https://www.fiverr.com/users/[username]/manage_orders
snapshot → look for "new order" indicators
```

**Step 2: Extract order details**
Parse snapshot for:
- Order ID
- Service type
- Requirements
- Deadline
- Buyer messages

**Step 3: Deliver completed work**
```
navigate → order delivery page
Upload file (completed Excel work)
Add delivery message
Click "Deliver Order"
```

---

## ERROR RECOVERY

### Connection Lost
**Symptom:** "Can't reach browser control service"
**Fix:**
1. Tell Craig: "Relay disconnected. Please click OpenClaw extension icon on Fiverr tab to reconnect."
2. Wait for "Ready" confirmation
3. Resume from last successful step

### Tab Closed
**Symptom:** "tab not found"
**Fix:**
1. Tell Craig: "Fiverr tab closed. Please reopen and attach relay."
2. Navigate back to correct page
3. Continue

### Protocol Error
**Symptom:** "Protocol error (Target.attachToBrowserTarget)"
**Fix:**
1. This is a Chrome DevTools issue
2. Close Chrome completely
3. Reopen Chrome
4. Reattach relay
5. Try again

---

## CURRENT ISSUE DIAGNOSIS

**What happened:**
1. ✅ Relay connected initially (saw "ON" badge)
2. ✅ Navigated to Fiverr successfully
3. ❌ Connection dropped during navigation

**Possible causes:**
- Tab navigation caused relay to disconnect
- Chrome window was closed/minimized
- Multiple tabs confused the relay
- Protocol version mismatch

**Fix attempt:**
1. Keep ONLY Fiverr tab open
2. Don't navigate away from Fiverr domain
3. Use dedicated Chrome window
4. Reattach relay if it drops

---

## NEXT STEPS

1. Craig: Reopen Chrome, go to Fiverr, attach relay
2. John: Navigate directly to gig creation page
3. John: Snapshot to see form structure
4. John: Fill form programmatically
5. John: Publish gig
6. Repeat for gigs 2-3

**NO MANUAL FALLBACK. WE AUTOMATE THIS.**
