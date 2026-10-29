# A crawl stops at one URL with “One moment, please”

This means the crawler received a security verification screen rather than the actual page. HTTP 200 alone does not establish that the intended website content was retrieved. A short verification screen typically has no navigable site links; its XML sitemap requests may also be challenged. This is not evidence that the website has only one page or that Google has indexed only one page.

Version 0.7.1 detects common verification screens before SEO analysis, excludes them from indexability and sitemap export, suppresses their misleading missing-metadata/heading findings, and marks the crawl blocked or partial. Previously saved short verification-page records are reclassified when opened. A dash in the indexable count means actual pages were not successfully checked; it is not a Google index count.

To complete the hosted audit, the website’s hosting/security administrator should review the relevant blocked/challenged request logs and configure supported, narrowly scoped access for the authorized crawler. Keep the site’s protection enabled. Do not treat changing a browser title, increasing the page limit, connecting Analytics/Search Console, or generating PageSpeed data as resolving crawler access. No automatic CAPTCHA solving or verification bypass is implemented.

A local check of Kingdom Roofing on 2026-10-29 reached 12 real pages in a 12-page capped crawl with the hosted network protections enabled. The user’s hosted screenshot showed only a verification page titled “One moment, please…” with 11 words. The precise protection vendor was not established.
