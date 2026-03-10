#!/usr/bin/env python3
"""
Lead Expansion Analysis Script
Identify and rank high-intent prospects for automation/excel services
"""

import json
from pathlib import Path

LEADS_FILE = Path(r"C:\Users\chead\.openclaw\workspace-john\leads.jsonl")

def get_automation_pitch(service):
    """Generate automation-specific pitch based on service type"""
    service = service.lower()
    if 'hvac' in service or 'heating' in service or 'cooling' in service:
        return "Scheduling optimization, maintenance reminders, service history tracking"
    elif 'roofing' in service or 'contractor' in service or 'construction' in service:
        return "Project estimation spreadsheets, job costing, invoice automation"
    elif 'plumbing' in service or 'electrical' in service:
        return "Service call scheduling, parts inventory tracking, customer CRM"
    elif 'pool' in service:
        return "Recurring service scheduling, chemical log automation, route optimization"
    elif 'pest' in service:
        return "Treatment schedule automation, recurring billing, service route planning"
    elif 'auto' in service or 'repair' in service:
        return "Parts inventory management, service ticket tracking, customer reminders"
    elif 'landscaping' in service or 'lawn' in service:
        return "Crew scheduling, seasonal billing automation, route optimization"
    elif 'fencing' in service or 'flooring' in service or 'painting' in service:
        return "Job estimation calculator, materials pricing, invoice generation"
    elif 'handyman' in service:
        return "Service scheduling, invoice automation, customer follow-up system"
    elif 'cleaning' in service:
        return "Recurring schedule automation, staff assignment, billing automation"
    else:
        return "Custom automation assessment - scheduling, invoicing, customer tracking"

def get_next_action(service, has_owner):
    """Suggest specific next action based on prospect profile"""
    if has_owner:
        return f"SMS outreach: personalized message to {has_owner}, mention specific automation pain point"
    else:
        return "SMS outreach: generic business automation pitch, request owner name"

# Load all leads
leads = []
with open(LEADS_FILE, 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if line:
            try:
                leads.append(json.loads(line))
            except json.JSONDecodeError:
                pass

# Filter to outreach-usable leads only
usable = [l for l in leads if l.get('outreach_usable') == True]

# Score each lead for automation potential
def score_lead(lead):
    score = 0
    service = lead.get('service', '').lower()
    
    # Base value score (higher value = more complex operation = more automation need)
    value = lead.get('estimated_value', 0)
    if value >= 1200: score += 30
    elif value >= 900: score += 25
    elif value >= 700: score += 20
    elif value >= 500: score += 15
    else: score += 10
    
    # Service type scoring (complex operations need automation)
    if any(x in service for x in ['hvac', 'heating', 'cooling', 'air conditioning']):
        score += 25
    elif any(x in service for x in ['contractor', 'construction', 'roofing', 'remodeling']):
        score += 25
    elif any(x in service for x in ['plumbing', 'electrical']):
        score += 22
    elif any(x in service for x in ['pool', 'hot tub']):
        score += 20
    elif any(x in service for x in ['pest control', 'exterminating']):
        score += 20
    elif any(x in service for x in ['auto repair', 'detailing']):
        score += 18
    elif any(x in service for x in ['landscaping', 'lawn', 'tree', 'gardening']):
        score += 15
    elif any(x in service for x in ['fencing', 'deck', 'flooring']):
        score += 15
    elif any(x in service for x in ['painting']):
        score += 14
    elif any(x in service for x in ['handyman']):
        score += 12
    elif any(x in service for x in ['cleaning', 'maid']):
        score += 10
    else:
        score += 8
    
    # Owner name available (personalization = higher response rate)
    if lead.get('owner_name') or lead.get('contact_name'):
        score += 15
    
    # Phone available (SMS outreach = fastest channel)
    if lead.get('phone'):
        score += 10
    
    # Location bonus
    location = lead.get('location', '')
    if any(city in location for city in ['Seattle', 'Bellevue', 'Houston', 'Dallas', 'Phoenix', 'Atlanta']):
        score += 5
    
    return score

# Score and sort
scored_leads = [(lead, score_lead(lead)) for lead in usable]
scored_leads.sort(key=lambda x: x[1], reverse=True)

# Build top 25 list with full details
top_25 = []
for i, (lead, score) in enumerate(scored_leads[:25], 1):
    service = lead.get('service', '')
    owner = lead.get('owner_name') or lead.get('contact_name') or ''
    top_25.append({
        'rank': i,
        'score': score,
        'id': lead['id'],
        'client': lead['client'],
        'service': service,
        'estimated_value': lead.get('estimated_value'),
        'location': lead.get('location'),
        'owner_name': owner if owner else None,
        'phone': lead.get('phone'),
        'phone_normalized': lead.get('phone_normalized'),
        'notes': lead.get('notes'),
        'automation_pitch': get_automation_pitch(service),
        'next_action': get_next_action(service, owner)
    })

# Save to JSON
output_file = Path(r"C:\Users\chead\.openclaw\workspace-john\top_25_automation_prospects.json")
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(top_25, f, indent=2)

print(f"Total leads in file: {len(leads)}")
print(f"Outreach-usable leads: {len(usable)}")
print(f"\n✅ Exported top 25 automation prospects to: {output_file}")
print("\n" + "="*80)
print("TOP 25 HIGH-INTENT AUTOMATION/EXCEL SERVICE PROSPECTS")
print("="*80)

for prospect in top_25:
    print(f"\n{prospect['rank']:2}. [{prospect['score']} pts] {prospect['client']}")
    print(f"    Service: {prospect['service']} | Est. Value: ${prospect['estimated_value']}")
    print(f"    Location: {prospect['location']}")
    print(f"    Contact: {prospect['owner_name'] or 'Unknown'} | Phone: {prospect['phone']}")
    print(f"    🎯 Pitch: {prospect['automation_pitch']}")
    print(f"    ➡️  Next: {prospect['next_action']}")
