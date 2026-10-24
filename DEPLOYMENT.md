# CrawlStudio by Pixel Growers — team deployment

This package preserves your supplied logo and purple (#AE18FE). It prepares the application for hosting; it does not purchase a server, change DNS, or publish a public URL.

## Your Hostinger Single Web Hosting

Keep it for your current website. Hostinger currently supports managed Node.js apps on Business/Cloud plans, not Single. Uploading this application to public_html on Single will not start its server.

For the full crawler, use a separate Linux VPS with Docker and Chromium, and a subdomain such as https://crawl.yourdomain.com. Your main website can remain on its existing hosting.

Business/Cloud Node.js hosting is a conditional alternative for basic HTTP crawling. Chromium dependencies, process limits, persistent storage and scheduling must be verified with Hostinger; that runtime has not been tested here.

Official references checked 2026-10-24:

- [Supported Node.js plans and uploads](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/)
- [Managed app limits](https://www.hostinger.com/support/hostinger-node-js-limits-for-web-and-cloud-plans/)

## VPS setup

Give this ZIP and guide to your hosting administrator. They need server and DNS access. A VPS is a separate cost and has not been purchased. Start with small crawls and monitor Chromium memory usage.

1. Prepare a Linux VPS with Docker Engine and Docker Compose installed.
2. Extract the project into a private application directory, outside any website document root.
3. Add an A record for the new subdomain (host crawl, for example) pointing to the VPS IPv4 address. Keep the main-domain and www records unchanged. Only add an AAAA record if IPv6 is configured for this same server.
4. Allow inbound TCP 80/443 for the web endpoint and certificate issuance. Keep SSH restricted to your administrators. The Compose stack does not publish internal port 4310.
5. Copy .env.example to .env in the extracted directory. Set your real subdomain, username, and a unique random password of at least 16 characters. Replace the placeholder password; startup refuses it. Do not include a protocol or path in CRAWLSTUDIO_DOMAIN. Keep the real .env private.
6. Run this in the project directory:

```sh
docker compose up -d --build
```

The first build downloads Chromium and system libraries. Caddy obtains HTTPS certificates when DNS resolves and ports 80/443 reach the server.

7. Open your real HTTPS subdomain in Chrome, Edge, Firefox or Safari. Enter the team username and password when prompted. Share the URL and credentials through your normal private channel.
8. Open How to use CrawlStudio in the sidebar, or visit /guide on that subdomain.

## Daily operation

```sh
docker compose ps
docker compose logs --tail=100 crawlstudio caddy
```

Crawls, schedules and reports persist in the named crawl_data volume. Back that volume up and verify a restore. A source ZIP is not a backup of saved crawl data.

For updates, replace source files with the reviewed version and rebuild. Coordinate with the team: restarting can interrupt a crawl. Keep the data volume when updating.

This edition has one shared workspace, one running crawl and a shared sign-in. Every signed-in teammate can see reports and control crawls, integrations and schedules. Individual accounts, roles and isolated client workspaces are not included.

## Hosted environment settings

The included Compose file sets HOST to 0.0.0.0, PUBLIC_URL to the exact HTTPS origin derived from your domain, and private-network blocking to true. It reads CRAWLSTUDIO_USERNAME and CRAWLSTUDIO_PASSWORD from your private settings.

Provider API keys also belong on the server, never in front-end files. Add only the required provider environment entries to the crawlstudio service in compose.yaml, referencing your private deployment secrets. Supported names are OPENAI_API_KEY, OPENAI_MODEL, GEMINI_API_KEY, GEMINI_MODEL, GOOGLE_ACCESS_TOKEN, PAGESPEED_API_KEY, LANGUAGETOOL_URL, LINK_METRICS_URL and LINK_METRICS_TOKEN. Recreate the service after configuration changes. Provider calls may incur charges; OAuth token refresh is not automatic.

## Managed Hostinger Node.js alternative

This path requires a compatible plan and verification with Hostinger. It is unavailable on your current Single plan.

- Add a separate Node.js app through hPanel using ZIP upload or GitHub. Keep the existing website separate.
- Choose Node.js 22+, framework Other, npm, and start command npm start. The entry point is server.mjs. There is no frontend build step. Use the platform-assigned PORT.
- Set HOST=0.0.0.0, PUBLIC_URL to the exact HTTPS app origin, a username and a strong password. Keep private-network blocking enabled.
- Set CRAWLSTUDIO_DATA to an absolute writable persistent directory supported by the plan. Verify data survives deployment and restart.
- Test HTTP crawling first. Only enable rendering after confirming Chromium and its libraries can run. Confirm scheduling/restart behavior with Hostinger; this app uses in-process schedules, not Hostinger cron.
- A static-only upload cannot run the backend.

## Local use now

On the computer with the installed app, start.cmd starts the server. Open http://localhost:4310 in a normal browser. When teammates open localhost, they reach their own computers, not yours.

A fresh local install requires Node.js 22+ and npm ci. For JavaScript rendering, run npm run install-browser. Use the VPS instructions to give teammates a shared HTTPS address.

## Hosting controls

A non-loopback listener refuses startup without an explicit origin and a non-placeholder password of at least 16 characters. APIs check Host/Origin and require JSON mutation requests.

Hosted crawl requests block private, local and reserved addresses, including cloud metadata addresses. HTTP connections validate and pin DNS results. Hosted Chromium requests use the same HTTP path; service workers and WebSockets are disabled in hosted crawling.

The app is intended for a trusted team. These controls are not a production security certification. Keep the server and packages updated and test the actual deployment before sharing access widely.

## Verification

The automated core, evidence-audit and team-hosting suites pass, including authentication, branded assets, the guide, private-address blocking and DNS validation. The browser suite checks rendering, extraction, accessibility, form login and the UI.

Docker Engine is unavailable in the development environment. The Docker image and Compose stack have not been built here. Public hosting, DNS and HTTPS issuance still need verification on your server. No public URL has been deployed by preparing this package.
