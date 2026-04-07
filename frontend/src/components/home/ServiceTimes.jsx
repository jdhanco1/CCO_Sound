import { useTranslation } from 'react-i18next';
import { HiOutlineClock, HiOutlineLocationMarker } from 'react-icons/hi';
import Button from '../common/Button';

export default function ServiceTimes() {
  const { t } = useTranslation();

  return (
    <section className="bg-warm py-20">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
          {t('home.service_label')}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-8 md:flex-row">
          <div className="flex items-center gap-3">
            <HiOutlineClock size={24} className="text-brand" />
            <span className="text-2xl font-bold text-brand-dark">
              {t('home.service_time')}
            </span>
          </div>
          <div className="hidden h-8 w-px bg-gray-300 md:block" />
          <div className="flex items-center gap-3">
            <HiOutlineLocationMarker size={24} className="text-brand" />
            <span className="text-lg text-gray-600">
              {t('home.service_location')}
            </span>
          </div>
        </div>
        <div className="mt-8">
          <Button to="/contact" variant="secondary">
            {t('hero.cta_visit')}
          </Button>
        </div>
      </div>
    </section>
  );
}
