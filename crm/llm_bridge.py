"""
CRM LLM Bridge
Python wrapper for Node.js LLM integration (routes through llm-router)
"""

import subprocess
import json
from pathlib import Path
from typing import Dict, List, Optional, Any

class LLMBridge:
    """
    Bridge between Python CRM code and Node.js LLM router
    All LLM calls go through C:/Users/chead/llm-router/shared/llm-router.js
    """
    
    def __init__(self):
        self.llm_script = Path(__file__).parent / 'llm_integration.js'
        
        if not self.llm_script.exists():
            raise FileNotFoundError(f"LLM integration script not found: {self.llm_script}")
    
    def _call_node(self, command: str, data: Dict) -> Any:
        """Execute Node.js LLM command and return result"""
        try:
            result = subprocess.run(
                ['node', str(self.llm_script), command, json.dumps(data)],
                capture_output=True,
                text=True,
                timeout=60
            )
            
            if result.returncode != 0:
                raise Exception(f"LLM call failed: {result.stderr}")
            
            # Clean output: remove anthropic-agent-sdk debug lines
            output = result.stdout.strip()
            
            # Remove debug prefix if present
            if output.startswith('[anthropic-agent-sdk]'):
                # Skip first line
                lines = output.split('\n', 1)
                output = lines[1] if len(lines) > 1 else lines[0]
            
            return json.loads(output.strip())
        
        except subprocess.TimeoutExpired:
            raise Exception("LLM call timed out (60s)")
        except json.JSONDecodeError as e:
            raise Exception(f"Invalid JSON response from LLM: {result.stdout}")
    
    def generate_contact_summary(self, contact: Dict, interactions: List[Dict], 
                                timeline: List[Dict]) -> Dict[str, Any]:
        """
        Generate relationship summary for a contact
        
        Args:
            contact: Contact dict from database
            interactions: Recent interactions list
            timeline: Timeline entries list
        
        Returns:
            {
                'summary_text': str,
                'key_points': List[str]
            }
        """
        data = {
            'name': contact.get('name'),
            'email': contact.get('email'),
            'company': contact.get('company'),
            'interactions': [
                {
                    'timestamp': i.get('timestamp'),
                    'type': i.get('type'),
                    'subject': i.get('subject'),
                    'snippet': i.get('snippet')
                }
                for i in interactions
            ],
            'timeline': [
                {
                    'timestamp': t.get('timestamp'),
                    'title': t.get('title'),
                    'content': t.get('content')
                }
                for t in timeline
            ]
        }
        
        return self._call_node('summarize', data)
    
    def generate_email_draft(self, contact: Dict, relationship_summary: Dict,
                           recent_emails: List[Dict], prompt: str) -> Dict[str, str]:
        """
        Generate email draft with CRM context
        
        Args:
            contact: Contact dict from database
            relationship_summary: Summary from generate_contact_summary()
            recent_emails: Recent email interactions
            prompt: User's instruction (e.g., "Follow up on partnership discussion")
        
        Returns:
            {
                'subject': str,
                'body': str
            }
        """
        data = {
            'contact_email': contact.get('email'),
            'contact_name': contact.get('name'),
            'relationship_summary': relationship_summary,
            'recent_emails': [
                {
                    'direction': e.get('direction'),
                    'subject': e.get('subject'),
                    'snippet': e.get('snippet')
                }
                for e in recent_emails
            ],
            'prompt': prompt
        }
        
        return self._call_node('draft_email', data)
    
    def analyze_sentiment(self, content: str) -> str:
        """
        Analyze sentiment of email/message
        
        Args:
            content: Email body or message text
        
        Returns:
            'positive' | 'neutral' | 'negative'
        """
        data = {'content': content}
        return self._call_node('sentiment', data)
    
    def extract_action_items(self, meeting: Dict) -> List[Dict]:
        """
        Extract action items from meeting transcript
        
        Args:
            meeting: Meeting dict with title, transcript, attendees
        
        Returns:
            List of action items:
            [
                {
                    'task': str,
                    'assignee_email': str or None,
                    'owner_is_me': bool,
                    'due_date': str or None,
                    'priority': int
                }
            ]
        """
        data = {
            'title': meeting.get('title'),
            'transcript': meeting.get('transcript'),
            'attendees': meeting.get('attendees', [])
        }
        
        return self._call_node('action_items', data)
    
    def generate_nudge(self, contact: Dict, days_since: int, 
                      relationship_type: str = 'contact') -> str:
        """
        Generate personalized nudge for re-engaging contact
        
        Args:
            contact: Contact dict from database
            days_since: Days since last interaction
            relationship_type: client, partner, investor, contact
        
        Returns:
            Nudge message string
        """
        data = {
            'contact': {
                'name': contact.get('name'),
                'company': contact.get('company')
            },
            'days_since': days_since,
            'relationship_type': relationship_type
        }
        
        return self._call_node('nudge', data)


# Singleton instance
_llm_bridge = None

def get_llm_bridge() -> LLMBridge:
    """Get singleton LLM bridge instance"""
    global _llm_bridge
    if _llm_bridge is None:
        _llm_bridge = LLMBridge()
    return _llm_bridge


# Convenience functions
def generate_contact_summary(contact, interactions, timeline):
    """Generate contact summary (uses llm-router)"""
    return get_llm_bridge().generate_contact_summary(contact, interactions, timeline)

def generate_email_draft(contact, relationship_summary, recent_emails, prompt):
    """Generate email draft (uses llm-router)"""
    return get_llm_bridge().generate_email_draft(
        contact, relationship_summary, recent_emails, prompt
    )

def analyze_sentiment(content):
    """Analyze sentiment (uses llm-router)"""
    return get_llm_bridge().analyze_sentiment(content)

def extract_action_items(meeting):
    """Extract action items from meeting (uses llm-router)"""
    return get_llm_bridge().extract_action_items(meeting)

def generate_nudge(contact, days_since, relationship_type='contact'):
    """Generate re-engagement nudge (uses llm-router)"""
    return get_llm_bridge().generate_nudge(contact, days_since, relationship_type)


# Test mode
if __name__ == '__main__':
    # Test contact summary
    print("Testing LLM Bridge...")
    
    test_contact = {
        'name': 'John Smith',
        'email': 'john@example.com',
        'company': 'Example Corp'
    }
    
    test_interactions = [
        {
            'timestamp': '2026-02-01T10:00:00',
            'type': 'email_sent',
            'subject': 'Q1 planning',
            'snippet': 'Looking forward to discussing priorities'
        }
    ]
    
    test_timeline = [
        {
            'timestamp': '2026-02-01T10:00:00',
            'title': 'Initial outreach',
            'content': 'Sent introduction email about partnership'
        }
    ]
    
    try:
        summary = generate_contact_summary(test_contact, test_interactions, test_timeline)
        print("\n✅ Summary generated:")
        print(f"   {summary['summary_text']}")
        print(f"   Key points: {summary['key_points']}")
    except Exception as e:
        print(f"\n❌ Test failed: {e}")
