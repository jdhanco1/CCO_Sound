import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import useContent from '../hooks/useContent';
import { getEvents, submitEventRegistration } from '../lib/api';

export default function Events() {
  const { t, i18n } = useTranslation();
  const { data: events, loading } = useContent(() => getEvents(i18n.language), [i18n.language]);

  return (
    <>
      <Helmet>
        <title>{t('events.title')} — Community Church Oxford</title>
      </Helmet>

      <PageHero title={t('events.title')} />

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          {loading ? (
            <div className="py-20 text-center text-gray-400">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-accent border-t-transparent" />
            </div>
          ) : !events || events.length === 0 ? (
            <div className="rounded-2xl bg-warm p-12 text-center">
              <p className="font-serif text-xl text-gray-500">
                {t('events.no_events')}
              </p>
              <p className="mt-4 text-sm text-gray-400">
                Events can be managed by admins in the CMS.
              </p>
              <div className="mt-6">
                <Button href="https://communityoxford.ccbchurch.com/w_calendar.php" variant="primary">
                  View CCB Calendar
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {events.map((event) => (
                <EventItem key={event.id} event={event} t={t} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function EventItem({ event, t }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const imgSrc = event.image?.url || null;
  const dateStr = new Date(event.startDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitEventRegistration(event.id, formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md md:flex">
      {imgSrc && (
        <div className="md:w-1/3">
          <img src={imgSrc} alt={event.title} className="h-full w-full object-cover" loading="lazy" />
        </div>
      )}
      <div className="flex-1 p-6">
        <p className="text-sm font-medium text-accent">{dateStr}</p>
        <h3 className="mt-1 font-serif text-2xl font-bold text-brand-dark">{event.title}</h3>
        {event.location && <p className="mt-1 text-sm text-gray-500">{event.location}</p>}
        {event.description && <p className="mt-3 text-sm text-gray-600">{event.description}</p>}

        <div className="mt-4">
          {!showForm ? (
            <Button onClick={() => setShowForm(true)} variant="primary" size="sm">
              {t('events.register')}
            </Button>
          ) : submitted ? (
            <p className="text-sm font-semibold text-green-600">✓ Registered successfully!</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-2 space-y-3">
              <input
                type="text"
                placeholder="Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <Button type="submit" variant="primary" size="sm">
                Submit Registration
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
