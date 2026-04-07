# Strapi CMS Setup for Community Church Oxford

## Quick Start

```bash
cd cms
npx create-strapi@latest . --quickstart
```

This will scaffold a Strapi v5 project and open the admin panel at `http://localhost:1337/admin`.

## Environment Variables

Create a `.env` in the `cms/` directory:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-random-keys-here
API_TOKEN_SALT=your-salt
ADMIN_JWT_SECRET=your-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-salt
JWT_SECRET=your-jwt-secret
```

## Content Types to Create

Use the Strapi Content-Type Builder (or import the JSON schemas from `cms/content-types/`) to create:

### Single Types
1. **Home Page** – hero images, tagline, about text
2. **Mission Page** – intro text, 6 mission sections with scripture refs

### Collection Types
1. **Staff Member** – name, title, photo, order
2. **Elder** – name, title, photo, order
3. **Ministry** – name, description, image, schedule, order
4. **Sermon** – title, date, speaker, series, videoUrl, audioUrl, thumbnail
5. **Blog Post** – title, slug, content (rich text), excerpt, coverImage, author, publishedAt
6. **Event** – title, date, location, description, image, registrationEnabled
7. **Contact Submission** – name, email, message (no public read)
8. **Event Registration** – name, email, phone, event (relation)

### Internationalization (i18n)
Enable the i18n plugin for: Home Page, Mission Page, Ministry, Blog Post, Event.
Configure locales: `en` (default), `es`.

## API Permissions

In Settings → Users & Permissions → Roles → Public:
- **find / findOne**: Staff, Elder, Ministry, Sermon, Blog Post, Event
- **create**: Contact Submission, Event Registration
- **No public access**: Admin-only types stay private

## Frontend Connection

In the `frontend/.env`:
```env
VITE_STRAPI_URL=http://localhost:1337
VITE_STRAPI_TOKEN=your-api-token-here
```

Generate an API token in Strapi: Settings → API Tokens → Create new (Read-only for frontend).

## Deployment Notes

- **Frontend**: Deploy to Vercel, Netlify, or any static host (run `npm run build`)
- **Strapi CMS**: Deploy to Railway, Render, DigitalOcean, or a VPS
- Use PostgreSQL for production (SQLite is fine for dev)
- Set up media uploads with Cloudinary or AWS S3 for production
