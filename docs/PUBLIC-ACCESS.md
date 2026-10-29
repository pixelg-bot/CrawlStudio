# Public crawler and administrator access

The hosted service opens public audits without a login. Each visitor receives a signed, HttpOnly browser cookie; crawl records are checked against that visitor on every report, download and stop endpoint. Visitors see only their own browser audit history. Clearing cookies or switching browsers loses access to that visitor history. Administrators retain all saved audits.

Open `/admin` and use the existing team credentials for saved reports, connected clients, Google connections and configuration. Administrator sessions last eight hours. Passwords and API keys are not exposed to visitors. Existing private audits are not made public.

Public audits use managed crawl settings, respect robots rules, exclude custom scripts and authentication, and cap each crawl at 100 URLs. Six public crawl starts and six source refresh requests per browser/IP per hour limit resource use. Only one crawl can run at a time on this free server. Public PDF downloads remain available. Private network access remains blocked.

Set CRAWLSTUDIO_PUBLIC=false to restore the previous team-only login requirement. Keep CRAWLSTUDIO_PASSWORD and the existing storage namespace unchanged so existing Google token encryption and audit history remain intact.
