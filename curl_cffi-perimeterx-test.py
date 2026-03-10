#!/usr/bin/env python3
"""
CURL_CFFI PERIMETERX TEST — TLS Fingerprint Spoofing Validation
Goal: Test if curl_cffi can bypass PerimeterX on Fiverr using TLS spoofing
Status: Live testing (2026-02-24 23:44 PST)
"""

import sys
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format='[%(asctime)s] %(levelname)s - %(message)s')
log = logging.getLogger(__name__)

log.info("Checking if curl_cffi is installed...")

try:
    from curl_cffi import requests
    log.info("✅ curl_cffi imported successfully")
except ImportError:
    log.error("❌ curl_cffi not installed. Installing...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "curl_cffi"])
    from curl_cffi import requests
    log.info("✅ curl_cffi installed and imported")

import time
from bs4 import BeautifulSoup

class CurlCffiTest:
    def __init__(self):
        self.session = requests.Session()
        self.results = {
            "basic_http": False,
            "perimeterx_detection": None,
            "tls_spoofing_works": False,
            "login_possible": False,
            "errors": []
        }

    def test_basic_connection(self):
        """Test 1: Basic connection with TLS spoofing"""
        log.info("\n[TEST 1] Testing basic HTTPS connection with TLS spoofing...")
        
        try:
            # Test with Chrome120 TLS fingerprint
            response = self.session.get(
                "https://tls.browserleaks.com/json",
                impersonate="chrome120",
                timeout=10
            )
            
            if response.status_code == 200:
                log.info(f"✅ Connected successfully (status {response.status_code})")
                log.info(f"Response: {response.text[:200]}")
                self.results["basic_http"] = True
                return True
            else:
                log.warning(f"⚠️  Got status {response.status_code}")
                self.results["errors"].append(f"HTTP status {response.status_code}")
                return False
                
        except Exception as e:
            log.error(f"❌ Connection failed: {str(e)}")
            self.results["errors"].append(f"Connection: {str(e)}")
            return False

    def test_fiverr_access(self):
        """Test 2: Can we access Fiverr homepage?"""
        log.info("\n[TEST 2] Testing Fiverr homepage access...")
        
        try:
            response = self.session.get(
                "https://fiverr.com",
                impersonate="chrome120",
                timeout=10
            )
            
            log.info(f"Status: {response.status_code}")
            
            # Check for PerimeterX detection
            if "perimeterx" in response.text.lower() or "human security" in response.text.lower():
                log.warning("⚠️  PerimeterX detected in response!")
                self.results["perimeterx_detection"] = True
                return False
            elif response.status_code == 200:
                log.info("✅ Fiverr homepage accessed without PerimeterX block")
                self.results["tls_spoofing_works"] = True
                return True
            else:
                log.warning(f"⚠️  Got status {response.status_code} (may be PerimeterX block)")
                return False
                
        except Exception as e:
            log.error(f"❌ Fiverr access failed: {str(e)}")
            self.results["errors"].append(f"Fiverr access: {str(e)}")
            return False

    def test_login_form(self):
        """Test 3: Can we access the login form?"""
        log.info("\n[TEST 3] Testing Fiverr login form access...")
        
        try:
            response = self.session.get(
                "https://fiverr.com/login",
                impersonate="chrome120",
                timeout=10
            )
            
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                email_input = soup.find('input', {'type': 'email'})
                
                if email_input:
                    log.info("✅ Login form found and accessible")
                    self.results["login_possible"] = True
                    return True
                else:
                    log.warning("⚠️  Email input field not found")
                    return False
            else:
                log.warning(f"⚠️  Got status {response.status_code}")
                return False
                
        except Exception as e:
            log.error(f"❌ Login form test failed: {str(e)}")
            self.results["errors"].append(f"Login form: {str(e)}")
            return False

    def test_with_proxy(self, proxy_url):
        """Test 4: curl_cffi with residential proxy"""
        log.info(f"\n[TEST 4] Testing with residential proxy: {proxy_url[:30]}...")
        
        try:
            proxies = {
                "https": proxy_url,
                "http": proxy_url
            }
            
            response = self.session.get(
                "https://fiverr.com",
                impersonate="chrome120",
                proxies=proxies,
                timeout=15
            )
            
            if response.status_code == 200 and "perimeterx" not in response.text.lower():
                log.info("✅ Proxy + TLS spoofing works!")
                return True
            else:
                log.warning(f"⚠️  Proxy test inconclusive (status {response.status_code})")
                return False
                
        except Exception as e:
            log.error(f"❌ Proxy test failed: {str(e)}")
            self.results["errors"].append(f"Proxy: {str(e)}")
            return False

    def run_full_test(self):
        """Execute full test sequence"""
        log.info("═" * 60)
        log.info("CURL_CFFI PERIMETERX BYPASS TEST")
        log.info("═" * 60)
        
        # Test 1: Basic connection
        self.test_basic_connection()
        time.sleep(1)
        
        # Test 2: Fiverr access
        self.test_fiverr_access()
        time.sleep(1)
        
        # Test 3: Login form
        self.test_login_form()
        
        # Test 4: With proxy (optional)
        log.info("\n[TEST 4] Testing with residential proxy...")
        log.info("⏭️  Skipping (no credentials available for testing)")
        
        # Report results
        self.print_results()
        return self.results

    def print_results(self):
        """Print test results"""
        log.info("\n" + "═" * 60)
        log.info("TEST RESULTS SUMMARY")
        log.info("═" * 60)
        
        for test, result in self.results.items():
            if test != "errors":
                if result is True:
                    status = "✅"
                elif result is False:
                    status = "❌"
                else:
                    status = "⚠️"
                log.info(f"{status} {test}: {result}")
        
        if self.results["errors"]:
            log.info("\nErrors:")
            for error in self.results["errors"]:
                log.info(f"  - {error}")
        
        # Verdict
        log.info("\n" + "─" * 60)
        if self.results["tls_spoofing_works"] and self.results["login_possible"]:
            log.info("🟢 SUCCESS: curl_cffi bypassed PerimeterX!")
            log.info("Recommendation: Use curl_cffi + residential proxy for production")
        elif self.results["perimeterx_detection"]:
            log.info("🔴 FAILURE: PerimeterX blocked curl_cffi")
            log.info("Recommendation: Try Axiom.ai (browser-based) approach")
        else:
            log.info("🟡 INCONCLUSIVE: Some tests passed, need to retry")

if __name__ == "__main__":
    test = CurlCffiTest()
    results = test.run_full_test()
    
    # Save results
    import json
    with open("curl_cffi_test_results.json", "w") as f:
        json.dump(results, f, indent=2)
    
    log.info(f"\n✅ Results saved to: curl_cffi_test_results.json")
