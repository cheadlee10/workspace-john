"""
Personal CRM - Database Layer
Handles all SQLite interactions with WAL mode enabled
"""

import sqlite3
import json
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional, List, Dict, Any, Tuple
import struct

class CRMDB:
    def __init__(self, db_path: str = "crm.db"):
        self.db_path = db_path
        self.conn = None
        self._init_db()
    
    def _init_db(self):
        """Initialize database with schema"""
        schema_path = Path(__file__).parent / "schema.sql"
        
        self.conn = sqlite3.connect(self.db_path, check_same_thread=False)
        self.conn.row_factory = sqlite3.Row  # Return dict-like rows
        
        # Enable WAL mode for better concurrency
        self.conn.execute("PRAGMA journal_mode=WAL")
        self.conn.execute("PRAGMA foreign_keys=ON")
        
        # Check if database is already initialized
        cursor = self.conn.execute(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='contacts'"
        )
        is_initialized = cursor.fetchone() is not None
        
        # Load and execute schema only if not initialized
        if not is_initialized and schema_path.exists():
            with open(schema_path, 'r') as f:
                self.conn.executescript(f.read())
            self.conn.commit()
    
    def close(self):
        """Close database connection"""
        if self.conn:
            self.conn.close()
    
    # ========================================================================
    # CONTACTS
    # ========================================================================
    
    def add_contact(self, email: str, name: str = None, **kwargs) -> int:
        """
        Add new contact or update if exists
        Returns contact_id
        """
        # Extract first_name, last_name from name if provided
        first_name, last_name = None, None
        if name:
            parts = name.strip().split(None, 1)
            first_name = parts[0] if parts else None
            last_name = parts[1] if len(parts) > 1 else None
        
        fields = {
            'email': email,
            'name': name,
            'first_name': kwargs.get('first_name', first_name),
            'last_name': kwargs.get('last_name', last_name),
            'company': kwargs.get('company'),
            'role': kwargs.get('role'),
            'phone': kwargs.get('phone'),
            'linkedin_url': kwargs.get('linkedin_url'),
            'priority': kwargs.get('priority', 50),
            'relationship_type': kwargs.get('relationship_type'),
            'communication_style': kwargs.get('communication_style'),
            'timezone': kwargs.get('timezone'),
            'tags': json.dumps(kwargs.get('tags', [])),
            'notes': kwargs.get('notes'),
            'source': kwargs.get('source', 'manual'),
            'auto_added': kwargs.get('auto_added', 0),
            'last_updated': datetime.utcnow().isoformat()
        }
        
        # Remove None values
        fields = {k: v for k, v in fields.items() if v is not None}
        
        # Try insert, fallback to update
        try:
            cols = ', '.join(fields.keys())
            placeholders = ', '.join(['?' for _ in fields])
            sql = f"INSERT INTO contacts ({cols}) VALUES ({placeholders})"
            cursor = self.conn.execute(sql, list(fields.values()))
            self.conn.commit()
            return cursor.lastrowid
        except sqlite3.IntegrityError:
            # Contact exists, update instead
            set_clause = ', '.join([f"{k} = ?" for k in fields.keys() if k != 'email'])
            sql = f"UPDATE contacts SET {set_clause} WHERE email = ?"
            values = [v for k, v in fields.items() if k != 'email'] + [email]
            self.conn.execute(sql, values)
            self.conn.commit()
            
            # Return existing contact_id
            cursor = self.conn.execute("SELECT id FROM contacts WHERE email = ?", (email,))
            return cursor.fetchone()[0]
    
    def get_contact(self, contact_id: int = None, email: str = None) -> Optional[Dict]:
        """Get contact by ID or email"""
        if contact_id:
            cursor = self.conn.execute("SELECT * FROM contacts WHERE id = ?", (contact_id,))
        elif email:
            cursor = self.conn.execute("SELECT * FROM contacts WHERE email = ?", (email,))
        else:
            return None
        
        row = cursor.fetchone()
        return dict(row) if row else None
    
    def search_contacts(self, query: str, limit: int = 20) -> List[Dict]:
        """
        Search contacts by name, email, or company
        Simple text search (will add vector search later)
        """
        query = f"%{query}%"
        sql = """
            SELECT * FROM contacts 
            WHERE (name LIKE ? OR email LIKE ? OR company LIKE ?)
            AND status = 'active'
            ORDER BY relationship_score DESC, last_interaction_date DESC
            LIMIT ?
        """
        cursor = self.conn.execute(sql, (query, query, query, limit))
        return [dict(row) for row in cursor.fetchall()]
    
    def get_contacts_needing_attention(self, days_threshold: int = 30, limit: int = 10) -> List[Dict]:
        """
        Get contacts who haven't been contacted in N days
        Prioritized by relationship_score
        """
        cutoff = (datetime.utcnow() - timedelta(days=days_threshold)).isoformat()
        sql = """
            SELECT * FROM contacts 
            WHERE status = 'active'
            AND (last_interaction_date IS NULL OR last_interaction_date < ?)
            AND relationship_score > 30
            ORDER BY relationship_score DESC, priority DESC
            LIMIT ?
        """
        cursor = self.conn.execute(sql, (cutoff, limit))
        return [dict(row) for row in cursor.fetchall()]
    
    def update_contact_interaction_date(self, contact_id: int, timestamp: str = None):
        """Update last_interaction_date for a contact"""
        if not timestamp:
            timestamp = datetime.utcnow().isoformat()
        
        sql = "UPDATE contacts SET last_interaction_date = ?, last_updated = ? WHERE id = ?"
        self.conn.execute(sql, (timestamp, timestamp, contact_id))
        self.conn.commit()
    
    def increment_contact_stats(self, contact_id: int, stat_type: str):
        """Increment email_count, meeting_count, or call_count"""
        if stat_type not in ['email_count', 'meeting_count', 'call_count']:
            return
        
        sql = f"UPDATE contacts SET {stat_type} = {stat_type} + 1, last_updated = ? WHERE id = ?"
        self.conn.execute(sql, (datetime.utcnow().isoformat(), contact_id))
        self.conn.commit()
    
    # ========================================================================
    # INTERACTIONS
    # ========================================================================
    
    def add_interaction(self, contact_id: int, interaction_type: str, 
                       timestamp: str, **kwargs) -> int:
        """
        Add interaction (email, meeting, call, note)
        Returns interaction_id
        """
        fields = {
            'contact_id': contact_id,
            'type': interaction_type,
            'timestamp': timestamp,
            'subject': kwargs.get('subject'),
            'snippet': kwargs.get('snippet'),
            'full_content': kwargs.get('full_content'),
            'direction': kwargs.get('direction'),
            'sentiment': kwargs.get('sentiment'),
            'email_thread_id': kwargs.get('email_thread_id'),
            'email_message_id': kwargs.get('email_message_id'),
            'meeting_id': kwargs.get('meeting_id'),
            'metadata': json.dumps(kwargs.get('metadata', {}))
        }
        
        # Remove None values
        fields = {k: v for k, v in fields.items() if v is not None}
        
        cols = ', '.join(fields.keys())
        placeholders = ', '.join(['?' for _ in fields])
        sql = f"INSERT INTO interactions ({cols}) VALUES ({placeholders})"
        
        cursor = self.conn.execute(sql, list(fields.values()))
        self.conn.commit()
        
        # Update contact's last_interaction_date
        self.update_contact_interaction_date(contact_id, timestamp)
        
        # Increment appropriate counter
        if interaction_type.startswith('email'):
            self.increment_contact_stats(contact_id, 'email_count')
        elif interaction_type == 'meeting':
            self.increment_contact_stats(contact_id, 'meeting_count')
        elif interaction_type == 'call':
            self.increment_contact_stats(contact_id, 'call_count')
        
        return cursor.lastrowid
    
    def get_contact_interactions(self, contact_id: int, limit: int = 50) -> List[Dict]:
        """Get recent interactions for a contact"""
        sql = """
            SELECT * FROM interactions 
            WHERE contact_id = ?
            ORDER BY timestamp DESC
            LIMIT ?
        """
        cursor = self.conn.execute(sql, (contact_id, limit))
        return [dict(row) for row in cursor.fetchall()]
    
    # ========================================================================
    # FOLLOW-UPS
    # ========================================================================
    
    def add_follow_up(self, contact_id: int, due_date: str, title: str, **kwargs) -> int:
        """Add a follow-up reminder"""
        fields = {
            'contact_id': contact_id,
            'due_date': due_date,
            'title': title,
            'notes': kwargs.get('notes'),
            'priority': kwargs.get('priority', 50),
            'status': kwargs.get('status', 'pending')
        }
        
        cols = ', '.join(fields.keys())
        placeholders = ', '.join(['?' for _ in fields])
        sql = f"INSERT INTO follow_ups ({cols}) VALUES ({placeholders})"
        
        cursor = self.conn.execute(sql, list(fields.values()))
        self.conn.commit()
        return cursor.lastrowid
    
    def get_due_follow_ups(self, days_ahead: int = 7) -> List[Dict]:
        """Get follow-ups due in the next N days"""
        cutoff = (datetime.utcnow() + timedelta(days=days_ahead)).isoformat()
        sql = """
            SELECT f.*, c.name, c.email, c.company 
            FROM follow_ups f
            JOIN contacts c ON f.contact_id = c.id
            WHERE f.status = 'pending'
            AND f.due_date <= ?
            AND (f.snooze_until IS NULL OR f.snooze_until <= ?)
            ORDER BY f.due_date ASC, f.priority DESC
        """
        now = datetime.utcnow().isoformat()
        cursor = self.conn.execute(sql, (cutoff, now))
        return [dict(row) for row in cursor.fetchall()]
    
    def snooze_follow_up(self, follow_up_id: int, days: int = 7):
        """Snooze a follow-up for N days"""
        snooze_until = (datetime.utcnow() + timedelta(days=days)).isoformat()
        sql = """
            UPDATE follow_ups 
            SET snooze_until = ?, snooze_count = snooze_count + 1, updated_date = ?
            WHERE id = ?
        """
        self.conn.execute(sql, (snooze_until, datetime.utcnow().isoformat(), follow_up_id))
        self.conn.commit()
    
    def complete_follow_up(self, follow_up_id: int):
        """Mark follow-up as completed"""
        now = datetime.utcnow().isoformat()
        sql = """
            UPDATE follow_ups 
            SET status = 'completed', completed_date = ?, updated_date = ?
            WHERE id = ?
        """
        self.conn.execute(sql, (now, now, follow_up_id))
        self.conn.commit()
    
    # ========================================================================
    # CONTEXT & SUMMARIES
    # ========================================================================
    
    def add_context(self, contact_id: int, timestamp: str, event_type: str,
                   content: str, **kwargs) -> int:
        """Add timeline entry for a contact (optionally with embedding)"""
        fields = {
            'contact_id': contact_id,
            'timestamp': timestamp,
            'event_type': event_type,
            'content': content,
            'title': kwargs.get('title'),
            'source_id': kwargs.get('source_id'),
            'metadata': json.dumps(kwargs.get('metadata', {}))
        }
        
        # Handle embedding if provided (768-dim float32 array)
        if 'embedding' in kwargs and kwargs['embedding'] is not None:
            embedding_bytes = struct.pack('f' * len(kwargs['embedding']), *kwargs['embedding'])
            fields['embedding'] = embedding_bytes
        
        cols = ', '.join(fields.keys())
        placeholders = ', '.join(['?' for _ in fields])
        sql = f"INSERT INTO contact_context ({cols}) VALUES ({placeholders})"
        
        cursor = self.conn.execute(sql, list(fields.values()))
        self.conn.commit()
        return cursor.lastrowid
    
    def get_contact_timeline(self, contact_id: int, limit: int = 100) -> List[Dict]:
        """Get full timeline for a contact"""
        sql = """
            SELECT id, timestamp, event_type, title, content, metadata
            FROM contact_context 
            WHERE contact_id = ?
            ORDER BY timestamp DESC
            LIMIT ?
        """
        cursor = self.conn.execute(sql, (contact_id, limit))
        return [dict(row) for row in cursor.fetchall()]
    
    def save_summary(self, contact_id: int, summary_text: str, 
                    summary_type: str = 'relationship', **kwargs):
        """Save or update LLM-generated summary"""
        fields = {
            'contact_id': contact_id,
            'summary_type': summary_type,
            'summary_text': summary_text,
            'key_points': json.dumps(kwargs.get('key_points', [])),
            'token_count': kwargs.get('token_count'),
            'valid_until': kwargs.get('valid_until', 
                (datetime.utcnow() + timedelta(days=30)).isoformat())
        }
        
        # Upsert
        sql = """
            INSERT INTO contact_summaries (contact_id, summary_type, summary_text, key_points, token_count, valid_until)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(contact_id, summary_type) DO UPDATE SET
                summary_text = excluded.summary_text,
                key_points = excluded.key_points,
                token_count = excluded.token_count,
                valid_until = excluded.valid_until,
                generated_date = CURRENT_TIMESTAMP
        """
        
        self.conn.execute(sql, (
            contact_id, summary_type, summary_text,
            fields['key_points'], fields['token_count'], fields['valid_until']
        ))
        self.conn.commit()
    
    def generate_and_save_summary(self, contact_id: int, summary_type: str = 'relationship') -> Optional[Dict]:
        """
        Generate LLM summary and save it
        Uses llm-router via llm_bridge
        """
        try:
            from llm_bridge import generate_contact_summary
            
            contact = self.get_contact(contact_id=contact_id)
            if not contact:
                return None
            
            interactions = self.get_contact_interactions(contact_id, limit=20)
            timeline = self.get_contact_timeline(contact_id, limit=20)
            
            # Call LLM via router
            result = generate_contact_summary(contact, interactions, timeline)
            
            # Save to database
            self.save_summary(
                contact_id=contact_id,
                summary_text=result['summary_text'],
                summary_type=summary_type,
                key_points=result.get('key_points', [])
            )
            
            return result
            
        except Exception as e:
            print(f"Error generating summary: {e}")
            return None
    
    def get_summary(self, contact_id: int, summary_type: str = 'relationship') -> Optional[Dict]:
        """Get summary for a contact"""
        sql = """
            SELECT * FROM contact_summaries 
            WHERE contact_id = ? AND summary_type = ?
            AND (valid_until IS NULL OR valid_until > ?)
        """
        cursor = self.conn.execute(sql, (contact_id, summary_type, datetime.utcnow().isoformat()))
        row = cursor.fetchone()
        return dict(row) if row else None
    
    # ========================================================================
    # SKIP PATTERNS (Learning System)
    # ========================================================================
    
    def add_skip_pattern(self, pattern_type: str, pattern_value: str, action: str = 'skip'):
        """Add a skip pattern"""
        sql = """
            INSERT INTO skip_patterns (pattern_type, pattern_value, action)
            VALUES (?, ?, ?)
            ON CONFLICT(pattern_type, pattern_value) DO NOTHING
        """
        self.conn.execute(sql, (pattern_type, pattern_value, action))
        self.conn.commit()
    
    def should_skip(self, pattern_type: str, pattern_value: str) -> bool:
        """Check if a pattern should be skipped"""
        sql = """
            SELECT action, confidence FROM skip_patterns 
            WHERE pattern_type = ? AND pattern_value = ?
        """
        cursor = self.conn.execute(sql, (pattern_type, pattern_value))
        row = cursor.fetchone()
        
        if row and row['action'] == 'skip' and row['confidence'] > 0.7:
            # Update matched count
            self.conn.execute("""
                UPDATE skip_patterns 
                SET times_matched = times_matched + 1, last_matched = ?
                WHERE pattern_type = ? AND pattern_value = ?
            """, (datetime.utcnow().isoformat(), pattern_type, pattern_value))
            self.conn.commit()
            return True
        
        return False
    
    def record_pattern_feedback(self, pattern_type: str, pattern_value: str, approved: bool):
        """Record user approval/rejection to improve learning"""
        field = 'times_approved' if approved else 'times_rejected'
        
        # Update existing pattern
        sql = f"""
            UPDATE skip_patterns 
            SET {field} = {field} + 1,
                confidence = CAST(times_approved AS REAL) / (times_approved + times_rejected + 1)
            WHERE pattern_type = ? AND pattern_value = ?
        """
        cursor = self.conn.execute(sql, (pattern_type, pattern_value))
        
        # If pattern doesn't exist, create it
        if cursor.rowcount == 0:
            action = 'allow' if approved else 'skip'
            confidence = 1.0 if approved else 0.0
            sql = """
                INSERT INTO skip_patterns (pattern_type, pattern_value, action, confidence, times_approved, times_rejected, source)
                VALUES (?, ?, ?, ?, ?, ?, 'learned')
            """
            self.conn.execute(sql, (
                pattern_type, pattern_value, action, confidence,
                1 if approved else 0, 0 if approved else 1
            ))
        
        self.conn.commit()
    
    def get_decision_count(self) -> int:
        """Get total number of approve/reject decisions made"""
        cursor = self.conn.execute("""
            SELECT SUM(times_approved + times_rejected) as total FROM skip_patterns
        """)
        row = cursor.fetchone()
        return row['total'] if row and row['total'] else 0
    
    def should_enable_auto_add(self) -> bool:
        """Check if enough decisions have been made to suggest auto-add mode"""
        threshold_cursor = self.conn.execute("""
            SELECT value FROM crm_config WHERE key = 'auto_add_threshold'
        """)
        threshold = int(threshold_cursor.fetchone()['value'])
        
        return self.get_decision_count() >= threshold
    
    # ========================================================================
    # CONFIG
    # ========================================================================
    
    def get_config(self, key: str) -> Optional[str]:
        """Get config value"""
        cursor = self.conn.execute("SELECT value FROM crm_config WHERE key = ?", (key,))
        row = cursor.fetchone()
        return row['value'] if row else None
    
    def set_config(self, key: str, value: str):
        """Set config value"""
        sql = """
            INSERT INTO crm_config (key, value) VALUES (?, ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_date = CURRENT_TIMESTAMP
        """
        self.conn.execute(sql, (key, value))
        self.conn.commit()
    
    # ========================================================================
    # STATS
    # ========================================================================
    
    def get_stats(self) -> Dict[str, Any]:
        """Get CRM statistics"""
        stats = {}
        
        # Contact counts
        cursor = self.conn.execute("SELECT COUNT(*) as count FROM contacts WHERE status = 'active'")
        stats['total_contacts'] = cursor.fetchone()['count']
        
        cursor = self.conn.execute("SELECT COUNT(*) as count FROM interactions")
        stats['total_interactions'] = cursor.fetchone()['count']
        
        cursor = self.conn.execute("SELECT COUNT(*) as count FROM follow_ups WHERE status = 'pending'")
        stats['pending_follow_ups'] = cursor.fetchone()['count']
        
        cursor = self.conn.execute("SELECT COUNT(*) as count FROM meetings WHERE status = 'completed'")
        stats['total_meetings'] = cursor.fetchone()['count']
        
        # Top contacts by relationship score
        cursor = self.conn.execute("""
            SELECT name, email, relationship_score FROM contacts 
            WHERE status = 'active'
            ORDER BY relationship_score DESC
            LIMIT 5
        """)
        stats['top_contacts'] = [dict(row) for row in cursor.fetchall()]
        
        return stats
    
    # ========================================================================
    # SYSTEM LOG
    # ========================================================================
    
    def log_event(self, event_type: str, message: str, details: Dict = None, status: str = 'success'):
        """Log system event"""
        sql = """
            INSERT INTO system_log (event_type, message, details, status)
            VALUES (?, ?, ?, ?)
        """
        self.conn.execute(sql, (event_type, message, json.dumps(details or {}), status))
        self.conn.commit()
