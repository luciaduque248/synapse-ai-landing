# AGENTS.md — SYNAPSE AI

## Source of truth
Read `docs/PROJECT_BRIEF.md`, `docs/DESIGN_DIRECTION.md`, and `docs/CONVERSION_PLAN.md` before substantial UI work.

## Stack
- Next.js App Router
- React + TypeScript strict mode
- Tailwind CSS
- Motion for React only where motion adds feedback, continuity, hierarchy, or product explanation

## Codex skills
Repository-scoped skills live in `.agents/skills/`.
Use the smallest relevant skill for the task:
- `conversion-landing` for funnel, CTA, forms, section strategy, and conversion review.
- `responsive-accessibility` for implementation fidelity across breakpoints and accessibility.
- `motion-polish` for motion design/implementation/review.
- `seo-performance` for metadata, production optimization, and final audits.
- `apple-interaction-audit` only after interactive UI exists or when explicitly asked to audit/refine interaction behavior. It is not the initial art-direction skill.

## Working rules
- Explicit user instructions override these repository instructions and any skill guidance.
- Do not fabricate real-world proof, clients, medical outcomes, property availability, AI benchmarks, or conversion metrics.
- Do not homogenize this project with the other portfolio landing pages. Reuse engineering primitives, not visible identity.
- Prefer semantic HTML and server components; add client components only where interaction requires them.
- Keep mobile behavior first-class. Do not code to a single mockup width.
- Preserve reduced-motion behavior and keyboard usability.
- Run `npm run lint`, `npm run typecheck`, and `npm run build` before calling a production change complete.

## Git workflow
- `main`: stable portfolio-ready state.
- `develop`: integration branch.
- `feature/*`: isolated features or sections.
- Prefer conventional commit prefixes: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`.
