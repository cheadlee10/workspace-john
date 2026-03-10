# World-Class CRM Dashboard Requirements for Cliff

## Research Summary: Best CRM Dashboards 2026

Analyzed: **Pipedrive, HubSpot, Salesforce, Monday.com, Pipeline CRM**

**Key finding:** Best CRMs use **visual pipeline (Kanban board)** + **real-time metrics** + **deal progression tracking**

---

## WHAT CRAIG WANTS (Requirements)

### 1. VISUAL PIPELINE (Kanban Board) ⭐ PRIORITY #1

**Like Pipedrive's famous drag-and-drop board:**

```
┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│ READY TO    │ CONTACTED   │ PROPOSAL    │ NEGOTIATING │ CLOSED      │
│ PITCH (1)   │ (0)         │ SENT (0)    │ (0)         │ (0)         │
├─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│             │             │             │             │             │
│ ┌─────────┐ │             │             │             │             │
│ │Kevin's  │ │             │             │             │             │
│ │Yard Work│ │             │             │             │             │
│ │         │ │             │             │             │             │
│ │$250 +   │ │             │             │             │             │
│ │$10/mo   │ │             │             │             │             │
│ │         │ │             │             │             │             │
│ │155 ★★★★★│ │             │             │             │             │
│ └─────────┘ │             │             │             │             │
│             │             │             │             │             │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘
```

**Features:**
- **5 columns**: READY_TO_PITCH | CONTACTED | PROPOSAL_SENT | NEGOTIATING | CLOSED
- **Deal cards** showing:
  - Business name
  - Contact name
  - Phone number (click to call)
  - Estimated income (one-time + monthly)
  - Yelp rating + review count
  - Days in current stage
  - Link to website built
  - Last activity (pitch sent, response received)
- **Drag and drop** to move deals between stages (updates JSONL automatically)
- **Color coding**:
  - Green border: Responded positively
  - Yellow border: Waiting for response (>48h = yellow, >5 days = red)
  - Red border: Overdue follow-up
  - Gray: Lost
- **Card click** → Opens deal detail modal (see Section 3)

**Tech:**
- Read from: `workspace-john/sales-crm-pitch-log.jsonl`
- Update on drag: Append new status to JSONL
- Auto-refresh: Every 30 seconds or on tab focus

---

### 2. METRICS DASHBOARD (Top of Page)

**4 Key Metrics in Cards:**

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ PIPELINE VALUE  │ DEALS IN PLAY   │ AVG DEAL SIZE   │ CONVERSION RATE │
│ $250 one-time   │ 1 active        │ $250            │ 0% (0/1 closed) │
│ $120/yr recur.  │ 0 closed        │ $10/mo recur.   │                 │
│ = $370 Year 1   │ 0 lost          │                 │                 │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

**Calculations:**
- **Pipeline Value**: Sum all `estimated_income_onetime` + `estimated_income_monthly * 12` for deals NOT in CLOSED or LOST status
- **Deals in Play**: Count by status (READY_TO_PITCH, CONTACTED, PROPOSAL_SENT, NEGOTIATING)
- **Avg Deal Size**: Average of estimated income across all deals
- **Conversion Rate**: `(CLOSED deals / Total deals) * 100`

**Visual:** Large numbers, green/red arrows showing change from last week

---

### 3. DEAL DETAIL MODAL (Click Any Card)

**When you click a deal card, open modal with:**

**Left Column:**
- Business name (large)
- Contact name
- Phone (click-to-call button)
- Email (click-to-email button)
- Source (Yelp badge with link)
- Yelp rating + review count
- Services offered (tags)
- Website we built (link button)

**Right Column - Timeline:**
```
2026-02-25 12:15 PM - Website built ✅
                      https://kevins-yard-work.vercel.app
                      
[Future entries as they happen:]

2026-02-25 3:30 PM  - Pitch sent via EMAIL 📧
                      "Hey Kevin, I noticed your 155 reviews..."
                      
2026-02-26 10:15 AM - Response received ✉️
                      "Interested. What's the timeline?"
                      Status → PROPOSAL_SENT
                      
2026-02-26 2:00 PM  - Proposal sent 📄
                      "$250 one-time, 48hr delivery"
```

**Bottom of Modal:**
- **Quick Actions**:
  - [Send Follow-Up Email] button
  - [Mark as Closed] button (asks for payment amount)
  - [Mark as Lost] button (asks for reason)
  - [Add Note] button
- **Edit Fields**: Click any field to edit inline (saves to JSONL)

---

### 4. ACTIVITY FEED (Right Sidebar)

**Recent activity across ALL deals (last 20 events):**

```
┌─────────────────────────────────────┐
│ RECENT ACTIVITY                     │
├─────────────────────────────────────┤
│ 🆕 15 min ago                       │
│ Kevin's Yard Work                   │
│ Website built & logged              │
│ Status: READY_TO_PITCH              │
├─────────────────────────────────────┤
│ [Future entries...]                 │
│                                     │
│ 📧 2 hours ago                      │
│ ABC Landscaping                     │
│ Pitch sent via email                │
│ Status: CONTACTED                   │
├─────────────────────────────────────┤
│ ✅ Yesterday                        │
│ XYZ Contractors                     │
│ Deal closed for $300                │
│ Status: CLOSED                      │
└─────────────────────────────────────┘
```

**Shows:**
- Emoji indicator (🆕 new, 📧 pitch, ✉️ response, ✅ closed, ❌ lost)
- Time ago (human-readable)
- Business name (click to open deal detail)
- Action description
- Current status

---

### 5. FILTERS & SEARCH (Top Bar)

```
[🔍 Search deals...]  [All Status ▼]  [All Sources ▼]  [Date Range ▼]  [+ New Deal]
```

**Filters:**
- **Status**: All | Ready to Pitch | Contacted | Proposal Sent | Negotiating | Closed | Lost
- **Source**: All | Yelp | Google | Referral
- **Date Range**: Last 7 days | Last 30 days | This month | All time | Custom

**Search:** Searches business name, contact name, phone, email, notes

---

### 6. ANALYTICS TAB (Second Page)

**Charts to include:**

**A. Pipeline Funnel (Conversion Visualization)**
```
READY_TO_PITCH (10 leads)    ████████████████████ 100%
    ↓
CONTACTED (7 leads)          ██████████████░░░░░░  70%
    ↓
PROPOSAL_SENT (5 leads)      ██████████░░░░░░░░░░  50%
    ↓
NEGOTIATING (3 leads)        ██████░░░░░░░░░░░░░░  30%
    ↓
CLOSED (2 deals)             ████░░░░░░░░░░░░░░░░  20%
```

**B. Revenue Over Time (Line Chart)**
- X-axis: Weeks/Months
- Y-axis: Revenue (one-time + recurring)
- Line 1: Actual revenue (closed deals)
- Line 2: Pipeline value (projected)

**C. Deal Velocity (Bar Chart)**
- Average days in each stage
- Shows bottlenecks (if deals spend >7 days in CONTACTED, that's a problem)

**D. Top Performing Sources**
- Yelp: X deals closed, $Y revenue
- Google: X deals closed, $Y revenue
- Shows which lead source converts best

**E. Win/Loss Reasons (Pie Chart)**
- Why deals are won (fast response, good price, great demo)
- Why deals are lost (too expensive, bad timing, went with competitor)

---

### 7. TECHNICAL IMPLEMENTATION

**Data Flow:**
```
John's pitch activity
    ↓
Appends to: sales-crm-pitch-log.jsonl
    ↓
Dashboard reads JSONL (every 30 sec)
    ↓
Parses JSON, renders UI
    ↓
User drags card or clicks button
    ↓
Dashboard appends update to JSONL
    ↓
Loop continues
```

**File Structure:**
```
sales-crm-pitch-log.jsonl
Each line = one lead with full history:

{"date":"2026-02-25","time":"12:15 PM","business":"Kevin's Yard Work",...}
{"date":"2026-02-25","time":"3:30 PM","business":"ABC Landscaping",...}
```

**When status changes:**
Dashboard appends NEW line with updated status (keeps full history)

**Cliff's implementation checklist:**
- [ ] Parse JSONL file (read line by line)
- [ ] Group by business (latest entry = current state)
- [ ] Render Kanban columns (5 stages)
- [ ] Make cards draggable (update JSONL on drop)
- [ ] Build deal detail modal (click card → show timeline)
- [ ] Add metrics calculations (pipeline value, conversion rate)
- [ ] Create activity feed (last 20 events)
- [ ] Add filters & search
- [ ] Build analytics charts (funnel, revenue, velocity)
- [ ] Auto-refresh every 30 seconds
- [ ] Make it FAST (no lag on drag/drop)

---

### 8. UI/UX REQUIREMENTS

**Design inspiration:** Pipedrive (clean, colorful, intuitive)

**Colors:**
- Primary: Blue (#0066CC)
- Success: Green (#28A745)
- Warning: Yellow (#FFC107)
- Danger: Red (#DC3545)
- Neutral: Gray (#6C757D)

**Fonts:**
- Headers: 18-24px, bold
- Body: 14-16px, regular
- Small text (dates): 12px

**Spacing:**
- Card padding: 16px
- Column gaps: 20px
- Generous whitespace

**Responsiveness:**
- Desktop: 5-column Kanban
- Tablet: 3-column (scroll horizontally)
- Mobile: 1-column list view

**Performance:**
- Load time: <1 second
- Drag/drop lag: <100ms
- Smooth animations (no jank)

---

### 9. PHASE 1 vs PHASE 2

**PHASE 1 (This Week) - MVP:**
- ✅ Kanban board (5 columns, draggable cards)
- ✅ Basic metrics (pipeline value, deal count)
- ✅ Deal detail modal (click card → see info)
- ✅ Activity feed (recent events)
- ✅ Parse JSONL file (read/write)

**PHASE 2 (Next Week) - Enhanced:**
- ✅ Filters & search
- ✅ Analytics tab (charts)
- ✅ Email integration (send from dashboard)
- ✅ Mobile responsive
- ✅ Notifications (new responses, overdue follow-ups)

**Craig's priority:** GET PHASE 1 LIVE THIS WEEK so he can see pipeline visually

---

### 10. EXISTING DASHBOARD INTEGRATION

**Cliff's current dashboard has:**
- Jobs tracking (Fiverr, websites)
- Token usage monitoring
- Revenue tracking

**Add CRM as NEW TAB:**
```
[Dashboard] [Jobs] [CRM] [Analytics] [Settings]
                    ^^^
                   NEW TAB
```

**OR make it a separate page:**
```
http://localhost:8765/crm
```

**Data sync:**
- Dashboard checks `workspace-john/sales-crm-pitch-log.jsonl` every 30 sec
- When John appends to JSONL → Dashboard updates automatically
- When Cliff drags card → Appends to JSONL → John sees update

---

## COMPLETE EXAMPLE (Kevin's Yard Work)

**Initial state (READY_TO_PITCH):**
```json
{
  "date": "2026-02-25",
  "time": "12:15 PM",
  "business": "Kevin's Yard Work",
  "contact": "Kevin",
  "phone": "(206) 369-3776",
  "email": "PENDING",
  "source": "Yelp",
  "yelp_url": "https://www.yelp.com/biz/kevins-yard-work-seattle",
  "website_built": "https://kevins-yard-work.vercel.app",
  "services": ["Landscaping", "Yard Cleanup", "Tree Trimming"],
  "reviews": 155,
  "rating": 4.4,
  "pitch_channel": "PENDING",
  "pitch_text": "PENDING",
  "response": "PENDING",
  "status": "READY_TO_PITCH",
  "estimated_income_onetime": 250,
  "estimated_income_monthly": 10,
  "notes": "NO existing website verified. Built professional Next.js site."
}
```

**After pitch sent (CONTACTED):**
```json
{
  "date": "2026-02-25",
  "time": "3:30 PM",
  "business": "Kevin's Yard Work",
  "pitch_channel": "EMAIL",
  "pitch_text": "Hey Kevin! I noticed you have 155 five-star reviews but no website...",
  "status": "CONTACTED",
  ...rest of fields same...
}
```

**After response (PROPOSAL_SENT):**
```json
{
  "date": "2026-02-26",
  "time": "10:15 AM",
  "business": "Kevin's Yard Work",
  "response": "Interested. What's the timeline?",
  "status": "PROPOSAL_SENT",
  ...
}
```

**After closed (CLOSED):**
```json
{
  "date": "2026-02-26",
  "time": "4:00 PM",
  "business": "Kevin's Yard Work",
  "status": "CLOSED",
  "actual_income_onetime": 250,
  "close_date": "2026-02-26",
  "payment_method": "Venmo",
  ...
}
```

**Dashboard shows history:** All entries for "Kevin's Yard Work" in timeline

---

## FILES FOR CLIFF

**I'm creating:**
1. ✅ `CRM_DASHBOARD_REQUIREMENTS.md` (this file)
2. ✅ Message to Cliff in #inter-agent with summary
3. ✅ `sales-crm-pitch-log.jsonl` (sample data ready)
4. ⏳ Mockup images (if needed)

**Cliff needs to build:**
1. Kanban board UI (drag & drop)
2. JSONL parser (read/write)
3. Deal detail modal
4. Metrics calculations
5. Activity feed
6. Auto-refresh logic

**Timeline:** Phase 1 (MVP) this week, Phase 2 (enhanced) next week

---

## REFERENCES (Best CRM Designs)

**Study these:**
- **Pipedrive**: https://www.pipedrive.com (BEST Kanban board)
- **Monday.com CRM**: https://monday.com (great visual pipeline)
- **HubSpot**: https://www.hubspot.com (comprehensive metrics)
- **Dribbble CRM designs**: https://dribbble.com/tags/crm-dashboard

**Key takeaways:**
- Visual pipeline beats table view (easier to understand at a glance)
- Drag and drop is ESSENTIAL (don't make users click dropdowns)
- Big numbers + colors = instant insights
- Activity feed keeps everyone informed
- Deal detail modal shows full context without leaving page

---

## STATUS

**Created:** 2026-02-25 3:10 PM
**For:** Cliff (to build)
**Approved by:** Craig (requirements based on "world's best CRM sites")
**Priority:** HIGH (Phase 1 this week)
**Data ready:** ✅ sample JSONL with Kevin's Yard Work

**Next:** Cliff reads this → Builds Phase 1 → John starts closing deals → Revenue flows
