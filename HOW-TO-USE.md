# CrawlStudio by Pixel Growers — quick start

## Use it on this computer

1. Start the application with start.cmd in the project folder if it is not already running.
2. Open http://localhost:4310 in Chrome, Edge or another normal browser.
3. Enter the full website address, set a limit of 50–100 pages, and click Start crawl.
4. Open Evidence audit for evidence, priorities and fixes. Download Full report, Action plan or HTML report.
5. Return to Saved crawls to open an earlier audit. Use Crawl comparison after making website changes.

A fresh install needs Node.js 22+ and npm ci. Browser rendering additionally requires npm run install-browser.

## Give your team access

A localhost address only works on the computer running the server. Teammates need one shared hosted address.

Your Hostinger Single Web Hosting can continue hosting your website, but it does not support this Node.js crawler server. The prepared deployment uses a separate VPS and a subdomain such as https://crawl.yourdomain.com. Your hosting administrator can follow DEPLOYMENT.md in the package.

Once deployed, share the actual HTTPS URL and team credentials privately. Every teammate can use it through a regular browser without installing Node.js. The sidebar's How to use CrawlStudio link opens the built-in guide.

## What is included

- Original Pixel Growers logo and its purple brand palette.
- Shared sign-in and one shared crawl workspace.
- Crawl engine, evidence audits, exports, saved crawls and comparison.
- Docker/Caddy deployment files for a VPS, including persistent data storage.

One crawl runs at a time. Everyone with the team credentials can see and control this workspace. Individual accounts and roles are not included.

## Status

The branded app is running locally. No public website, paid server or DNS record has been created. The 20 automated tests pass. Hosted-mode HTTP and Chromium crawling were smoke-tested against example.com. The Docker stack still needs a build and deployment test on the chosen VPS because Docker was unavailable in the development environment.
