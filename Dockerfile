FROM node:22-bookworm-slim
ENV NODE_ENV=production PLAYWRIGHT_BROWSERS_PATH=/opt/browsers HOST=0.0.0.0 PORT=4310 CRAWLSTUDIO_DATA=/app/data
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npx playwright install --with-deps chromium && chmod -R a+rX /opt/browsers
COPY report-sections.mjs clients.mjs public-sources.mjs analytics-data.mjs reporting.mjs google-auth.mjs discovery.mjs search-data.mjs server.mjs html.mjs seo-audit.mjs hosting.mjs network.mjs pdf-report.mjs storage.mjs ./
COPY public ./public
RUN mkdir -p /app/data && chown -R node:node /app/data
USER node
EXPOSE 4310
HEALTHCHECK --interval=30s --timeout=5s CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.mjs"]
