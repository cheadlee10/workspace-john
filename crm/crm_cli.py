#!/usr/bin/env python3
"""
Personal CRM - Command Line Interface
Main entry point for interacting with the CRM
"""

import sys
from pathlib import Path
from db import CRMDB
from nlp import NLPInterface
from relationship_scorer import RelationshipScorer

def main():
    """Main CLI loop"""
    # Initialize CRM
    crm_path = Path(__file__).parent / "crm.db"
    db = CRMDB(str(crm_path))
    nlp = NLPInterface(db)
    scorer = RelationshipScorer(db)
    
    print("🔵 Personal CRM initialized")
    print("Type 'help' for commands, 'exit' to quit\n")
    
    if len(sys.argv) > 1:
        # Single query mode (for Discord/messaging integration)
        query = ' '.join(sys.argv[1:])
        result = nlp.execute(query)
        print(result['message'])
        sys.exit(0 if result['success'] else 1)
    
    # Interactive mode
    while True:
        try:
            query = input("crm> ").strip()
            
            if not query:
                continue
            
            if query.lower() in ['exit', 'quit', 'q']:
                print("Goodbye!")
                break
            
            if query.lower() == 'help':
                print_help()
                continue
            
            if query.lower() == 'rescore':
                print("Recalculating relationship scores...")
                count = scorer.update_all_scores()
                print(f"✅ Updated {count} contacts")
                continue
            
            # Execute natural language query
            result = nlp.execute(query)
            
            if result['success']:
                print(f"\n{result['message']}\n")
            else:
                print(f"\n❌ {result['message']}\n")
        
        except KeyboardInterrupt:
            print("\nGoodbye!")
            break
        except Exception as e:
            print(f"Error: {e}")
    
    db.close()

def print_help():
    """Print help message"""
    help_text = """
**Personal CRM - Available Commands:**

**Contact Lookup:**
- "Tell me about [name]" - Get full relationship profile
- "Who at [company]?" - List all contacts at a company
- "[name or email]" - Quick search

**Relationship Management:**
- "Who needs attention?" - Contacts you haven't talked to recently
- "Follow up with [name] in 2 weeks" - Schedule a reminder
- "Follow ups" - List upcoming reminders

**Analytics:**
- "Stats" - CRM statistics and top relationships

**System:**
- "rescore" - Recalculate all relationship scores
- "help" - Show this help
- "exit" - Quit

**Examples:**
- crm> Tell me about John Smith
- crm> Who at Google?
- crm> Follow up with jane@example.com in 3 days
- crm> Who needs attention?
- crm> Stats
"""
    print(help_text)

if __name__ == '__main__':
    main()
