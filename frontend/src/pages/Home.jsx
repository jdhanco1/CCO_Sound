import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
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

  return (
    <>
      <Helmet>
        <title>Community Church Oxford — Seek, Shape, Send</title>
      </Helmet>

      <Hero />

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
