import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { HiOutlineClock, HiOutlineLocationMarker, HiOutlinePhone } from 'react-icons/hi';
import PageHero from '../components/common/PageHero';
import Button from '../components/common/Button';
import useContent from '../hooks/useContent';
import { submitContactForm, getPageHeroes, CMS_URL } from '../lib/api';

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const { data: heroes } = useContent(getPageHeroes);

  const heroConfig = heroes?.contact;
  const heroImage = heroConfig?.heroImage?.url ? `${CMS_URL}${heroConfig.heroImage.url}` : undefined;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContactForm(form);
      setSubmitted(true);
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('contact.title')} — Community Church Oxford</title>
      </Helmet>

      <PageHero title={heroConfig?.heroTitle || t('contact.title')} subtitle={heroConfig?.heroSubtitle} backgroundImage={heroImage} />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Info cards */}
            <div className="space-y-8">
              {/* Sunday */}
              <div className="rounded-2xl bg-warm p-8">
                <h3 className="mb-4 font-serif text-xl font-bold text-brand-dark">
                  {t('contact.sunday_heading')}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <HiOutlineClock size={20} className="mt-0.5 shrink-0 text-accent" />
                    <p className="text-gray-600">{t('contact.sunday_time')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <HiOutlineLocationMarker size={20} className="mt-0.5 shrink-0 text-accent" />
                    <p className="whitespace-pre-line text-gray-600">
                      {t('contact.sunday_location')}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    href="https://www.google.com/maps/place/Lafayette+High+School/@34.3504782,-89.4983659,15z"
                    variant="outline"
                    size="sm"
                  >
                    {t('contact.directions')}
                  </Button>
                </div>
              </div>

              {/* Office */}
              <div className="rounded-2xl bg-warm p-8">
                <h3 className="mb-4 font-serif text-xl font-bold text-brand-dark">
                  {t('contact.office_heading')}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <HiOutlineClock size={20} className="mt-0.5 shrink-0 text-accent" />
                    <p className="text-gray-600">{t('contact.office_hours')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <HiOutlinePhone size={20} className="mt-0.5 shrink-0 text-accent" />
                    <p className="text-gray-600">{t('contact.office_phone')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <HiOutlineLocationMarker size={20} className="mt-0.5 shrink-0 text-accent" />
                    <p className="whitespace-pre-line text-gray-600">
                      {t('contact.office_address')}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    href="https://www.google.com/maps/place/68+Highway+334,+Oxford,+MS+38655"
                    variant="outline"
                    size="sm"
                  >
                    {t('contact.directions')}
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h3 className="mb-6 font-serif text-2xl font-bold text-brand-dark">
                {t('contact.action_request')}
              </h3>

              {submitted ? (
                <div className="rounded-xl bg-green-50 p-6 text-center">
                  <p className="font-semibold text-green-700">
                    {t('contact.form_success')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t('contact.form_name')}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t('contact.form_email')}
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      {t('contact.form_message')}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-500">
                      Something went wrong. Please try again or call us at {t('contact.office_phone')}.
                    </p>
                  )}

                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    {t('contact.form_submit')}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map embed */}
      <section className="h-[400px] w-full">
        <iframe
          title="Community Church Oxford Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.7!2d-89.4983659!3d34.3504782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x69feabc6c71c89f4!2sLafayette+High+School!5e0!3m2!1sen!2sus!4v1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
