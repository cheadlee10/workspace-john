"""
Personal CRM - Natural Language Interface
Handles intent detection and query routing
"""

import re
from typing import Dict, Any, Optional, List
from datetime import datetime, timedelta
from db import CRMDB

class NLPInterface:
    """
    Natural language query handler for CRM
    
    Supported queries:
    - "Tell me about [name]"
    - "Who at [company]?"
    - "Follow up with [name] in 2 weeks"
    - "Who needs attention?"
    - "Stats"
    - "[name]" (simple lookup)
    """
    
    def __init__(self, db: CRMDB):
        self.db = db
        
        # Intent patterns (order matters - more specific first)
        self.patterns = [
            # Follow-up creation
            (r'follow\s+up\s+with\s+(.+?)\s+in\s+(\d+)\s+(day|days|week|weeks|month|months)', 'create_followup'),
            (r'remind\s+me\s+about\s+(.+?)\s+in\s+(\d+)\s+(day|days|week|weeks|month|months)', 'create_followup'),
            (r'schedule\s+(.+?)\s+in\s+(\d+)\s+(day|days|week|weeks|month|months)', 'create_followup'),
            
            # Company lookup
            (r'who\s+at\s+(.+)', 'company_lookup'),
            (r'contacts\s+at\s+(.+)', 'company_lookup'),
            (r'people\s+at\s+(.+)', 'company_lookup'),
            
            # Relationship info
            (r'tell\s+me\s+about\s+(.+)', 'contact_info'),
            (r'show\s+me\s+(.+)', 'contact_info'),
            (r'info\s+on\s+(.+)', 'contact_info'),
            (r'what.+know\s+about\s+(.+)', 'contact_info'),
            
            # Needs attention
            (r'who\s+needs\s+attention', 'needs_attention'),
            (r'who\s+to\s+follow\s+up', 'needs_attention'),
            (r'cold\s+contacts', 'needs_attention'),
            (r'neglected', 'needs_attention'),
            
            # Stats
            (r'stats', 'stats'),
            (r'statistics', 'stats'),
            (r'summary', 'stats'),
            (r'overview', 'stats'),
            
            # Follow-up management
            (r'follow\s+ups', 'list_followups'),
            (r'reminders', 'list_followups'),
            (r'upcoming', 'list_followups'),
            
            # Search (catch-all for simple names/emails)
            (r'(.+)', 'search'),
        ]
    
    def parse(self, query: str) -> Dict[str, Any]:
        """
        Parse natural language query and extract intent + params
        
        Returns:
            {
                'intent': str,
                'params': dict,
                'raw_query': str
            }
        """
        query = query.strip().lower()
        
        for pattern, intent in self.patterns:
            match = re.match(pattern, query, re.IGNORECASE)
            if match:
                return {
                    'intent': intent,
                    'params': self._extract_params(intent, match),
                    'raw_query': query
                }
        
        # Fallback to search
        return {
            'intent': 'search',
            'params': {'query': query},
            'raw_query': query
        }
    
    def _extract_params(self, intent: str, match) -> Dict[str, Any]:
        """Extract parameters based on intent"""
        if intent == 'create_followup':
            name_or_email = match.group(1).strip()
            amount = int(match.group(2))
            unit = match.group(3)
            
            # Convert to days
            if 'week' in unit:
                days = amount * 7
            elif 'month' in unit:
                days = amount * 30
            else:
                days = amount
            
            return {
                'name_or_email': name_or_email,
                'days': days,
                'due_date': (datetime.utcnow() + timedelta(days=days)).isoformat()
            }
        
        elif intent == 'company_lookup':
            company = match.group(1).strip()
            return {'company': company}
        
        elif intent == 'contact_info':
            name_or_email = match.group(1).strip()
            return {'name_or_email': name_or_email}
        
        elif intent in ['needs_attention', 'stats', 'list_followups']:
            return {}
        
        elif intent == 'search':
            return {'query': match.group(1).strip()}
        
        return {}
    
    def execute(self, query: str) -> Dict[str, Any]:
        """
        Execute natural language query and return results
        
        Returns:
            {
                'intent': str,
                'success': bool,
                'message': str,
                'data': Any
            }
        """
        parsed = self.parse(query)
        intent = parsed['intent']
        params = parsed['params']
        
        try:
            if intent == 'contact_info':
                return self._handle_contact_info(params)
            
            elif intent == 'company_lookup':
                return self._handle_company_lookup(params)
            
            elif intent == 'create_followup':
                return self._handle_create_followup(params)
            
            elif intent == 'needs_attention':
                return self._handle_needs_attention(params)
            
            elif intent == 'stats':
                return self._handle_stats(params)
            
            elif intent == 'list_followups':
                return self._handle_list_followups(params)
            
            elif intent == 'search':
                return self._handle_search(params)
            
            else:
                return {
                    'intent': intent,
                    'success': False,
                    'message': f"Unknown intent: {intent}",
                    'data': None
                }
        
        except Exception as e:
            return {
                'intent': intent,
                'success': False,
                'message': f"Error: {str(e)}",
                'data': None
            }
    
    def _handle_contact_info(self, params: Dict) -> Dict:
        """Handle 'Tell me about [name]' queries"""
        name_or_email = params['name_or_email']
        
        # Try exact email match first
        if '@' in name_or_email:
            contact = self.db.get_contact(email=name_or_email)
        else:
            # Search by name
            results = self.db.search_contacts(name_or_email, limit=1)
            contact = results[0] if results else None
        
        if not contact:
            return {
                'intent': 'contact_info',
                'success': False,
                'message': f"No contact found for: {name_or_email}",
                'data': None
            }
        
        # Get full relationship profile
        contact_id = contact['id']
        interactions = self.db.get_contact_interactions(contact_id, limit=10)
        timeline = self.db.get_contact_timeline(contact_id, limit=20)
        summary = self.db.get_summary(contact_id, 'relationship')
        
        # Build message
        message = f"**{contact['name'] or contact['email']}**\n"
        
        if contact['company']:
            message += f"Company: {contact['company']}\n"
        
        if contact['role']:
            message += f"Role: {contact['role']}\n"
        
        message += f"\nRelationship Score: {contact['relationship_score']:.1f}/100\n"
        message += f"Last Contact: {self._format_date(contact['last_interaction_date'])}\n"
        message += f"Total Interactions: {contact['email_count']} emails, {contact['meeting_count']} meetings, {contact['call_count']} calls\n"
        
        if summary:
            message += f"\n**Summary:**\n{summary['summary_text']}\n"
        
        if interactions:
            message += f"\n**Recent Activity:**\n"
            for interaction in interactions[:5]:
                message += f"- {self._format_date(interaction['timestamp'])}: {interaction['type']} - {interaction['subject'] or '(no subject)'}\n"
        
        return {
            'intent': 'contact_info',
            'success': True,
            'message': message,
            'data': {
                'contact': contact,
                'interactions': interactions,
                'timeline': timeline,
                'summary': summary
            }
        }
    
    def _handle_company_lookup(self, params: Dict) -> Dict:
        """Handle 'Who at [company]?' queries"""
        company = params['company']
        
        sql = """
            SELECT * FROM contacts 
            WHERE company LIKE ? AND status = 'active'
            ORDER BY relationship_score DESC, last_interaction_date DESC
        """
        cursor = self.db.conn.execute(sql, (f"%{company}%",))
        contacts = [dict(row) for row in cursor.fetchall()]
        
        if not contacts:
            return {
                'intent': 'company_lookup',
                'success': False,
                'message': f"No contacts found at: {company}",
                'data': None
            }
        
        message = f"**{len(contacts)} contact(s) at {company}:**\n\n"
        for contact in contacts:
            message += f"- {contact['name'] or contact['email']}"
            if contact['role']:
                message += f" ({contact['role']})"
            message += f" - Score: {contact['relationship_score']:.1f}"
            message += f" - Last contact: {self._format_date(contact['last_interaction_date'])}\n"
        
        return {
            'intent': 'company_lookup',
            'success': True,
            'message': message,
            'data': contacts
        }
    
    def _handle_create_followup(self, params: Dict) -> Dict:
        """Handle 'Follow up with [name] in X days' queries"""
        name_or_email = params['name_or_email']
        due_date = params['due_date']
        days = params['days']
        
        # Find contact
        if '@' in name_or_email:
            contact = self.db.get_contact(email=name_or_email)
        else:
            results = self.db.search_contacts(name_or_email, limit=1)
            contact = results[0] if results else None
        
        if not contact:
            return {
                'intent': 'create_followup',
                'success': False,
                'message': f"No contact found for: {name_or_email}",
                'data': None
            }
        
        # Create follow-up
        title = f"Follow up with {contact['name'] or contact['email']}"
        follow_up_id = self.db.add_follow_up(
            contact_id=contact['id'],
            due_date=due_date,
            title=title,
            priority=70
        )
        
        message = f"✅ Follow-up scheduled with **{contact['name'] or contact['email']}** in {days} days ({self._format_date(due_date)})"
        
        return {
            'intent': 'create_followup',
            'success': True,
            'message': message,
            'data': {
                'follow_up_id': follow_up_id,
                'contact': contact,
                'due_date': due_date
            }
        }
    
    def _handle_needs_attention(self, params: Dict) -> Dict:
        """Handle 'Who needs attention?' queries"""
        contacts = self.db.get_contacts_needing_attention(days_threshold=30, limit=10)
        
        if not contacts:
            return {
                'intent': 'needs_attention',
                'success': True,
                'message': "✅ All key relationships are up to date!",
                'data': []
            }
        
        message = f"**{len(contacts)} contact(s) need attention:**\n\n"
        for contact in contacts:
            days_ago = self._days_since(contact['last_interaction_date'])
            message += f"- **{contact['name'] or contact['email']}**"
            if contact['company']:
                message += f" ({contact['company']})"
            message += f"\n  Score: {contact['relationship_score']:.1f} | Last contact: {days_ago}\n"
        
        return {
            'intent': 'needs_attention',
            'success': True,
            'message': message,
            'data': contacts
        }
    
    def _handle_stats(self, params: Dict) -> Dict:
        """Handle 'Stats' queries"""
        stats = self.db.get_stats()
        
        message = "**CRM Statistics:**\n\n"
        message += f"Total Contacts: {stats['total_contacts']}\n"
        message += f"Total Interactions: {stats['total_interactions']}\n"
        message += f"Pending Follow-ups: {stats['pending_follow_ups']}\n"
        message += f"Meetings Completed: {stats['total_meetings']}\n"
        
        if stats['top_contacts']:
            message += "\n**Top 5 Relationships:**\n"
            for contact in stats['top_contacts']:
                message += f"- {contact['name'] or contact['email']}: {contact['relationship_score']:.1f}\n"
        
        return {
            'intent': 'stats',
            'success': True,
            'message': message,
            'data': stats
        }
    
    def _handle_list_followups(self, params: Dict) -> Dict:
        """Handle 'Follow ups' / 'Reminders' queries"""
        follow_ups = self.db.get_due_follow_ups(days_ahead=30)
        
        if not follow_ups:
            return {
                'intent': 'list_followups',
                'success': True,
                'message': "No follow-ups scheduled in the next 30 days.",
                'data': []
            }
        
        message = f"**{len(follow_ups)} upcoming follow-up(s):**\n\n"
        for fu in follow_ups:
            message += f"- **{fu['name'] or fu['email']}**"
            if fu['company']:
                message += f" ({fu['company']})"
            message += f"\n  Due: {self._format_date(fu['due_date'])} - {fu['title']}\n"
        
        return {
            'intent': 'list_followups',
            'success': True,
            'message': message,
            'data': follow_ups
        }
    
    def _handle_search(self, params: Dict) -> Dict:
        """Handle simple search queries"""
        query = params['query']
        results = self.db.search_contacts(query, limit=10)
        
        if not results:
            return {
                'intent': 'search',
                'success': False,
                'message': f"No contacts found for: {query}",
                'data': None
            }
        
        if len(results) == 1:
            # Single result - show full info
            return self._handle_contact_info({'name_or_email': results[0]['email']})
        
        # Multiple results - show list
        message = f"**{len(results)} contact(s) found:**\n\n"
        for contact in results:
            message += f"- **{contact['name'] or contact['email']}**"
            if contact['company']:
                message += f" ({contact['company']})"
            message += f" - Score: {contact['relationship_score']:.1f}\n"
        
        return {
            'intent': 'search',
            'success': True,
            'message': message,
            'data': results
        }
    
    # ========================================================================
    # HELPERS
    # ========================================================================
    
    def _format_date(self, iso_date: Optional[str]) -> str:
        """Format ISO date as human-readable string"""
        if not iso_date:
            return "Never"
        
        try:
            dt = datetime.fromisoformat(iso_date.replace('Z', '+00:00'))
            now = datetime.utcnow()
            delta = now - dt
            
            if delta.days == 0:
                return "Today"
            elif delta.days == 1:
                return "Yesterday"
            elif delta.days < 7:
                return f"{delta.days} days ago"
            elif delta.days < 30:
                weeks = delta.days // 7
                return f"{weeks} week{'s' if weeks > 1 else ''} ago"
            elif delta.days < 365:
                months = delta.days // 30
                return f"{months} month{'s' if months > 1 else ''} ago"
            else:
                return dt.strftime("%Y-%m-%d")
        except:
            return iso_date
    
    def _days_since(self, iso_date: Optional[str]) -> str:
        """Get days since date"""
        if not iso_date:
            return "Never"
        
        try:
            dt = datetime.fromisoformat(iso_date.replace('Z', '+00:00'))
            delta = datetime.utcnow() - dt
            
            if delta.days == 0:
                return "Today"
            elif delta.days == 1:
                return "Yesterday"
            else:
                return f"{delta.days} days ago"
        except:
            return iso_date
