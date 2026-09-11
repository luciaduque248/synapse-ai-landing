---
name: seo-performance
description: Improve technical SEO, on-page metadata, Core Web Vitals, asset loading, and runtime performance for a Next.js marketing landing page. Use when adding metadata/schema, preparing deployment, optimizing images/fonts/scripts, or running a final production audit.
---

# SEO + Performance

Optimize for discoverability and fast conversion without sacrificing the project visual direction.

## SEO
- Provide unique page title and meta description aligned with page intent.
- Use semantic headings and landmarks.
- Add canonical metadata when a real deployment URL exists.
- Add Open Graph/Twitter metadata when share assets exist.
- Use structured data only when it truthfully matches the content; never fabricate ratings, medical credentials, pricing, or organization facts.
- Keep useful content in server-rendered HTML where practical.

## Performance
- Prefer Next.js image optimization for raster assets.
- Use modern formats and realistic responsive `sizes`.
- Avoid shipping heavy client components for static sections.
- Lazy-load below-the-fold media and non-critical third-party code.
- Keep animations on transform/opacity when possible.
- Load fonts intentionally; avoid excessive weights/styles.
- Reserve media dimensions to reduce layout shift.

## Targets
Treat these as goals, not fabricated claims: LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1 on representative mobile conditions. Report measured values only after running a real audit.

## Final pass
Run lint/typecheck/build and, when a browser audit is available, Lighthouse or equivalent. Fix regressions that materially affect conversion, accessibility, SEO, or Core Web Vitals.
