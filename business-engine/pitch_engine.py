#!/usr/bin/env python3
"""
Email Pitch Engine
Generates personalized sales pitches with ROI statistics
"""

import json
from typing import Dict
from datetime import datetime

class PitchEngine:
    """
    Generates personalized email pitches
    
    Components:
    1. Subject line (personalized, curiosity-driven)
    2. Preview of their built website
    3. Industry ROI statistics
    4. Social proof
    5. Payment link
    6. Clear CTA
    """
    
    def __init__(self):
        self.templates = self.load_templates()
    
    def load_templates(self) -> Dict:
        """Load email templates"""
        
        return {
            'subject_lines': [
                "I built a website for {business_name}",
                "{business_name} - Your new website is ready",
                "Free website for {business_name} (see preview)",
                "This is what {business_name} could look like online"
            ],
            'opening': [
                "Hi {owner_name},",
                "Hello from NorthStar Synergy,",
                "Quick question for {business_name},"
            ]
        }
    
    def generate_pitch(self, business: Dict, website: Dict) -> Dict:
        """
        Generate complete email pitch
        
        Returns:
        {
            'subject': str,
            'body': str,
            'preview_url': str,
            'payment_link': str
        }
        """
        
        # Generate subject line
        subject = self.generate_subject(business)
        
        # Generate body
        body = self.generate_body(business, website)
        
        pitch = {
            'subject': subject,
            'body': body,
            'preview_url': website['preview_url'],
            'payment_link': self.generate_payment_link(business)
        }
        
        return pitch
    
    def generate_subject(self, business: Dict) -> str:
        """Generate attention-grabbing subject line"""
        
        templates = [
            f"I built a website for {business['name']}",
            f"{business['name']} - Website Preview Inside",
            f"Your competitors have websites. Here's yours."
        ]
        
        return templates[0]
    
    def generate_body(self, business: Dict, website: Dict) -> str:
        """Generate email body with stats and CTA"""
        
        stats = business.get('industry_stats', {})
        
        body = f"""Hi there,

I noticed {business['name']} doesn't have a website yet, so I went ahead and built one for you.

👉 Preview it here: {website['preview_url']}

Here's why this matters:

• {stats.get('avg_revenue_increase', '38%')} average revenue increase for {business['category']} businesses with websites
• {stats.get('trust_factor', '92% of consumers')} research businesses online before contacting them
• Your competitors are getting the customers who search online

I built this specifically for {business['name']} - it's already customized with your services, contact info, and optimized for local search.

**Pricing:**
• $250 one-time (website ownership transfers to you)
• First month hosting FREE
• $7/month hosting after that (optional - no maintenance included)

If you like it, claim it here: [PAYMENT_LINK]

If not, no worries - I'll remove it in 7 days.

Questions? Just reply to this email or call me at {business.get('our_phone', '(555) 123-4567')}.

Best regards,
John @ NorthStar Synergy

P.S. - {business.get('competitors_with_websites', 8)} other {business['category']} businesses in {business['location']} already have websites. Don't let them capture all the online customers.
"""
        
        return body.strip()
    
    def generate_payment_link(self, business: Dict) -> str:
        """Generate Stripe payment link"""
        
        # Will integrate with Stripe API
        # For now, placeholder
        
        business_slug = business['name'].lower().replace(' ', '-')
        return f"https://pay.northstarsynergy.com/{business_slug}"
    
    def generate_stats_attachment(self, business: Dict) -> Dict:
        """
        Generate PDF attachment with industry statistics
        
        Shows:
        - Revenue comparison (with vs without website)
        - Customer acquisition data
        - Market research specific to their industry
        - Case studies
        """
        
        stats_doc = {
            'title': f"Why {business['category']} Businesses Need Websites",
            'sections': [
                {
                    'title': 'Revenue Impact',
                    'data': [
                        f"{business['industry_stats']['avg_revenue_increase']} average revenue increase",
                        "81% of consumers research online before buying",
                        "46% of small businesses still don't have websites"
                    ]
                },
                {
                    'title': 'Your Local Market',
                    'data': [
                        f"{business['competitors_with_websites']} competitors in {business['location']} have websites",
                        "They're capturing the customers who search online first",
                        "Average 30-50 new leads per month from website"
                    ]
                },
                {
                    'title': 'Return on Investment',
                    'data': [
                        "$250 one-time cost",
                        "$7/month hosting",
                        f"Potential: {business['industry_stats']['avg_revenue_increase']} revenue increase",
                        "ROI: 10x+ in first year"
                    ]
                }
            ]
        }
        
        return stats_doc


class FollowUpEngine:
    """Automated follow-up email sequences"""
    
    def __init__(self):
        self.follow_up_schedule = {
            'day_3': 'gentle_reminder',
            'day_7': 'last_chance',
            'day_14': 'final_notice'
        }
    
    def generate_follow_up(self, business: Dict, days_since: int) -> Optional[str]:
        """Generate follow-up email based on days since initial email"""
        
        if days_since == 3:
            return self.day_3_follow_up(business)
        elif days_since == 7:
            return self.day_7_follow_up(business)
        elif days_since == 14:
            return None  # Stop after day 7
        
        return None
    
    def day_3_follow_up(self, business: Dict) -> str:
        """Day 3 follow-up"""
        
        return f"""Hi again,

Just following up on the website I built for {business['name']}.

Did you get a chance to preview it? {website_url}

Let me know if you have any questions or if you'd like me to make any changes before you decide.

Best,
John
"""
    
    def day_7_follow_up(self, business: Dict) -> str:
        """Day 7 final follow-up"""
        
        return f"""Hi there,

Last follow-up about the website for {business['name']}.

If you're not interested, no problem at all - I'll remove it after today.

But if you'd like to claim it, the offer is still $250 one-time + $7/month hosting (first month free).

Link to preview & purchase: {payment_link}

Thanks either way!
John
"""


if __name__ == '__main__':
    engine = PitchEngine()
    
    test_business = {
        'name': 'Green Valley Landscaping',
        'category': 'landscaping',
        'location': 'Seattle, WA',
        'industry_stats': {
            'avg_revenue_increase': '45%',
            'trust_factor': '92% of consumers research online first'
        },
        'competitors_with_websites': 8
    }
    
    test_website = {
        'preview_url': 'https://green-valley-landscaping.prebuilt-sites.com'
    }
    
    pitch = engine.generate_pitch(test_business, test_website)
    
    print("Subject:", pitch['subject'])
    print("\n" + "="*60)
    print(pitch['body'])
