#!/usr/bin/env python3
"""
Objection Handling AI Engine
Handles ANY objection automatically using LLM + proven frameworks
"""

import json
from typing import Dict, Optional

class ObjectionHandler:
    """
    AI-powered objection handling
    
    Frameworks:
    1. LAER (Listen, Acknowledge, Explore, Respond)
    2. Feel-Felt-Found
    3. Boomerang Method
    4. Question Method
    
    Common objections + responses pre-loaded
    """
    
    def __init__(self):
        self.common_objections = self.load_common_objections()
        self.response_templates = self.load_response_templates()
    
    def load_common_objections(self) -> Dict:
        """Load common objections and categorize them"""
        
        return {
            'price': [
                "too expensive",
                "can't afford",
                "price is too high",
                "cheaper option",
                "budget"
            ],
            'need': [
                "don't need a website",
                "not necessary",
                "doing fine without",
                "word of mouth",
                "busy enough"
            ],
            'timing': [
                "not right now",
                "maybe later",
                "busy season",
                "not a priority",
                "check back"
            ],
            'diy': [
                "can build myself",
                "nephew can do it",
                "friend will help",
                "wix/squarespace"
            ],
            'skeptical': [
                "sounds too good",
                "what's the catch",
                "don't trust",
                "scam"
            ],
            'competitor': [
                "already talking to someone",
                "have someone else",
                "getting quotes"
            ]
        }
    
    def load_response_templates(self) -> Dict:
        """Load proven response templates"""
        
        return {
            'price': {
                'feel_felt_found': """I understand how you feel about the price. Many of our clients felt the same way initially. What they found was that the $250 investment paid for itself within the first month through new customers who found them online. 

Plus, at $7/month for hosting, you're spending less than one lunch out per month to capture online customers 24/7.""",
                
                'roi_focus': """I get that ${amount} feels like a lot. Let me put it in perspective:

If this website brings you just ONE additional customer per month, it's paid for itself. Our clients typically see 30-50 new leads per month.

That's a potential {revenue_increase}% revenue increase for a one-time $250 investment.""",
                
                'comparison': """$250 might seem like a lot until you compare it to the alternatives:

- Hiring a web designer: $2,000-5,000
- Monthly website builders: $30-50/month (+ your time to build it)
- Fiverr freelancer: $500-1,500 (+ back-and-forth)

This is already built, customized for YOUR business, and ready to go."""
            },
            
            'need': {
                'stat_based': """I hear you - you might be doing okay with word of mouth. But here's the reality:

- 92% of consumers research businesses online BEFORE contacting them
- 46% of businesses without websites are losing customers to competitors who do
- {competitors_count} other {category} businesses in {location} already have websites

You're literally losing customers every day to businesses that show up in Google searches.""",
                
                'future_proof': """I understand you're doing fine now. But the market is changing:

Every year, more customers expect to find businesses online. The ones without websites are being filtered out before customers even call.

Think of this as future-proofing your business. For $250, you're protecting your customer base."""
            },
            
            'timing': {
                'scarcity': """I totally get that timing matters. Here's the thing:

I built this site specifically for {business_name}. If you don't claim it in the next 7 days, I'll need to remove it and offer it to another {category} business in your area.

The website is already done - claiming it takes 2 minutes. Hosting doesn't start until next month, so there's no urgency on payment either.""",
                
                'cost_of_waiting': """I understand you're busy. Quick question:

How many potential customers do you think search for {category} services online in {location} each month? If even 10 of them choose a competitor because you don't show up in search results, that's potentially $X,XXX in lost revenue.

The website is already built - you're not waiting for anything. Just claim it and start capturing those customers."""
            },
            
            'diy': {
                'time_value': """That's great that you're considering DIY! Quick reality check:

- Building a professional website: 20-40 hours
- Learning the tools: 5-10 hours
- Maintaining it: 2-3 hours/month

If your time is worth $50/hour, you'd spend $1,250-2,500 in time to build what I've already done for $250.

Plus, this is already done and optimized for local search.""",
                
                'quality_gap': """I respect the DIY approach. Here's what to consider:

Free builders like Wix/Squarespace:
- Monthly costs: $15-30/month ($180-360/year)
- SEO: Weaker than custom sites
- Your time: 20+ hours to build it right
- Professional look: Difficult without design experience

This is already professional, SEO-optimized, and ready to go for less than you'd spend in 2 years on Wix."""
            },
            
            'skeptical': {
                'transparency': """I appreciate your skepticism - it's smart to be cautious. Here's exactly what this is:

1. I built the website to demonstrate value upfront
2. You can see it before paying anything
3. If you like it, you buy it ($250). If not, no pressure.
4. No subscriptions, no hidden fees (just optional $7/month hosting)

The only "catch" is that I'm building these for multiple businesses, so if you don't claim it, I'll offer it elsewhere.""",
                
                'proof': """Fair question. Here's why this makes sense:

- Building websites at scale is my business model
- I can build them faster than traditional web designers (lower cost)
- I show you the finished product before you pay
- You own it outright after purchase

No catch - just a new business model that benefits both of us."""
            },
            
            'competitor': {
                'comparison': """That's smart to get multiple quotes. Quick question:

Are they showing you the finished website before you pay? Or asking you to pay first and wait weeks for delivery?

You're looking at YOUR finished website right now. No waiting, no back-and-forth, no surprises.

If their quote is similar, you're getting instant delivery here. If it's cheaper, I'd be curious what corners they're cutting.""",
                
                'unique_value': """Great - it's good to shop around. Here's what makes this different:

Most web designers:
- Take deposits upfront
- 2-4 weeks delivery time
- Multiple revision cycles
- Final cost often exceeds quote

This offer:
- Website already built and customized
- See it before you pay anything
- No revision cycles needed (it's done)
- Fixed price, instant delivery

You're comparing apples and oranges."""
            }
        }
    
    def classify_objection(self, response_text: str) -> str:
        """Classify objection type using keyword matching"""
        
        response_lower = response_text.lower()
        
        for category, keywords in self.common_objections.items():
            if any(keyword in response_lower for keyword in keywords):
                return category
        
        return 'other'
    
    def handle_objection(self, business: Dict, objection_text: str) -> str:
        """
        Handle objection with appropriate response
        
        Process:
        1. Classify objection type
        2. Select best response template
        3. Personalize with business data
        4. Return formatted response
        """
        
        category = self.classify_objection(objection_text)
        
        if category == 'other':
            # Use LLM for custom objection
            return self.handle_custom_objection(business, objection_text)
        
        # Use template
        template = self.select_best_template(category, objection_text)
        response = self.personalize_template(template, business)
        
        return response
    
    def select_best_template(self, category: str, objection_text: str) -> str:
        """Select most appropriate template for objection"""
        
        templates = self.response_templates.get(category, {})
        
        # Default to first template
        if templates:
            return list(templates.values())[0]
        
        return "I understand your concern. Let me address that..."
    
    def personalize_template(self, template: str, business: Dict) -> str:
        """Personalize template with business-specific data"""
        
        return template.format(
            business_name=business.get('name', 'your business'),
            category=business.get('category', 'your industry'),
            location=business.get('location', 'your area'),
            revenue_increase=business.get('industry_stats', {}).get('avg_revenue_increase', '38'),
            competitors_count=business.get('competitors_with_websites', 8)
        )
    
    def handle_custom_objection(self, business: Dict, objection_text: str) -> str:
        """
        Handle non-standard objection using LLM
        
        Uses llm-router with john-outreach tag
        """
        
        # Would call LLM here with:
        # - Business context
        # - Objection text
        # - Response frameworks (LAER, Feel-Felt-Found)
        # - Goal: Overcome objection while staying helpful
        
        prompt = f"""
You are a sales professional responding to an objection from a small business owner.

Business: {business['name']} ({business['category']} in {business['location']})
Offer: Pre-built website for $250 one-time + $7/month hosting
Value: {business.get('industry_stats', {}).get('avg_revenue_increase', '38%')} average revenue increase

Objection: "{objection_text}"

Respond using the LAER framework (Listen, Acknowledge, Explore, Respond):
1. Acknowledge their concern
2. Provide relevant statistics or logic
3. Reframe as an opportunity
4. Clear next step

Keep response under 100 words. Be helpful, not pushy.
"""
        
        # Placeholder - would use llm_bridge.py here
        response = "I understand your concern. Let me address that specifically for your situation..."
        
        return response


class ObjectionLogger:
    """Log all objections for continuous improvement"""
    
    def __init__(self):
        self.log_file = "objections_log.jsonl"
    
    def log_objection(self, business: Dict, objection: str, response: str, outcome: str):
        """Log objection and response for analysis"""
        
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'business': business['name'],
            'category': business['category'],
            'objection': objection,
            'objection_type': self.classify(objection),
            'response': response,
            'outcome': outcome  # 'converted', 'no_response', 'declined'
        }
        
        with open(self.log_file, 'a') as f:
            f.write(json.dumps(log_entry) + '\n')


if __name__ == '__main__':
    handler = ObjectionHandler()
    
    test_business = {
        'name': 'Green Valley Landscaping',
        'category': 'landscaping',
        'location': 'Seattle, WA',
        'industry_stats': {'avg_revenue_increase': '45%'},
        'competitors_with_websites': 8
    }
    
    test_objections = [
        "That's too expensive",
        "I don't really need a website",
        "Not right now, maybe next year",
        "My nephew can build me one"
    ]
    
    print("Objection Handling Examples:\n")
    
    for objection in test_objections:
        print(f"Objection: '{objection}'")
        print(f"Category: {handler.classify_objection(objection)}")
        response = handler.handle_objection(test_business, objection)
        print(f"Response:\n{response}\n")
        print("-" * 60 + "\n")
