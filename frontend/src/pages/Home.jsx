import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { HiArrowRight, HiCalendar } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import QuickActions from '../components/home/QuickActions';
import Button from '../components/common/Button';
import useContent from '../hooks/useContent';
import { getHomePage } from '../lib/api';

export default function Home() {
  const { t } = useTranslation();
  const { data } = useContent(getHomePage);

  const welcomeText =
    data?.welcomeSection?.welcomeText ||
    'Whether you are looking for a church home, a place to visit while you\'re in the Oxford area, or a place to get plugged in while at Ole Miss, we hope you will consider Community Church Oxford.';
  const videoUrl = data?.welcomeSection?.videoUrl || '';
  const announcements = data?.announcements?.filter((a) => a.title) || [];

  return (
    <>
      <Helmet>
        <title>Community Church Oxford — Seek, Shape, Send</title>
      </Helmet>

      <Hero />

      {/* Announcements */}
      {announcements.length > 0 && (
        <section className="bg-brand-dark py-12">
          <div className="mx-auto max-w-6xl px-4">
            <div className={`grid gap-6 ${announcements.length === 1 ? 'max-w-xl mx-auto' : announcements.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
              {announcements.map((a, i) => {
                const formattedDate = a.date
                  ? new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                  : null;
                const isExternal = a.link?.startsWith('http');
                const Wrapper = a.link
                  ? isExternal ? 'a' : Link
                  : 'div';
                const wrapperProps = a.link
                  ? isExternal
                    ? { href: a.link, target: '_blank', rel: 'noopener noreferrer' }
                    : { to: a.link }
                  : {};

                return (
                  <Wrapper
                    key={i}
                    {...wrapperProps}
                    className="group flex flex-col rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10"
                  >
                    {formattedDate && (
                      <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand">
                        <HiCalendar className="h-3.5 w-3.5" />
                        {formattedDate}
                      </span>
                    )}
                    <h3 className="font-sans text-lg font-bold text-white">{a.title}</h3>
                    {a.content && (
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-300">{a.content}</p>
                    )}
                    {a.link && (
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand transition group-hover:gap-2">
                        {t('home.learn_more', { defaultValue: 'Learn More' })}
                        <HiArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Welcome section with text + embedded video */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            {/* Welcome text */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-xl leading-relaxed font-bold text-gray-600">
                {welcomeText}
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <Button to="/contact" variant="primary">
                  {t('hero.cta_visit')}
                </Button>
                <Button to="/about" variant="outline">
                  {t('nav.mission')}
                </Button>
              </div>
            </div>
            {/* Embedded video */}
            <div className="flex-1 w-full">
              {videoUrl ? (
                <div className="relative w-full overflow-hidden rounded-2xl shadow-lg" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={videoUrl}
                    title="Welcome Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-gray-100 shadow-lg">
                  <p className="text-gray-400">Video coming soon</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <QuickActions />
    </>
  );
}
