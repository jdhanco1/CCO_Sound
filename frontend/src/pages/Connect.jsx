import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { HiX } from 'react-icons/hi';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import MinistryCard from '../components/connect/MinistryCard';
import Button from '../components/common/Button';
import useContent from '../hooks/useContent';
import { getMinistries, getPageHeroes, CMS_URL, submitContactForm } from '../lib/api';

// ── Static ministry areas ──────────────────────────────────────────────────
const MINISTRY_AREAS = [
  {
    id: 'volunteer',
    title: 'Volunteer Signup',
    tagline: 'Put your faith to work',
    description:
      `Ready to serve? Sign up to volunteer at Community Oxford. Whether it's greeting on Sunday mornings, helping with setup, or serving in kids ministry, we'd love to have you.`,
    accent: 'bg-brand',
    externalUrl: 'https://churchbuilder.example.com/volunteer', // ← replace with real ChurchBuilder URL
  },
  {
    id: 'community-groups',
    title: 'Community Groups',
    tagline: 'Do life together',
    description:
      `Community Groups are smaller gatherings of people who meet throughout the week to study scripture, pray together, and build real relationships. There's a group for every stage of life.`,
    accent: 'bg-accent',
  },
  {
    id: 'cco-kids',
    title: 'Community Kids',
    tagline: 'Rooted in faith from day one',
    description:
      'CCO Kids provides a safe, fun, and Gospel-centered environment for children from birth through 5th grade every Sunday morning. We partner with parents to help kids know and love Jesus.',
    accent: 'bg-sky-600',
  },
  {
    id: 'cco-students',
    title: 'CCO Students',
    tagline: 'Middle & high school ministry',
    description:
      'CCO Students is a community for 6th–12th graders where teenagers can ask hard questions, build real friendships, and discover what it means to follow Jesus in everyday life.',
    accent: 'bg-purple-600',
  },
  {
    id: 'college',
    title: 'College',
    tagline: 'Faith beyond high school',
    description:
      'Our college ministry exists to help college students put down roots in a local church, pursue community, and grow as disciples during one of the most formative seasons of life.',
    accent: 'bg-indigo-600',
  },
  {
    id: 'sunday-serve',
    title: 'Sunday Serve Teams',
    tagline: 'Make Sunday happen',
    description:
      'From worship and tech to hospitality and kids, our Sunday Serve Teams are the hands and feet that make each Sunday morning possible. Join a team and serve the body.',
    accent: 'bg-amber-600',
  },
  {
    id: 'mens',
    title: "Men's Ministry",
    tagline: 'Iron sharpening iron',
    description:
      "Men's Ministry at Community Oxford creates space for men to grow spiritually, build accountability, and pursue Christ together through regular gatherings, Bible studies, and events.",
    accent: 'bg-teal-700',
  },
  {
    id: 'womens',
    title: "Women's Ministry",
    tagline: 'Community. Growth. Grace.',
    description:
      "Women's Ministry exists to help women know God more deeply and love each other more fully. Through Bible studies, events, and meaningful relationships, we grow together in faith.",
    accent: 'bg-rose-600',
  },
];

export default function Connect() {
  const { t } = useTranslation();
  const { data: ministries, loading } = useContent(getMinistries);
  const { data: heroes } = useContent(getPageHeroes);

  // Intro banner contact form state
  const [showForm, setShowForm] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [contactError, setContactError] = useState(false);

  // Ministry modal state
  const [activeCard, setActiveCard] = useState(null);

  const heroConfig = heroes?.connect;
  const heroImage = heroConfig?.heroImage?.url ? `${CMS_URL}${heroConfig.heroImage.url}` : undefined;
  const list = ministries || [];

  const serveAreas = list.filter((m) => !m.type || m.type === 'serve_area');
  const groups = list.filter((m) => m.type === 'community_group');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContactForm(contactForm);
      setSubmitted(true);
    } catch {
      setContactError(true);
    }
  };

  const Spinner = () => (
    <div className="py-20 text-center text-gray-400">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-accent border-t-transparent" />
    </div>
  );

  const MinistryGrid = ({ items, emptyKey }) =>
    items.length === 0 ? (
      <div className="rounded-2xl bg-warm p-10 text-center">
        <p className="text-gray-500">{t(emptyKey)}</p>
      </div>
    ) : (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((m) => (
          <MinistryCard
            key={m.id}
            slug={m.slug}
            name={m.name}
            summary={m.summary}
            image={m.image}
            meetingTime={m.meetingTime}
            location={m.location}
            leader={m.leader}
          />
        ))}
      </div>
    );

  return (
    <>
      <Helmet>
        <title>{t('connect.title')} — Community Church Oxford</title>
      </Helmet>

      {heroImage && (
        <PageHero
          title={heroConfig?.heroTitle}
          subtitle={heroConfig?.heroSubtitle}
          backgroundImage={heroImage}
        />
      )}

      {/* ── Intro banner ─────────────────────────────────────────────────── */}
      <section className="bg-brand-dark py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand">Community Oxford</p>
          <h1 className="font-serif text-4xl font-bold md:text-5xl">{t('connect.title')}</h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-300">{t('connect.intro')}</p>

          {/* Single "Learn More" button */}
          {!showForm && !submitted && (
            <div className="mt-8">
              <button
                onClick={() => setShowForm(true)}
                className="rounded-full bg-brand px-8 py-3 text-sm font-bold uppercase tracking-wide text-brand-dark shadow transition hover:bg-brand/80"
              >
                Learn More
              </button>
            </div>
          )}

          {/* Inline contact form */}
          {(showForm || submitted) && (
            <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-white/20 bg-white/10 p-6 text-left backdrop-blur-sm">
              {submitted ? (
                <div className="py-6 text-center">
                  <p className="font-semibold text-brand">Thank you! We'll be in touch soon.</p>
                </div>
              ) : (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-serif text-lg font-bold text-white">Send Us a Message</h3>
                    <button
                      onClick={() => { setShowForm(false); setContactError(false); }}
                      className="rounded-full p-1 text-gray-300 hover:bg-white/20 hover:text-white"
                      aria-label="Close"
                    >
                      <HiX size={18} />
                    </button>
                  </div>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-300">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-300">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                        placeholder="jane@example.com"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-300">
                        Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                        placeholder="I'd love to learn more about..."
                      />
                    </div>
                    {contactError && (
                      <p className="text-sm text-red-400">
                        Something went wrong. Please try again or call us at 662.380.5014.
                      </p>
                    )}
                    <button
                      type="submit"
                      className="w-full rounded-full bg-brand py-3 text-sm font-bold uppercase tracking-wide text-brand-dark shadow transition hover:bg-brand/80"
                    >
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Ministry Areas grid ───────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader eyebrow="Get Connected" title="Ways to Get Involved" subtitle="Find your place at Community Oxford." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MINISTRY_AREAS.map((area) => (
              <button
                key={area.id}
                onClick={() => {
                  if (area.externalUrl) {
                    window.open(area.externalUrl, '_blank', 'noopener,noreferrer');
                  } else {
                    setActiveCard(area);
                  }
                }}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white text-left shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`h-2 w-full ${area.accent}`} />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-lg font-bold text-brand-dark">{area.title}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-400">{area.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">{area.description}</p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wide text-accent transition group-hover:text-brand-dark">
                    {area.externalUrl ? 'Sign Up →' : 'Learn More →'}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Serve Areas (CMS) ─────────────────────────────────────────────── */}
      <section id="serve" className="bg-warm py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow="Serve"
            title={t('connect.serve_heading')}
            subtitle={t('connect.serve_sub')}
          />
          {loading ? <Spinner /> : <MinistryGrid items={serveAreas} emptyKey="connect.empty_serve" />}
        </div>
      </section>

      {/* ── Community Groups (CMS) ────────────────────────────────────────── */}
      <section id="groups" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow="Grow"
            title={t('connect.groups_heading')}
            subtitle={t('connect.groups_sub')}
          />
          {loading ? <Spinner /> : <MinistryGrid items={groups} emptyKey="connect.empty_groups" />}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-accent py-16 text-center text-white">
        <div className="mx-auto max-w-xl px-4">
          <p className="font-serif text-2xl font-bold">{t('connect.questions')}</p>
          <div className="mt-6">
            <Button to="/contact" variant="white" size="lg">
              {t('nav.contact')}
            </Button>
          </div>
        </div>
      </section>

      {/* ── Ministry modal ─────────────────────────────────────────────────── */}
      {activeCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setActiveCard(null)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Accent bar */}
            <div className={`h-2 w-full ${activeCard.accent}`} />
            <div className="p-8">
              <button
                onClick={() => setActiveCard(null)}
                className="absolute right-4 top-6 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close"
              >
                <HiX size={20} />
              </button>
              <h3 className="font-serif text-2xl font-bold text-brand-dark">{activeCard.title}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-accent">{activeCard.tagline}</p>
              <p className="mt-5 text-sm leading-relaxed text-gray-600">{activeCard.description}</p>
              <div className="mt-6 flex gap-3">
                <Button to="/contact" variant="primary" size="md">
                  Get in Touch
                </Button>
                <button
                  onClick={() => setActiveCard(null)}
                  className="rounded-full border-2 border-gray-300 px-5 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
