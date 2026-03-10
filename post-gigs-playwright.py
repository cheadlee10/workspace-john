#!/usr/bin/env python3
"""
FIVERR GIG POSTING — PLAYWRIGHT VERSION
Fallback if SeleniumBase fails
"""

from playwright.sync_api import sync_playwright
import time

CREDS = {'email': 'Craigheadlee74@gmail.com', 'password': 'F1f2f3f4'}

GIGS = [
    {'title': 'I will do fast excel data entry and copy paste work', 'desc': 'Need fast and accurate data entry...', 'tags': 'data entry, excel, copy paste'},
    {'title': 'I will clean and format your messy excel spreadsheet data', 'desc': 'Got messy, unorganized data...', 'tags': 'data cleaning, excel'},
    {'title': 'I will build a list and organize it fast', 'desc': 'Need a list compiled or organized...', 'tags': 'list building, data'},
]

def post_gigs():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        
        print("[LOGIN] Navigating to Fiverr login...")
        page.goto("https://fiverr.com/login")
        time.sleep(2)
        
        print("[LOGIN] Filling credentials...")
        page.fill('input[type="email"]', CREDS['email'])
        time.sleep(1)
        page.fill('input[type="password"]', CREDS['password'])
        time.sleep(1)
        
        print("[LOGIN] Clicking login...")
        page.click('button:has-text("Continue")')
        page.wait_for_navigation(timeout=15000)
        
        for gig in GIGS:
            print(f"\n[GIG] Posting: {gig['title'][:50]}...")
            page.goto("https://fiverr.com/gigs")
            time.sleep(2)
            page.click('button:has-text("Create")')
            time.sleep(3)
            
            # Fill form
            page.fill('input[placeholder*="title"]', gig['title'])
            time.sleep(1)
            page.fill('textarea', gig['desc'])
            time.sleep(1)
            
            # Save
            page.click('button:has-text("Save")')
            time.sleep(2)
            print(f"✅ Posted: {gig['title'][:50]}")
        
        browser.close()
        print("\n✅ ALL GIGS POSTED")

if __name__ == "__main__":
    post_gigs()
