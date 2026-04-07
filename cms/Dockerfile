# ── Strapi CMS Dockerfile ──────────────────────────────────
# Multi-stage build for Community Church Oxford CMS
#
# Dev:  docker compose up strapi
# Prod: docker build --target production -t cco-strapi .
# ───────────────────────────────────────────────────────────

# ── Stage 1: Base (shared between dev & prod) ─────────────
FROM node:22-alpine AS base

# Install OS-level deps needed by native modules (sharp, pg, etc.)
RUN apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    vips-dev \
    && rm -rf /var/cache/apk/*

WORKDIR /opt/app

# Create a dedicated non-root user
RUN addgroup -S strapi && adduser -S -G strapi strapi

# Copy dependency files first (maximizes Docker layer cache)
COPY package.json package-lock.json* yarn.lock* ./

# ── Stage 2: Development ─────────────────────────────────
FROM base AS dev

ENV NODE_ENV=development

# Install ALL deps (including devDependencies)
RUN npm install

# Copy the rest of the source
COPY . .

# Own everything by the strapi user
RUN chown -R strapi:strapi /opt/app

USER strapi

EXPOSE 1337

# Start in develop mode (auto-reload on file changes)
CMD ["npm", "run", "develop"]

# ── Stage 3: Production build ────────────────────────────
FROM base AS build

ENV NODE_ENV=production

RUN npm ci --only=production

COPY . .

RUN npm run build

# ── Stage 4: Production runtime ──────────────────────────
FROM node:22-alpine AS production

RUN apk add --no-cache vips-dev && rm -rf /var/cache/apk/*

WORKDIR /opt/app

# Create non-root user
RUN addgroup -S strapi && adduser -S -G strapi strapi

# Copy built artifacts from build stage
COPY --from=build /opt/app/dist ./dist
COPY --from=build /opt/app/node_modules ./node_modules
COPY --from=build /opt/app/package.json ./
COPY --from=build /opt/app/config ./config
COPY --from=build /opt/app/src ./src
COPY --from=build /opt/app/public ./public

RUN chown -R strapi:strapi /opt/app

USER strapi

ENV NODE_ENV=production

EXPOSE 1337

CMD ["npm", "run", "start"]
