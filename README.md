# CrawlStudio by Pixel Growers — agency workspace

Current release: **0.7**. Public audits use the crawl engine, PageSpeed Insights and Crawly. Connected Clients keeps Google property bindings, onboarding baselines and progress reports separate for each website. See [release guide](docs/RELEASE-0.7.md) and [Google connection setup](docs/GOOGLE-CONNECTION.md).

# CrawlStudio by Pixel Growers

A technical SEO crawler branded for Pixel Growers. For team hosting, start with [DEPLOYMENT.md](DEPLOYMENT.md). The browser user guide is at /guide. This is an initial implementation, not a complete commercial crawler or a staffed support service. Version 0.4 adds an evidence-first SEO audit based on the supplied skill; see [skill integration](docs/skill-integration.md). See the **Feature coverage** screen for the exact scope of every requested feature.

## Free remote team sharing

Double-click SHARE-WITH-TEAM.cmd to create a temporary password-protected HTTPS link. No paid hosting or domain is needed. See [FREE-SHARING.md](FREE-SHARING.md). Your computer must remain awake and online.

## Start

Requires Node.js 22 or later.

```powershell
cd "C:\Users\DELL\Documents\Codex\2026-10-24\i-n\outputs\crawlstudio"
npm start
```

Open http://localhost:4310. Enter a URL, configure the crawl, and select **Start crawl**. Core HTTP crawling has no external package dependencies. The server defaults to local loopback. Explicit team-hosting mode supports a shared password, a public origin and a remote listener; see DEPLOYMENT.md. Keep the terminal running while crawling or scheduling.

For JavaScript rendering, CSS extraction, forms authentication, axe accessibility checks, and AMP validation:

```powershell
npm run install-browser
```

The installer downloads Playwright Chromium and packages. The AMP validator can also download its runtime on first use. Browser availability in the UI indicates the package is installed; a missing Chromium executable will produce a crawl error with setup instructions.

## Daily use

- **Crawl overview:** live crawl progress, status distribution, priority findings, URL filters and page inspector.
- **Evidence audit:** evidence, confidence, impact, fixes, priorities, skill category coverage, AI crawler policy, and Markdown / HTML report downloads. New checks run by default; disable Evidence-first SEO skill checks in configuration if desired.
- **Issues & opportunities:** filter findings by audit type.
- **Site visualisation:** first 150 crawled URLs and directory segment counts.
- **Crawl comparison:** compare saved snapshots by URL and tracked fields. Scope changes can cause apparent removals.
- **Saved crawls:** open a previous crawl; export and import JSON snapshots.
- **Schedules:** repeat a configuration at an hourly interval. Schedules run only while the server is running; they are not Windows scheduled tasks. Missed intervals run once after restart rather than replaying every missed run.
- **Exports:** XML sitemap, crawl JSON, and flat CSV suitable for uploading to Looker Studio. The CSV is a handoff, not a native Looker Studio connector or ready-made hosted report.

Crawls are stored under `data/`. Finalized audit files are saved under `data/<crawl-id>/`: `FULL-AUDIT-REPORT.md`, `ACTION-PLAN.md`, `SEO-REPORT.html`, and `audit.json`. These reports are generated automatically and can also be downloaded from the Evidence audit screen. Page text can contain confidential site content. Credentials entered in the configuration dialog stay in memory and are omitted from saved configurations and schedules. Crawled content itself can still contain personal or sensitive information. Delete the relevant JSON files when you no longer need those snapshots.

The crawler follows links within the exact starting origin (scheme, hostname, port). It records external links but does not check their status. URL query strings are preserved, fragments removed. The page budget includes blocked URLs and errors. Redirects are recorded as their own URLs and same-origin targets can enter the queue. The crawler does not cross from HTTP to HTTPS automatically; start with the site's canonical HTTPS origin.

## Advanced configuration

- Source search: JavaScript regular expression, without slash delimiters.
- Extraction rules: JSON array, e.g. `[{"name":"tracking","pattern":"GTM-([A-Z0-9]+)"},{"name":"price","selector":".price","attribute":"content"}]`. Regex extraction captures the first group when present. CSS extraction requires rendering.
- Custom JavaScript: a page function expression, e.g. `() => ({h1Count: document.querySelectorAll('h1').length})`. It runs in the browser and can modify the page. Use only trusted code.
- Custom robots.txt replaces the origin's rules while enforcement is enabled. Longest matching allow/disallow rule wins; user-agent specific groups take precedence over wildcard groups.
- Forms login: enable rendering, enter a same-origin login URL, selectors, username and password. The resulting browser session is reused. Multi-step MFA, CAPTCHA and interactive SSO are not supported.
- Browser mode uses a 390 × 844 mobile viewport, a DOM-content-loaded wait and a short settling delay. Dynamic content requiring interaction may need custom JavaScript.

## Integrations

Set environment variables in the terminal **before** starting the server. Values are never embedded in the front-end files. No API credentials are included.

```powershell
$env:OPENAI_API_KEY = 'your-key'
$env:OPENAI_MODEL = 'your-model-id'
$env:GEMINI_API_KEY = 'your-key'
$env:GEMINI_MODEL = 'your-model-id'
$env:PAGESPEED_API_KEY = 'your-key'
$env:GOOGLE_ACCESS_TOKEN = 'your-oauth-access-token'
$env:LANGUAGETOOL_URL = 'http://localhost:8081/v2/check'
$env:LINK_METRICS_URL = 'https://your-adapter.example/metrics'
$env:LINK_METRICS_TOKEN = 'your-adapter-token'
npm start
```

Only set services you intend to use. The defaults are `gpt-4.1-mini` and `gemini-2.5-flash`; availability depends on the provider and account. Configurable model IDs avoid requiring a code change. OAuth tokens must have access to the selected GA4 property / Search Console property and the relevant read scopes. Tokens expire; automatic OAuth login and refresh are not implemented.

Run integrations manually from **Integrations & AI**. Provider results appear as JSON. AI reviews use up to 30 page summaries; grammar uses supplied text or the first page's extracted text. These are explicit on-demand analyses, not automatic per-page enrichment. Data is sent to the chosen provider and API fees may apply. GA4 and GSC reports are separate reports and are not joined to crawler records automatically.

The external link metrics adapter receives a JSON POST with `{ "url": "https://example.com/" }` and returns provider-specific JSON. Implement your provider's authentication and field mapping in that adapter. CrawlStudio also calculates a local internal-link score without an external service; it is not a proprietary domain authority metric.

References: [OpenAI Responses](https://developers.openai.com/api/reference/responses/overview), [Gemini generateContent](https://ai.google.dev/api/generate-content), [PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/get-started), [Search Console Search Analytics](https://developers.google.com/webmaster-tools/v1/searchanalytics/query), [GA4 runReport](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport).

## Audit coverage and limitations

Implemented core checks include HTTP errors and redirects, title / description checks, robots directives, hreflang syntax and reciprocity within the crawl, exact HTML hashes, near-duplicate text, canonical metadata, indexability, sitemap export, source matching, extraction, and internal linking analysis.

Advanced checks have deliberately stated limits:

- Structured data checks validate JSON-LD syntax, context, entity types, graph structure and possible placeholders, not complete schema.org semantics, microdata, RDFa, or Google rich-result eligibility.
- Mobile checks cover viewport metadata and browser overflow, not a complete mobile usability certification.
- axe-core provides automated accessibility findings; static mode checks language and image alt attributes.
- AMP validation depends on the optional amphtml-validator package and runtime.
- HTML extraction uses a lightweight scanner. Severely malformed markup or non-UTF-8 pages can need browser-mode/manual review.
- Exact duplicates compare complete HTML. Near duplicates use Jaccard similarity of word trigrams from the first 3,000 words, including template content; adjust the threshold for your site.
- robots.txt supports basic agent selection, wildcard rules and terminal `$`. It does not ingest sitemap directives or enforce crawl-delay. Redirects and 5xx responses from robots.txt stop a crawl; this is conservative behavior. Use the override if appropriate.
- The crawl checks linked HTML documents. It does not exhaustively audit images, scripts, CSS, PDFs, or all external broken links.
- The limit is 2,000 URLs per crawl. Near-duplicate and link analysis can be expensive on large crawls. Fetches have a 20-second timeout and 5 MB response ceiling.
- The local app can access URLs reachable from your computer. For hosted use, follow DEPLOYMENT.md and keep team access controls enabled. Do not accept untrusted regex or JavaScript from anonymous users.
- Free ongoing human technical support is not something this application can supply. This guide and the troubleshooting below are included.

## Tests

```powershell
npm test
```

Tests cover URL safety and normalization, metadata extraction, robots precedence, exact and near duplicates, hreflang reciprocity, link scores, configuration validation, crawl comparison, and a full HTTP crawl against a controlled fixture with robots blocks, a redirect, a 404, persistence and exports. Local loopback network access is required for the integration test. Tests use port 4312 and a separate data folder under work/, so they do not replace the live app or its saved crawls. 
pm run test:browser` additionally verifies the UI, JavaScript rendering, axe auditing, CSS extraction, custom JavaScript and authenticated form login; install the browser runtime first.

## Troubleshooting

- **Port in use:** close the previous app process or set `$env:PORT = '4311'` before 
pm start`.
- **Browser missing:** run 
pm run install-browser`; restart the server and enable rendering in configuration.
- **401 / 403:** use the site's supported access method. Cookies / authorization headers must be supplied explicitly. For form login use browser rendering.
- **robots.txt failure:** inspect the site's robots response; the crawler stops on a 5xx or redirect instead of assuming permission.
- **API error:** verify keys, OAuth scopes, property access and provider quotas. The app displays the provider HTTP error.
- **Server stopped:** completed crawls remain saved. A running crawl is marked interrupted on restart; start a new crawl to repeat it. There is no mid-queue resume.
- **No pages found:** confirm your starting origin and URL include/exclude rules; many pages need rendering to expose links.


## Cloud deployment and PDFs
Read FREE-CLOUD.md for Render deployment that works while your computer is off. Open Evidence audit and select Download PDF. Chromium is required; it is included in the Docker image.

