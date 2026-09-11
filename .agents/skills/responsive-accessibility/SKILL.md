---
name: responsive-accessibility
description: Implement or audit responsive behavior and accessibility for web landing pages across mobile, tablet, and desktop. Use when translating designs to code, fixing breakpoints, forms, navigation, focus behavior, touch targets, overflow, semantic structure, or WCAG-related issues.
---

# Responsive + Accessibility

Build for content and capabilities, not for one screenshot size.

## Responsive rules
- Start from narrow layouts and scale up with content-driven breakpoints.
- Avoid hard-coded viewport assumptions inherited from mockups.
- Prefer fluid spacing/type (`clamp`, flexible grids, intrinsic sizing) where it improves continuity.
- No accidental horizontal page scrolling. Horizontal interaction is acceptable only for intentional carousels/galleries with usable controls.
- Preserve meaningful reading order when visual layouts rearrange.
- Test at approximately 320, 375/390, 768, 1024, 1280, and 1440+ widths when relevant.

## Accessibility rules
- Use semantic HTML before ARIA.
- Maintain one logical `h1`, then a coherent heading hierarchy.
- All interactive elements must be keyboard reachable and show a visible focus state.
- Use real `button`, `a`, `label`, `input`, and landmark elements for their intended behavior.
- Text/background contrast must remain readable across states.
- Touch targets should be comfortably operable on mobile; avoid tightly packed controls.
- Images need meaningful `alt` text or empty alt when purely decorative.
- Form errors must be associated with fields and understandable without color alone.
- Respect `prefers-reduced-motion` and avoid motion that blocks task completion.

## Verification
Check keyboard-only navigation, focus order, zoom/reflow, mobile overflow, and form error/success states before completion.
