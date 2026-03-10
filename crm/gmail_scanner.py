"""
Personal CRM - Gmail Scanner
Scans email for contacts and interactions
Requires Gmail API credentials
"""

import os
import base64
import json
from typing import List, Dict, Optional
from datetime import datetime, timedelta
from email.utils import parseaddr
import re

from db import CRMDB

# Gmail API will be imported when credentials are available
try:
    from google.oauth2.credentials import Credentials
    from google.auth.transport.requests import Request
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build
    GMAIL_AVAILABLE = True
except ImportError:
    GMAIL_AVAILABLE = False

class GmailScanner:
    """
    Scans Gmail for:
    1. New contacts (email senders/recipients)
    2. Interactions (emails sent/received)
    3. Thread context for contact timeline
    
    Filters out:
    - Newsletters (List-Unsubscribe header)
    - Noreply senders
    - Internal company domains
    - Large CCs (>10 people)
    """
    
    SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
    
    def __init__(self, db: CRMDB, credentials_path: str = 'credentials.json'):
        self.db = db
        self.credentials_path = credentials_path
        self.token_path = 'token.json'
        self.service = None
        
        # Load internal domain from config
        self.internal_domain = self.db.get_config('internal_domain') or 'northstarsynergy.com'
        self.large_meeting_threshold = int(self.db.get_config('large_meeting_threshold') or 10)
    
    def authenticate(self) -> bool:
        """Authenticate with Gmail API"""
        if not GMAIL_AVAILABLE:
            print("Gmail API libraries not installed. Run: pip install google-auth-oauthlib google-api-python-client")
            return False
        
        creds = None
        
        # Load existing token
        if os.path.exists(self.token_path):
            creds = Credentials.from_authorized_user_file(self.token_path, self.SCOPES)
        
        # Refresh or create new token
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                if not os.path.exists(self.credentials_path):
                    print(f"Gmail credentials not found at: {self.credentials_path}")
                    print("Follow setup guide to enable Gmail API")
                    return False
                
                flow = InstalledAppFlow.from_client_secrets_file(
                    self.credentials_path, self.SCOPES)
                creds = flow.run_local_server(port=0)
            
            # Save token
            with open(self.token_path, 'w') as token:
                token.write(creds.to_json())
        
        self.service = build('gmail', 'v1', credentials=creds)
        return True
    
    def scan_recent_emails(self, days: int = 1, limit: int = 100) -> Dict[str, int]:
        """
        Scan emails from last N days
        Returns stats: {'contacts_added': X, 'interactions_added': Y, 'skipped': Z}
        """
        if not self.service:
            if not self.authenticate():
                return {'error': 'Authentication failed'}
        
        # Calculate date filter
        after_date = (datetime.utcnow() - timedelta(days=days)).strftime('%Y/%m/%d')
        query = f'after:{after_date}'
        
        stats = {
            'contacts_added': 0,
            'interactions_added': 0,
            'skipped': 0,
            'errors': 0
        }
        
        try:
            # Get message IDs
            results = self.service.users().messages().list(
                userId='me',
                q=query,
                maxResults=limit
            ).execute()
            
            messages = results.get('messages', [])
            
            if not messages:
                return stats
            
            # Process each message
            for msg_ref in messages:
                try:
                    msg = self.service.users().messages().get(
                        userId='me',
                        id=msg_ref['id'],
                        format='full'
                    ).execute()
                    
                    processed = self._process_email(msg)
                    
                    if processed['skipped']:
                        stats['skipped'] += 1
                    else:
                        if processed.get('contact_added'):
                            stats['contacts_added'] += 1
                        if processed.get('interaction_added'):
                            stats['interactions_added'] += 1
                
                except Exception as e:
                    stats['errors'] += 1
                    print(f"Error processing message {msg_ref['id']}: {e}")
            
            # Log scan event
            self.db.log_event(
                'email_sync',
                f"Scanned {len(messages)} emails from last {days} day(s)",
                stats,
                'success'
            )
            
            return stats
        
        except Exception as e:
            self.db.log_event('email_sync', f"Error: {str(e)}", stats, 'error')
            stats['error'] = str(e)
            return stats
    
    def _process_email(self, msg: Dict) -> Dict:
        """
        Process a single email message
        Returns: {'skipped': bool, 'contact_added': bool, 'interaction_added': bool}
        """
        headers = {h['name']: h['value'] for h in msg['payload']['headers']}
        
        # Extract key fields
        from_email = self._extract_email(headers.get('From', ''))
        to_emails = self._extract_emails(headers.get('To', ''))
        cc_emails = self._extract_emails(headers.get('Cc', ''))
        subject = headers.get('Subject', '')
        date_str = headers.get('Date', '')
        message_id = headers.get('Message-ID', '')
        thread_id = msg.get('threadId', '')
        
        # Determine if this is sent or received
        my_email = self._get_my_email()
        is_sent = from_email == my_email
        direction = 'outbound' if is_sent else 'inbound'
        
        # Get the other party (who we interacted with)
        other_emails = to_emails if is_sent else [from_email]
        
        # Filter checks
        skip_reasons = self._should_skip_email(
            from_email, to_emails, cc_emails, headers, subject
        )
        
        if skip_reasons:
            return {'skipped': True, 'reasons': skip_reasons}
        
        # Parse timestamp
        timestamp = self._parse_date(date_str)
        
        # Extract email body
        body = self._extract_body(msg['payload'])
        snippet = msg.get('snippet', '')[:200]
        
        # Process each contact in the email
        contact_added = False
        interaction_added = False
        
        for email in other_emails:
            if not email or '@' not in email:
                continue
            
            # Check if we should skip this specific contact
            if self.db.should_skip('domain', email.split('@')[1]):
                continue
            
            # Add or get contact
            name = self._extract_name(headers.get('From' if not is_sent else 'To', ''))
            
            # Check if this is a new contact or needs approval
            existing = self.db.get_contact(email=email)
            
            if not existing:
                # New contact - check if auto-add is enabled
                auto_add_enabled = self.db.get_config('auto_add_enabled') == 'true'
                
                if not auto_add_enabled:
                    # Requires manual approval
                    # For now, auto-add and mark for review
                    contact_id = self.db.add_contact(
                        email=email,
                        name=name,
                        source='email',
                        auto_added=1,
                        user_approved=0
                    )
                    contact_added = True
                else:
                    contact_id = self.db.add_contact(
                        email=email,
                        name=name,
                        source='email',
                        auto_added=1
                    )
                    contact_added = True
            else:
                contact_id = existing['id']
            
            # Add interaction
            interaction_type = 'email_sent' if is_sent else 'email_received'
            
            self.db.add_interaction(
                contact_id=contact_id,
                interaction_type=interaction_type,
                timestamp=timestamp,
                subject=subject,
                snippet=snippet,
                full_content=body,
                direction=direction,
                email_thread_id=thread_id,
                email_message_id=message_id
            )
            interaction_added = True
            
            # Add to contact context timeline
            self.db.add_context(
                contact_id=contact_id,
                timestamp=timestamp,
                event_type='email',
                content=f"{subject}\n\n{snippet}",
                title=subject,
                source_id=None,  # Could link to interaction ID
                metadata={'thread_id': thread_id, 'message_id': message_id}
            )
        
        return {
            'skipped': False,
            'contact_added': contact_added,
            'interaction_added': interaction_added
        }
    
    def _should_skip_email(self, from_email: str, to_emails: List[str], 
                          cc_emails: List[str], headers: Dict, subject: str) -> List[str]:
        """
        Determine if email should be skipped
        Returns list of skip reasons (empty list = don't skip)
        """
        reasons = []
        
        # Newsletter detection
        if 'List-Unsubscribe' in headers:
            reasons.append('newsletter')
        
        # Noreply senders
        if 'noreply' in from_email.lower() or 'no-reply' in from_email.lower():
            reasons.append('noreply')
        
        # Internal domain
        if self.internal_domain and self.internal_domain in from_email:
            reasons.append('internal_domain')
        
        # Large CC lists (>threshold people)
        total_recipients = len(to_emails) + len(cc_emails)
        if total_recipients > self.large_meeting_threshold:
            reasons.append(f'large_cc_{total_recipients}')
        
        # Automated emails (common patterns)
        automated_keywords = [
            'automated', 'do not reply', 'notification', 'alert',
            'digest', 'summary', 'report'
        ]
        subject_lower = subject.lower()
        if any(kw in subject_lower for kw in automated_keywords):
            reasons.append('automated')
        
        # Check learned skip patterns
        domain = from_email.split('@')[1] if '@' in from_email else ''
        if domain and self.db.should_skip('domain', domain):
            reasons.append('learned_skip')
        
        return reasons
    
    def _get_my_email(self) -> str:
        """Get user's email address from Gmail API"""
        try:
            profile = self.service.users().getProfile(userId='me').execute()
            return profile.get('emailAddress', '')
        except:
            return ''
    
    def _extract_email(self, email_str: str) -> str:
        """Extract email from 'Name <email@domain.com>' format"""
        if not email_str:
            return ''
        
        _, email = parseaddr(email_str)
        return email.lower().strip()
    
    def _extract_emails(self, email_str: str) -> List[str]:
        """Extract multiple emails from comma-separated string"""
        if not email_str:
            return []
        
        emails = []
        for part in email_str.split(','):
            email = self._extract_email(part)
            if email:
                emails.append(email)
        
        return emails
    
    def _extract_name(self, email_str: str) -> str:
        """Extract name from 'Name <email@domain.com>' format"""
        if not email_str:
            return ''
        
        name, _ = parseaddr(email_str)
        return name.strip()
    
    def _parse_date(self, date_str: str) -> str:
        """Parse email date to ISO format"""
        from email.utils import parsedate_to_datetime
        
        try:
            dt = parsedate_to_datetime(date_str)
            return dt.isoformat()
        except:
            return datetime.utcnow().isoformat()
    
    def _extract_body(self, payload: Dict) -> str:
        """Extract email body from payload"""
        if 'body' in payload and 'data' in payload['body']:
            return self._decode_base64(payload['body']['data'])
        
        if 'parts' in payload:
            for part in payload['parts']:
                if part.get('mimeType') == 'text/plain':
                    if 'data' in part['body']:
                        return self._decode_base64(part['body']['data'])
                
                # Recursive search in nested parts
                if 'parts' in part:
                    body = self._extract_body(part)
                    if body:
                        return body
        
        return ''
    
    def _decode_base64(self, data: str) -> str:
        """Decode base64 email content"""
        try:
            return base64.urlsafe_b64decode(data).decode('utf-8', errors='ignore')
        except:
            return ''
    
    def get_pending_contacts(self, limit: int = 50) -> List[Dict]:
        """Get contacts that were auto-added but not yet approved/rejected"""
        sql = """
            SELECT * FROM contacts 
            WHERE auto_added = 1 AND user_approved = 0 AND user_rejected = 0
            ORDER BY added_date DESC
            LIMIT ?
        """
        cursor = self.db.conn.execute(sql, (limit,))
        return [dict(row) for row in cursor.fetchall()]
    
    def approve_contact(self, contact_id: int):
        """Approve a contact (used for learning system)"""
        contact = self.db.get_contact(contact_id=contact_id)
        if not contact:
            return
        
        # Mark as approved
        self.db.conn.execute("""
            UPDATE contacts SET user_approved = 1 WHERE id = ?
        """, (contact_id,))
        self.db.conn.commit()
        
        # Record feedback for domain pattern
        domain = contact['email'].split('@')[1]
        self.db.record_pattern_feedback('domain', domain, approved=True)
    
    def reject_contact(self, contact_id: int):
        """Reject a contact (used for learning system)"""
        contact = self.db.get_contact(contact_id=contact_id)
        if not contact:
            return
        
        # Mark as rejected
        self.db.conn.execute("""
            UPDATE contacts SET user_rejected = 1, status = 'archived' WHERE id = ?
        """, (contact_id,))
        self.db.conn.commit()
        
        # Record feedback for domain pattern
        domain = contact['email'].split('@')[1]
        self.db.record_pattern_feedback('domain', domain, approved=False)
