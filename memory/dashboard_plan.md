Dashboard Website Plan

Objective: Put an internal dashboard on a public website so stakeholders can view financial history since creation without missing data.

Data sources:
- Financial history ledger (transactions, invoices, payouts) from Day 1 to present
- OpenClaw dashboard data source for integration
- User access controls and authentication mock (we will implement later)

Features:
- View total revenue, gross profit, net profit over time
- Drill-down by service tier, client, date range
- Download/export CSV/PDF of financial history
- Audit trail showing data source and last sync

Tasks:
1) Create a website skeleton (landing + dashboard page)
2) Implement data connector to pull financial history (stub first, real API/connectors later)
3) Build charts (time series) for revenue, profit
4) Implement table of transactions with filters
5) Build export button for CSV/PDF
6) Add authentication guard (basic) for internal access only
7) Create doc in memory/KNOWLEDGE.md with patterns from this build

Milestones:
- Week 1: Static mock dashboard on website (no live data)
- Week 2: Live data connector mocked, charts render data
- Week 3: End-to-end with real data if available

Owner: John
