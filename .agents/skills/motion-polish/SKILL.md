---
name: motion-polish
description: Design, implement, or review purposeful motion in a React/Next.js landing page using CSS and Motion for React. Use for reveal transitions, interactive feedback, layout transitions, carousels, hero motion, scroll-linked effects, or when animations feel excessive, generic, janky, or inconsistent.
---

# Motion Polish

Motion must explain state, reinforce hierarchy, or improve continuity. Decorative movement is secondary.

## Choose the lightest tool
- CSS transitions for hover, focus, press, simple opacity, and small transforms.
- Motion for React for enter/exit orchestration, layout continuity, interruption, gestures, and complex sequences.

## Quality rules
- Prefer transform and opacity over layout-thrashing properties.
- Keep interaction feedback fast; do not make users wait for animation before a control responds.
- Animations should be interruptible and reversible when the UI state can change rapidly.
- Do not apply the same reveal animation to every section.
- Avoid scroll-jacking and excessive parallax.
- Coordinate motion with visual hierarchy: primary elements can lead; secondary elements can follow subtly.
- Maintain a reduced-motion path that preserves meaning and usability.

## Review
Inspect motion on low-width layouts, rapid repeated interactions, route/state changes, and reduced-motion mode. Remove animation when it adds latency, ambiguity, or visual noise.
