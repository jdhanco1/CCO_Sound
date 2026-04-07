# Community Church Oxford — Website Rebuild

A modern church website built with **React 19** + **Tailwind CSS 4** (frontend) and **Strapi v5** (headless CMS), modeled after [communityoxford.com](https://communityoxford.com).

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
│   │   ├── hooks/         useStrapi (generic data-fetching hook)
│   │   ├── lib/           api.js (Strapi client), i18n.js
│   │   ├── i18n/          en.json, es.json
│   │   └── assets/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── cms/               ← Strapi CMS
│   ├── content-types/   JSON schemas (reference for Content-Type Builder)
│   ├── components/      Reusable component schemas (shared, mission)
│   ├── seed.js          Data seeder script
│   ├── README.md        Setup guide
│   └── .env.example
│
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

- **CMS-driven content** — church admins manage everything in Strapi's visual admin panel
- **Spanish language toggle** — full EN/ES i18n (Javi Sanchez runs Spanish Ministry)
- **Sermon archive** — video (YouTube/Vimeo) + audio player, filterable by series/speaker
- **Blog/Devotionals** — rich text posts with author attribution
- **Event registration** — built-in form (no more CCB redirects)
- **Responsive** — mobile-first with sticky nav and hamburger menu
- **Modern design** — navy/gold color scheme, Playfair Display + Inter fonts, rounded cards, smooth animations

## Quick Start

### 1. CMS (Strapi)

```bash
cd cms
npx create-strapi@latest . --quickstart
# Create content types matching the JSON schemas in content-types/
# Then seed data:
STRAPI_TOKEN=your-token node seed.js
```

### 2. Frontend (React)

```bash
cd frontend
cp .env.example .env
# Set VITE_STRAPI_URL and VITE_STRAPI_TOKEN
npm install
npm run dev
```

Open **http://localhost:3000**

## External Services (Preserved)

| Service | Purpose | URL |
|---------|---------|-----|
| PushPay | Online giving | pushpay.com/pay/communityoxford |
| CCB     | Events calendar / member login | communityoxford.ccbchurch.com |
| Facebook | Social | facebook.com/communityoxford |
| Twitter | Social | twitter.com/CommunityOxford |

## Deployment

- **Frontend**: Vercel or Netlify (static build via `npm run build`)
- **Strapi CMS**: Railway, Render, DigitalOcean, or self-hosted VPS
- Use PostgreSQL + Cloudinary/S3 for production media
