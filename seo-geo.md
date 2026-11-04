# PractiZone (practizone.ca) — SEO, GEO & Technical Changelog

## [2026-10-28] - Preliminary Technical, SEO & GEO Audit
- Conducted full HTTP/2, SSL, crawler User-Agent, and source code audit.
- Identified critical blockers: Googlebot blocked with HTTP 403, GPTBot encountering HTTP 429 rate-limiting.
- Flagged missing robots.txt and sitemap.xml files (returning 404).
- Detected split domain authority (both apex and www variants serving 200 without 301 redirection).
- Found /contact.html form completely non-functional (missing action/method and JS handler).
- Identified heavy uncompressed PNG hero images (~1.8 MB each) causing LCP degradation.
- Noted absence of canonical tags, Open Graph metadata, and structured data (Schema.org).

## [2026-10-29] - Crawler Access & Sitemap Foundation
- Generated and deployed root robots.txt allowing Googlebot, OAI-SearchBot, GPTBot, ClaudeBot, and PerplexityBot.
- Generated XML sitemap (sitemap.xml) covering all 10 live public URLs with proper priority and lastmod timestamps.
- Submitted sitemap to Google Search Console and Bing Webmaster Tools.

## [2026-10-30] - Canonical Tags & Social Previews
- Added self-referencing canonical tags (<link rel="canonical" href="https://practizone.ca/...">) across all pages.
- Added comprehensive Open Graph (og:title, og:description, og:url, og:image) and Twitter Card tags to all pages.

## [2026-11-02] - Cross-Referral Bridge with PractiOne
- Created new dedicated page /consulting-services.html introducing PractiOne Consulting.
- Added outbound UTM-tagged CTAs ("Explore Consulting Services" and "Request a Practice Assessment").
- Integrated "Consulting & Training" link into the main header navigation and footer.
- Added a teaser promotion banner on index.html pointing to consulting services.

## [2026-11-03] - Image Compression & Domain Redirection
- Optimized ~1.8 MB hero PNGs into modern WebP format (<200 KB each) with explicit width/height attributes.
- Configured .htaccess 301 permanent redirects enforcing single apex URL (www -> apex and /index.html -> /).
- Added preload tags for above-the-fold hero images to boost mobile Core Web Vitals (LCP).
- Added outbound referral event tracking ('outbound_referral_click') for PractiOne outbound links.

## [2026-11-04] - Contact Form Activation & Lead Attribution (Today)
- Fixed /contact.html form: implemented working POST action endpoint, hidden honeypot spam protection, and PIPEDA privacy consent.
- Added hidden tracking fields for UTM parameters (utm_source, utm_medium, utm_campaign), referring URL, and timestamp.
- Verified CTA routing for "Request Staffing" and "Find a Candidate" to ensure proper employer/candidate onboarding paths.
