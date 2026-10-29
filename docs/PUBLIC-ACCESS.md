# Public crawler and administrator access

The hosted service opens public audits without a login. Each visitor receives a signed, HttpOnly browser cookie; crawl records are checked against that visitor on every report, download and stop endpoint. Saved Audits is administrator-only. Public users can view only the current session audit; returning to the homepage rotates the visitor session. Administrators retain all saved audits and can remove them to a recoverable Removed audits list. New records include UTC submission time and approximate country where available.

Open `/admin` and use the existing team credentials for saved reports, connected clients, Google connections and configuration. Administrator sessions last eight hours. Passwords and API keys are not exposed to visitors. Existing private audits are not made public.

Public audits use managed crawl settings, respect robots rules, exclude custom scripts and authentication, and cap each crawl at 100 URLs. Six public crawl starts and six source refresh requests per browser/IP per hour limit resource use. Only one crawl can run at a time on this free server. Public PDF downloads remain available. Private network access remains blocked.

Set CRAWLSTUDIO_PUBLIC=false to restore the previous team-only login requirement. Keep CRAWLSTUDIO_PASSWORD and the existing storage namespace unchanged so existing Google token encryption and audit history remain intact.
