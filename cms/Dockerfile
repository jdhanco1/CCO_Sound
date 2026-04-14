# ── Dev stage ─────────────────────────────────────────────
FROM node:20-alpine AS dev
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]

# ── Build stage ────────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
# Railway passes all service env vars as build args automatically.
# Declare NEXT_PUBLIC_* vars here so Next.js can inline them at build time.
ARG NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

# ── Production stage ───────────────────────────────────────
FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# output:standalone places a minimal server + trimmed node_modules here
COPY --from=build /app/.next/standalone ./
# Static assets must be copied separately (not included in standalone)
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
# Railway injects $PORT; Next.js standalone server.js reads it automatically
CMD ["node", "server.js"]
