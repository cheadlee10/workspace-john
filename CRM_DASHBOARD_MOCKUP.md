# CRM Dashboard Visual Mockup

## What Craig Will See (Desktop View)

```
═══════════════════════════════════════════════════════════════════════════════
                         NORTHSTAR SYNERGY CRM
───────────────────────────────────────────────────────────────────────────────
[Dashboard] [Jobs] [CRM] [Analytics] [Settings]                  [+ New Deal]
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ PIPELINE VALUE  │ DEALS IN PLAY   │ AVG DEAL SIZE   │ CONVERSION RATE │
│                 │                 │                 │                 │
│   $370          │     1 active    │     $250        │      0%         │
│   Year 1        │     0 closed    │   +$10/mo       │   (0/1 closed)  │
│                 │     0 lost      │                 │                 │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘

[🔍 Search deals...]  [All Status ▼]  [Source ▼]  [Date Range ▼]

┌─────────────────────────────────────────────────────────────────────────────┐
│                        SALES PIPELINE - KANBAN VIEW                         │
├─────────────┬─────────────┬─────────────┬─────────────┬─────────────┬──────┤
│ READY TO    │ CONTACTED   │ PROPOSAL    │ NEGOTIATING │ CLOSED      │LOST  │
│ PITCH       │             │ SENT        │             │             │      │
│ ────────    │ ─────────   │ ────────    │ ────────── │ ──────      │ ──── │
│ 1 deal      │ 0 deals     │ 0 deals     │ 0 deals     │ 0 deals     │0 deal│
│ $370 value  │ $0          │ $0          │ $0          │ $0          │$0    │
├─────────────┼─────────────┼─────────────┼─────────────┼─────────────┼──────┤
│             │             │             │             │             │      │
│┌───────────┐│             │             │             │             │      │
││ Kevin's   ││             │             │             │             │      │
││ Yard Work ││             │             │             │             │      │
││───────────││             │             │             │             │      │
││ Kevin     ││             │             │             │             │      │
││☎ (206)    ││             │             │             │             │      │
││369-3776   ││             │             │             │             │      │
││           ││             │             │             │             │      │
││💰 $250 +  ││             │             │             │             │      │
││   $10/mo  ││             │             │             │             │      │
││           ││             │             │             │             │      │
││⭐ 4.4★    ││             │             │             │             │      │
││155 reviews││             │             │             │             │      │
││           ││             │             │             │             │      │
││🌐 Site:   ││             │             │             │             │      │
││kevins...  ││             │             │             │             │      │
││           ││             │             │             │             │      │
││📅 0 days  ││             │             │             │             │      │
││in stage   ││             │             │             │             │      │
│└───────────┘│             │             │             │             │      │
│             │             │             │             │             │      │
│ [+ Add]     │  [+ Add]    │  [+ Add]    │  [+ Add]    │  [+ Add]    │[+ Add│
│             │             │             │             │             │      │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┴──────┘

                                                    ┌──────────────────────┐
                                                    │ RECENT ACTIVITY      │
                                                    ├──────────────────────┤
                                                    │                      │
                                                    │ 🆕 15 minutes ago    │
                                                    │ Kevin's Yard Work    │
                                                    │ Website built        │
                                                    │ Status: READY        │
                                                    │ ──────────────────── │
                                                    │                      │
                                                    │ [Older activity...]  │
                                                    │                      │
                                                    │                      │
                                                    └──────────────────────┘
```

---

## Deal Card (Detailed View)

```
┌─────────────────────────────────────────────┐
│ KEVIN'S YARD WORK                     [✕]  │  ← Click X to close
├─────────────────────────────────────────────┤
│                                             │
│ LEFT COLUMN             │ RIGHT COLUMN      │
│ ───────────            │ ─────────────     │
│                        │                   │
│ 👤 Contact             │ 📅 TIMELINE       │
│    Kevin               │                   │
│    (206) 369-3776      │ Feb 25, 12:15 PM  │
│    [📞 Call] [📧 Email]│ 🆕 Website built  │
│                        │    https://...    │
│ 🔗 Source              │    Status: READY  │
│    [Yelp] 4.4★ (155)   │                   │
│    kevins-yard-work... │ [No more events]  │
│                        │                   │
│ 🏷️ Services            │                   │
│    • Landscaping       │                   │
│    • Yard Cleanup      │                   │
│    • Tree Trimming     │                   │
│    • Ivy Removal       │                   │
│    • Hardscaping       │                   │
│    • Irrigation        │                   │
│                        │                   │
│ 🌐 Website Built       │                   │
│    [View Site]         │                   │
│                        │                   │
│ 💰 Value               │                   │
│    $250 (one-time)     │                   │
│    $10/month recurring │                   │
│    = $370 Year 1       │                   │
│                        │                   │
│ 📝 Notes               │                   │
│    NO existing website │                   │
│    verified. 155 Yelp  │                   │
│    reviews. Built      │                   │
│    professional site.  │                   │
│                        │                   │
├─────────────────────────────────────────────┤
│ QUICK ACTIONS                               │
│ [📧 Send Follow-Up] [✅ Mark Closed]       │
│ [❌ Mark Lost] [📝 Add Note] [✏️ Edit]     │
└─────────────────────────────────────────────┘
```

---

## When Deal Moves to CONTACTED

**User drags Kevin's card from READY_TO_PITCH → CONTACTED column**

**Dashboard automatically:**
1. Updates JSONL file:
```json
{
  "date": "2026-02-25",
  "time": "3:15 PM",
  "business": "Kevin's Yard Work",
  "status": "CONTACTED",
  "pitch_channel": "EMAIL",
  "pitch_text": "Hey Kevin! I noticed your 155 five-star reviews..."
}
```

2. Card moves to CONTACTED column
3. Activity feed updates:
```
📧 Just now
Kevin's Yard Work
Pitch sent via EMAIL
Status: CONTACTED
```

4. Metrics update:
```
DEALS IN PLAY:
0 ready to pitch
1 contacted  ← Updated
0 proposal sent
```

---

## Analytics Tab View

```
═══════════════════════════════════════════════════════════════════════════════
                         ANALYTICS & INSIGHTS
───────────────────────────────────────────────────────────────────────────────

┌─────────────────────────────────────────────────────────────────────────────┐
│ CONVERSION FUNNEL                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ READY_TO_PITCH  ████████████████████ 10 leads    100%                      │
│        ↓                                                                    │
│ CONTACTED       ████████████████░░░░   7 leads     70%  ← 30% drop-off     │
│        ↓                                                                    │
│ PROPOSAL_SENT   ██████████░░░░░░░░░░   5 leads     50%  ← 20% drop-off     │
│        ↓                                                                    │
│ NEGOTIATING     ██████░░░░░░░░░░░░░░   3 leads     30%  ← 20% drop-off     │
│        ↓                                                                    │
│ CLOSED          ████░░░░░░░░░░░░░░░░   2 deals     20%  ← 10% drop-off     │
│                                                                             │
│ Overall conversion rate: 20% (2 closed / 10 started)                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ REVENUE OVER TIME                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ $5K ┤                                                                       │
│     │                                           ╱───  ← Projected           │
│ $4K ┤                                      ╱───╱                            │
│     │                                 ╱───╱                                 │
│ $3K ┤                            ╱───╱                                      │
│     │                       ╱───╱                                           │
│ $2K ┤                  ╱───╱                                                │
│     │             ╱───╱                                                     │
│ $1K ┤        ╱───╱  ← Actual revenue (closed deals)                        │
│     │   ╱───╱                                                               │
│  $0 └─────┴─────┴─────┴─────┴─────┴─────                                   │
│     Week1 Week2 Week3 Week4 Week5 Week6                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ AVERAGE DAYS IN EACH STAGE (Deal Velocity)                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ READY_TO_PITCH   ████░ 2 days    ← Good                                    │
│ CONTACTED        ████████████░ 7 days  ← BOTTLENECK (too long)             │
│ PROPOSAL_SENT    ██████░ 3 days                                            │
│ NEGOTIATING      ████████░ 5 days                                          │
│                                                                             │
│ Average total sales cycle: 17 days                                         │
│ Goal: <14 days    Status: 🔴 NEEDS IMPROVEMENT                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────┬──────────────────────────────────────────────────┐
│ TOP SOURCES               │ WIN/LOSS REASONS                                │
├───────────────────────────┼──────────────────────────────────────────────────┤
│                           │                                                 │
│ Yelp                      │ WON DEALS:                                      │
│   8 closed  $2,400        │   • Fast response (40%)                         │
│   Conversion: 25%         │   • Good pricing (35%)                          │
│                           │   • Professional demo (25%)                     │
│ Google                    │                                                 │
│   3 closed  $900          │ LOST DEALS:                                     │
│   Conversion: 15%         │   • Too expensive (50%)                         │
│                           │   • Went with competitor (30%)                  │
│ Referral                  │   • Bad timing (20%)                            │
│   2 closed  $600          │                                                 │
│   Conversion: 40%         │                                                 │
│                           │                                                 │
└───────────────────────────┴──────────────────────────────────────────────────┘
```

---

## Mobile View (Responsive)

```
┌───────────────────────┐
│ NORTHSTAR CRM    [≡] │ ← Hamburger menu
├───────────────────────┤
│                       │
│ PIPELINE VALUE        │
│ $370 Year 1          │
│                       │
│ DEALS: 1 active       │
│ CONVERSION: 0%        │
├───────────────────────┤
│ [All Status ▼]        │
├───────────────────────┤
│                       │
│ READY TO PITCH (1)    │
│ ┌─────────────────┐   │
│ │ Kevin's Yard    │   │
│ │ Work            │   │
│ │                 │   │
│ │ $250 + $10/mo   │   │
│ │ ⭐ 4.4 (155)    │   │
│ │                 │   │
│ │ 0 days in stage │   │
│ │                 │   │
│ │ [View] [Move ▼] │   │
│ └─────────────────┘   │
│                       │
│ CONTACTED (0)         │
│ [No deals]            │
│                       │
│ PROPOSAL SENT (0)     │
│ [No deals]            │
│                       │
│ [+ New Deal]          │
│                       │
└───────────────────────┘
```

---

## Color Scheme (Professional)

**Card States:**
- `READY_TO_PITCH`: Blue border (#0066CC)
- `CONTACTED` (waiting <48h): Yellow border (#FFC107)
- `CONTACTED` (waiting >48h): Orange border (#FF9800)
- `CONTACTED` (waiting >5 days): Red border (#DC3545)
- `PROPOSAL_SENT`: Purple border (#9C27B0)
- `NEGOTIATING`: Teal border (#009688)
- `CLOSED`: Green border (#28A745), green background
- `LOST`: Gray border (#6C757D), faded

**Metrics Cards:**
- Background: White (#FFFFFF)
- Border: Light gray (#E0E0E0)
- Numbers: Large, bold, dark gray (#212529)
- Up arrow: Green (#28A745)
- Down arrow: Red (#DC3545)

**Activity Feed:**
- Background: Light gray (#F8F9FA)
- Event icons: Colored based on type
  - 🆕 New: Blue
  - 📧 Email: Purple
  - ✉️ Response: Green
  - ✅ Closed: Green
  - ❌ Lost: Red

---

## Interaction Examples

### Dragging a Deal Card:
```
1. User clicks Kevin's card in READY_TO_PITCH
2. Card lifts with shadow effect
3. User drags to CONTACTED column
4. Column highlights (light blue background)
5. User releases
6. Card animates into CONTACTED column
7. JSONL updates with new status
8. Activity feed shows "📧 Just now - Kevin's Yard Work - Status: CONTACTED"
9. Metrics recalculate
```

### Clicking a Deal Card:
```
1. User clicks Kevin's card
2. Modal slides up from bottom (smooth animation)
3. Shows full deal details + timeline
4. User can:
   - Click phone number → Opens default dialer
   - Click email → Opens email client
   - Click [View Site] → Opens in new tab
   - Click [Add Note] → Inline text field appears
   - Click [Mark Closed] → Prompts for payment amount
```

### Adding a New Deal:
```
1. User clicks [+ New Deal]
2. Modal appears with form:
   - Business name *
   - Contact name
   - Phone *
   - Email
   - Source (dropdown: Yelp/Google/Referral)
   - Services (multi-select)
   - Estimated income (one-time) *
   - Estimated income (monthly)
   - Notes
3. User fills form, clicks [Save]
4. New card appears in READY_TO_PITCH column
5. JSONL appends new entry
6. Activity feed updates
```

---

## What Cliff Needs to Code

### Frontend (React/Vue/Vanilla JS):
- [ ] Kanban board with 5 columns
- [ ] Draggable cards (use library like `react-beautiful-dnd` or `SortableJS`)
- [ ] Deal card component (shows business, contact, income, rating, days)
- [ ] Deal detail modal (click card → show full info + timeline)
- [ ] Metrics cards component (pipeline value, deals, conversion)
- [ ] Activity feed component (scrollable, real-time updates)
- [ ] Filters & search bar
- [ ] New deal form modal
- [ ] Analytics charts (use Chart.js or Recharts)

### Backend Logic:
- [ ] Read `sales-crm-pitch-log.jsonl` (parse line by line)
- [ ] Group entries by business name (latest entry = current state)
- [ ] Calculate metrics (pipeline value, conversion rate, etc.)
- [ ] Watch JSONL file for changes (auto-refresh)
- [ ] Append to JSONL on drag/drop or status change
- [ ] Serve via API endpoint (or read directly in frontend)

### Performance:
- [ ] Load time <1 second
- [ ] Drag/drop lag <100ms
- [ ] Smooth animations (60fps)
- [ ] Handle 100+ deals without slowdown

---

## Testing Checklist

- [ ] Drag Kevin's card from READY_TO_PITCH → CONTACTED (status updates in JSONL)
- [ ] Click Kevin's card → modal opens with full details
- [ ] Add new deal → card appears in READY_TO_PITCH
- [ ] Refresh page → data persists (from JSONL)
- [ ] Open on mobile → columns stack vertically
- [ ] Add 10 deals → pipeline still fast
- [ ] Filter by status → shows only selected deals
- [ ] Search "Kevin" → finds Kevin's Yard Work

---

## Files for Cliff

**Already created:**
- ✅ `sales-crm-pitch-log.jsonl` (sample data with Kevin's Yard Work)
- ✅ `CRM_DASHBOARD_REQUIREMENTS.md` (full spec)
- ✅ `CRM_DASHBOARD_MOCKUP.md` (this file - visual reference)

**Cliff builds:**
- Dashboard UI (Kanban board)
- JSONL parser
- Metrics calculations
- Auto-refresh logic

**Timeline:**
- Phase 1 (THIS WEEK): Kanban + metrics + modal + activity feed
- Phase 2 (NEXT WEEK): Filters + analytics + mobile

---

## Expected Result

**Craig logs in → sees:**
1. Visual pipeline with Kevin's card in READY_TO_PITCH
2. Metrics showing $370 pipeline value
3. Activity feed showing "Website built 15 min ago"

**Craig pitches Kevin → drags card to CONTACTED:**
1. Card moves smoothly
2. JSONL updates automatically
3. Activity feed shows "Pitch sent"
4. Metrics recalculate

**Kevin responds → Craig updates:**
1. Clicks card → modal opens
2. Types response in timeline
3. Moves card to PROPOSAL_SENT
4. Dashboard updates everywhere

**Deal closes → Craig celebrates:**
1. Drags card to CLOSED
2. Card turns green
3. Metrics show first closed deal
4. Revenue counter updates

**THIS IS THE DREAM.**

Let's build it. 🚀
