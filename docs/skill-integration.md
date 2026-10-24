# SEO skill integration

CrawlStudio v0.2 applies the evidence-first workflow from the supplied SKILL (1).md attachment. The referenced scripts, specialist files, templates and rubric were not supplied. The original 89 scripts and specialist agents are not installed or executed.

## What changed

- Evidence audit screen: Finding, Evidence, Impact, Fix, confidence, priority, effort.
- Confirmed means a recorded observation. Likely means a heuristic. Hypothesis means incomplete or unavailable evidence. Observed markup does not prove ranking impact.
- Native verification: duplicate findings and known contradictions are suppressed by checking recorded page fields.
- Reports: completed, stopped and failed crawls save FULL-AUDIT-REPORT.md, ACTION-PLAN.md, SEO-REPORT.html and audit.json in data/<crawl-id>/. Download them from Evidence audit. Running crawls have provisional downloads.
- New checks: Open Graph, Twitter Card, heading hierarchy, image dimensions, English readability, JSON-LD entity types and graphs, possible placeholders, selected security headers, AI crawler rules and optional llms.txt.
- OpenAI and Gemini: selecting a crawl supplies a structured evidence-first analyst prompt on the server. Credentials remain required; this is an explicit on-demand analysis.
- Skill category weights are retained for planning, but scores are unassigned where evidence is incomplete. Missing data does not count as a pass.
- References record check dates and are flagged after 90 days. This is not a background policy monitor.

## Adjustments to the attachment

The attachment supports the crawler enhancement request. It does not trigger an audit of an unspecified website or impose arbitrary crawl limits. CrawlStudio keeps the user's configured URL budget rather than imposing the document's 50-location-page cap.

The document's older FAQ eligibility guidance was checked against current official sources. FAQ rich results no longer appear in Google Search as of May 7, 2026. A valid schema.org type and a supported search feature are separate concepts. The crawler does not promise FAQ or HowTo rich results.

Title character counts remain review hints, not hard Google limits. llms.txt is optional and does not establish better Google rankings. AI bot policy is a site owner's choice; allowed access does not guarantee citations.

## Primary references checked 2026-10-24

- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/updates
- https://web.dev/articles/defining-core-web-vitals-thresholds

## Limits

The checks are native deterministic evidence collection. The optional LLM supplies interpretation when run. Readability is English-only. Image dimensions may be supplied by CSS. Security policy needs application-specific review. JSON-LD checks are structural, not full schema.org or rich-result validation. Old crawls need a new run for the added signals.

A robots override is labeled as a simulation, not live policy. llms.txt checks respect configured robots enforcement. Network errors become environment observations, not site defects. No repeated retry loops or third-party mirrors are used. No E-E-A-T verdict, AI-text detector result or Core Web Vitals field score is fabricated.
