# Free sharing with teammates in different locations

Use this to let teammates open CrawlStudio in a normal browser without buying hosting or a domain.

## Start sharing

1. Double-click SHARE-WITH-TEAM.cmd in the CrawlStudio folder. On a fresh computer install Node.js 22+ and run npm ci in this folder first.
2. The first run downloads the official cloudflared client. Wait for READY and a generated HTTPS address ending in trycloudflare.com.
3. Open data/sharing/TEAM-ACCESS.txt. It contains the current team link, username and generated password. Keep this file private and share its details only with your teammates.
4. Teammates open the HTTPS link in Chrome, Edge, Firefox or Safari and enter the username and password. They do not need VS Code or Node.js.
5. Keep the sharing window open and keep your computer awake and online. Press Ctrl+C in that window to stop sharing.

For JavaScript rendering, install Chromium once using npm run install-browser if it is not already available.

## What changes on restart

The temporary link changes every time sharing restarts. Read TEAM-ACCESS.txt again and send the new link. The generated username/password are reused from the private credentials file so the team does not need a new password each time.

This free tunnel has no uptime guarantee. Sleep, a restart, closing the sharing process or an internet outage stops access. It is suitable for occasional team sessions, not an always-on hosted service.

## Shared workspace

The tunnel starts a separate password-protected instance on local port 4315. Saved team crawls persist in data/team-share. Your original local app on port 4310 can keep its own workspace. To bring an existing local crawl into the team workspace, export its JSON and import it under Saved crawls in the shared instance.

All people with the team credentials can see this shared workspace and control its crawls. Only one crawl runs at a time. Public, local and reserved network destinations are filtered in this sharing mode, so use it for public websites rather than intranet sites.

## Troubleshooting

- No READY message: check your internet connection or whether your VPN/firewall blocks cloudflared. The launcher exits after two minutes if it cannot connect.
- An old link fails: restart sharing and use the latest link in TEAM-ACCESS.txt.
- A password prompt appears: enter the team credentials from TEAM-ACCESS.txt. They are not your Windows or Hostinger credentials.
- Sharing port already running: use the existing sharing session or stop it before launching another.
- Need a stable permanent link: this temporary service does not provide one. A separately configured persistent tunnel is a different setup.

Official reference: https://developers.cloudflare.com/tunnel/get-started/quick-tunnels/
