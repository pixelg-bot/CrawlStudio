# CrawlStudio 0.7 — agency audits and connected clients

## Public website audits
The audit menu is Overview, Technical SEO, Website Performance, On-page SEO and SEO Recommendations. Public reports contain crawl observations, Google PageSpeed mobile lab tests, and Crawly-reported backlink/authority data. Search traffic and rankings are omitted from the public overview. Public-source requests run after starting/completing an audit; cached results show their retrieval times. PageSpeed results cache for six hours and Crawly for 24 hours. Manual performance refresh can bypass a completed cache after a one-minute cooldown. Provider errors and unavailable data are not converted to zero scores.

Required server settings: CRAWLY_API_KEY and PAGESPEED_API_KEY. Keys are environment values only. No credentials are included in source, reports, exports or archives. Official endpoints: https://www.getcrawly.com/api and https://developers.google.com/speed/docs/insights/v5/get-started

## Connected Clients
Connections & Settings lets you select a Google account connection, client website, Search Console property and/or GA4 property, then save a client. The server verifies property access and website matching before saving. Connected Clients lists saved websites and reopens their separate dashboards. New website audit returns to the public crawler without deleting clients. Different Google accounts have independent encrypted tokens; adding an account does not replace a prior client’s credential. One agency account may be assigned to multiple sites it can access.

A Google OAuth web client must be configured once using GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET. PageSpeed API keys are not OAuth credentials and do not grant Analytics or Search Console access. OAuth redirect: https://crawlstudio-pixel-growers.onrender.com/api/google/callback. Enable Search Console API, Analytics Admin API and Analytics Data API. The user authorizes read-only access and selects website properties. Google testing/verification limits apply.

## Baselines and reports
The first completed audit available when a client is saved becomes the pinned technical baseline. If no audit exists, the first available completed audit is pinned on Google refresh. First successful Google reports save source-specific onboarding metric baselines. Changing property/account assignments creates a new report binding and Google baseline; old data is not shown under the new binding.

Technical progress counts issues no longer detected only on pages successfully rechecked with matching settings. Missing, blocked or failed URLs stay unassessed, not fixed. Cross-page duplicate/hreflang checks require matching page coverage. Google progress uses per-day averages when the onboarding and selected ranges have different lengths. These comparisons do not establish causation or complete Google coverage.

Client PDF/HTML reports include Google data, technical progress and public-source results where available. Public PDF/HTML reports include the crawl and cached public sources. All reports remain source/date-labelled.

This remains one shared agency/team workspace. Saved clients are separate reporting records, not isolated customer logins or per-user access permissions. Share exported reports with clients rather than the team password. The free Render profile uses manual crawls and Google refreshes; it does not provide reliable unattended schedules.

## Validation
Automated tests cover two-client report isolation, separate Google account tokens, pinned baselines, missing-page comparisons, real provider schema normalization, quota failures, browser navigation/client switching, PDF responses and existing crawling/security checks. Live Crawly and PageSpeed calls succeeded for Kingdom Roofing on 2026-10-29. Actual Google OAuth authorization and client property access require the user’s Google setup and consent.
