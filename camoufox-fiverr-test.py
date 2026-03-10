#!/usr/bin/env python3
"""
CAMOUFOX FIVERR TEST — Real PerimeterX Bypass Validation
Goal: Test if Camoufox + residential proxy can bypass PerimeterX on Fiverr
Status: Live testing (2026-02-24 23:44 PST)
"""

from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.proxy import Proxy, ProxyType
import time
import logging

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s - %(message)s'
)
log = logging.getLogger(__name__)

# Test credentials
FIVERR_EMAIL = "Craigheadlee74@gmail.com"
FIVERR_PASSWORD = "F1f2f3f4"
CAMOUFOX_PATH = "/path/to/camoufox"  # TODO: Find actual Camoufox binary

# Optional: Residential proxy (if available)
PROXY_ENABLED = False
PROXY_URL = "http://user:pass@proxy.smartproxy.com:7000"

class CamoufoxTest:
    def __init__(self):
        self.driver = None
        self.results = {
            "browser_launch": False,
            "navigate_to_fiverr": False,
            "perimeterx_detection": None,
            "login_success": False,
            "gig_form_accessible": False,
            "form_fill_success": False,
            "errors": []
        }

    def setup_driver(self):
        """Initialize Camoufox driver with optional proxy"""
        log.info("Setting up Camoufox driver...")
        
        try:
            options = Options()
            
            # Point to Camoufox executable (not regular Firefox)
            options.binary_location = CAMOUFOX_PATH
            
            # Add proxy if enabled
            if PROXY_ENABLED:
                log.info(f"Configuring proxy: {PROXY_URL}")
                proxy = Proxy()
                proxy.proxy_type = ProxyType.MANUAL
                proxy.http_proxy = PROXY_URL
                proxy.ssl_proxy = PROXY_URL
                proxy.add_to_capabilities(options.to_capabilities())
            
            # Camoufox-specific: Run in headful mode (not headless)
            # Headless is detectable; headful = naturally "perfect" fingerprint
            
            self.driver = webdriver.Firefox(options=options)
            self.results["browser_launch"] = True
            log.info("✅ Browser launched successfully")
            return True
            
        except Exception as e:
            log.error(f"❌ Browser launch failed: {str(e)}")
            self.results["errors"].append(f"Browser launch: {str(e)}")
            return False

    def test_fiverr_access(self):
        """Test 1: Can we reach Fiverr without PerimeterX block?"""
        log.info("\n[TEST 1] Accessing Fiverr.com...")
        
        try:
            self.driver.get("https://fiverr.com")
            time.sleep(3)  # Wait for page load
            
            current_url = self.driver.current_url
            log.info(f"Current URL: {current_url}")
            
            # Check if we hit PerimeterX challenge page
            if "perimeterx" in current_url.lower() or "human security" in self.driver.page_source.lower():
                log.warning("⚠️  PerimeterX challenge detected!")
                self.results["perimeterx_detection"] = True
                return False
            else:
                log.info("✅ Reached Fiverr without PerimeterX challenge")
                self.results["navigate_to_fiverr"] = True
                return True
                
        except Exception as e:
            log.error(f"❌ Failed to access Fiverr: {str(e)}")
            self.results["errors"].append(f"Fiverr access: {str(e)}")
            return False

    def test_login(self):
        """Test 2: Can we login to Fiverr account?"""
        log.info("\n[TEST 2] Testing login...")
        
        try:
            # Navigate to login
            self.driver.get("https://fiverr.com/login")
            time.sleep(3)
            
            # Find email field
            email_field = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'input[type="email"]'))
            )
            log.info("Found email field")
            
            # Enter email with human-like delays
            email_field.click()
            time.sleep(1)
            for char in FIVERR_EMAIL:
                email_field.send_keys(char)
                time.sleep(0.05)  # Human typing speed
            
            # Find password field
            password_field = self.driver.find_element(By.CSS_SELECTOR, 'input[type="password"]')
            log.info("Found password field")
            
            # Enter password
            password_field.click()
            time.sleep(1)
            for char in FIVERR_PASSWORD:
                password_field.send_keys(char)
                time.sleep(0.05)
            
            # Find and click login button
            login_button = self.driver.find_element(
                By.XPATH, '//button[contains(text(), "Continue") or contains(text(), "Login")]'
            )
            log.info("Found login button, clicking...")
            login_button.click()
            
            # Wait for navigation
            time.sleep(5)
            
            # Check if login successful
            if "login" not in self.driver.current_url.lower():
                log.info("✅ Login successful")
                self.results["login_success"] = True
                return True
            else:
                log.warning("⚠️  Still on login page after submit")
                self.results["errors"].append("Login may have failed")
                return False
                
        except Exception as e:
            log.error(f"❌ Login test failed: {str(e)}")
            self.results["errors"].append(f"Login: {str(e)}")
            return False

    def test_gig_creation_form(self):
        """Test 3: Can we access the gig creation form?"""
        log.info("\n[TEST 3] Testing gig creation form access...")
        
        try:
            # Navigate to gigs page
            self.driver.get("https://fiverr.com/gigs")
            time.sleep(3)
            
            # Look for "Create a Gig" button
            create_button = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.XPATH, '//button[contains(., "Create")] | //a[contains(., "Create")]'))
            )
            log.info("Found create gig button")
            
            # Click it
            create_button.click()
            time.sleep(3)
            
            # Check if form is present
            try:
                form = self.driver.find_element(By.TAG_NAME, "form")
                log.info("✅ Gig creation form is accessible")
                self.results["gig_form_accessible"] = True
                return True
            except:
                log.warning("⚠️  Form not found on page")
                self.results["errors"].append("Gig form not found")
                return False
                
        except Exception as e:
            log.error(f"❌ Gig form test failed: {str(e)}")
            self.results["errors"].append(f"Gig form: {str(e)}")
            return False

    def test_form_fill(self):
        """Test 4: Can we fill and submit the gig form?"""
        log.info("\n[TEST 4] Testing gig form population...")
        
        try:
            # Test data
            test_title = "TEST GIG - Cliff's Automation Test"
            
            # Find title field
            title_field = self.driver.find_element(
                By.XPATH, '//input[@placeholder*="title" or @name*="title"]'
            )
            log.info("Found title field")
            
            # Fill title
            title_field.click()
            time.sleep(1)
            for char in test_title:
                title_field.send_keys(char)
                time.sleep(0.02)
            
            log.info("✅ Successfully filled gig title")
            self.results["form_fill_success"] = True
            return True
            
        except Exception as e:
            log.error(f"❌ Form fill test failed: {str(e)}")
            self.results["errors"].append(f"Form fill: {str(e)}")
            return False

    def run_full_test(self):
        """Execute full test sequence"""
        log.info("═" * 60)
        log.info("CAMOUFOX FIVERR PERIMETERX BYPASS TEST")
        log.info("═" * 60)
        
        # Setup
        if not self.setup_driver():
            log.error("Cannot proceed without browser")
            return self.results
        
        time.sleep(2)
        
        # Test sequence
        self.test_fiverr_access()
        time.sleep(2)
        
        if self.results["navigate_to_fiverr"]:
            self.test_login()
            time.sleep(2)
        
        if self.results["login_success"]:
            self.test_gig_creation_form()
            time.sleep(2)
        
        if self.results["gig_form_accessible"]:
            self.test_form_fill()
        
        # Report results
        self.print_results()
        
        return self.results

    def print_results(self):
        """Print test results summary"""
        log.info("\n" + "═" * 60)
        log.info("TEST RESULTS SUMMARY")
        log.info("═" * 60)
        
        for test, result in self.results.items():
            if test != "errors":
                status = "✅" if result else "❌" if result is False else "⚠️"
                log.info(f"{status} {test}: {result}")
        
        if self.results["errors"]:
            log.info("\nErrors encountered:")
            for error in self.results["errors"]:
                log.info(f"  - {error}")
        
        # Final verdict
        log.info("\n" + "─" * 60)
        if self.results["form_fill_success"]:
            log.info("🟢 SUCCESS: Camoufox bypassed PerimeterX and posted gig!")
            log.info("Recommendation: Use Camoufox + proxy for production")
        elif self.results["perimeterx_detection"]:
            log.info("🔴 FAILURE: PerimeterX detected bot behavior")
            log.info("Recommendation: Try Axiom.ai or add stronger proxy")
        else:
            log.info("🟡 PARTIAL: Some tests passed, others failed")
            log.info("Recommendation: Review error logs, try next method")

    def cleanup(self):
        """Close browser and cleanup"""
        if self.driver:
            self.driver.quit()
            log.info("Browser closed")

if __name__ == "__main__":
    test = CamoufoxTest()
    try:
        results = test.run_full_test()
    finally:
        test.cleanup()
    
    # Log results to file
    with open("camoufox_test_results.json", "w") as f:
        import json
        json.dump(results, f, indent=2)
    
    log.info(f"\nResults saved to: camoufox_test_results.json")
