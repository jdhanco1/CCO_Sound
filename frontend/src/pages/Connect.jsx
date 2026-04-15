import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { HiX } from 'react-icons/hi';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import MinistryCard from '../components/connect/MinistryCard';
import RichText from '../components/common/RichText';
import useContent from '../hooks/useContent';
import { getMinistries, getPageHeroes, CMS_URL, submitContactForm } from '../lib/api';

// Maps CMS accentColor value → Tailwind bg class
const ACCENT_MAP = {
  brand:   'bg-brand',
  accent:  'bg-accent',
  sky:     'bg-sky-600',
  purple:  'bg-purple-600',
  indigo:  'bg-indigo-600',
  amber:   'bg-amber-600',
  teal:    'bg-teal-700',
  rose:    'bg-rose-600',
};

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

  const ministryCards = list.filter((m) => m.type === 'ministry_card');
  const serveAreas    = list.filter((m) => !m.type || m.type === 'serve_area');

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

  return (
    <>
      <Helmet>
        <title>{t('connect.title')} — Community Church Oxford</title>
        <meta name="description" content="Get involved at Community Church Oxford in Oxford, MS. Explore ministries, small groups, and volunteer opportunities." />
        <link rel="canonical" href="https://communityoxford.com/connect" />
        <meta property="og:title" content={`${t('connect.title')} — Community Church Oxford`} />
        <meta property="og:description" content="Explore ministries, small groups, and volunteer opportunities at Community Church Oxford." />
        <meta property="og:url" content="https://communityoxford.com/connect" />
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
          <h2 className="font-serif text-4xl font-bold md:text-5xl">{t('connect.title')}</h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-300">{t('connect.intro')}</p>

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
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-300">Your Name</label>
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
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-300">Your Email</label>
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
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-300">Message</label>
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
                      <p className="text-sm text-red-400">Something went wrong. Please try again or call us at 662.380.5014.</p>
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
          {loading ? (
            <Spinner />
          ) : ministryCards.length === 0 ? (
            <p className="mt-10 text-center text-gray-400">Ministry areas will appear here once added in the CMS with the "Ministry Card" type.</p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ministryCards.map((area) => {
                const accentClass = ACCENT_MAP[area.accentColor] || 'bg-accent';
                return (
                  <button
                    key={area.id}
                    onClick={() => {
                      if (area.externalUrl) {
                        window.open(area.externalUrl, '_blank', 'noopener,noreferrer');
                      } else {
                        setActiveCard({ ...area, accentClass });
                      }
                    }}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-white text-left shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className={`h-2 w-full ${accentClass}`} />
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-serif text-lg font-bold text-brand-dark">{area.name}</h3>
                      {area.tagline && (
                        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-400">{area.tagline}</p>
                      )}
                      {area.summary && (
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">{area.summary}</p>
                      )}
                      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-accent transition group-hover:text-brand-dark">
                        {area.externalUrl ? 'Sign Up →' : 'Learn More →'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Transition into detailed ministry pages ───────────────────────── */}
      <div className="bg-warm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="h-px w-full bg-gray-200" />
        </div>
      </div>

      {/* ── Serve Areas (CMS detail cards) ───────────────────────────────── */}
      <section id="serve" className="bg-warm pb-20 pt-12">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow="Explore Our Ministries"
            title={t('connect.serve_heading')}
            subtitle={t('connect.serve_sub')}
          />
          {loading ? (
            <Spinner />
          ) : serveAreas.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center">
              <p className="text-gray-500">{t('connect.empty_serve')}</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {serveAreas.map((m) => (
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
          )}
        </div>
      </section>

      {/* ── Ministry modal ───────────────────────────────────────────────── */}
      {activeCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setActiveCard(null)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image or accent bar */}
            {activeCard.image?.url ? (
              <div className="relative h-52 w-full shrink-0 overflow-hidden">
                <img
                  src={activeCard.image.url}
                  alt={activeCard.image.alt || activeCard.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className={`absolute bottom-0 left-0 h-1.5 w-full ${activeCard.accentClass}`} />
              </div>
            ) : (
              <div className={`h-2 w-full shrink-0 ${activeCard.accentClass}`} />
            )}

            {/* Scrollable body */}
            <div className="overflow-y-auto p-8">
              <button
                onClick={() => setActiveCard(null)}
                className="absolute right-4 top-4 rounded-full bg-white/80 p-1.5 text-gray-600 shadow hover:bg-white hover:text-gray-900"
                aria-label="Close"
              >
                <HiX size={18} />
              </button>

              <h3 className="font-serif text-2xl font-bold text-brand-dark">{activeCard.name}</h3>
              {activeCard.tagline && (
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-accent">{activeCard.tagline}</p>
              )}

              {/* Rich text description */}
              {activeCard.description ? (
                <div className="mt-5">
                  <RichText content={activeCard.description} />
                </div>
              ) : activeCard.summary ? (
                <p className="mt-5 text-sm leading-relaxed text-gray-600">{activeCard.summary}</p>
              ) : null}

              {/* Contact email */}
              {activeCard.contactEmail && (
                <a
                  href={`mailto:${activeCard.contactEmail}`}
                  className="mt-4 block text-sm font-medium text-accent underline hover:text-accent/80"
                >
                  {activeCard.contactEmail}
                </a>
              )}

              <div className="mt-6 flex gap-3">
                {activeCard.externalUrl ? (
                  <a
                    href={activeCard.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-gray-800 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-gray-700"
                  >
                    Sign Up
                  </a>
                ) : (
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-gray-800 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-gray-700"
                  >
                    Get in Touch
                  </a>
                )}
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
