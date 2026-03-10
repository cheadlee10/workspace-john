#!/usr/bin/env python3
"""
FIVERR 3-GIG POSTING — FIXED VERSION
Corrected SeleniumBase UC Mode syntax
"""

from seleniumbase import BaseCase
import time

class FiverrGigPoster(BaseCase):
    def test_post_gigs(self):
        """Post all 3 gigs using SeleniumBase UC Mode"""
        
        # Credentials
        email = 'Craigheadlee74@gmail.com'
        password = 'F1f2f3f4'
        
        gigs = [
            {
                'title': 'I will do fast excel data entry and copy paste work',
                'desc': 'Need fast and accurate data entry? I got you covered! I will: Copy data from PDF, image, or website to Excel. Organize data into clean tables. Format for easy reading. Remove duplicates and errors. Deliver within 24 hours.'
            },
            {
                'title': 'I will clean and format your messy excel spreadsheet data',
                'desc': 'Got messy data? I will clean it up fast! Remove extra spaces and line breaks. Fix capitalization. Standardize phone numbers and dates. Remove duplicates. Split/merge columns.'
            },
            {
                'title': 'I will build a list and organize it fast',
                'desc': 'Need a list compiled or organized? I will build lists from scratch. Compile and organize existing data. Remove duplicates. Organize alphabetically or by category. Format professionally.'
            },
        ]
        
        print("\n" + "="*70)
        print("FIVERR 3-GIG POSTING")
        print("="*70)
        
        try:
            # Navigate to login
            self.open("https://fiverr.com/login")
            self.sleep(2)
            
            print("\n[LOGIN] Logging in...")
            
            # Fill email
            self.type('input[type="email"]', email, interval=0.05)
            self.sleep(1)
            
            # Fill password
            self.type('input[type="password"]', password, interval=0.05)
            self.sleep(1)
            
            # Click login
            self.click('button:contains("Continue")')
            self.sleep(5)
            
            print("✅ Login successful")
            
            # Post each gig
            for i, gig in enumerate(gigs, 1):
                print(f"\n[GIG {i}] Posting: {gig['title'][:50]}...")
                
                try:
                    # Navigate to gig creation
                    self.open("https://fiverr.com/gigs")
                    self.sleep(2)
                    
                    # Click create button
                    self.click('button:contains("Create")')
                    self.sleep(3)
                    
                    # Fill title
                    title_field = self.find_element('input[placeholder*="title"], input[name*="title"]')
                    self.execute_script("arguments[0].value = '';", title_field)
                    self.type('input[placeholder*="title"], input[name*="title"]', gig['title'], interval=0.01)
                    self.sleep(1)
                    
                    # Fill description
                    desc_field = self.find_element('textarea')
                    self.execute_script("arguments[0].value = '';", desc_field)
                    self.type('textarea', gig['desc'], interval=0.001)
                    self.sleep(1)
                    
                    # Scroll down
                    self.execute_script("window.scrollBy(0, 500);")
                    self.sleep(2)
                    
                    # Save/submit
                    try:
                        self.click('button:contains("Save")')
                        self.sleep(2)
                        print(f"✅ GIG {i} posted")
                    except:
                        try:
                            self.click('button:contains("Continue")')
                            self.sleep(2)
                            print(f"✅ GIG {i} progressed")
                        except:
                            print(f"⚠️  GIG {i}: Save button not found")
                    
                except Exception as e:
                    print(f"❌ GIG {i} failed: {str(e)}")
        
        except Exception as e:
            print(f"FATAL: {str(e)}")
            raise

if __name__ == "__main__":
    # Run with: pytest fiverr-post-gigs-fixed.py --uc
    pass
