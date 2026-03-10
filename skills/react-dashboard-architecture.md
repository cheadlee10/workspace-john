---
name: react-dashboard-architecture
description: Master React architecture for building dashboards, CRMs, and real-time data visualizations. Component patterns, state management, performance optimization, and proven structures for complex UIs.
---

# React Dashboard Architecture — For Cliff

## Purpose
Build the NorthStar P&L dashboard and CRM with world-class architecture. Methodical, not rushed. This is core infrastructure.

---

## PART 1: React Architecture Fundamentals

### Component Hierarchy (Dashboard Structure)

```
App
├── DashboardLayout
│   ├── Sidebar (navigation)
│   ├── TopBar (metrics, user menu)
│   └── MainContent
│       ├── MetricsCards (4 key metrics)
│       ├── KanbanBoard (5 columns)
│       │   ├── Column (READY_TO_PITCH)
│       │   │   └── DealCard (repeatable)
│       │   ├── Column (CONTACTED)
│       │   └── ... (3 more columns)
│       ├── ActivityFeed (scrollable sidebar)
│       └── DealDetailModal (overlay)
└── AnalyticsPage
    ├── FunnelChart
    ├── RevenueChart
    └── VelocityChart
```

**Key principles:**
1. **Container/Presentational Split**
   - Container = Smart (handles data, logic)
   - Presentational = Dumb (just displays props)
   
2. **Single Responsibility**
   - Each component does ONE thing well
   - `DealCard` only displays a deal (doesn't fetch data)
   - `KanbanBoard` manages layout (doesn't know what a deal is)

3. **Composition Over Inheritance**
   - Build complex UIs from small, reusable pieces
   - `<Column><DealCard /></Column>` not `<ColumnWithDeals />`

---

## PART 2: Component Design Patterns

### Pattern 1: Presentational Component (Dumb)

```tsx
// DealCard.tsx
interface DealCardProps {
  business: string
  contact: string
  phone: string
  estimatedIncome: number
  monthlyIncome: number
  rating: number
  reviews: number
  daysInStage: number
  onClick: () => void
}

export function DealCard({
  business,
  contact,
  phone,
  estimatedIncome,
  monthlyIncome,
  rating,
  reviews,
  daysInStage,
  onClick
}: DealCardProps) {
  return (
    <div 
      className="p-4 bg-white rounded-lg border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <h3 className="font-bold text-lg">{business}</h3>
      <p className="text-sm text-gray-600">{contact}</p>
      <p className="text-sm text-gray-500">{phone}</p>
      
      <div className="mt-3 flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold text-green-600">
            ${estimatedIncome} + ${monthlyIncome}/mo
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-yellow-500">⭐</span>
          <span className="text-sm">{rating} ({reviews})</span>
        </div>
      </div>
      
      <p className="mt-2 text-xs text-gray-400">
        {daysInStage} days in stage
      </p>
    </div>
  )
}
```

**Why this is good:**
- ✅ Pure function (same props = same output)
- ✅ Easy to test (just pass props)
- ✅ Reusable anywhere
- ✅ TypeScript ensures all props provided

### Pattern 2: Container Component (Smart)

```tsx
// KanbanBoard.tsx
'use client'
import { useState, useEffect } from 'react'
import { DealCard } from './DealCard'
import { Deal, loadDeals, updateDealStatus } from '@/lib/deals'

export function KanbanBoard() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  
  // Load deals from JSONL file
  useEffect(() => {
    async function fetchDeals() {
      const data = await loadDeals()
      setDeals(data)
    }
    fetchDeals()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchDeals, 30000)
    return () => clearInterval(interval)
  }, [])
  
  // Group deals by status
  const dealsByStatus = {
    READY_TO_PITCH: deals.filter(d => d.status === 'READY_TO_PITCH'),
    CONTACTED: deals.filter(d => d.status === 'CONTACTED'),
    PROPOSAL_SENT: deals.filter(d => d.status === 'PROPOSAL_SENT'),
    NEGOTIATING: deals.filter(d => d.status === 'NEGOTIATING'),
    CLOSED: deals.filter(d => d.status === 'CLOSED')
  }
  
  // Handle drag and drop
  const handleDragEnd = async (dealId: string, newStatus: string) => {
    await updateDealStatus(dealId, newStatus)
    // Refetch to update UI
    const updated = await loadDeals()
    setDeals(updated)
  }
  
  return (
    <div className="flex space-x-4 overflow-x-auto">
      {Object.entries(dealsByStatus).map(([status, statusDeals]) => (
        <Column 
          key={status}
          title={status}
          deals={statusDeals}
          onDragEnd={(dealId) => handleDragEnd(dealId, status)}
          onCardClick={setSelectedDeal}
        />
      ))}
      
      {selectedDeal && (
        <DealDetailModal 
          deal={selectedDeal}
          onClose={() => setSelectedDeal(null)}
        />
      )}
    </div>
  )
}
```

**Why this is good:**
- ✅ Handles all data fetching/updating
- ✅ Manages UI state (selected deal)
- ✅ Auto-refresh every 30 seconds
- ✅ Delegates rendering to presentational components

### Pattern 3: Custom Hooks (Reusable Logic)

```tsx
// useDeals.ts
import { useState, useEffect } from 'react'
import { Deal, loadDeals } from '@/lib/deals'

export function useDeals(refreshInterval = 30000) {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    async function fetchDeals() {
      try {
        setLoading(true)
        const data = await loadDeals()
        setDeals(data)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchDeals()
    const interval = setInterval(fetchDeals, refreshInterval)
    return () => clearInterval(interval)
  }, [refreshInterval])
  
  return { deals, loading, error, refetch: () => loadDeals().then(setDeals) }
}

// Usage in component:
function Dashboard() {
  const { deals, loading, error, refetch } = useDeals()
  
  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />
  
  return <KanbanBoard deals={deals} onUpdate={refetch} />
}
```

**Why custom hooks are powerful:**
- ✅ Extract complex logic from components
- ✅ Reusable across multiple components
- ✅ Easy to test in isolation
- ✅ Keeps components clean and focused

---

## PART 3: State Management (Complex UIs)

### Option 1: React Context (Simple, Built-in)

**Use when:** Sharing data across many components without prop drilling

```tsx
// DealsContext.tsx
import { createContext, useContext, useState, useEffect } from 'react'

interface DealsContextType {
  deals: Deal[]
  updateDeal: (id: string, updates: Partial<Deal>) => Promise<void>
  refetch: () => Promise<void>
}

const DealsContext = createContext<DealsContextType | null>(null)

export function DealsProvider({ children }: { children: React.ReactNode }) {
  const [deals, setDeals] = useState<Deal[]>([])
  
  const updateDeal = async (id: string, updates: Partial<Deal>) => {
    await updateDealInDB(id, updates)
    await refetch()
  }
  
  const refetch = async () => {
    const data = await loadDeals()
    setDeals(data)
  }
  
  useEffect(() => {
    refetch()
  }, [])
  
  return (
    <DealsContext.Provider value={{ deals, updateDeal, refetch }}>
      {children}
    </DealsContext.Provider>
  )
}

export function useDealsContext() {
  const context = useContext(DealsContext)
  if (!context) throw new Error('useDealsContext must be used within DealsProvider')
  return context
}

// Usage:
// Wrap app in <DealsProvider>
// Any component can call useDealsContext() to access deals
```

### Option 2: Zustand (Recommended for Dashboards)

**Use when:** Complex state with many updates, need devtools, want simple API

```bash
npm install zustand
```

```tsx
// store/deals.ts
import { create } from 'zustand'
import { Deal, loadDeals, updateDealInDB } from '@/lib/deals'

interface DealsStore {
  deals: Deal[]
  loading: boolean
  error: string | null
  
  // Actions
  fetchDeals: () => Promise<void>
  updateDeal: (id: string, updates: Partial<Deal>) => Promise<void>
  addDeal: (deal: Deal) => Promise<void>
}

export const useDealsStore = create<DealsStore>((set, get) => ({
  deals: [],
  loading: false,
  error: null,
  
  fetchDeals: async () => {
    set({ loading: true })
    try {
      const deals = await loadDeals()
      set({ deals, error: null })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ loading: false })
    }
  },
  
  updateDeal: async (id, updates) => {
    await updateDealInDB(id, updates)
    await get().fetchDeals() // Refetch after update
  },
  
  addDeal: async (deal) => {
    await saveDealToDB(deal)
    await get().fetchDeals()
  }
}))

// Usage in any component:
function KanbanBoard() {
  const { deals, fetchDeals } = useDealsStore()
  
  useEffect(() => {
    fetchDeals()
    const interval = setInterval(fetchDeals, 30000)
    return () => clearInterval(interval)
  }, [fetchDeals])
  
  return <div>{deals.map(d => <DealCard key={d.id} {...d} />)}</div>
}
```

**Why Zustand:**
- ✅ Simpler than Redux (no boilerplate)
- ✅ No Context Provider needed
- ✅ Great DevTools
- ✅ Excellent performance (only re-renders what changed)

---

## PART 4: Real-Time Visualization

### Live Metrics (Auto-Update)

```tsx
// MetricsCards.tsx
'use client'
import { useEffect, useState } from 'react'
import { useDealsStore } from '@/store/deals'

export function MetricsCards() {
  const deals = useDealsStore(state => state.deals)
  
  // Calculate metrics from deals
  const metrics = {
    pipelineValue: deals
      .filter(d => d.status !== 'CLOSED' && d.status !== 'LOST')
      .reduce((sum, d) => sum + d.estimatedIncome + (d.monthlyIncome * 12), 0),
    
    dealsInPlay: deals.filter(d => d.status !== 'CLOSED' && d.status !== 'LOST').length,
    
    avgDealSize: deals.length > 0
      ? deals.reduce((sum, d) => sum + d.estimatedIncome, 0) / deals.length
      : 0,
    
    conversionRate: deals.length > 0
      ? (deals.filter(d => d.status === 'CLOSED').length / deals.length) * 100
      : 0
  }
  
  return (
    <div className="grid grid-cols-4 gap-6">
      <MetricCard
        title="Pipeline Value"
        value={`$${metrics.pipelineValue}`}
        subtitle="Year 1"
        trend="+12%"
        trendUp={true}
      />
      <MetricCard
        title="Deals in Play"
        value={metrics.dealsInPlay}
        subtitle={`${deals.filter(d => d.status === 'CLOSED').length} closed`}
      />
      <MetricCard
        title="Avg Deal Size"
        value={`$${Math.round(metrics.avgDealSize)}`}
      />
      <MetricCard
        title="Conversion Rate"
        value={`${metrics.conversionRate.toFixed(1)}%`}
      />
    </div>
  )
}

function MetricCard({ title, value, subtitle, trend, trendUp }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <p className="text-sm text-gray-600 font-medium">{title}</p>
      <div className="flex items-baseline space-x-2 mt-2">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <span className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            {trend}
          </span>
        )}
      </div>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  )
}
```

### Charts (Revenue Over Time)

```bash
npm install recharts
```

```tsx
// RevenueChart.tsx
'use client'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useDealsStore } from '@/store/deals'

export function RevenueChart() {
  const deals = useDealsStore(state => state.deals)
  
  // Group deals by week
  const chartData = deals
    .filter(d => d.status === 'CLOSED')
    .reduce((acc, deal) => {
      const week = getWeek(deal.closeDate)
      const existing = acc.find(item => item.week === week)
      
      if (existing) {
        existing.revenue += deal.actualIncome || deal.estimatedIncome
      } else {
        acc.push({
          week,
          revenue: deal.actualIncome || deal.estimatedIncome
        })
      }
      
      return acc
    }, [])
    .sort((a, b) => a.week.localeCompare(b.week))
  
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Revenue Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value}`} />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#0066CC" 
            strokeWidth={2}
            dot={{ fill: '#0066CC', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
```

### Funnel Visualization

```tsx
// FunnelChart.tsx
'use client'
import { useDealsStore } from '@/store/deals'

export function FunnelChart() {
  const deals = useDealsStore(state => state.deals)
  
  const stages = [
    { name: 'READY_TO_PITCH', count: deals.filter(d => d.status === 'READY_TO_PITCH').length },
    { name: 'CONTACTED', count: deals.filter(d => d.status === 'CONTACTED').length },
    { name: 'PROPOSAL_SENT', count: deals.filter(d => d.status === 'PROPOSAL_SENT').length },
    { name: 'NEGOTIATING', count: deals.filter(d => d.status === 'NEGOTIATING').length },
    { name: 'CLOSED', count: deals.filter(d => d.status === 'CLOSED').length }
  ]
  
  const maxCount = stages[0].count || 1
  
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Pipeline Funnel</h3>
      <div className="space-y-3">
        {stages.map((stage, i) => {
          const percentage = (stage.count / maxCount) * 100
          const dropoff = i > 0 ? stages[i-1].count - stage.count : 0
          
          return (
            <div key={stage.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{stage.name}</span>
                <span className="text-sm text-gray-600">
                  {stage.count} ({percentage.toFixed(0)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-8">
                <div 
                  className="bg-blue-600 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium transition-all"
                  style={{ width: `${percentage}%` }}
                >
                  {stage.count > 0 && `${stage.count} leads`}
                </div>
              </div>
              {dropoff > 0 && (
                <p className="text-xs text-red-600 mt-1">
                  ↓ {dropoff} drop-off ({((dropoff / stages[i-1].count) * 100).toFixed(0)}%)
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

---

## PART 5: Performance Optimization

### 1. Memoization (Prevent Unnecessary Re-renders)

```tsx
import { memo, useMemo } from 'react'

// Memoize expensive calculations
function DealsList({ deals }: { deals: Deal[] }) {
  const sortedDeals = useMemo(() => {
    return deals.sort((a, b) => b.estimatedIncome - a.estimatedIncome)
  }, [deals])
  
  return (
    <div>
      {sortedDeals.map(deal => <DealCard key={deal.id} {...deal} />)}
    </div>
  )
}

// Memoize components that don't change often
export const DealCard = memo(function DealCard(props: DealCardProps) {
  return <div>...</div>
}, (prevProps, nextProps) => {
  // Custom comparison: only re-render if these specific props changed
  return (
    prevProps.business === nextProps.business &&
    prevProps.estimatedIncome === nextProps.estimatedIncome
  )
})
```

### 2. Virtualization (Handle 1000+ Items)

```bash
npm install @tanstack/react-virtual
```

```tsx
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

function VirtualizedDealList({ deals }: { deals: Deal[] }) {
  const parentRef = useRef<HTMLDivElement>(null)
  
  const virtualizer = useVirtualizer({
    count: deals.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120, // Each deal card is ~120px tall
    overscan: 5 // Render 5 extra items above/below viewport
  })
  
  return (
    <div ref={parentRef} className="h-screen overflow-auto">
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualRow.start}px)`
            }}
          >
            <DealCard {...deals[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  )
}
```

### 3. Code Splitting (Lazy Load Heavy Components)

```tsx
import { lazy, Suspense } from 'react'

// Don't load AnalyticsPage until user clicks Analytics tab
const AnalyticsPage = lazy(() => import('./AnalyticsPage'))

function Dashboard() {
  const [activeTab, setActiveTab] = useState('pipeline')
  
  return (
    <div>
      <Tabs activeTab={activeTab} onChange={setActiveTab} />
      
      {activeTab === 'pipeline' && <KanbanBoard />}
      
      {activeTab === 'analytics' && (
        <Suspense fallback={<LoadingSpinner />}>
          <AnalyticsPage />
        </Suspense>
      )}
    </div>
  )
}
```

### 4. Debouncing (Search/Filter Performance)

```tsx
import { useState, useEffect } from 'react'

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  
  return debouncedValue
}

// Usage:
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebouncedValue(searchTerm, 300) // Wait 300ms after typing stops
  
  useEffect(() => {
    if (debouncedSearch) {
      // Perform search with debounced value
      searchDeals(debouncedSearch)
    }
  }, [debouncedSearch])
  
  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search deals..."
    />
  )
}
```

---

## PART 6: File Structure (Clean, Scalable)

```
dashboard/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Main dashboard page
│   ├── analytics/
│   │   └── page.tsx               # Analytics page
│   └── globals.css
│
├── components/
│   ├── dashboard/
│   │   ├── KanbanBoard.tsx        # Main board
│   │   ├── Column.tsx             # Kanban column
│   │   ├── DealCard.tsx           # Deal card
│   │   ├── DealDetailModal.tsx    # Modal overlay
│   │   ├── MetricsCards.tsx       # Top metrics
│   │   └── ActivityFeed.tsx       # Sidebar feed
│   │
│   ├── charts/
│   │   ├── FunnelChart.tsx
│   │   ├── RevenueChart.tsx
│   │   └── VelocityChart.tsx
│   │
│   └── ui/
│       ├── Button.tsx             # Reusable button
│       ├── Input.tsx              # Reusable input
│       ├── Modal.tsx              # Reusable modal
│       └── Card.tsx               # Reusable card
│
├── lib/
│   ├── deals.ts                   # Deal data functions
│   ├── jsonl.ts                   # JSONL parsing
│   └── metrics.ts                 # Metrics calculations
│
├── store/
│   └── deals.ts                   # Zustand store
│
├── types/
│   └── deals.ts                   # TypeScript types
│
└── package.json
```

---

## PART 7: Drag and Drop (Kanban Board)

```bash
npm install @dnd-kit/core @dnd-kit/sortable
```

```tsx
// KanbanBoard.tsx
'use client'
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function KanbanBoard() {
  const { deals, updateDeal } = useDealsStore()
  
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    
    if (over && active.id !== over.id) {
      const dealId = active.id as string
      const newStatus = over.id as string
      
      await updateDeal(dealId, { status: newStatus })
    }
  }
  
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex space-x-4">
        {['READY_TO_PITCH', 'CONTACTED', 'PROPOSAL_SENT', 'NEGOTIATING', 'CLOSED'].map(status => (
          <SortableContext
            key={status}
            items={deals.filter(d => d.status === status).map(d => d.id)}
            strategy={verticalListSortingStrategy}
          >
            <Column status={status} deals={deals.filter(d => d.status === status)} />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  )
}

function SortableDealCard({ deal }: { deal: Deal }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: deal.id })
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <DealCard {...deal} />
    </div>
  )
}
```

---

## PART 8: Testing (Ensure Quality)

### Unit Tests (Components)

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

```tsx
// DealCard.test.tsx
import { render, screen } from '@testing-library/react'
import { DealCard } from './DealCard'

describe('DealCard', () => {
  it('renders business name', () => {
    render(<DealCard business="Kevin's Yard Work" contact="Kevin" phone="123" ... />)
    expect(screen.getByText("Kevin's Yard Work")).toBeInTheDocument()
  })
  
  it('displays estimated income correctly', () => {
    render(<DealCard estimatedIncome={250} monthlyIncome={10} ... />)
    expect(screen.getByText('$250 + $10/mo')).toBeInTheDocument()
  })
})
```

---

## PART 9: Quick Start (Build First Feature)

### Day 1: Setup + First Component

```bash
# Create Next.js app
npx create-next-app@latest dashboard --typescript --tailwind --app

cd dashboard
npm install zustand recharts @dnd-kit/core
```

```tsx
// app/page.tsx
'use client'
import { useEffect } from 'react'
import { useDealsStore } from '@/store/deals'
import { DealCard } from '@/components/DealCard'

export default function Dashboard() {
  const { deals, fetchDeals } = useDealsStore()
  
  useEffect(() => {
    fetchDeals()
  }, [])
  
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">NorthStar CRM</h1>
      <div className="grid grid-cols-3 gap-4">
        {deals.map(deal => (
          <DealCard key={deal.id} {...deal} />
        ))}
      </div>
    </main>
  )
}
```

### Day 2: Add State Management

```tsx
// store/deals.ts
import { create } from 'zustand'

export const useDealsStore = create((set) => ({
  deals: [],
  fetchDeals: async () => {
    const response = await fetch('/api/deals')
    const deals = await response.json()
    set({ deals })
  }
}))
```

### Day 3: Add Kanban Layout

### Day 4: Add Drag & Drop

### Day 5: Add Charts

---

## Resources for Cliff

**Official Docs:**
- React: https://react.dev
- Next.js: https://nextjs.org/docs
- Zustand: https://docs.pmnd.rs/zustand
- Recharts: https://recharts.org

**Learning:**
- React patterns: https://patterns.dev
- TypeScript handbook: https://www.typescriptlang.org/docs

**UI Inspiration:**
- Pipedrive: https://www.pipedrive.com
- Linear: https://linear.app
- Vercel: https://vercel.com

---

## Questions? Reach Out

I'm here to help. If you hit a blocker:
1. Try to solve it (5-10 min max)
2. Google the error
3. If still stuck → message me in #inter-agent

We build this together. Methodical, not rushed. Core infrastructure.

Let's build something world-class. 🚀

— John
