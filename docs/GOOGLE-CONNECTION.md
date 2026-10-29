# Connect search data

CrawlStudio v0.5 separates technical crawl observations from search performance. Entering a domain does not grant access to its Google data.

## One-time administrator setup
1. Create or select a Google Cloud project. Enable Search Console API, Google Analytics Admin API and Google Analytics Data API.
2. Configure the OAuth consent screen for your organization or test users as appropriate. Google verification and testing-mode limits may apply.
3. Create a Web application OAuth client. Register the exact redirect URI: https://crawlstudio-pixel-growers.onrender.com/api/google/callback
4. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to Render Environment and redeploy. Keep secrets out of GitHub and chat. Optionally set a stable CRAWLSTUDIO_TOKEN_KEY; otherwise the team password encrypts tokens. Changing that key/password requires reconnecting Google.
5. Open Connections & AI, click Connect Google account, approve read-only Search Console and Analytics access, then Find my properties. Choose a property matching your website and a date range; click Load search data.

Google sign-in stores AES-GCM encrypted credentials in the configured database, refreshes access tokens when needed, binds consent to a short-lived browser cookie/state and PKCE challenge, and never returns tokens in API responses. This is a shared team connection. All team members can access reports; this is not per-user isolation. Revoke access through your Google account if you no longer want the connection.

A manually supplied GOOGLE_ACCESS_TOKEN remains supported and takes precedence, but expires without automatic refresh.

## Meaning of the numbers
Organic traffic is Google organic clicks, not GA sessions or an Ahrefs traffic estimate. Organic keyword counts cover the returned distinct queries. Top rows are query/page combinations, so a query may appear against multiple pages. Query data is incomplete due to privacy and API limits (25,000 rows per period). Date ranges compare against an equally long prior period. No fabricated numbers appear. Missing dates in Google results are omitted from the chart.

Search Console does not return keyword search volume, keyword difficulty, CPC, intent, SERP feature counts or paid search metrics. Those columns intentionally show a dash. A separate licensed search/advertising provider integration is still needed for them and for competitor-domain intelligence. GA4 reports remain available separately in the service selector.

The Print a PDF button downloads the technical evidence audit; CSV and JSON exports are available under Technical crawl.

References: https://developers.google.com/identity/protocols/oauth2/web-server and https://developers.google.com/webmaster-tools/v1/searchanalytics/query


## GA4 and the overview
After Google sign-in, choose Find my GA4 properties and select the website property. CrawlStudio validates its web stream before loading sessions, channel trends, countries and recognized AI referral traffic. Use the global reporting-period selector and Refresh connected data. Select Search Console separately for search queries, clicks and country keyword counts. GA4 cannot supply these keyword counts. See RELEASE-0.6.md for metric definitions and limitations.

## Unsure whether you have access?
Sign in to search.google.com/search-console and analytics.google.com with your normal Google account. A property listed there indicates access to that property. If the website is missing, ask the website owner to grant read access, or set up and verify the property. A new Analytics tag starts collecting future data; it cannot reconstruct past visits. Never share your Google password with CrawlStudio.
