#!/usr/bin/env python3
"""
Payment Processing System
Handles Stripe integration, payment links, recurring billing
"""

import json
from typing import Dict, Optional
from datetime import datetime, timedelta

class PaymentProcessor:
    """
    Payment processing integration
    
    Setup:
    1. Stripe Account (or Mercury/Relay business account)
    2. Payment Links (one-time + subscription)
    3. Automatic delivery on payment
    4. Recurring billing for hosting
    """
    
    def __init__(self):
        self.stripe_key = None  # Will be set from config
        self.products = self.define_products()
    
    def define_products(self) -> Dict:
        """Define pricing structure"""
        
        return {
            'website_purchase': {
                'name': 'Professional Business Website',
                'price': 250,  # One-time
                'currency': 'USD',
                'description': 'Custom-built website with ownership transfer'
            },
            'hosting': {
                'name': 'Website Hosting',
                'price': 7,  # Monthly
                'currency': 'USD',
                'description': 'Website hosting (no maintenance)',
                'free_trial_days': 30
            }
        }
    
    def create_payment_link(self, business: Dict, product_type: str = 'website_purchase') -> str:
        """
        Create Stripe payment link
        
        Process:
        1. Create Stripe product (or use existing)
        2. Create price
        3. Create payment link
        4. Return URL
        """
        
        product = self.products[product_type]
        
        # Would integrate with Stripe API here
        # For now, generate placeholder URL
        
        business_slug = business['name'].lower().replace(' ', '-').replace("'", '')
        payment_url = f"https://pay.northstarsynergy.com/{business_slug}"
        
        return payment_url
    
    def create_subscription_link(self, business: Dict) -> str:
        """
        Create subscription link for hosting
        
        Features:
        - First month free
        - $7/month after
        - Cancel anytime
        - No maintenance included
        """
        
        business_slug = business['name'].lower().replace(' ', '-').replace("'", '')
        subscription_url = f"https://pay.northstarsynergy.com/{business_slug}/hosting"
        
        return subscription_url
    
    def handle_successful_payment(self, payment_data: Dict) -> Dict:
        """
        Handle successful payment webhook
        
        Actions:
        1. Mark website as "sold"
        2. Transfer ownership (deploy to their chosen hosting OR our hosting)
        3. Send delivery email with credentials
        4. Log transaction
        5. Update CRM
        """
        
        business_id = payment_data['business_id']
        amount = payment_data['amount']
        payment_id = payment_data['payment_id']
        
        # Log transaction
        transaction = {
            'timestamp': datetime.now().isoformat(),
            'business_id': business_id,
            'amount': amount,
            'payment_id': payment_id,
            'product': 'website_purchase',
            'status': 'completed'
        }
        
        self.log_transaction(transaction)
        
        # Trigger delivery
        delivery_result = self.deliver_website(business_id)
        
        return {
            'success': True,
            'transaction_id': payment_id,
            'delivery_status': delivery_result['status']
        }
    
    def deliver_website(self, business_id: str) -> Dict:
        """
        Deliver website after payment
        
        Delivery options:
        1. Deploy to our hosting (automatic)
        2. Provide files for their hosting
        3. Transfer domain management
        """
        
        # Get website files
        # Deploy to production hosting
        # Send credentials email
        
        return {
            'status': 'delivered',
            'url': f"https://{business_id}.com",  # Custom domain or subdomain
            'credentials_sent': True
        }
    
    def log_transaction(self, transaction: Dict):
        """Log transaction to file and CRM"""
        
        with open('transactions.jsonl', 'a') as f:
            f.write(json.dumps(transaction) + '\n')
    
    def generate_invoice(self, business: Dict, amount: float) -> str:
        """Generate professional invoice"""
        
        invoice_number = f"NS-{datetime.now().strftime('%Y%m%d')}-{business['name'][:4].upper()}"
        
        invoice = f"""
INVOICE #{invoice_number}

From: NorthStar Synergy
Date: {datetime.now().strftime('%B %d, %Y')}

Bill To:
{business['name']}
{business.get('address', '')}
{business.get('phone', '')}

Description                          Amount
────────────────────────────────────────────
Professional Website                 $250.00
  Custom-built website
  Ownership transfer
  SEO optimization included

Website Hosting                      $7.00/mo
  First month FREE
  Starts: {(datetime.now() + timedelta(days=30)).strftime('%B %d, %Y')}

────────────────────────────────────────────
Total Due Now:                       $250.00

Payment Link: {self.create_payment_link(business)}

Terms:
- One-time payment for website ownership
- Monthly hosting billing starts after 30-day free trial
- Cancel hosting anytime (website remains yours)
- No hidden fees

Questions? Reply to this email or call (555) 123-4567
"""
        
        return invoice.strip()


class BusinessBankSetup:
    """
    Guide for setting up business banking
    
    Options researched:
    1. Mercury - Best for startups, instant setup, no fees
    2. Relay - Multiple accounts, good for separating income
    3. Stripe Atlas + Banking - All-in-one for online businesses
    """
    
    def __init__(self):
        self.options = {
            'mercury': {
                'pros': ['Instant approval (typically)', 'No monthly fees', 'Easy Stripe integration', 'Mobile app'],
                'cons': ['US businesses only', 'May reject some business types'],
                'setup_time': '1-3 days',
                'url': 'https://mercury.com'
            },
            'relay': {
                'pros': ['Free', 'Multiple accounts', 'Good for separating client payments', 'Instant setup'],
                'cons': ['Limited features vs traditional banks'],
                'setup_time': '1-2 days',
                'url': 'https://relayfi.com'
            },
            'stripe': {
                'pros': ['Instant', 'Built for online payments', 'No bank account needed initially'],
                'cons': ['Higher fees', 'Need to transfer to bank eventually'],
                'setup_time': 'Immediate',
                'url': 'https://stripe.com'
            }
        }
    
    def recommend_setup(self) -> str:
        """Recommend best setup for this business model"""
        
        return """
RECOMMENDED SETUP FOR NORTHSTAR SYNERGY:

**Phase 1 (Immediate - Tonight):**
1. Set up Stripe account (stripe.com)
   - Provides instant payment processing
   - No business bank required initially
   - Can process payments within hours

**Phase 2 (This Week):**
2. Open Mercury business account (mercury.com)
   - Free business checking
   - Connect to Stripe
   - Professional banking for business
   - Setup time: 1-3 days

**Phase 3 (After First Sales):**
3. Configure automatic transfers
   - Stripe → Mercury daily
   - Keep 30-day float in Stripe for refunds
   - Transfer rest to Mercury for operating capital

**IMMEDIATE ACTION (Tonight):**
```
1. Go to stripe.com/register
2. Business type: LLC or Sole Proprietor
3. Business name: NorthStar Synergy
4. Connect bank account (personal initially, then Mercury)
5. Create first product: "Professional Website - $250"
6. Generate payment link
7. Test with $1 charge
8. Ready to accept payments
```

Total setup time: 30 minutes to start accepting money.
"""


if __name__ == '__main__':
    processor = PaymentProcessor()
    bank_setup = BusinessBankSetup()
    
    test_business = {
        'name': 'Green Valley Landscaping',
        'address': '123 Main St, Seattle, WA',
        'phone': '(206) 555-1234'
    }
    
    print("Payment Link:", processor.create_payment_link(test_business))
    print("\nInvoice:")
    print(processor.generate_invoice(test_business, 250))
    print("\n" + "="*60)
    print("\nBanking Setup Guide:")
    print(bank_setup.recommend_setup())
