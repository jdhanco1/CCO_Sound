# Community Church Oxford — Website Rebuild

A modern church website built with **React 19** + **Tailwind CSS 4** (frontend) and **Payload CMS** (self-hosted headless CMS with built-in admin panel), modeled after [communityoxford.com](https://communityoxford.com).

## Project Structure

```
community-church-oxford/
├── frontend/          ← React + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/    Navbar, Footer, Layout
│   │   │   ├── home/      Hero, QuickActions, ServiceTimes
│   │   │   ├── common/    Button, Card, PageHero, SectionHeader, LanguageToggle
│   │   │   ├── leadership/  StaffCard
│   │   │   ├── connect/     MinistryCard
│   │   │   ├── sermons/     SermonCard
│   │   │   └── blog/        BlogCard
│   │   ├── pages/         Home, Mission, Leadership, Connect, Sermons, Blog, Events, Contact
│   │   ├── hooks/         useContent (generic data-fetching hook)
│   │   ├── lib/           api.js (Payload REST client), i18n.js
│   │   ├── i18n/          en.json, es.json
│   │   └── assets/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── cms/               ← Payload CMS (API + Admin Panel)
│   ├── src/
│   │   ├── server.ts
│   │   ├── payload.config.ts
│   │   ├── collections/    StaffMembers, Elders, Ministries, Sermons, etc.
│   │   └── globals/        HomePage, MissionPage
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── railway.toml
└── .gitignore
```

## Pages

| Route          | Description |
|----------------|-------------|
| `/`            | Hero, quick actions, about, service times, Seek/Shape/Send preview |
| `/mission`     | 6-section "Seek, Shape, Send" mission with scripture references |
| `/leadership`  | Staff grid + Elders grid with photos |
| `/connect`     | Ministry cards — groups, men's, women's, kids, students, college, serve |
| `/sermons`     | Sermon archive with embedded video/audio player, pagination |
| `/blog`        | Blog & devotional post grid with pagination |
| `/events`      | Upcoming events with inline registration forms |
| `/contact`     | Service info, office info, contact form, Google Maps embed |

## Features

- **CMS-driven content** — church admins manage everything in Payload's built-in admin panel at `/admin`
- **Spanish language toggle** — full EN/ES i18n (Javi Sanchez runs Spanish Ministry)
- **Sermon archive** — video (YouTube/Vimeo) + audio player, filterable by series/speaker
- **Blog/Devotionals** — rich text posts with author attribution
- **Event registration** — built-in form (no more CCB redirects)
- **Responsive** — mobile-first with sticky nav and hamburger menu
- **Modern design** — navy/gold color scheme, Playfair Display + Inter fonts, rounded cards, smooth animations

## Quick Start

### Option A: Docker (recommended)

```bash
docker compose up
```

This starts Postgres, Payload CMS, and the frontend. Then:
- **Frontend**: http://localhost:3000
- **Admin panel**: http://localhost:3001/admin (create your first admin user on first visit)

### Option B: Manual

#### 1. Database
Start a PostgreSQL instance and note the connection URL.

#### 2. CMS (Payload)
```bash
cd cms
cp .env.example .env
# Set DATABASE_URL and PAYLOAD_SECRET
npm install
npm run dev
```

Visit http://localhost:3001/admin to create your admin account and start adding content.

#### 3. Frontend (React)
```bash
cd frontend
cp .env.example .env
# Set VITE_CMS_URL=http://localhost:3001
npm install
npm run dev
```

Open http://localhost:3000

## External Services (Preserved)

| Service | Purpose | URL |
|---------|---------|-----|
| PushPay | Online giving | pushpay.com/pay/communityoxford |
| CCB     | Events calendar / member login | communityoxford.ccbchurch.com |
| Facebook | Social | facebook.com/communityoxford |
| Twitter | Social | twitter.com/CommunityOxford |

## Deployment (Railway)

See `railway.toml` for configuration. You need three services on Railway:

1. **Postgres** — Add the Railway Postgres plugin
2. **CMS** — Payload CMS (root dir: `cms`, port: `3001`)
3. **Frontend** — React/nginx (root dir: `frontend`, port: `80`)

Set `DATABASE_URL` on the CMS service using Railway's `${{Postgres.DATABASE_URL}}` variable reference.
