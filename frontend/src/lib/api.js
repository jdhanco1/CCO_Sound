// VITE_CMS_URL is baked in at build time by Docker ARG / Railway env var.
// Use || (not ??) so an empty string also falls back to the dev default.
export const CMS_URL = import.meta.env.VITE_CMS_URL || 'http://localhost:3001';

// ── Helpers ─────────────────────────────────────────────────

async function fetchAPI(path) {
  const res = await fetch(`${CMS_URL}/api${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

/** Normalize a Payload media/upload field into { url, alt } */
function normalizeImage(field) {
  if (!field) return null;
  return { url: `${CMS_URL}${field.url}`, alt: field.alt || '' };
}

/** Normalize a Payload doc, resolving upload fields */
function normalize(doc) {
  if (!doc) return null;
  const out = { ...doc };
  // Resolve common upload fields
  for (const key of ['photo', 'image', 'thumbnail', 'coverImage']) {
    if (out[key] && typeof out[key] === 'object' && out[key].url) {
      out[key] = normalizeImage(out[key]);
    }
  }
  return out;
}

// ── Content fetchers ────────────────────────────────────────

export async function getHomePage() {
  const res = await fetchAPI('/globals/home-page');
  return res;
}

export async function getMissionPage() {
  const res = await fetchAPI('/globals/mission-page');
  return res;
}

export async function getPageHeroes() {
  const res = await fetchAPI('/globals/page-heroes?depth=1');
  return res;
}

export async function getStaff() {
  const res = await fetchAPI('/staff-members?sort=order&limit=100&depth=1');
  return res.docs.map(normalize);
}

export async function getElders() {
  const res = await fetchAPI('/elders?sort=order&limit=100&depth=1');
  return res.docs.map(normalize);
}

export async function getMinistries() {
  const res = await fetchAPI('/ministries?sort=order&limit=100&depth=1');
  return res.docs.map(normalize);
}

export async function getMinistry(slug) {
  const res = await fetchAPI(`/ministries?where[slug][equals]=${encodeURIComponent(slug)}&depth=1&limit=1`);
  const doc = res.docs?.[0];
  return doc ? normalize(doc) : null;
}

export async function getSermons(page = 1, pageSize = 12) {
  const res = await fetchAPI(`/sermons?sort=-date&page=${page}&limit=${pageSize}&depth=1`);
  return {
    items: res.docs.map(normalize),
    meta: {
      pagination: {
        page: res.page,
        pageSize: res.limit,
        pageCount: res.totalPages,
        total: res.totalDocs,
      },
    },
  };
}

export async function getBlogPost(slug) {
  const res = await fetchAPI(`/blog-posts?where[slug][equals]=${encodeURIComponent(slug)}&depth=1&limit=1`);
  const doc = res.docs?.[0];
  return doc ? normalize(doc) : null;
}

export async function getBlogPosts(page = 1, pageSize = 9) {
  const res = await fetchAPI(`/blog-posts?sort=-publishedDate&page=${page}&limit=${pageSize}&depth=1`);
  return {
    items: res.docs.map(normalize),
    meta: {
      pagination: {
        page: res.page,
        pageSize: res.limit,
        pageCount: res.totalPages,
        total: res.totalDocs,
      },
    },
  };
}

export async function getEvents() {
  const today = new Date().toISOString().slice(0, 10);
  const res = await fetchAPI(`/events?sort=startDate&where[startDate][greater_than_equal]=${today}&limit=100&depth=1`);
  return res.docs.map(normalize);
}

// ── Form submissions (POST directly to Payload) ────────────

export async function submitContactForm(data) {
  const res = await fetch(`${CMS_URL}/api/contact-submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to submit contact form');
  return res.json();
}

export async function submitEventRegistration(eventId, data) {
  const res = await fetch(`${CMS_URL}/api/event-registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, event: eventId }),
  });
  if (!res.ok) throw new Error('Failed to submit registration');
  return res.json();
}
