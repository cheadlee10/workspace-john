"""
Personal CRM - OpenClaw Integration
Handles CRM queries via Discord/messaging platforms
"""

import sys
import os
from pathlib import Path

# Add CRM to Python path
crm_dir = Path(__file__).parent
sys.path.insert(0, str(crm_dir))

from db import CRMDB
from nlp import NLPInterface
from relationship_scorer import RelationshipScorer
from gmail_scanner import GmailScanner

class CRMHandler:
    """
    OpenClaw integration for CRM
    Handles queries via sessions_send, Discord, or other messaging platforms
    """
    
    def __init__(self, db_path: str = None):
        if not db_path:
            db_path = str(crm_dir / "crm.db")
        
        self.db = CRMDB(db_path)
        self.nlp = NLPInterface(self.db)
        self.scorer = RelationshipScorer(self.db)
        self.scanner = None  # Lazy load Gmail scanner
    
    def handle_query(self, query: str) -> str:
        """
        Handle natural language CRM query
        Returns formatted message for Discord/messaging
        """
        # Special commands
        if query.lower() == 'rescore':
            count = self.scorer.update_all_scores()
            return f"✅ Recalculated relationship scores for {count} contacts"
        
        if query.lower() in ['sync email', 'sync gmail', 'scan email']:
            return self._sync_email()
        
        if query.lower().startswith('nudges'):
            return self._get_nudges()
        
        if query.lower() == 'pending':
            return self._get_pending_contacts()
        
        # Execute natural language query
        result = self.nlp.execute(query)
        
        if result['success']:
            return result['message']
        else:
            return f"❌ {result['message']}"
    
    def _sync_email(self) -> str:
        """Sync recent emails from Gmail"""
        if not self.scanner:
            self.scanner = GmailScanner(self.db)
        
        if not self.scanner.authenticate():
            return "❌ Gmail authentication failed. Run setup first."
        
        stats = self.scanner.scan_recent_emails(days=1, limit=100)
        
        if 'error' in stats:
            return f"❌ Email sync failed: {stats['error']}"
        
        message = f"""📧 **Email Sync Complete**

✅ Contacts added: {stats['contacts_added']}
✅ Interactions logged: {stats['interactions_added']}
⏭️ Skipped: {stats['skipped']} (newsletters, noreply, etc.)
"""
        
        if stats.get('errors', 0) > 0:
            message += f"\n⚠️ Errors: {stats['errors']}"
        
        return message
    
    def _get_nudges(self) -> str:
        """Get relationship nudges"""
        nudges = self.scorer.generate_nudges(days_threshold=30, limit=5)
        
        if not nudges:
            return "✅ All key relationships are up to date!"
        
        message = f"**{len(nudges)} contact(s) need attention:**\n\n"
        
        for nudge in nudges:
            contact = nudge['contact']
            message += f"**{contact['name'] or contact['email']}**"
            if contact.get('company'):
                message += f" ({contact['company']})"
            message += f"\n"
            message += f"  {nudge['reason']}\n"
            message += f"  💡 {nudge['suggested_action']}\n\n"
        
        return message
    
    def _get_pending_contacts(self) -> str:
        """Get contacts pending approval"""
        if not self.scanner:
            self.scanner = GmailScanner(self.db)
        
        pending = self.scanner.get_pending_contacts(limit=20)
        
        if not pending:
            return "✅ No contacts pending approval"
        
        message = f"**{len(pending)} contact(s) pending approval:**\n\n"
        
        for contact in pending[:10]:
            message += f"- {contact['name'] or contact['email']}"
            if contact.get('company'):
                message += f" ({contact['company']})"
            message += f" - Added: {contact['added_date'][:10]}\n"
        
        if len(pending) > 10:
            message += f"\n...and {len(pending) - 10} more"
        
        return message
    
    def daily_sync(self) -> str:
        """
        Run daily CRM sync
        Returns summary message for posting to updates channel
        """
        # 1. Sync email
        if not self.scanner:
            self.scanner = GmailScanner(self.db)
        
        email_stats = {}
        if self.scanner.authenticate():
            email_stats = self.scanner.scan_recent_emails(days=1, limit=200)
        
        # 2. Update relationship scores
        scores_updated = self.scorer.update_all_scores()
        
        # 3. Generate nudges
        nudges = self.scorer.generate_nudges(days_threshold=30, limit=5)
        
        # 4. Get stats
        stats = self.db.get_stats()
        
        # 5. Build report
        message = f"""📊 **Daily CRM Update - {datetime.now().strftime('%Y-%m-%d')}**

**Email Sync:**
- Contacts added: {email_stats.get('contacts_added', 0)}
- Interactions: {email_stats.get('interactions_added', 0)}
- Skipped: {email_stats.get('skipped', 0)}

**Database:**
- Total contacts: {stats['total_contacts']}
- Total interactions: {stats['total_interactions']}
- Pending follow-ups: {stats['pending_follow_ups']}

**Relationship Scores:**
- Updated: {scores_updated} contacts

**Nudges ({len(nudges)}):**
"""
        
        if nudges:
            for nudge in nudges:
                contact = nudge['contact']
                message += f"\n- **{contact['name'] or contact['email']}**: {nudge['reason']}"
        else:
            message += "\n✅ All key relationships up to date!"
        
        # Log the sync
        self.db.log_event('daily_sync', 'Daily CRM sync completed', {
            'email_stats': email_stats,
            'scores_updated': scores_updated,
            'nudges_count': len(nudges)
        }, 'success')
        
        return message


# ============================================================================
# OpenClaw Tool Integration
# ============================================================================

def crm_query(query: str, db_path: str = None) -> str:
    """
    Main entry point for OpenClaw tool calls
    
    Usage in OpenClaw:
    ```
    result = exec("python crm/openclaw_integration.py 'who needs attention?'")
    ```
    """
    handler = CRMHandler(db_path)
    return handler.handle_query(query)


def crm_daily_sync(db_path: str = None) -> str:
    """
    Daily sync for cron job
    
    Usage in OpenClaw cron:
    ```
    result = exec("python crm/openclaw_integration.py --daily-sync")
    ```
    """
    from datetime import datetime
    handler = CRMHandler(db_path)
    return handler.daily_sync()


# ============================================================================
# CLI Entry Point
# ============================================================================

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python openclaw_integration.py '<query>'")
        print("   or: python openclaw_integration.py --daily-sync")
        sys.exit(1)
    
    if sys.argv[1] == '--daily-sync':
        result = crm_daily_sync()
        print(result)
    else:
        query = ' '.join(sys.argv[1:])
        result = crm_query(query)
        print(result)
