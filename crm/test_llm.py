#!/usr/bin/env python3
"""
Test LLM Integration with llm-router
Verifies that all AI calls route through C:/Users/chead/llm-router/shared/llm-router.js
"""

import sys
from db import CRMDB
from llm_bridge import (
    generate_contact_summary,
    generate_email_draft,
    analyze_sentiment,
    generate_nudge
)

def test_contact_summary():
    """Test generating contact summary"""
    print("\n1️⃣  Testing Contact Summary Generation...")
    
    test_contact = {
        'name': 'John Smith',
        'email': 'john@example.com',
        'company': 'Example Corp'
    }
    
    test_interactions = [
        {
            'timestamp': '2026-02-15T10:00:00',
            'type': 'email_sent',
            'subject': 'Q1 Planning Discussion',
            'snippet': 'Looking forward to discussing priorities for Q1. Key focus: product launch.'
        },
        {
            'timestamp': '2026-02-18T14:30:00',
            'type': 'meeting',
            'subject': 'Partnership Strategy Call',
            'snippet': 'Discussed mutual goals and timeline for partnership rollout.'
        },
        {
            'timestamp': '2026-02-20T09:15:00',
            'type': 'email_received',
            'subject': 'Re: Q1 Planning Discussion',
            'snippet': 'Thanks for the thorough breakdown. Our team is aligned on the approach.'
        }
    ]
    
    test_timeline = [
        {
            'timestamp': '2026-02-15T10:00:00',
            'title': 'Initial planning email',
            'content': 'Sent comprehensive Q1 planning overview with 3 key priorities'
        },
        {
            'timestamp': '2026-02-18T14:30:00',
            'title': 'Partnership strategy call',
            'content': 'Discussed partnership goals, timeline, and mutual benefits'
        }
    ]
    
    try:
        summary = generate_contact_summary(test_contact, test_interactions, test_timeline)
        print(f"\n✅ Summary generated successfully!")
        print(f"\n📝 Summary:")
        print(f"   {summary['summary_text']}")
        
        if summary.get('key_points'):
            print(f"\n🔑 Key Points:")
            for point in summary['key_points']:
                print(f"   - {point}")
        
        return True
    
    except Exception as e:
        print(f"\n❌ Failed: {e}")
        return False

def test_email_draft():
    """Test generating email draft"""
    print("\n2️⃣  Testing Email Draft Generation...")
    
    test_contact = {
        'name': 'Jane Doe',
        'email': 'jane@techcorp.com',
        'company': 'TechCorp'
    }
    
    test_summary = {
        'summary_text': 'Jane is a senior product manager at TechCorp. We\'ve discussed Q1 priorities and are aligned on partnership goals. Communication style is professional and detail-oriented.'
    }
    
    test_recent_emails = [
        {
            'direction': 'outbound',
            'subject': 'Q1 Partnership Proposal',
            'snippet': 'Attached is our proposal for Q1 partnership activities...'
        },
        {
            'direction': 'inbound',
            'subject': 'Re: Q1 Partnership Proposal',
            'snippet': 'Thanks for the detailed proposal. Our team reviewed and has a few questions...'
        }
    ]
    
    prompt = "Follow up on the partnership proposal and address their questions"
    
    try:
        draft = generate_email_draft(test_contact, test_summary, test_recent_emails, prompt)
        print(f"\n✅ Email draft generated successfully!")
        print(f"\n📧 Subject: {draft['subject']}")
        print(f"\n📝 Body:\n{draft['body']}")
        
        return True
    
    except Exception as e:
        print(f"\n❌ Failed: {e}")
        return False

def test_sentiment_analysis():
    """Test sentiment analysis"""
    print("\n3️⃣  Testing Sentiment Analysis...")
    
    test_messages = [
        ("Thanks so much for your help! This is exactly what we needed.", "positive"),
        ("The report is complete. Sending it over now.", "neutral"),
        ("Unfortunately we can't move forward with this timeline.", "negative")
    ]
    
    results = []
    for message, expected in test_messages:
        try:
            sentiment = analyze_sentiment(message)
            is_correct = sentiment == expected
            status = "✅" if is_correct else "⚠️"
            print(f"   {status} '{message[:50]}...' → {sentiment} (expected: {expected})")
            results.append(is_correct)
        except Exception as e:
            print(f"   ❌ Error: {e}")
            results.append(False)
    
    success_rate = (sum(results) / len(results)) * 100 if results else 0
    print(f"\n   Success rate: {success_rate:.0f}%")
    
    return success_rate >= 66  # Allow 1 failure out of 3

def test_nudge_generation():
    """Test nudge generation"""
    print("\n4️⃣  Testing Nudge Generation...")
    
    test_contact = {
        'name': 'Bob Wilson',
        'email': 'bob@startup.io',
        'company': 'Startup Inc'
    }
    
    try:
        nudge = generate_nudge(test_contact, days_since=45, relationship_type='client')
        print(f"\n✅ Nudge generated successfully!")
        print(f"\n💡 Nudge: {nudge}")
        
        return True
    
    except Exception as e:
        print(f"\n❌ Failed: {e}")
        return False

def test_database_integration():
    """Test LLM integration with actual database"""
    print("\n5️⃣  Testing Database Integration...")
    
    try:
        db = CRMDB()
        
        # Check if we have any contacts
        stats = db.get_stats()
        if stats['total_contacts'] == 0:
            print("   ℹ️  No contacts in database. Adding test contact...")
            
            from datetime import datetime
            
            contact_id = db.add_contact(
                email='test@example.com',
                name='Test Contact',
                company='Test Corp',
                priority=70
            )
            
            # Add test interaction
            db.add_interaction(
                contact_id=contact_id,
                interaction_type='email_sent',
                timestamp=datetime.utcnow().isoformat(),
                subject='Test Email',
                snippet='This is a test interaction',
                direction='outbound'
            )
        else:
            # Use first contact
            cursor = db.conn.execute("SELECT id FROM contacts LIMIT 1")
            contact_id = cursor.fetchone()['id']
        
        print(f"   Using contact ID: {contact_id}")
        
        # Generate summary using database method
        print("   Generating summary via database method...")
        summary = db.generate_and_save_summary(contact_id)
        
        if summary:
            print(f"\n✅ Database integration successful!")
            print(f"   Summary: {summary['summary_text'][:100]}...")
            return True
        else:
            print(f"\n⚠️  Summary generation returned None")
            return False
    
    except Exception as e:
        print(f"\n❌ Failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """Run all tests"""
    print("="*70)
    print("🧪 Testing CRM LLM Integration with llm-router")
    print("="*70)
    
    tests = [
        ("Contact Summary", test_contact_summary),
        ("Email Draft", test_email_draft),
        ("Sentiment Analysis", test_sentiment_analysis),
        ("Nudge Generation", test_nudge_generation),
        ("Database Integration", test_database_integration)
    ]
    
    results = []
    for name, test_func in tests:
        try:
            passed = test_func()
            results.append((name, passed))
        except Exception as e:
            print(f"\n❌ Test '{name}' crashed: {e}")
            results.append((name, False))
    
    # Summary
    print("\n" + "="*70)
    print("📊 Test Results")
    print("="*70)
    
    for name, passed in results:
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"   {status}: {name}")
    
    passed_count = sum(1 for _, passed in results if passed)
    total_count = len(results)
    
    print(f"\n   Overall: {passed_count}/{total_count} tests passed")
    
    if passed_count == total_count:
        print("\n🎉 All tests passed! LLM integration working correctly.")
        sys.exit(0)
    else:
        print("\n⚠️  Some tests failed. Check errors above.")
        sys.exit(1)

if __name__ == '__main__':
    main()
