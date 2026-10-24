# Free cloud deployment — CrawlStudio by Pixel Growers

This runs the app on Render, so teammates can use its default HTTPS address while your computer is off. No purchased domain or VPS is needed. Free-tier quotas and sleep behavior apply; it is not an unlimited always-on service.

Repository: https://github.com/pixelg-bot/CrawlStudio

## 1. Set up free report storage

Create a free Neon PostgreSQL project at https://neon.com and choose a region near your Render service. Copy the provided PostgreSQL connection string from Connect. Keep it private: it contains a password.

The application creates its table automatically. Saved crawls and schedules live in this database. Neon has free-plan compute, storage and transfer limits; choose the Free plan if you want to avoid buying a plan.

A database is needed because Render's free service loses local files on sleep/restart. Render's own free PostgreSQL expires after 30 days, so it is not the default choice for long-term saved reports.

## 2. Deploy through Render

While signed into Render, open:

https://render.com/deploy?repo=https://github.com/pixelg-bot/CrawlStudio

Or choose New > Blueprint and select the CrawlStudio repository. Render reads render.yaml from the repository root.

1. Confirm that the web service plan is Free.
2. When prompted for DATABASE_URL, paste the Neon connection string into Render. Never put it in GitHub or chat.
3. Create the service. The first Docker build installs Chromium and can take several minutes.
4. In the service's Environment settings, reveal the generated CRAWLSTUDIO_PASSWORD. The username is team.
5. Open the actual onrender.com URL assigned by Render. The app picks that origin up automatically. No DNS or custom domain is required.

Share that HTTPS URL and the team credentials privately. Do not run the temporary tunnel launcher for this cloud deployment.

## 3. Use and export

Open the hosted URL in a normal browser, sign in, and start a small crawl. Open a completed crawl > Evidence audit > Download PDF.

The PDF includes Pixel Growers branding, evidence, priorities, fixes and page numbers. HTML, Markdown, CSV, JSON and sitemap exports remain available.

Local crawls do not transfer automatically. Export JSON locally, then import it under Saved crawls in the hosted app.

## Free profile limits

- Up to 100 URLs per crawl, one running crawl in this workspace.
- PDF shows up to 100 prioritized findings and discloses truncation. HTML/JSON retain all findings.
- Schedules are disabled because this free server can sleep. Run crawls manually and keep the audit open until it finishes.
- Render sleeps after 15 minutes idle. The next visitor wakes it, usually with about a minute's wait. Your computer can remain off.
- Chromium rendering and PDFs can hit instance memory limits. Start small and finish the active crawl before exporting a PDF.
- Restarts can interrupt crawls. Last-saved snapshots remain; interrupted crawls do not resume automatically.
- Provider quotas apply. Render may suspend free services with unusually high outbound traffic. This profile is for modest tests, not continuous large crawling.
- API integrations may charge separately.

## Verification

Core/API tests, browser rendering and PDF generation were tested locally. PDF pages were rendered and visually checked. Storage tests cover files and the PostgreSQL adapter contract. A real Neon connection and the Render Docker build still need verification in your accounts. Docker Engine was unavailable here.

References checked 2026-10-24:

- https://render.com/docs/free
- https://render.com/docs/blueprint-spec
- https://render.com/docs/environment-variables
- https://neon.com/docs/introduction/plans
