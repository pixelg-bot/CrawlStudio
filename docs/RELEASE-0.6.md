# CrawlStudio 0.6 — measured overview

The overview uses three compact cards (AI citations/referrals, search, backlink availability), a four-tab performance chart and six-country traffic table. Only four periods are offered: This month, Last 3 months, Last 6 months and This year. Multi-month ranges start on the first day of the oldest included calendar month and end three days before today (Asia/Kolkata). Previous-period comparisons use an equally long immediately preceding interval; they do not compare incomplete current periods with entire prior months.

GA4 is Google Analytics, not a second independent service. Connect Google, find your GA4 properties, select one whose web stream matches the website, then load analytics data. Admin API and Data API must both be enabled in the OAuth project. GA4 reports are restricted to the website hostname and its www variant. Search Console property data uses the selected property’s scope, which can include subdomains.

GA4 contributes sessions, Organic Search sessions, Paid Search sessions (excluding cross-network activity), countries and attributed AI referral sources. Search Console contributes Google clicks, impressions, returned queries and average positions, organic country clicks and returned country query counts. Country rows include United States, Canada, United Kingdom, Germany, France and Poland. Shares use worldwide totals for the displayed metric. Missing rows show a dash; GA4 has no per-country keyword count.

AI citations cannot be measured by GA4 referral sessions. Google AI search performance is included in overall search reporting; this edition cannot isolate citations from Google AI features. ChatGPT, Perplexity, Gemini and Copilot referral sessions are based on recognized source hostnames. Bing traffic is never labeled Copilot. Lost referrers and consent gaps can undercount visits.

Backlink totals, DR/UR, keyword volume, keyword difficulty and CPC remain unavailable and are not invented. The backlink card separately labels internal and outgoing links observed in the crawl. There is no complete backlink history graph from these sources. Unsupported keyword columns and unnecessary navigation entries were removed.

Reports are stored by website origin and period. Cached data for a different current date window is not presented as current. Use Refresh connected data after choosing a period. Provider data can be delayed, anonymized, thresholded, sampled or incomplete, and cannot be called 100% correct. Google Search Console retention can limit longer previous-period comparisons. No historical data is fabricated before measurement existed.

Verification includes unit/API tests and browser workflows with explicitly mocked provider data, plus existing crawl, PDF and security checks. Live Google account authorization and property access still require administrator setup and user consent.
