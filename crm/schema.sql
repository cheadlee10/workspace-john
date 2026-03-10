-- Personal CRM Database Schema
-- SQLite with WAL mode for concurrent access

PRAGMA journal_mode=WAL;
PRAGMA foreign_keys=ON;
PRAGMA synchronous=NORMAL;

-- ============================================================================
-- CONTACTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    first_name TEXT,
    last_name TEXT,
    company TEXT,
    role TEXT,
    phone TEXT,
    linkedin_url TEXT,
    priority INTEGER DEFAULT 50, -- 0-100, higher = more important
    relationship_score REAL DEFAULT 0.0, -- 0-100, calculated by algorithm
    relationship_type TEXT, -- e.g., "client", "partner", "investor", "friend"
    communication_style TEXT, -- e.g., "formal", "casual", "technical"
    timezone TEXT,
    tags TEXT, -- JSON array of tags
    notes TEXT,
    status TEXT DEFAULT 'active', -- active, archived, spam
    source TEXT, -- email, manual, calendar, import
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_interaction_date TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Metadata
    email_count INTEGER DEFAULT 0,
    meeting_count INTEGER DEFAULT 0,
    call_count INTEGER DEFAULT 0,
    
    -- Skip patterns (learning system)
    auto_added BOOLEAN DEFAULT 0,
    user_approved BOOLEAN DEFAULT 0,
    user_rejected BOOLEAN DEFAULT 0,
    
    UNIQUE(email)
);

CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_company ON contacts(company);
CREATE INDEX idx_contacts_priority ON contacts(priority DESC);
CREATE INDEX idx_contacts_relationship_score ON contacts(relationship_score DESC);
CREATE INDEX idx_contacts_last_interaction ON contacts(last_interaction_date DESC);
CREATE INDEX idx_contacts_status ON contacts(status);

-- ============================================================================
-- INTERACTIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS interactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contact_id INTEGER NOT NULL,
    type TEXT NOT NULL, -- email_sent, email_received, meeting, call, note
    subject TEXT,
    snippet TEXT, -- First 200 chars of body/transcript
    full_content TEXT, -- Full email body or meeting transcript
    timestamp TIMESTAMP NOT NULL,
    direction TEXT, -- inbound, outbound, mutual (for meetings)
    sentiment TEXT, -- positive, neutral, negative (from LLM analysis)
    email_thread_id TEXT, -- Gmail thread ID for email drafts
    email_message_id TEXT, -- Gmail message ID
    meeting_id INTEGER, -- FK to meetings table
    metadata TEXT, -- JSON blob for extra data
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
    FOREIGN KEY (meeting_id) REFERENCES meetings(id) ON DELETE SET NULL
);

CREATE INDEX idx_interactions_contact ON interactions(contact_id);
CREATE INDEX idx_interactions_timestamp ON interactions(timestamp DESC);
CREATE INDEX idx_interactions_type ON interactions(type);
CREATE INDEX idx_interactions_email_thread ON interactions(email_thread_id);

-- ============================================================================
-- FOLLOW_UPS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS follow_ups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contact_id INTEGER NOT NULL,
    due_date TIMESTAMP NOT NULL,
    title TEXT NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'pending', -- pending, completed, snoozed, cancelled
    priority INTEGER DEFAULT 50, -- 0-100
    snooze_until TIMESTAMP,
    snooze_count INTEGER DEFAULT 0,
    completed_date TIMESTAMP,
    reminder_sent BOOLEAN DEFAULT 0,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE
);

CREATE INDEX idx_followups_contact ON follow_ups(contact_id);
CREATE INDEX idx_followups_due_date ON follow_ups(due_date);
CREATE INDEX idx_followups_status ON follow_ups(status);

-- ============================================================================
-- CONTACT_CONTEXT TABLE (Timeline + Embeddings)
-- ============================================================================
CREATE TABLE IF NOT EXISTS contact_context (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contact_id INTEGER NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    event_type TEXT NOT NULL, -- email, meeting, note, news, manual
    title TEXT,
    content TEXT NOT NULL,
    embedding BLOB, -- 768-dim vector (3072 bytes: 768 * 4 bytes per float32)
    source_id INTEGER, -- FK to interactions or meetings
    metadata TEXT, -- JSON for extra fields
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE
);

CREATE INDEX idx_context_contact ON contact_context(contact_id);
CREATE INDEX idx_context_timestamp ON contact_context(timestamp DESC);
CREATE INDEX idx_context_type ON contact_context(event_type);

-- ============================================================================
-- CONTACT_SUMMARIES TABLE (LLM-Generated)
-- ============================================================================
CREATE TABLE IF NOT EXISTS contact_summaries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contact_id INTEGER NOT NULL,
    summary_type TEXT DEFAULT 'relationship', -- relationship, recent_activity, key_topics
    summary_text TEXT NOT NULL,
    key_points TEXT, -- JSON array of bullet points
    generated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP, -- Re-generate after this date
    token_count INTEGER, -- Track LLM usage
    
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
    UNIQUE(contact_id, summary_type)
);

CREATE INDEX idx_summaries_contact ON contact_summaries(contact_id);
CREATE INDEX idx_summaries_valid_until ON contact_summaries(valid_until);

-- ============================================================================
-- MEETINGS TABLE (Synced from Meeting Recorder)
-- ============================================================================
CREATE TABLE IF NOT EXISTS meetings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    duration_minutes INTEGER,
    location TEXT,
    meeting_url TEXT, -- Zoom/Meet link
    calendar_event_id TEXT UNIQUE, -- Google Calendar event ID
    transcript TEXT, -- Full meeting transcript
    summary TEXT, -- LLM-generated meeting summary
    recording_url TEXT,
    attendee_count INTEGER DEFAULT 0,
    is_internal BOOLEAN DEFAULT 0, -- All attendees from same company
    status TEXT DEFAULT 'scheduled', -- scheduled, completed, cancelled
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(calendar_event_id)
);

CREATE INDEX idx_meetings_start_time ON meetings(start_time DESC);
CREATE INDEX idx_meetings_status ON meetings(status);

-- ============================================================================
-- MEETING_ATTENDEES TABLE (Many-to-Many)
-- ============================================================================
CREATE TABLE IF NOT EXISTS meeting_attendees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    meeting_id INTEGER NOT NULL,
    contact_id INTEGER, -- NULL if not in contacts yet
    email TEXT NOT NULL,
    name TEXT,
    is_organizer BOOLEAN DEFAULT 0,
    response_status TEXT, -- accepted, declined, tentative, needsAction
    
    FOREIGN KEY (meeting_id) REFERENCES meetings(id) ON DELETE CASCADE,
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE SET NULL,
    UNIQUE(meeting_id, email)
);

CREATE INDEX idx_attendees_meeting ON meeting_attendees(meeting_id);
CREATE INDEX idx_attendees_contact ON meeting_attendees(contact_id);

-- ============================================================================
-- MEETING_ACTION_ITEMS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS meeting_action_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    meeting_id INTEGER NOT NULL,
    task_description TEXT NOT NULL,
    assignee_email TEXT,
    assignee_contact_id INTEGER,
    owner_is_me BOOLEAN DEFAULT 0, -- True if Craig owns this task
    due_date TIMESTAMP,
    priority INTEGER DEFAULT 50,
    status TEXT DEFAULT 'pending', -- pending, in_progress, completed, cancelled
    external_task_link TEXT, -- Link to Todoist/Asana/etc
    completed_date TIMESTAMP,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (meeting_id) REFERENCES meetings(id) ON DELETE CASCADE,
    FOREIGN KEY (assignee_contact_id) REFERENCES contacts(id) ON DELETE SET NULL
);

CREATE INDEX idx_action_items_meeting ON meeting_action_items(meeting_id);
CREATE INDEX idx_action_items_assignee ON meeting_action_items(assignee_contact_id);
CREATE INDEX idx_action_items_status ON meeting_action_items(status);
CREATE INDEX idx_action_items_owner ON meeting_action_items(owner_is_me);

-- ============================================================================
-- COMPANY_NEWS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS company_news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT NOT NULL,
    headline TEXT NOT NULL,
    summary TEXT,
    url TEXT,
    source TEXT, -- e.g., TechCrunch, Bloomberg, company blog
    published_date TIMESTAMP,
    relevance_score REAL DEFAULT 0.5, -- 0-1, how relevant to your relationship
    signal_type TEXT, -- funding, acquisition, product_launch, leadership_change, etc.
    related_contact_ids TEXT, -- JSON array of contact IDs at this company
    is_high_signal BOOLEAN DEFAULT 0,
    notified BOOLEAN DEFAULT 0,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(company, url)
);

CREATE INDEX idx_news_company ON company_news(company);
CREATE INDEX idx_news_published ON company_news(published_date DESC);
CREATE INDEX idx_news_signal ON company_news(is_high_signal);
CREATE INDEX idx_news_notified ON company_news(notified);

-- ============================================================================
-- SKIP_PATTERNS TABLE (Learning System)
-- ============================================================================
CREATE TABLE IF NOT EXISTS skip_patterns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pattern_type TEXT NOT NULL, -- domain, sender, subject_keyword, meeting_size
    pattern_value TEXT NOT NULL,
    action TEXT DEFAULT 'skip', -- skip or allow
    confidence REAL DEFAULT 0.5, -- 0-1, based on user feedback
    source TEXT DEFAULT 'manual', -- manual, learned
    times_matched INTEGER DEFAULT 0,
    times_approved INTEGER DEFAULT 0,
    times_rejected INTEGER DEFAULT 0,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_matched TIMESTAMP,
    
    UNIQUE(pattern_type, pattern_value)
);

CREATE INDEX idx_patterns_type ON skip_patterns(pattern_type);
CREATE INDEX idx_patterns_confidence ON skip_patterns(confidence DESC);

-- ============================================================================
-- CRM_CONFIG TABLE (Settings)
-- ============================================================================
CREATE TABLE IF NOT EXISTS crm_config (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default config
INSERT OR IGNORE INTO crm_config (key, value) VALUES
    ('auto_add_threshold', '50'), -- Number of approve/reject decisions before suggesting auto-add
    ('auto_add_enabled', 'false'),
    ('relationship_decay_days', '90'), -- Days before relationship score starts decaying
    ('internal_domain', 'northstarsynergy.com'), -- Skip these emails
    ('large_meeting_threshold', '10'), -- Skip meetings with >10 people
    ('daily_cron_enabled', 'true'),
    ('daily_cron_time', '08:00'), -- Run at 8 AM
    ('gmail_sync_enabled', 'false'),
    ('calendar_sync_enabled', 'false'),
    ('embeddings_enabled', 'false'), -- Requires embedding model
    ('news_monitoring_enabled', 'false');

-- ============================================================================
-- SYSTEM_LOG TABLE (Track daily cron runs, API calls, etc.)
-- ============================================================================
CREATE TABLE IF NOT EXISTS system_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    event_type TEXT NOT NULL, -- cron_run, email_sync, calendar_sync, error
    message TEXT,
    details TEXT, -- JSON blob
    status TEXT DEFAULT 'success' -- success, warning, error
);

CREATE INDEX idx_log_timestamp ON system_log(timestamp DESC);
CREATE INDEX idx_log_type ON system_log(event_type);
CREATE INDEX idx_log_status ON system_log(status);
