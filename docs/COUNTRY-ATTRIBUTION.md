# Approximate audit country

New audit submissions record UTC start time, public visitor/administrator role and approximate IP country using the locally bundled geoip-country database. Raw IP addresses are used transiently for lookup and rate limits, not stored in the crawl record or sent to a geolocation service. IP country may reflect a VPN or network provider. Missing data remains unavailable; earlier audits are not backfilled.

This product includes GeoLite2 data created by MaxMind: https://www.maxmind.com/. Package source, license and database terms: https://github.com/sapics/geoip-country. The installed dependency includes LICENSE and EULA files. The ip-address dependency is overridden to patched version 10.7.5.
