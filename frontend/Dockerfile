# ── React Frontend Dockerfile ──────────────────────────────
# Multi-stage build for Community Church Oxford frontend
#
# Dev:  docker compose up frontend  (uses `dev` target)
# Prod: docker build --target production -t cco-frontend .
# ──────────────────────────────────────────────────────────

# ── Stage 1: Base ────────────────────────────────────────
FROM node:22-alpine AS base

WORKDIR /app

# Copy dependency manifest + npm config (cache-friendly layer)
COPY package.json package-lock.json* yarn.lock* .npmrc* ./

# ── Stage 2: Development (hot-reload via Vite) ──────────
FROM base AS dev

ENV NODE_ENV=development

RUN npm install --legacy-peer-deps

COPY . .

# Create non-root user
RUN addgroup -S frontend && adduser -S -G frontend frontend \
    && chown -R frontend:frontend /app

USER frontend

EXPOSE 3000

# Vite dev server — polls for file changes inside Docker volumes
CMD ["npx", "vite", "--host", "0.0.0.0", "--port", "3000"]

# ── Stage 3: Build production assets ────────────────────
FROM base AS build

# Allow Railway (or CI) to pass the CMS URL in at build time.
# Default is empty string so all requests become relative paths
# and nginx proxies them to ${CMS_URL} at runtime.
ARG VITE_CMS_URL=""
ENV VITE_CMS_URL=$VITE_CMS_URL

# Install ALL deps (including devDependencies like vite) before building.
# NODE_ENV=production would skip devDeps, so we set it only after install.
RUN npm ci --legacy-peer-deps

ENV NODE_ENV=production

COPY . .

RUN npm run build

# ── Stage 4: Production (serve with nginx) ──────────────
FROM nginx:stable-alpine AS production

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy built static files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# nginx.conf is static — no envsubst needed in production
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Entrypoint just starts nginx
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
