---
name: apple-interaction-audit
description: Audit and refine an existing web interface for high-quality interaction behavior: immediate press feedback, direct manipulation, interruptible/reversible motion, consistent semantic color use, and polished input response. Use after interactive UI exists or when the user explicitly asks for interaction polish. Do not use this skill to choose the initial visual brand or to redesign a page from scratch.
---

# Apple Interaction Audit

Use this skill as a behavioral quality pass, not as a visual imitation of Apple.

## When to use
- The page already has working controls, transitions, navigation, forms, drawers, carousels, or draggable elements.
- The user asks why the UI feels artificial, generic, delayed, stiff, or "made by AI".
- The user asks for a final interaction audit or polish pass.

## Audit order
1. **Immediate feedback**: buttons, links, cards, toggles, and controls should acknowledge pointer/touch/keyboard activation immediately. Press feedback belongs to the press state, not only after release.
2. **Direct manipulation**: dragged/swiped content should stay visually attached to the pointer/finger. Avoid laggy or decorative drag behavior.
3. **Interruptible motion**: animations and transitions should be able to reverse or change direction without visible jumps, stale state, or forced completion.
4. **Motion continuity**: preserve spatial continuity between states. Prefer transform/opacity and layout-aware transitions over abrupt mount/unmount changes.
5. **Semantic consistency**: the same color, elevation, underline, or emphasis treatment should not mean conflicting things in different parts of the interface.
6. **Input quality**: preserve focus, keyboard operation, visible focus states, touch target size, hover/touch parity, and reduced-motion preferences.

## Implementation rules
- Do not add motion merely to make the page feel "premium".
- Do not copy Apple visual styling, typography, glass effects, or component appearance unless the project brief independently asks for them.
- Keep interaction fixes scoped. Prefer one behavior problem per change when practical.
- Favor CSS for simple press/hover/focus states; use Motion when state continuity, interruption, gestures, or layout transitions justify it.
- Respect `prefers-reduced-motion`.

## Completion check
Before declaring an interaction polished, verify pointer, touch-sized layouts, keyboard, reduced motion, and at least one rapid-interruption case (for example opening and closing before the first animation finishes).
