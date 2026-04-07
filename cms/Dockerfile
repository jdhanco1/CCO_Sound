# ── Payload CMS Dockerfile ─────────────────────────────────
# Dev:  docker compose up cms
# Prod: docker build --target production -t cco-cms .
# ──────────────────────────────────────────────────────────

# ── Stage 1: Base ────────────────────────────────────────
FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json* ./

# ── Stage 2: Development ────────────────────────────────
FROM base AS dev
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]

# ── Stage 3: Build ──────────────────────────────────────
FROM base AS build
ENV NODE_ENV=production
RUN npm ci
COPY . .
RUN npm run build

# ── Stage 4: Production ────────────────────────────────
FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/build ./build

RUN mkdir -p /app/media && chown -R node:node /app
USER node
EXPOSE 3001
CMD ["npm", "run", "serve"]
