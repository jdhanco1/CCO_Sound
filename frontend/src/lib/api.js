import axios from 'axios';

export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN || '';

const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: STRAPI_TOKEN
    ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
    : {},
});

/** Normalize Strapi v5 response: { data, meta } → flat array/object */
function normalize(response) {
  const { data } = response.data;
  if (Array.isArray(data)) {
    return data.map((item) => ({ id: item.id, ...item.attributes }));
  }
  return { id: data.id, ...data.attributes };
}

// ── Content fetchers ────────────────────────────────────────

export async function getHomePage(locale = 'en') {
  const res = await api.get('/home-page', {
    params: { populate: '*', locale },
  });
  return normalize(res);
}

export async function getMissionPage(locale = 'en') {
  const res = await api.get('/mission-page', {
    params: { populate: 'sections.scriptures', locale },
  });
  return normalize(res);
}

export async function getStaff() {
  const res = await api.get('/staff-members', {
    params: { populate: 'photo', sort: 'order:asc' },
  });
  return normalize(res);
}

export async function getElders() {
  const res = await api.get('/elders', {
    params: { populate: 'photo', sort: 'order:asc' },
  });
  return normalize(res);
}

export async function getMinistries(locale = 'en') {
  const res = await api.get('/ministries', {
    params: { populate: 'image', sort: 'order:asc', locale },
  });
  return normalize(res);
}

export async function getSermons(page = 1, pageSize = 12) {
  const res = await api.get('/sermons', {
    params: {
      populate: 'speaker,series,thumbnail',
      sort: 'date:desc',
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
    },
  });
  return { items: normalize(res), meta: res.data.meta };
}

export async function getBlogPosts(page = 1, pageSize = 9, locale = 'en') {
  const res = await api.get('/blog-posts', {
    params: {
      populate: 'author,coverImage',
      sort: 'publishedAt:desc',
      locale,
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
    },
  });
  return { items: normalize(res), meta: res.data.meta };
}

export async function getEvents(locale = 'en') {
  const res = await api.get('/events', {
    params: {
      populate: 'image',
      sort: 'date:asc',
      locale,
      'filters[date][$gte]': new Date().toISOString().slice(0, 10),
    },
  });
  return normalize(res);
}

export async function submitContactForm(data) {
  return api.post('/contact-submissions', { data });
}

export async function submitEventRegistration(eventId, data) {
  return api.post('/event-registrations', {
    data: { ...data, event: eventId },
  });
}

export default api;
