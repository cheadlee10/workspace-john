"""
Personal CRM - Relationship Intelligence
Calculates relationship scores, generates nudges, profiles communication styles
"""

from typing import Dict, List, Optional, Tuple
from datetime import datetime, timedelta
from db import CRMDB
import math

class RelationshipScorer:
    """
    Calculates relationship scores (0-100) based on:
    - Recency: When was last interaction?
    - Frequency: How often do you interact?
    - Priority: Manual importance rating
    - Engagement: Quality of interactions (sentiment, length, type)
    """
    
    def __init__(self, db: CRMDB):
        self.db = db
        
        # Decay parameters
        self.decay_days = int(self.db.get_config('relationship_decay_days') or 90)
        
        # Weights for scoring components
        self.weights = {
            'recency': 0.35,      # How recently you interacted
            'frequency': 0.25,    # How often you interact
            'priority': 0.20,     # Manual importance
            'engagement': 0.20    # Quality of interactions
        }
    
    def calculate_score(self, contact_id: int) -> float:
        """
        Calculate relationship score for a contact (0-100)
        
        Score components:
        1. Recency (35%): Exponential decay based on days since last interaction
        2. Frequency (25%): Interactions per month, normalized
        3. Priority (20%): User-set priority (0-100)
        4. Engagement (20%): Average sentiment, meeting attendance, email length
        """
        contact = self.db.get_contact(contact_id=contact_id)
        if not contact:
            return 0.0
        
        recency_score = self._calculate_recency(contact)
        frequency_score = self._calculate_frequency(contact)
        priority_score = contact['priority']  # Already 0-100
        engagement_score = self._calculate_engagement(contact_id)
        
        # Weighted average
        total_score = (
            recency_score * self.weights['recency'] +
            frequency_score * self.weights['frequency'] +
            priority_score * self.weights['priority'] +
            engagement_score * self.weights['engagement']
        )
        
        return round(total_score, 1)
    
    def _calculate_recency(self, contact: Dict) -> float:
        """
        Calculate recency score (0-100) with exponential decay
        
        Score = 100 * e^(-days_since / decay_days)
        
        Examples:
        - Today: 100
        - 30 days ago: ~72 (if decay_days=90)
        - 90 days ago: ~37
        - 180 days ago: ~14
        """
        last_interaction = contact['last_interaction_date']
        
        if not last_interaction:
            return 0.0
        
        try:
            last_dt = datetime.fromisoformat(last_interaction.replace('Z', '+00:00'))
            days_since = (datetime.utcnow() - last_dt).days
            
            # Exponential decay
            score = 100 * math.exp(-days_since / self.decay_days)
            return min(100.0, max(0.0, score))
        except:
            return 0.0
    
    def _calculate_frequency(self, contact: Dict) -> float:
        """
        Calculate frequency score (0-100) based on interactions per month
        
        Assumes:
        - 1+ interactions/month = 100
        - 0.5 interactions/month = 50
        - 0.1 interactions/month = 10
        """
        added_date = contact['added_date']
        total_interactions = (
            contact['email_count'] + 
            contact['meeting_count'] + 
            contact['call_count']
        )
        
        if not added_date or total_interactions == 0:
            return 0.0
        
        try:
            added_dt = datetime.fromisoformat(added_date.replace('Z', '+00:00'))
            months_known = max(1, (datetime.utcnow() - added_dt).days / 30)
            
            interactions_per_month = total_interactions / months_known
            
            # Normalize to 0-100 (asymptotic approach to 100)
            # 1/month = 100, 0.5/month = 67, 0.25/month = 44
            score = 100 * (1 - math.exp(-interactions_per_month))
            return min(100.0, max(0.0, score))
        except:
            return 0.0
    
    def _calculate_engagement(self, contact_id: int) -> float:
        """
        Calculate engagement score (0-100) based on:
        - Sentiment of recent interactions
        - Meeting attendance
        - Email thread depth
        """
        interactions = self.db.get_contact_interactions(contact_id, limit=20)
        
        if not interactions:
            return 50.0  # Neutral
        
        # Sentiment score (0-100)
        sentiment_scores = []
        for interaction in interactions:
            sentiment = interaction.get('sentiment')
            if sentiment == 'positive':
                sentiment_scores.append(100)
            elif sentiment == 'neutral':
                sentiment_scores.append(50)
            elif sentiment == 'negative':
                sentiment_scores.append(0)
        
        avg_sentiment = sum(sentiment_scores) / len(sentiment_scores) if sentiment_scores else 50
        
        # Meeting participation (meetings are higher engagement than emails)
        meeting_ratio = sum(1 for i in interactions if i['type'] == 'meeting') / len(interactions)
        meeting_bonus = meeting_ratio * 20  # Up to +20 points
        
        # Email depth (longer emails = more engaged)
        email_lengths = [
            len(i.get('full_content') or '') 
            for i in interactions 
            if i['type'] in ['email_sent', 'email_received']
        ]
        
        avg_email_length = sum(email_lengths) / len(email_lengths) if email_lengths else 0
        # Normalize: 500 chars = average, 1000+ = high engagement
        length_score = min(20, (avg_email_length / 500) * 10)
        
        # Combined engagement score
        engagement = avg_sentiment + meeting_bonus + length_score
        return min(100.0, max(0.0, engagement))
    
    def update_all_scores(self):
        """Recalculate scores for all active contacts"""
        cursor = self.db.conn.execute("SELECT id FROM contacts WHERE status = 'active'")
        contact_ids = [row['id'] for row in cursor.fetchall()]
        
        for contact_id in contact_ids:
            score = self.calculate_score(contact_id)
            self.db.conn.execute(
                "UPDATE contacts SET relationship_score = ?, last_updated = ? WHERE id = ?",
                (score, datetime.utcnow().isoformat(), contact_id)
            )
        
        self.db.conn.commit()
        return len(contact_ids)
    
    def generate_nudges(self, days_threshold: int = 30, limit: int = 5) -> List[Dict]:
        """
        Generate nudges for contacts needing attention
        
        Returns list of:
        {
            'contact': {...},
            'reason': str,
            'suggested_action': str,
            'priority': int (0-100)
        }
        """
        contacts = self.db.get_contacts_needing_attention(days_threshold, limit * 2)
        nudges = []
        
        for contact in contacts:
            days_since = self._days_since_last_interaction(contact)
            
            # Determine reason and suggested action
            if days_since > 90:
                reason = f"No contact in {days_since} days - relationship at risk"
                action = "Send a check-in email or schedule a call"
                priority = 90
            elif days_since > 60:
                reason = f"Haven't connected in {days_since} days"
                action = "Quick email to stay on their radar"
                priority = 70
            elif days_since > 30:
                reason = f"It's been {days_since} days since last interaction"
                action = "Share an article or ask how they're doing"
                priority = 50
            else:
                continue  # Not urgent enough
            
            nudges.append({
                'contact': contact,
                'reason': reason,
                'suggested_action': action,
                'priority': priority,
                'days_since': days_since
            })
        
        # Sort by priority (relationship_score * urgency)
        nudges.sort(key=lambda x: x['contact']['relationship_score'] * (x['days_since'] / 30), reverse=True)
        
        return nudges[:limit]
    
    def profile_relationship(self, contact_id: int) -> Dict[str, any]:
        """
        Generate relationship profile:
        - Type: client, partner, friend, etc.
        - Communication style: formal, casual, technical
        - Key topics: product, pricing, support, etc.
        - Best engagement channel: email, meetings, calls
        """
        contact = self.db.get_contact(contact_id=contact_id)
        interactions = self.db.get_contact_interactions(contact_id, limit=50)
        
        if not contact or not interactions:
            return {
                'type': 'unknown',
                'communication_style': 'unknown',
                'key_topics': [],
                'best_channel': 'email'
            }
        
        # Determine relationship type from tags, company, interactions
        rel_type = self._infer_relationship_type(contact, interactions)
        
        # Infer communication style from email length, formality
        comm_style = self._infer_communication_style(interactions)
        
        # Extract key topics from interaction content
        key_topics = self._extract_key_topics(interactions)
        
        # Determine best engagement channel
        best_channel = self._determine_best_channel(interactions)
        
        return {
            'type': rel_type,
            'communication_style': comm_style,
            'key_topics': key_topics,
            'best_channel': best_channel,
            'response_time_avg': self._calculate_avg_response_time(interactions)
        }
    
    def _days_since_last_interaction(self, contact: Dict) -> int:
        """Calculate days since last interaction"""
        last = contact.get('last_interaction_date')
        if not last:
            return 999
        
        try:
            last_dt = datetime.fromisoformat(last.replace('Z', '+00:00'))
            return (datetime.utcnow() - last_dt).days
        except:
            return 999
    
    def _infer_relationship_type(self, contact: Dict, interactions: List[Dict]) -> str:
        """Infer relationship type from context"""
        # Check tags first
        try:
            tags = eval(contact.get('tags', '[]'))
            if 'client' in tags:
                return 'client'
            if 'partner' in tags:
                return 'partner'
            if 'investor' in tags:
                return 'investor'
        except:
            pass
        
        # Check for business indicators
        if contact.get('company'):
            # Has business email domain and company = likely professional
            if any(keyword in (contact.get('email') or '').lower() 
                   for keyword in ['contract', 'invoice', 'proposal']):
                return 'client'
            return 'professional'
        
        # Default
        return 'contact'
    
    def _infer_communication_style(self, interactions: List[Dict]) -> str:
        """Infer communication style from interaction patterns"""
        email_interactions = [i for i in interactions if 'email' in i['type']]
        
        if not email_interactions:
            return 'casual'
        
        # Check email length (formal = longer, more detailed)
        avg_length = sum(
            len(i.get('full_content') or '') 
            for i in email_interactions
        ) / len(email_interactions)
        
        if avg_length > 1000:
            return 'formal'
        elif avg_length > 300:
            return 'professional'
        else:
            return 'casual'
    
    def _extract_key_topics(self, interactions: List[Dict]) -> List[str]:
        """Extract key topics from interaction subjects/content"""
        # Simple keyword extraction (could use LLM in future)
        topics = {}
        
        for interaction in interactions:
            subject = (interaction.get('subject') or '').lower()
            content = (interaction.get('snippet') or '').lower()
            
            # Common business topics
            keywords = [
                'pricing', 'contract', 'proposal', 'meeting', 'demo',
                'product', 'feature', 'support', 'bug', 'question',
                'partnership', 'collaboration', 'opportunity'
            ]
            
            for keyword in keywords:
                if keyword in subject or keyword in content:
                    topics[keyword] = topics.get(keyword, 0) + 1
        
        # Return top 5 topics
        sorted_topics = sorted(topics.items(), key=lambda x: x[1], reverse=True)
        return [topic for topic, count in sorted_topics[:5]]
    
    def _determine_best_channel(self, interactions: List[Dict]) -> str:
        """Determine which channel gets best engagement"""
        channel_counts = {}
        
        for interaction in interactions:
            itype = interaction['type']
            if 'email' in itype:
                channel = 'email'
            elif itype == 'meeting':
                channel = 'meeting'
            elif itype == 'call':
                channel = 'call'
            else:
                continue
            
            channel_counts[channel] = channel_counts.get(channel, 0) + 1
        
        if not channel_counts:
            return 'email'
        
        # Return most frequent channel
        return max(channel_counts.items(), key=lambda x: x[1])[0]
    
    def _calculate_avg_response_time(self, interactions: List[Dict]) -> Optional[float]:
        """Calculate average response time in hours"""
        # Would need email thread analysis to implement properly
        # Placeholder for now
        return None
