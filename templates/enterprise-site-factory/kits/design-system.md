# Premium Design Kit

## 1) Brand Tokens (Enterprise Local-Service Style)

### Color Roles
Use role-based colors, not hardcoded hex in components.

- `--color-bg`: #0B1220 (deep slate)
- `--color-surface`: #111A2E
- `--color-surface-alt`: #F7F9FC
- `--color-text-primary`: #0F172A
- `--color-text-inverse`: #F8FAFC
- `--color-text-muted`: #475569
- `--color-primary`: #0EA5E9
- `--color-primary-hover`: #0284C7
- `--color-accent`: #22C55E
- `--color-warning`: #F59E0B
- `--color-danger`: #DC2626
- `--color-border`: #E2E8F0

Niche accent overrides:
- Landscaping: primary #22C55E, accent #84CC16
- Roofing: primary #EA580C, accent #F59E0B
- HVAC: primary #0EA5E9, accent #2563EB

### Typography
- Headings: `Manrope` or `Plus Jakarta Sans`
- Body: `Inter`
- Scale:
  - H1: 48/56 desktop, 34/42 mobile
  - H2: 36/44 desktop, 28/34 mobile
  - H3: 28/36 desktop, 22/30 mobile
  - Body lg: 18/30
  - Body: 16/26
  - Small: 14/22

### Spacing + Layout
- 8pt spacing system
- Section vertical rhythm: 72–112px desktop, 48–72px mobile
- Container max width: 1200px
- Content column max width: 760px for readability

### Radius + Elevation
- Card radius: 16px
- Buttons/inputs: 12px
- Hero media radius: 20px
- Shadows:
  - `shadow-sm`: 0 1px 2px rgba(0,0,0,.06)
  - `shadow-md`: 0 8px 24px rgba(2,6,23,.12)
  - `shadow-xl`: 0 20px 40px rgba(2,6,23,.16)

## 2) UI Component Rules

### Buttons
- Primary CTA: solid primary, min height 48px, icon optional
- Secondary CTA: outline with high contrast
- Sticky mobile CTA allowed on service pages
- Max 2 CTAs per hero to avoid cognitive overload

### Forms
- Fields: name, phone, email, service type, project details
- Multi-step only when qualification needed
- Show trust line below submit (response time + privacy)
- Inline validation; no hidden errors

### Cards
- Use icon + title + short benefit text
- Max 3 lines description in grids
- Equal heights in same row

### Navigation
- Desktop: 5–7 top-level items max
- Mobile: persistent top call button or bottom sticky CTA
- Include service area and phone in header utility bar

## 3) Motion + Interaction
- Animation duration: 120–220ms
- Use subtle fades/translateY only; avoid heavy parallax
- Hover effects should not shift layout
- Respect `prefers-reduced-motion`

## 4) Trust Elements Standard
Required across all niches:
- License/insurance indicators
- Review aggregate snippet
- Warranty/guarantee statement
- Before/after or proof-of-work module
- Local service area map/list
