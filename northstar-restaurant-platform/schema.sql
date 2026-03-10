-- ============================================================
-- NorthStar Synergy — Supabase Database Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL → New Query)
-- ============================================================

-- 1. RESTAURANTS
create table if not exists restaurants (
  id text primary key,
  slug text not null,
  domain text,
  config jsonb not null,
  unique (slug),
  unique (domain)
);
create index if not exists idx_restaurants_slug on restaurants (lower(slug));
create index if not exists idx_restaurants_domain on restaurants (lower(domain));

-- 2. ORDERS
create table if not exists orders (
  id text primary key,
  restaurant_id text not null,
  items jsonb not null,
  subtotal numeric not null,
  tax numeric not null,
  tip numeric not null default 0,
  total numeric not null,
  type text not null,
  scheduled_time text,
  customer jsonb not null,
  status text not null default 'pending',
  payment_method text not null,
  payment_id text,
  created_at text not null,
  updated_at text not null
);
create index if not exists idx_orders_restaurant on orders (restaurant_id);
create index if not exists idx_orders_status on orders (status);
create index if not exists idx_orders_created on orders (created_at desc);

-- 3. LEADS (CRM Pipeline)
create table if not exists leads (
  id text primary key,
  restaurant_name text not null,
  contact_name text,
  email text,
  phone text,
  website text,
  address text not null default '',
  city text not null default '',
  state text not null default '',
  stage text not null default 'prospect',
  source text not null default 'manual',
  score integer not null default 50,
  preview_url text,
  tags jsonb not null default '[]',
  notes jsonb not null default '[]',
  outreach_history jsonb not null default '[]',
  value numeric not null default 149,
  last_contacted_at text,
  next_follow_up_at text,
  created_at text not null,
  updated_at text not null
);
create index if not exists idx_leads_stage on leads (stage);
create index if not exists idx_leads_created on leads (created_at desc);

-- 4. CLIENTS
create table if not exists clients (
  id text primary key,
  lead_id text references leads(id),
  restaurant_name text not null,
  contact_name text not null,
  email text not null,
  phone text not null,
  plan text not null default 'starter',
  status text not null default 'active',
  domain text,
  deploy_url text not null default '',
  stripe_customer_id text,
  stripe_subscription_id text,
  monthly_revenue numeric not null default 0,
  hosting_health text not null default 'healthy',
  last_deploy_at text,
  ssl_expiry text,
  notes jsonb not null default '[]',
  onboarded_at text not null,
  created_at text not null,
  updated_at text not null
);
create index if not exists idx_clients_status on clients (status);
create index if not exists idx_clients_stripe on clients (stripe_customer_id);

-- 5. EXPENSES (Finance)
create table if not exists expenses (
  id text primary key,
  description text not null,
  amount numeric not null,
  category text not null,
  is_recurring boolean not null default false,
  recurring_interval text,
  date text not null,
  created_at text not null
);
create index if not exists idx_expenses_date on expenses (date desc);

-- 6. REVENUE (Finance)
create table if not exists revenue (
  id text primary key,
  client_id text not null references clients(id),
  client_name text not null,
  amount numeric not null,
  type text not null default 'subscription',
  date text not null,
  stripe_invoice_id text
);
create index if not exists idx_revenue_date on revenue (date desc);
create index if not exists idx_revenue_client on revenue (client_id);

-- 7. TICKETS (Support)
create table if not exists tickets (
  id text primary key,
  client_id text references clients(id),
  client_name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'open',
  priority text not null default 'medium',
  auto_response text,
  matched_faqs jsonb not null default '[]',
  matched_sops jsonb not null default '[]',
  responses jsonb not null default '[]',
  resolved_at text,
  created_at text not null,
  updated_at text not null
);
create index if not exists idx_tickets_status on tickets (status);
create index if not exists idx_tickets_created on tickets (created_at desc);

-- 8. FAQS
create table if not exists faqs (
  id text primary key,
  question text not null,
  answer text not null,
  category text not null,
  tags jsonb not null default '[]',
  is_public boolean not null default true,
  sort_order integer not null default 0,
  created_at text not null,
  updated_at text not null
);

-- 9. SOPS
create table if not exists sops (
  id text primary key,
  title text not null,
  category text not null,
  steps jsonb not null default '[]',
  triggers jsonb default '[]',
  created_at text not null,
  updated_at text not null
);

-- 10. SEQUENCES (Email Outreach)
create table if not exists sequences (
  id text primary key,
  name text not null,
  description text not null default '',
  steps jsonb not null default '[]',
  is_active boolean not null default true,
  created_at text not null
);

-- 11. ENROLLMENTS (Email Sequence Enrollments)
create table if not exists enrollments (
  id text primary key,
  lead_id text not null references leads(id),
  sequence_id text not null references sequences(id),
  current_step integer not null default 0,
  status text not null default 'active',
  enrolled_at text not null,
  last_step_sent_at text,
  next_step_at text
);
create index if not exists idx_enrollments_status on enrollments (status);
create index if not exists idx_enrollments_next on enrollments (next_step_at);

-- 12. ACTIVITIES (Activity Feed)
create table if not exists activities (
  id text primary key,
  type text not null,
  action text not null,
  description text not null,
  entity_id text,
  entity_name text,
  metadata jsonb,
  created_at text not null
);
create index if not exists idx_activities_created on activities (created_at desc);
create index if not exists idx_activities_type on activities (type);

-- 13. DAILY SEND LOG (Domain Warmup Throttle)
create table if not exists daily_send_log (
  date text primary key,
  send_count integer not null default 0
);

-- 14. DNC LIST (Do Not Contact)
create table if not exists dnc_list (
  id text primary key,
  email text,
  phone text,
  address text,
  reason text not null,
  created_at text not null
);
create index if not exists idx_dnc_email on dnc_list (lower(email));
create index if not exists idx_dnc_phone on dnc_list (phone);

-- ============================================================
-- Enable Row Level Security (RLS) on all tables
-- Since we use service_role key, RLS won't block our queries,
-- but it's good practice to have it enabled.
-- ============================================================
alter table restaurants enable row level security;
alter table orders enable row level security;
alter table leads enable row level security;
alter table clients enable row level security;
alter table expenses enable row level security;
alter table revenue enable row level security;
alter table tickets enable row level security;
alter table faqs enable row level security;
alter table sops enable row level security;
alter table sequences enable row level security;
alter table enrollments enable row level security;
alter table activities enable row level security;
alter table dnc_list enable row level security;
alter table daily_send_log enable row level security;

-- Service role bypasses RLS, so no policies needed for server-side access.
-- If public (anon) access is ever needed (e.g., public FAQs), add policies then.
