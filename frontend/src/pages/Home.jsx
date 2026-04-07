import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import QuickActions from '../components/home/QuickActions';
import ServiceTimes from '../components/home/ServiceTimes';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Community Church Oxford — Seek, Shape, Send</title>
      </Helmet>

      <Hero />
      <QuickActions />

      {/* About section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <SectionHeader
            eyebrow="Who We Are"
            title={t('home.section_about')}
            subtitle={t('home.section_about_text')}
          />
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button to="/mission" variant="secondary">
              {t('nav.mission')}
            </Button>
            <Button to="/connect" variant="outline">
              {t('nav.connect')}
            </Button>
          </div>
        </div>
      </section>

      <ServiceTimes />

      {/* Seek Shape Send preview */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow="Our Mission"
            title={
              <>
                <span className="text-black">SEEK</span>{' '}
                <span className="font-bold text-yellow-300">&gt;</span>{' '}
                <span className="text-black">SHAPE</span>{' '}
                <span className="font-bold text-yellow-300">&gt;</span>{' '}
                <span className="text-black">SEND</span>{' '}
              </>
            }
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                title: t('mission.god_seeks'),
                text: t('mission.god_seeks_text'),
                icon: '🔍',
              },
              {
                title: t('mission.god_shapes'),
                text: t('mission.god_shapes_text'),
                icon: '🏺',
              },
              {
                title: t('mission.god_sends'),
                text: t('mission.god_sends_text'),
                icon: '🌍',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 p-8 text-center shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 text-4xl">{item.icon}</div>
                <h3 className="mb-3 font-serif text-xl font-bold text-brand-dark">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button to="/mission" variant="primary">
              {t('nav.mission')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
