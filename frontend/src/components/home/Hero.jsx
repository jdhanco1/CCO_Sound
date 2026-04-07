import { useTranslation } from 'react-i18next';
import Button from '../common/Button';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      className="relative flex min-h-[50vh] items-center justify-center overflow-hidden"
      style={{ backgroundImage: "url('/back.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-brand-dark/50" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="animate-fade-in-up mb-4 text-sm font-bold uppercase tracking-[0.3em] text-accent-light">
         
        </p>
        <h1 className="animate-fade-in-up-delay-1 font-serif text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
          {t('hero.tagline')}
        </h1>
        <p className="animate-fade-in-up-delay-2 mt-6 text-lg text-gray-300 md:text-xl">
          {t('hero.subtitle')}
        </p>
        <div className="animate-fade-in-up-delay-3 mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button to="/contact" variant="primary" size="lg">
            {t('hero.cta_visit')}
          </Button>
          <Button to="/sermons" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand">
            {t('hero.cta_watch')}
          </Button>
        </div>
      </div>
    </section>
  );
}
