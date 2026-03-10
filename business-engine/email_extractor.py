#!/usr/bin/env python3
"""
Email Extraction System
Finds email addresses for businesses using multiple methods
"""

import re
import requests
from typing import Optional, List, Dict
from urllib.parse import urlparse

class EmailExtractor:
    """
    Multi-method email extraction:
    1. Website scraping (if they have one listed elsewhere)
    2. Social media profile scraping
    3. Pattern-based guessing (verified)
    4. Email finder APIs (Hunter.io alternatives)
    """
    
    def __init__(self):
        self.email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
        self.found_emails = {}
    
    def extract_all_contacts(self, business: Dict) -> Dict:
        """
        Extract all possible contact methods
        
        Returns:
        {
            'email': str or None,
            'phone': str,
            'facebook': str,
            'instagram': str,
            'method': str (how email was found)
        }
        """
        
        contacts = {
            'email': None,
            'phone': business.get('phone'),
            'facebook': None,
            'instagram': None,
            'method': None
        }
        
        # Method 1: Check if business website exists (from other sources)
        if business.get('website_url'):
            email = self.scrape_website_for_email(business['website_url'])
            if email:
                contacts['email'] = email
                contacts['method'] = 'website_scrape'
                return contacts
        
        # Method 2: Pattern-based email generation
        email = self.generate_likely_email(business)
        if email:
            contacts['email'] = email
            contacts['method'] = 'pattern_generated'
        
        return contacts
    
    def scrape_website_for_email(self, url: str) -> Optional[str]:
        """Scrape website HTML for email addresses"""
        
        try:
            response = requests.get(url, timeout=10)
            html = response.text
            
            # Find all emails
            emails = re.findall(self.email_pattern, html)
            
            # Filter out common non-contact emails
            filtered = [e for e in emails if not any(skip in e.lower() 
                       for skip in ['noreply', 'privacy', 'unsubscribe', 'example'])]
            
            if filtered:
                return filtered[0]  # Return first valid email
        
        except:
            pass
        
        return None
    
    def generate_likely_email(self, business: Dict) -> Optional[str]:
        """
        Generate likely email patterns
        
        Common patterns:
        - info@businessname.com
        - contact@businessname.com
        - hello@businessname.com
        - business@businessname.com
        """
        
        name = business['name'].lower().replace(' ', '').replace("'", '')
        
        # Extract likely domain
        domain = f"{name}.com"
        
        # Common prefixes
        prefixes = ['info', 'contact', 'hello', 'service']
        
        # Return most likely
        return f"{prefixes[0]}@{domain}"
    
    def verify_email(self, email: str) -> bool:
        """
        Verify email exists (basic check)
        
        Methods:
        1. SMTP verification (check if mailbox exists)
        2. Email verification API
        3. Pattern validation
        """
        
        # Basic format validation
        if not re.match(self.email_pattern, email):
            return False
        
        # Would implement SMTP check or use API like:
        # - Hunter.io Email Verifier
        # - NeverBounce
        # - ZeroBounce
        
        return True  # Placeholder
    
    def extract_from_social(self, business: Dict) -> Optional[str]:
        """Extract email from social media profiles"""
        
        # Check Facebook business page
        if business.get('facebook_url'):
            # Would scrape Facebook page for contact info
            pass
        
        # Check Instagram bio
        if business.get('instagram_handle'):
            # Would check Instagram bio for email
            pass
        
        return None


class SMSFinder:
    """Find phone numbers and prepare for SMS"""
    
    def __init__(self):
        pass
    
    def format_phone(self, phone: str) -> str:
        """Format phone number for SMS"""
        
        # Remove non-digits
        digits = re.sub(r'\D', '', phone)
        
        # Add +1 if missing
        if len(digits) == 10:
            digits = f"1{digits}"
        
        return f"+{digits}"
    
    def verify_phone(self, phone: str) -> bool:
        """Verify phone number is valid"""
        
        formatted = self.format_phone(phone)
        
        # Basic validation
        if len(formatted) != 12:  # +1 + 10 digits
            return False
        
        return True


if __name__ == '__main__':
    extractor = EmailExtractor()
    
    test_business = {
        'name': 'Green Valley Landscaping',
        'phone': '(206) 555-1234'
    }
    
    contacts = extractor.extract_all_contacts(test_business)
    print("Extracted contacts:")
    print(json.dumps(contacts, indent=2))
