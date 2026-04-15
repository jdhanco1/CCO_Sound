import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { HiOutlineClock, HiOutlineLocationMarker, HiOutlineUser, HiOutlineMail } from 'react-icons/hi';
import useContent from '../hooks/useContent';
import { getMinistry, submitContactForm } from '../lib/api';
import RichText from '../components/common/RichText';

export default function Ministry() {
  const { slug } = useParams();
  const { data: ministry, loading, error } = useContent(() => getMinistry(slug), [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  if (error || !ministry) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <p className="font-serif text-2xl text-gray-500">Ministry not found.</p>
        <Link to="/connect" className="text-sm font-semibold text-brand underline hover:text-accent">
          ← Back to Connect
        </Link>
      </div>
    );
  }

  const imgSrc = ministry.image?.url || null;

  return (
    <>
      <Helmet>
        <title>{ministry.name} — Community Church Oxford</title>
        <meta name="description" content={`Learn about the ${ministry.name} ministry at Community Church Oxford in Oxford, MS.`} />
        <link rel="canonical" href={`https://communityoxford.com/ministry/${ministry.slug || ''}`} />
        <meta property="og:title" content={`${ministry.name} — Community Church Oxford`} />
        <meta property="og:description" content={`${ministry.name} ministry at Community Church Oxford in Oxford, MS.`} />
        <meta property="og:url" content={`https://communityoxford.com/ministry/${ministry.slug || ''}`} />
      </Helmet>

      {/* Hero image */}
      {imgSrc && (
        <div className="h-64 w-full overflow-hidden md:h-80">
          <img src={imgSrc} alt={ministry.name} className="h-full w-full object-cover" />
        </div>
      )}

      <div className="mx-auto max-w-4xl px-4 py-12">
        <Link
          to="/connect"
          className="mb-6 inline-block text-sm font-semibold uppercase tracking-wide text-brand transition hover:text-accent"
        >
          ← Back to Connect
        </Link>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h1 className="font-serif text-4xl font-bold text-brand-dark">{ministry.name}</h1>

            {/* Meta details */}
            <div className="mt-6 space-y-3">
              {ministry.leader && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <HiOutlineUser className="shrink-0 text-accent" size={18} />
                  <span><span className="font-semibold">Leader:</span> {ministry.leader}</span>
                </div>
              )}
              {ministry.meetingTime && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <HiOutlineClock className="shrink-0 text-accent" size={18} />
                  <span>{ministry.meetingTime}</span>
                </div>
              )}
              {ministry.location && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <HiOutlineLocationMarker className="shrink-0 text-accent" size={18} />
                  <span>{ministry.location}</span>
                </div>
              )}
              {ministry.contactEmail && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <HiOutlineMail className="shrink-0 text-accent" size={18} />
                  <a href={`mailto:${ministry.contactEmail}`} className="underline hover:text-accent">
                    {ministry.contactEmail}
                  </a>
                </div>
              )}
            </div>

            {/* Description */}
            {ministry.description ? (
              <div className="mt-8">
                <RichText content={ministry.description} />
              </div>
            ) : ministry.summary ? (
              <p className="mt-8 leading-relaxed text-gray-700">{ministry.summary}</p>
            ) : null}
          </div>

          {/* Sidebar: inquiry form */}
          <div className="lg:col-span-1">
            <InquiryForm ministryName={ministry.name} contactEmail={ministry.contactEmail} />
          </div>
        </div>
      </div>
    </>
  );
}

function InquiryForm({ ministryName, contactEmail }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await submitContactForm({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: `${ministryName} Ministry Inquiry`,
        message: form.message || `I'm interested in learning more about ${ministryName}.`,
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="sticky top-24 rounded-2xl bg-warm p-6 shadow-md">
      <h2 className="mb-1 font-serif text-xl font-bold text-brand-dark">Get Connected</h2>
      <p className="mb-5 text-sm text-gray-500">
        Interested in {ministryName}? Send us a message and we'll be in touch.
      </p>

      {status === 'success' ? (
        <div className="rounded-xl bg-green-50 p-5 text-center">
          <p className="font-semibold text-green-700">Message sent!</p>
          <p className="mt-1 text-sm text-green-600">We'll follow up with you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Your name *"
            required
            value={form.name}
            onChange={set('name')}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <input
            type="email"
            placeholder="Email address *"
            required
            value={form.email}
            onChange={set('email')}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={set('phone')}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <textarea
            placeholder="Any questions or notes? (optional)"
            rows={4}
            value={form.message}
            onChange={set('message')}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          {status === 'error' && (
            <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
          )}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white transition hover:bg-accent/90 disabled:opacity-60"
          >
            {status === 'loading' ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}
