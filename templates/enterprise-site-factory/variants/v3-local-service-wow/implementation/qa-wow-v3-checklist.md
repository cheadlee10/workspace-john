# QA — V3 WOW+ Mobile + Conversion Checklist

## A) Conversion Path Integrity
- [ ] Hero contains stage-1 quick callback form (name + phone only)
- [ ] Mid-page CTA appears after proof/services modules
- [ ] Final hub includes full quote form + call action
- [ ] Form submit confirmation and fallback error states are visible

## B) Mobile Thumb Experience
- [ ] Sticky action rail is visible and safe-area aware
- [ ] All primary controls meet >= 48px height
- [ ] Service cards snap horizontally at <= 768px without clipping
- [ ] Keyboard does not hide active form field or submit button

## C) Trust + Risk Reversal
- [ ] SLA claim appears in top utility or hero trust stack
- [ ] Guarantee language is specific and measurable
- [ ] Proof metrics match real sources (reviews/jobs/warranty)
- [ ] Business name + phone are consistent pagewide

## D) Visual Polish
- [ ] Card borders/shadows remain subtle and consistent
- [ ] Contrast passes AA for body and CTA text
- [ ] No crowded sections at 320px width
- [ ] Reduced-motion mode disables nonessential animations

## E) Performance
- [ ] Lighthouse Mobile Performance >= 90
- [ ] LCP < 2.1s / CLS < 0.06 / INP < 170ms
- [ ] Hero media <= 170KB (webp/avif)
- [ ] Critical CSS budget remains <= 65KB
