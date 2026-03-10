#!/usr/bin/env python3
"""
NorthStar Batch Site Generator v1.0
Generates 160 unique websites from leads.jsonl
Each with distinct branding based on service type + location
"""

import json
import os
import re
from pathlib import Path

# Branding matrix by service type
BRANDING = {
    "Landscaping": {
        "primary": "#1a3a8a", "secondary": "#22a652", "accent": "#FFD54F",
        "gradients": ["#0d2b6b", "#1a3a8a", "#22a652"],
        "fonts": ("Playfair Display", "Outfit"),
        "hero_emojis": ["🌿", "🌳", "🌲"], "button_shape": "pill"
    },
    "Handyman": {
        "primary": "#455A64", "secondary": "#FF9800", "accent": "#FFC107",
        "gradients": ["#37474F", "#455A64", "#607D8B"],
        "fonts": ("Roboto Condensed", "Open Sans"),
        "hero_emojis": ["🔨", "🔧", "🛠️"], "button_shape": "rounded"
    },
    "Cleaning": {
        "primary": "#007BFF", "secondary": "#00C9A7", "accent": "#FFF59D",
        "gradients": ["#0056b3", "#007BFF", "#00C9A7"],
        "fonts": ("Poppins", "Inter"),
        "hero_emojis": ["✨", "🧹", "🧼"], "button_shape": "pill"
    },
    "Roofing": {
        "primary": "#C62828", "secondary": "#FF6F00", "accent": "#FFD54F",
        "gradients": ["#8e0000", "#C62828", "#FF6F00"],
        "fonts": ("Oswald", "Source Sans Pro"),
        "hero_emojis": ["🏠", "🏗️", "🔨"], "button_shape": "sharp"
    },
    "Pool": {
        "primary": "#0277BD", "secondary": "#00BCD4", "accent": "#80DEEA",
        "gradients": ["#01579b", "#0277BD", "#00BCD4"],
        "fonts": ("Montserrat", "Nunito"),
        "hero_emojis": ["💧", "🏊", "🌊"], "button_shape": "pill"
    },
    "HVAC": {
        "primary": "#33691E", "secondary": "#64DD17", "accent": "#B2FF59",
        "gradients": ["#1b5e20", "#33691E", "#64DD17"],
        "fonts": ("Raleway", "Lato"),
        "hero_emojis": ["❄️", "🔥", "🌡️"], "button_shape": "rounded"
    },
    "Auto": {
        "primary": "#1A1A2E", "secondary": "#4ECDC4", "accent": "#FFD54F",
        "gradients": ["#0f0f1a", "#1A1A2E", "#4ECDC4"],
        "fonts": ("Orbitron", "Rajdhani"),
        "hero_emojis": ["🚗", "✨", "🏎️"], "button_shape": "sharp"
    },
    "Default": {
        "primary": "#1a3a8a", "secondary": "#22a652", "accent": "#FFD54F",
        "gradients": ["#0d2b6b", "#1a3a8a", "#22a652"],
        "fonts": ("Playfair Display", "Outfit"),
        "hero_emojis": ["★", "✦", "✓"], "button_shape": "pill"
    }
}

def slugify(name):
    """Convert business name to URL slug"""
    return re.sub(r'[^\w\s-]', '', name).strip().lower().replace(' ', '-')[:30]

def generate_site(lead, index):
    """Generate unique HTML site for a lead"""
    service = lead.get("service", "Default")
    biz_type = "Landscaping" if "Landscaping" in service else \
               "Handyman" if "Handyman" in service else \
               "Cleaning" if "Cleaning" in service else \
               "Roofing" if "Roofing" in service else \
               "Pool" if "Pool" in service else \
               "HVAC" if "HVAC" in service else \
               "Auto" if "Auto" in service else "Default"
    
    brand = BRANDING.get(biz_type, BRANDING["Default"])
    slug = slugify(lead["client"])
    phone = lead.get("phone", "Call for Quote")
    location = lead.get("location", "Local Area")
    
    # Unique variation based on index
    variations = [
        f"background: linear-gradient(160deg, {brand['gradients'][0]} 0%, {brand['gradients'][1]} 50%, {brand['gradients'][2]} 100%);",
        f"background: linear-gradient(135deg, {brand['gradients'][0]} 0%, {brand['gradients'][2]} 100%);",
        f"background: radial-gradient(ellipse at top, {brand['gradients'][1]}, {brand['gradients'][0]});",
    ]
    hero_style = variations[index % 3]
    
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{lead["client"]} — Professional {service} | {location}</title>
<link href="https://fonts.googleapis.com/css2?family={brand['fonts'][0].replace(' ', '+')}:wght@400;700&family={brand['fonts'][1].replace(' ', '+')}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
:root {{
  --primary: {brand['primary']};
  --secondary: {brand['secondary']};
  --accent: {brand['accent']};
  --white: #FFFFFF;
  --text: #1A2B3C;
}}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
body {{ font-family: '{brand['fonts'][1]}', sans-serif; background: #F7F9FC; color: var(--text); }}
.hero {{ min-height: 100vh; {hero_style} display: flex; align-items: center; justify-content: center; padding: 120px 24px; }}
.hero-content {{ max-width: 700px; text-align: center; color: white; }}
h1 {{ font-family: '{brand['fonts'][0]}', serif; font-size: clamp(40px, 6vw, 64px); margin-bottom: 24px; }}
.cta-btn {{ display: inline-block; background: linear-gradient(135deg, var(--accent), #FFB300); color: #000; padding: 18px 40px; border-radius: {'50px' if brand['button_shape'] == 'pill' else '8px' if brand['button_shape'] == 'rounded' else '0'}; font-weight: 700; text-decoration: none; margin: 8px; }}
.phone {{ font-size: 32px; color: var(--accent); font-weight: 700; margin-top: 20px; }}
</style>
</head>
<body>
<section class="hero">
  <div class="hero-content">
    <span style="font-size: 48px;">{brand['hero_emojis'][index % 3]}</span>
    <h1>{lead["client"]}<br>Professional {service}</h1>
    <p style="font-size: 18px; opacity: 0.9; margin-bottom: 36px;">Serving {location} with quality {service.lower()} services. Contact us today for a free estimate.</p>
    <a href="tel:{phone.replace('(', '').replace(')', '').replace('-', '').replace(' ', '')}" class="cta-btn">Call {phone}</a>
    <p class="phone">{phone}</p>
  </div>
</section>
</body>
</html>'''
    return html, slug

def main():
    """Read leads and generate all sites"""
    with open('leads.jsonl', 'r') as f:
        leads = [json.loads(line) for line in f if line.strip()]
    
    output_dir = Path('sites/batch-160')
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"Generating {len(leads)} unique websites...")
    
    for i, lead in enumerate(leads):
        html, slug = generate_site(lead, i)
        site_dir = output_dir / f"{i+1:03d}-{slug}"
        site_dir.mkdir(exist_ok=True)
        
        with open(site_dir / 'index.html', 'w', encoding='utf-8') as f:
            f.write(html)
        
        if (i + 1) % 10 == 0:
            print(f"  Generated {i+1}/{len(leads)} sites...")
    
    print(f"✅ Complete! {len(leads)} sites ready for deployment in {output_dir}")
    print(f"\nNext: Deploy with 'npx vercel --yes sites/batch-160/*'")

if __name__ == "__main__":
    main()
