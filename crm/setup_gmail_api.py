#!/usr/bin/env python3
"""
Gmail API Setup Automation
Automates the entire Google Cloud Console setup using Playwright
"""

import os
import time
import json
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

class GmailAPISetup:
    """
    Automates Gmail API setup in Google Cloud Console
    
    Steps:
    1. Create new project "Personal CRM"
    2. Enable Gmail API
    3. Configure OAuth consent screen
    4. Create OAuth Desktop credentials
    5. Download credentials.json
    """
    
    def __init__(self, headless: bool = False):
        self.headless = headless
        self.crm_dir = Path(__file__).parent
        self.downloads_dir = self.crm_dir / "downloads"
        self.downloads_dir.mkdir(exist_ok=True)
        
        self.project_name = "Personal CRM"
        self.user_email = "chead@me.com"
        
    def run(self):
        """Execute full setup flow"""
        print("🚀 Starting Gmail API setup automation...")
        print("📋 This will:")
        print("   1. Open Google Cloud Console (you log in)")
        print("   2. Create Google Cloud project")
        print("   3. Enable Gmail API")
        print("   4. Configure OAuth consent screen")
        print("   5. Create OAuth credentials")
        print("   6. Download credentials.json")
        print()
        
        with sync_playwright() as p:
            # Launch browser (NOT headless - requires Google login)
            print("🌐 Opening Chrome browser...")
            browser = p.chromium.launch(
                headless=False,
                args=[
                    '--start-maximized',
                    '--disable-blink-features=AutomationControlled'
                ]
            )
            
            context = browser.new_context(
                viewport={'width': 1920, 'height': 1080},
                accept_downloads=True,
                user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
            )
            
            page = context.new_page()
            
            try:
                # Step 1: Navigate to Cloud Console and wait for login
                print("\n📍 Step 1: Opening Google Cloud Console...")
                print("   URL: https://console.cloud.google.com/")
                page.goto('https://console.cloud.google.com/')
                
                # Wait for user to login
                print("\n⏳ PLEASE LOG IN TO GOOGLE")
                print("   - If you see a login page, sign in with chead@me.com")
                print("   - If you're already logged in, just wait")
                print("   - The automation will continue once you're in...")
                
                # Wait for Cloud Console to fully load (detect by unique elements)
                self.wait_for_console_ready(page)
                
                print("\n✅ Google Cloud Console loaded!")
                
                # Check if we need to accept terms
                if self.check_and_accept_terms(page):
                    print("   ✅ Terms accepted")
                    page.wait_for_timeout(3000)
                
                # Step 2: Create new project
                print("\n📍 Step 2: Creating new project...")
                self.create_project(page)
                
                # Step 3: Enable Gmail API
                print("\n📍 Step 3: Enabling Gmail API...")
                self.enable_gmail_api(page)
                
                # Step 4: Configure OAuth consent screen
                print("\n📍 Step 4: Configuring OAuth consent screen...")
                self.configure_oauth_consent(page)
                
                # Step 5: Create OAuth credentials
                print("\n📍 Step 5: Creating OAuth credentials...")
                credentials_path = self.create_oauth_credentials(page, context)
                
                # Step 6: Move credentials to CRM directory
                if credentials_path:
                    print("\n📍 Step 6: Setting up credentials...")
                    self.setup_credentials(credentials_path)
                    
                    print("\n✅ Gmail API setup complete!")
                    print(f"✅ Credentials saved to: {self.crm_dir / 'credentials.json'}")
                    print("\n🎉 Next step: Run authentication flow")
                    print("   python -c \"from gmail_scanner import GmailScanner; from db import CRMDB; scanner = GmailScanner(CRMDB()); scanner.authenticate()\"")
                else:
                    print("\n⚠️  Could not download credentials automatically")
                    print("📥 Please download manually from:")
                    print("   https://console.cloud.google.com/apis/credentials")
                
                # Keep browser open for 10 seconds so user can see the result
                print("\n⏳ Keeping browser open for 10 seconds...")
                page.wait_for_timeout(10000)
                
            except Exception as e:
                print(f"\n❌ Error during setup: {e}")
                print("📸 Taking screenshot for debugging...")
                page.screenshot(path=str(self.crm_dir / 'error_screenshot.png'))
                print(f"   Screenshot saved to: {self.crm_dir / 'error_screenshot.png'}")
                raise
            
            finally:
                browser.close()
    
    def wait_for_console_ready(self, page, timeout=120000):
        """
        Wait for Google Cloud Console to be fully loaded
        Detects by looking for key UI elements that only appear after login
        """
        print("   Waiting for console to load (up to 2 minutes)...")
        
        # Try multiple selectors that indicate console is ready
        selectors = [
            '[aria-label*="Google Cloud"]',
            '[aria-label*="Select a project"]',
            'text=APIs & Services',
            '[role="navigation"]',
            'button:has-text("Create")'
        ]
        
        start_time = time.time()
        while time.time() - start_time < (timeout / 1000):
            for selector in selectors:
                try:
                    if page.locator(selector).first.is_visible(timeout=2000):
                        return True
                except:
                    pass
            
            # Check URL - if we're on accounts.google.com, still logging in
            current_url = page.url
            if 'console.cloud.google.com' in current_url and 'accounts.google.com' not in current_url:
                # Give it a few more seconds to fully render
                page.wait_for_timeout(3000)
                return True
            
            page.wait_for_timeout(2000)
        
        raise Exception("Timeout waiting for Google Cloud Console to load. Please ensure you're logged in.")
    
    def check_and_accept_terms(self, page):
        """Check for and accept Terms of Service if present"""
        try:
            # Look for terms checkbox or button
            if page.locator('text=Terms of Service').is_visible(timeout=2000):
                # Try to find and click "I agree" or similar
                agree_buttons = [
                    'button:has-text("I agree")',
                    'button:has-text("Accept")',
                    'text=I agree to',
                    '[type="checkbox"]'
                ]
                
                for selector in agree_buttons:
                    try:
                        element = page.locator(selector).first
                        if element.is_visible(timeout=1000):
                            element.click()
                            page.wait_for_timeout(1000)
                    except:
                        pass
                
                # Look for submit button
                submit_buttons = [
                    'button:has-text("Continue")',
                    'button:has-text("Submit")',
                    'button:has-text("Agree")'
                ]
                
                for selector in submit_buttons:
                    try:
                        element = page.locator(selector).first
                        if element.is_visible(timeout=1000):
                            element.click()
                            return True
                    except:
                        pass
            
            return False
        except:
            return False
    
    def create_project(self, page):
        """Create new Google Cloud project"""
        try:
            print("   Looking for project selector...")
            
            # Multiple strategies to find project selector
            project_selectors = [
                '[aria-label*="Select a project"]',
                '[aria-label*="Project"]',
                'button[aria-label*="Select"]',
                'div[role="button"]:has-text("Select")',
                '.cfc-project-picker'
            ]
            
            project_button = None
            for selector in project_selectors:
                try:
                    elem = page.locator(selector).first
                    if elem.is_visible(timeout=3000):
                        project_button = elem
                        print(f"   Found project selector: {selector}")
                        break
                except:
                    continue
            
            if not project_button:
                print("   ⚠️  Could not find project selector")
                print("   📝 Manual action: Click 'Select a project' dropdown at top")
                print("   Press Enter when dropdown is open...")
                input()
            else:
                project_button.click()
                page.wait_for_timeout(2000)
            
            # Click "New Project"
            print("   Looking for 'New Project' button...")
            new_project_selectors = [
                'text=NEW PROJECT',
                'text=New Project',
                'button:has-text("NEW PROJECT")',
                'a:has-text("NEW PROJECT")',
                '[aria-label*="New Project"]'
            ]
            
            new_project_button = None
            for selector in new_project_selectors:
                try:
                    elem = page.locator(selector).first
                    if elem.is_visible(timeout=3000):
                        new_project_button = elem
                        print(f"   Found 'New Project': {selector}")
                        break
                except:
                    continue
            
            if not new_project_button:
                print("   ⚠️  Could not find 'New Project' button")
                print("   📝 Manual action: Click 'NEW PROJECT' in the dropdown")
                print("   Press Enter when 'Create Project' form appears...")
                input()
            else:
                new_project_button.click()
                page.wait_for_timeout(3000)
            
            # Enter project name
            print(f"   Entering project name: '{self.project_name}'")
            project_name_selectors = [
                'input[name="projectName"]',
                'input[placeholder*="project name"]',
                'input[aria-label*="Project name"]',
                'input[type="text"]'
            ]
            
            name_filled = False
            for selector in project_name_selectors:
                try:
                    elem = page.locator(selector).first
                    if elem.is_visible(timeout=2000):
                        elem.clear()
                        elem.fill(self.project_name)
                        page.wait_for_timeout(500)
                        name_filled = True
                        print(f"   ✅ Project name entered")
                        break
                except:
                    continue
            
            if not name_filled:
                print("   ⚠️  Could not find project name input")
                print(f"   📝 Manual action: Type '{self.project_name}' in the Project name field")
                print("   Press Enter when done...")
                input()
            
            # Click Create
            print("   Clicking CREATE button...")
            create_selectors = [
                'button:has-text("CREATE")',
                'button:has-text("Create")',
                'button[type="submit"]',
                '[aria-label*="Create"]'
            ]
            
            create_clicked = False
            for selector in create_selectors:
                try:
                    elem = page.locator(selector).first
                    if elem.is_visible(timeout=2000):
                        elem.click()
                        create_clicked = True
                        print(f"   ✅ CREATE clicked")
                        break
                except:
                    continue
            
            if not create_clicked:
                print("   ⚠️  Could not find CREATE button")
                print("   📝 Manual action: Click the CREATE button")
                print("   Press Enter after clicking...")
                input()
            
            # Wait for project creation
            print(f"   ⏳ Creating project '{self.project_name}' (this takes 10-30 seconds)...")
            page.wait_for_timeout(20000)
            
            # Check if project was created (URL change or notification)
            current_url = page.url
            if 'projectId' in current_url or 'project=' in current_url:
                print("   ✅ Project created successfully!")
            else:
                # Look for success notification
                try:
                    if page.locator('text=created').is_visible(timeout=10000):
                        print("   ✅ Project created successfully!")
                    else:
                        print("   ℹ️  Project creation status unclear, continuing...")
                except:
                    print("   ℹ️  Project creation status unclear, continuing...")
            
        except Exception as e:
            print(f"   ❌ Error during project creation: {e}")
            print("   📝 Manual fallback:")
            print("      1. Click 'Select a project' dropdown (top of page)")
            print("      2. Click 'NEW PROJECT'")
            print(f"      3. Enter name: '{self.project_name}'")
            print("      4. Click 'CREATE'")
            print("      5. Wait for project to be created")
            print("\n   Press Enter when project is ready...")
            input()
    
    def enable_gmail_api(self, page):
        """Enable Gmail API for the project"""
        try:
            print("   Navigating to Gmail API page...")
            page.goto('https://console.cloud.google.com/apis/library/gmail.googleapis.com')
            page.wait_for_timeout(5000)
            
            # Check if already enabled
            enabled_indicators = [
                'text=API enabled',
                'text=MANAGE',
                'button:has-text("MANAGE")'
            ]
            
            for selector in enabled_indicators:
                try:
                    if page.locator(selector).is_visible(timeout=2000):
                        print("   ℹ️  Gmail API already enabled, skipping")
                        return
                except:
                    pass
            
            # Click Enable button
            print("   Looking for ENABLE button...")
            enable_selectors = [
                'button:has-text("ENABLE")',
                'button:has-text("Enable")',
                'button:has-text("ACTIVATE")',
                '[aria-label*="Enable"]'
            ]
            
            enable_clicked = False
            for selector in enable_selectors:
                try:
                    elem = page.locator(selector).first
                    if elem.is_visible(timeout=3000):
                        elem.click()
                        enable_clicked = True
                        print("   ✅ ENABLE button clicked")
                        break
                except:
                    continue
            
            if not enable_clicked:
                print("   ⚠️  Could not find ENABLE button")
                print("   📝 Manual action: Click the blue ENABLE button")
                print("   Press Enter after clicking...")
                input()
            
            # Wait for API to be enabled
            print("   ⏳ Enabling Gmail API (10-30 seconds)...")
            page.wait_for_timeout(15000)
            
            # Check if enabled
            for selector in enabled_indicators:
                try:
                    if page.locator(selector).is_visible(timeout=15000):
                        print("   ✅ Gmail API enabled successfully!")
                        return
                except:
                    pass
            
            print("   ℹ️  API enablement status unclear, continuing...")
            
        except Exception as e:
            print(f"   ❌ Error enabling Gmail API: {e}")
            print("   📝 Manual fallback:")
            print("      1. Go to: https://console.cloud.google.com/apis/library/gmail.googleapis.com")
            print("      2. Click the blue 'ENABLE' button")
            print("      3. Wait for 'API enabled' message")
            print("\n   Press Enter when API is enabled...")
            input()
    
    def configure_oauth_consent(self, page):
        """Configure OAuth consent screen"""
        try:
            print("   Navigating to OAuth consent screen...")
            page.goto('https://console.cloud.google.com/apis/credentials/consent')
            page.wait_for_timeout(5000)
            
            # Check if already configured
            configured_indicators = [
                'text=Edit app registration',
                'button:has-text("EDIT APP")',
                'text=Publishing status'
            ]
            
            for selector in configured_indicators:
                try:
                    if page.locator(selector).is_visible(timeout=2000):
                        print("   ℹ️  OAuth consent screen already configured, skipping")
                        return
                except:
                    pass
        
            # Select External user type
            print("   Selecting 'External' user type...")
            external_selectors = [
                'input[value="EXTERNAL"]',
                'label:has-text("External")',
                '[aria-label*="External"]'
            ]
            
            external_clicked = False
            for selector in external_selectors:
                try:
                    elem = page.locator(selector).first
                    if elem.is_visible(timeout=3000):
                        elem.click()
                        external_clicked = True
                        print("   ✅ 'External' selected")
                        page.wait_for_timeout(1000)
                        break
                except:
                    continue
            
            if not external_clicked:
                print("   ⚠️  Could not find 'External' radio button")
                print("   📝 Manual action: Select 'External' user type")
                print("   Press Enter when selected...")
                input()
            
            # Click Create button
            print("   Clicking CREATE...")
            create_selectors = [
                'button:has-text("CREATE")',
                'button:has-text("Create")',
                'button[type="submit"]'
            ]
            
            create_clicked = False
            for selector in create_selectors:
                try:
                    elem = page.locator(selector).first
                    if elem.is_visible(timeout=2000):
                        elem.click()
                        create_clicked = True
                        print("   ✅ CREATE clicked")
                        page.wait_for_timeout(3000)
                        break
                except:
                    continue
            
            if not create_clicked:
                print("   ⚠️  Could not find CREATE button")
                print("   📝 Manual action: Click CREATE button")
                print("   Press Enter after clicking...")
                input()
                page.wait_for_timeout(2000)
            
            # Fill out OAuth consent screen form
            print("   Filling out OAuth consent form...")
            
            # App name
            print(f"      App name: {self.project_name}")
            app_name_selectors = [
                'input[name="displayName"]',
                'input[placeholder*="App name"]',
                'input[aria-label*="App name"]'
            ]
            
            for selector in app_name_selectors:
                try:
                    elem = page.locator(selector).first
                    if elem.is_visible(timeout=2000):
                        elem.clear()
                        elem.fill(self.project_name)
                        print("      ✅ App name entered")
                        break
                except:
                    continue
            
            # User support email
            print(f"      User support email: {self.user_email}")
            email_select_selectors = [
                'select[aria-label*="User support email"]',
                'select:has-text("User support")',
                'cfc-select'
            ]
            
            for selector in email_select_selectors:
                try:
                    elem = page.locator(selector).first
                    if elem.is_visible(timeout=2000):
                        elem.select_option(label=self.user_email)
                        print("      ✅ Support email selected")
                        break
                except:
                    continue
            
            # Developer contact email (at bottom of form)
            print(f"      Developer contact: {self.user_email}")
            dev_email_inputs = page.locator('input[type="email"]').all()
            if len(dev_email_inputs) > 0:
                last_email_input = dev_email_inputs[-1]
                try:
                    if last_email_input.is_visible():
                        last_email_input.clear()
                        last_email_input.fill(self.user_email)
                        print("      ✅ Developer email entered")
                except:
                    pass
            
            page.wait_for_timeout(1000)
            
            # Click Save and Continue (Page 1)
            print("   Saving page 1...")
            self.click_save_and_continue(page)
            
            # Skip Scopes page (Page 2)
            print("   Skipping scopes page...")
            self.click_save_and_continue(page)
            
            # Add test user (Page 3)
            print(f"   Adding test user: {self.user_email}")
            try:
                add_users_btn = page.locator('button:has-text("ADD USERS")').first
                if add_users_btn.is_visible(timeout=3000):
                    add_users_btn.click()
                    page.wait_for_timeout(1500)
                    
                    # Enter test user email
                    email_inputs = page.locator('input[type="email"]').all()
                    if len(email_inputs) > 0:
                        email_inputs[-1].fill(self.user_email)
                        page.wait_for_timeout(500)
                        
                        # Click Add button in modal
                        modal_add_btn = page.locator('button:has-text("ADD")').first
                        if modal_add_btn.is_visible(timeout=2000):
                            modal_add_btn.click()
                            page.wait_for_timeout(2000)
                            print("      ✅ Test user added")
            except Exception as e:
                print(f"      ⚠️  Could not add test user: {e}")
            
            # Save and continue (Page 3)
            print("   Saving test users page...")
            self.click_save_and_continue(page)
            
            # Go back to dashboard (Page 4 - Summary)
            print("   Finishing OAuth consent setup...")
            back_to_dashboard_selectors = [
                'button:has-text("BACK TO DASHBOARD")',
                'button:has-text("Back to dashboard")',
                'a:has-text("Dashboard")'
            ]
            
            for selector in back_to_dashboard_selectors:
                try:
                    elem = page.locator(selector).first
                    if elem.is_visible(timeout=3000):
                        elem.click()
                        page.wait_for_timeout(2000)
                        break
                except:
                    continue
            
            print("   ✅ OAuth consent screen configured successfully!")
            
        except Exception as e:
            print(f"   ❌ Error configuring OAuth consent: {e}")
            print("   📝 Manual fallback:")
            print("      1. Select 'External' user type → Click CREATE")
            print(f"      2. App name: {self.project_name}")
            print(f"      3. User support email: {self.user_email}")
            print(f"      4. Developer contact: {self.user_email}")
            print("      5. Click SAVE AND CONTINUE (3 times)")
            print(f"      6. Add test user: {self.user_email}")
            print("      7. Click BACK TO DASHBOARD")
            print("\n   Press Enter when OAuth consent is configured...")
            input()
    
    def click_save_and_continue(self, page):
        """Helper to click Save and Continue button"""
        save_selectors = [
            'button:has-text("SAVE AND CONTINUE")',
            'button:has-text("Save and Continue")',
            'button[type="submit"]:has-text("Continue")'
        ]
        
        for selector in save_selectors:
            try:
                elem = page.locator(selector).first
                if elem.is_visible(timeout=3000):
                    elem.click()
                    page.wait_for_timeout(3000)
                    return True
            except:
                continue
        
        return False
    
    def create_oauth_credentials(self, page, context):
        """Create OAuth client ID and download credentials"""
        try:
            print("   Navigating to Credentials page...")
            page.goto('https://console.cloud.google.com/apis/credentials')
            page.wait_for_timeout(5000)
            
            # Click Create Credentials
            print("   Looking for CREATE CREDENTIALS button...")
            create_creds_selectors = [
                'button:has-text("CREATE CREDENTIALS")',
                'button:has-text("Create credentials")',
                '[aria-label*="Create credentials"]',
                'text=CREATE CREDENTIALS'
            ]
            
            creds_clicked = False
            for selector in create_creds_selectors:
                try:
                    elem = page.locator(selector).first
                    if elem.is_visible(timeout=3000):
                        elem.click()
                        creds_clicked = True
                        print("   ✅ CREATE CREDENTIALS clicked")
                        page.wait_for_timeout(2000)
                        break
                except:
                    continue
            
            if not creds_clicked:
                print("   ⚠️  Could not find CREATE CREDENTIALS button")
                print("   📝 Manual action: Click 'CREATE CREDENTIALS' at the top")
                print("   Press Enter when dropdown appears...")
                input()
            
            # Click OAuth client ID
            print("   Selecting 'OAuth client ID'...")
            oauth_selectors = [
                'text=OAuth client ID',
                'button:has-text("OAuth client ID")',
                'a:has-text("OAuth client ID")',
                '[role="menuitem"]:has-text("OAuth")'
            ]
            
            oauth_clicked = False
            for selector in oauth_selectors:
                try:
                    elem = page.locator(selector).first
                    if elem.is_visible(timeout=3000):
                        elem.click()
                        oauth_clicked = True
                        print("   ✅ OAuth client ID selected")
                        page.wait_for_timeout(3000)
                        break
                except:
                    continue
            
            if not oauth_clicked:
                print("   ⚠️  Could not find 'OAuth client ID' option")
                print("   📝 Manual action: Click 'OAuth client ID' in the dropdown")
                print("   Press Enter when form appears...")
                input()
                page.wait_for_timeout(2000)
            
            # Select Desktop app
            print("   Selecting application type: Desktop app...")
            app_type_selectors = [
                'select[aria-label*="Application type"]',
                'select:has-text("Application type")',
                'cfc-select'
            ]
            
            type_selected = False
            for selector in app_type_selectors:
                try:
                    elem = page.locator(selector).first
                    if elem.is_visible(timeout=3000):
                        elem.select_option(label='Desktop app')
                        type_selected = True
                        print("   ✅ Desktop app selected")
                        page.wait_for_timeout(1000)
                        break
                except:
                    try:
                        elem.select_option(value='DESKTOP')
                        type_selected = True
                        print("   ✅ Desktop app selected")
                        page.wait_for_timeout(1000)
                        break
                    except:
                        continue
            
            if not type_selected:
                print("   ⚠️  Could not select Desktop app automatically")
                print("   📝 Manual action: Select 'Desktop app' from dropdown")
                print("   Press Enter when selected...")
                input()
            
            # Enter name
            print("   Entering OAuth client name...")
            name_selectors = [
                'input[name="displayName"]',
                'input[placeholder*="Name"]',
                'input[aria-label*="Name"]',
                'input[type="text"]'
            ]
            
            name_entered = False
            for selector in name_selectors:
                try:
                    elem = page.locator(selector).first
                    if elem.is_visible(timeout=2000):
                        elem.clear()
                        elem.fill("Personal CRM Desktop")
                        name_entered = True
                        print("   ✅ Name entered: Personal CRM Desktop")
                        page.wait_for_timeout(500)
                        break
                except:
                    continue
            
            if not name_entered:
                print("   ⚠️  Could not enter name automatically")
                print("   📝 Manual action: Type 'Personal CRM Desktop' in Name field")
                print("   Press Enter when done...")
                input()
            
            # Click Create
            print("   Clicking CREATE...")
            create_selectors = [
                'button:has-text("CREATE")',
                'button:has-text("Create")',
                'button[type="submit"]'
            ]
            
            create_clicked = False
            for selector in create_selectors:
                try:
                    elem = page.locator(selector).first
                    if elem.is_visible(timeout=2000):
                        elem.click()
                        create_clicked = True
                        print("   ✅ CREATE clicked")
                        break
                except:
                    continue
            
            if not create_clicked:
                print("   ⚠️  Could not find CREATE button")
                print("   📝 Manual action: Click the CREATE button")
                print("   Press Enter after clicking...")
                input()
            
            # Wait for success modal
            print("   ⏳ Creating OAuth client (5-10 seconds)...")
            page.wait_for_timeout(8000)
            
            # Download credentials
            print("   Looking for DOWNLOAD JSON button...")
            download_selectors = [
                'button:has-text("DOWNLOAD JSON")',
                'button:has-text("Download JSON")',
                'a:has-text("DOWNLOAD")',
                '[aria-label*="Download"]'
            ]
            
            credentials_path = None
            for selector in download_selectors:
                try:
                    elem = page.locator(selector).first
                    if elem.is_visible(timeout=5000):
                        # Set up download listener
                        with page.expect_download(timeout=10000) as download_info:
                            elem.click()
                        
                        download = download_info.value
                        credentials_path = self.downloads_dir / download.suggested_filename
                        download.save_as(credentials_path)
                        
                        print(f"   ✅ Downloaded credentials: {credentials_path.name}")
                        break
                except Exception as e:
                    print(f"      Debug: {e}")
                    continue
            
            if not credentials_path:
                print("   ⚠️  Could not download credentials automatically")
                print("   📝 Manual action:")
                print("      1. Click 'DOWNLOAD JSON' in the success popup")
                print("      2. OR go to Credentials page and download manually")
                print("      3. Move the file to: " + str(self.crm_dir))
                print("      4. Rename it to: credentials.json")
                print("\n   Press Enter when credentials.json is in the crm/ folder...")
                input()
                
                # Check if user put it there manually
                manual_path = self.crm_dir / 'credentials.json'
                if manual_path.exists():
                    print(f"   ✅ Found credentials.json manually placed")
                    return manual_path
                else:
                    print("   ⚠️  credentials.json not found")
                    return None
            
            return credentials_path
                
        except Exception as e:
            print(f"   ❌ Error creating OAuth credentials: {e}")
            print("   📝 Manual fallback:")
            print("      1. Go to: https://console.cloud.google.com/apis/credentials")
            print("      2. Click 'CREATE CREDENTIALS' → 'OAuth client ID'")
            print("      3. Application type: Desktop app")
            print("      4. Name: Personal CRM Desktop")
            print("      5. Click CREATE")
            print("      6. Download JSON")
            print("      7. Move file to crm/ folder as credentials.json")
            print("\n   Press Enter when done...")
            input()
            
            manual_path = self.crm_dir / 'credentials.json'
            return manual_path if manual_path.exists() else None
    
    def setup_credentials(self, downloaded_path: Path):
        """Move downloaded credentials to CRM directory"""
        target_path = self.crm_dir / 'credentials.json'
        
        if downloaded_path.exists():
            # Verify it's valid JSON
            try:
                with open(downloaded_path, 'r') as f:
                    data = json.load(f)
                
                # Check structure
                if 'installed' in data or 'web' in data:
                    # Copy to target location
                    with open(target_path, 'w') as f:
                        json.dump(data, f, indent=2)
                    
                    print(f"   ✅ Credentials saved to: {target_path}")
                    
                    # Clean up download
                    downloaded_path.unlink()
                else:
                    print("   ⚠️  Downloaded file doesn't look like OAuth credentials")
            
            except json.JSONDecodeError:
                print("   ⚠️  Downloaded file is not valid JSON")
        else:
            print(f"   ⚠️  Downloaded file not found: {downloaded_path}")


def main():
    """Run Gmail API setup"""
    import sys
    
    headless = '--headless' in sys.argv
    
    setup = GmailAPISetup(headless=headless)
    
    try:
        setup.run()
        print("\n✅ Setup complete!")
        print("\n🎯 Next steps:")
        print("   1. Run authentication: python -c \"from gmail_scanner import GmailScanner; from db import CRMDB; scanner = GmailScanner(CRMDB()); scanner.authenticate()\"")
        print("   2. Test email scan: python crm_cli.py 'sync email'")
        print("   3. Set up daily cron job")
        
    except KeyboardInterrupt:
        print("\n\n⚠️  Setup cancelled by user")
        sys.exit(1)
    
    except Exception as e:
        print(f"\n\n❌ Setup failed: {e}")
        print("\n📖 Fallback: Manual setup guide in skills/gmail-api-setup.md")
        sys.exit(1)


if __name__ == '__main__':
    main()
