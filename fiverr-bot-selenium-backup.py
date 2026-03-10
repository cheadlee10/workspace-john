#!/usr/bin/env python3
"""
FIVERR BOT — SELENIUM BACKUP (If Playwright Fails)
Uses: undetected_chromedriver + Selenium
Better anti-detection than plain Selenium
Setup: pip install selenium undetected-chromedriver
"""

import undetected_chromedriver as uc
import time
import random
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

CREDS = {
    'email': 'Craigheadlee74@gmail.com',
    'password': 'F1f2f3f4',
    'base_url': 'https://www.fiverr.com',
}

GIGS = [
    {
        'id': 1,
        'title': 'I will do fast excel data entry and copy paste work',
        'category': 'Data > Data Entry > Data Entry Specialists',
        'description': '''Need fast and accurate data entry? I've got you covered!

I will:
✅ Copy data from PDF, image, or website to Excel
✅ Organize data into clean tables
✅ Format for easy reading
✅ Remove duplicates and errors
✅ Deliver within 24 hours

What I need from you:
• Source files (PDF, images, links)
• Desired format/structure
• Any specific requirements

Why choose me:
⚡ Lightning fast delivery
✓ 100% accurate
💬 Quick responses
🔄 Unlimited revisions until satisfied

Perfect for:
• Contact lists
• Product catalogs
• Customer databases
• Survey results
• Invoice data

Let's get your data organized! Order now or message me with questions.''',
        'tags': ['data entry', 'excel', 'copy paste', 'data entry excel', 'data entry work'],
    },
    {
        'id': 2,
        'title': 'I will clean and format your messy excel spreadsheet data',
        'category': 'Data > Data Cleaning > Data Processing',
        'description': '''Got messy, unorganized data? I'll clean it up fast!

I will:
✅ Remove extra spaces and line breaks
✅ Fix capitalization (UPPER, lower, Proper)
✅ Standardize phone numbers and dates
✅ Remove duplicates
✅ Split/merge columns
✅ Fix formatting inconsistencies

What you get:
• Clean, organized spreadsheet
• Professional formatting
• Easy-to-read structure
• Same-day delivery

Perfect for:
• Customer lists
• Contact databases
• Product catalogs''',
        'tags': ['data cleaning', 'excel', 'spreadsheet', 'data formatting', 'data processing'],
    },
    {
        'id': 3,
        'title': 'I will build a list and organize it fast',
        'category': 'Data > List Building > Compilation',
        'description': '''Need a list compiled or organized? I'll do it quickly and accurately!

I will:
✅ Build lists from scratch based on your requirements
✅ Compile and organize existing data
✅ Remove duplicates and clean up
✅ Organize alphabetically or by category
✅ Format professionally

What I can do:
• Email lists
• Contact databases
• Product/service lists
• Lead lists
• Resource directories

Perfect for:
• Marketing campaigns
• Research projects
• Business outreach
• Data organization''',
        'tags': ['list building', 'data compilation', 'organization', 'database', 'lists'],
    },
]

def random_delay(min_sec=1, max_sec=3):
    """Human-like delay"""
    time.sleep(random.uniform(min_sec, max_sec))

def type_human(element, text, min_delay=0.05, max_delay=0.15):
    """Type text with human-like delays"""
    for char in text:
        element.send_keys(char)
        time.sleep(random.uniform(min_delay, max_delay))

def move_mouse_randomly(driver, x=None, y=None):
    """Move mouse randomly (appears human)"""
    actions = ActionChains(driver)
    if x and y:
        # Random offset
        x += random.randint(-30, 30)
        y += random.randint(-30, 30)
        actions.move_by_offset(x, y).perform()

def init_driver():
    """Initialize undetected chromedriver"""
    print('[SELENIUM] Initializing undetected chromedriver...')
    
    options = uc.ChromeOptions()
    # Note: undetected_chromedriver handles most evasion automatically
    
    driver = uc.Chrome(options=options)
    print('[SELENIUM] Driver initialized (anti-detection enabled)')
    return driver

def login(driver):
    """Login to Fiverr with Selenium"""
    print('[LOGIN] Navigating to login...')
    driver.get(f'{CREDS["base_url"]}/login')
    random_delay(2, 4)
    
    try:
        print('[LOGIN] Finding email field...')
        email_field = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'input[type="email"]'))
        )
        
        print('[LOGIN] Entering email...')
        email_field.click()
        random_delay(0.5, 1)
        type_human(email_field, CREDS['email'])
        random_delay(1, 2)
        
        print('[LOGIN] Finding password field...')
        password_field = driver.find_element(By.CSS_SELECTOR, 'input[type="password"]')
        password_field.click()
        random_delay(0.5, 1)
        type_human(password_field, CREDS['password'])
        random_delay(1, 2)
        
        print('[LOGIN] Clicking login button...')
        login_button = driver.find_element(By.XPATH, '//button[contains(text(), "Continue") or contains(text(), "Login")]')
        login_button.click()
        random_delay(3, 5)
        
        print('[LOGIN] Waiting for navigation...')
        WebDriverWait(driver, 15).until(
            lambda d: 'login' not in d.current_url.lower()
        )
        
        print('✅ [LOGIN] Login successful')
        return True
        
    except Exception as error:
        print(f'❌ [LOGIN] Failed: {str(error)}')
        print('[DEBUG] Browser still open for manual inspection')
        return False

def post_gig(driver, gig):
    """Post a single gig"""
    print(f'\n[GIG {gig["id"]}] Starting gig posting...')
    
    try:
        print(f'[GIG {gig["id"]}] Navigating to gigs page...')
        driver.get(f'{CREDS["base_url"]}/gigs')
        random_delay(2, 3)
        
        print(f'[GIG {gig["id"]}] Finding create gig button...')
        create_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, '//button[contains(., "Create")] | //a[contains(., "Create")]'))
        )
        
        print(f'[GIG {gig["id"]}] Clicking create button...')
        create_button.click()
        random_delay(2, 4)
        
        print(f'[GIG {gig["id"]}] Waiting for form...')
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, 'input'))
        )
        
        print(f'[GIG {gig["id"]}] Filling title...')
        title_field = driver.find_element(By.XPATH, '//input[@placeholder*="title" or @name*="title"]')
        title_field.click()
        random_delay(0.5, 1)
        type_human(title_field, gig['title'])
        random_delay(1, 2)
        
        print(f'[GIG {gig["id"]}] Scrolling down...')
        driver.execute_script('window.scrollBy(0, 300)')
        random_delay(1, 2)
        
        print(f'[GIG {gig["id"]}] Filling description...')
        desc_field = driver.find_element(By.TAG_NAME, 'textarea')
        desc_field.click()
        random_delay(0.5, 1)
        # Clear field first
        desc_field.send_keys(Keys.CONTROL + 'a')
        desc_field.send_keys(Keys.DELETE)
        type_human(desc_field, gig['description'])
        random_delay(1, 2)
        
        print(f'✅ [GIG {gig["id"]}] Form filled (manual submission next)')
        print(f'[GIG {gig["id"]}] Next: Click "Save Draft" or "Continue" button')
        
        return True
        
    except Exception as error:
        print(f'❌ [GIG {gig["id"]}] Failed: {str(error)}')
        print(f'[DEBUG] Browser still open. Check form structure.')
        return False

def main():
    driver = None
    try:
        driver = init_driver()
        
        # Login
        if not login(driver):
            print('[ERROR] Login failed. Cannot proceed.')
            return False
        
        # Post gigs
        success_count = 0
        for gig in GIGS:
            if post_gig(driver, gig):
                success_count += 1
                random_delay(5, 10)  # Wait between gigs
        
        print(f'\n[SUMMARY] {success_count}/{len(GIGS)} gigs prepared')
        print('[ACTION] Forms are filled. Click "Save" or "Continue" to submit.')
        
        # Keep browser open
        print('\n[WAIT] Browser will stay open. Complete submissions manually or script next step.')
        time.sleep(60)  # Keep open for 60 sec
        
    except Exception as error:
        print(f'[FATAL] {str(error)}')
    
    finally:
        if driver:
            driver.quit()

if __name__ == '__main__':
    main()
