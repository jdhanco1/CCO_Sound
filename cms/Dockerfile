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
# Full build output — required so npx payload migrate can run at startup
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/src ./src
COPY --from=build /app/public ./public
EXPOSE 3000
# Run pending DB migrations then start Next.js.
# payload migrate is idempotent — already-applied migrations are skipped.
CMD ["sh", "-c", "npx payload migrate && npx next start -p ${PORT:-3000}"]
