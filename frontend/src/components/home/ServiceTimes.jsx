import { useTranslation } from 'react-i18next';
import { HiOutlineClock, HiOutlineLocationMarker } from 'react-icons/hi';

export default function ServiceTimes() {
  const { t } = useTranslation();

  return (
    <section className="bg-warm py-16">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="mb-8 font-serif text-3xl font-bold text-brand-dark md:text-4xl">
          {t('home.service_label')}
        </h2>
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-10">
          <div className="flex items-center gap-3">
            <HiOutlineClock size={28} className="text-brand" />
            <span className="text-2xl font-bold text-brand-dark">
              {t('home.service_time')}
            </span>
          </div>
          <div className="hidden h-10 w-px bg-gray-300 md:block" />
          <div className="flex items-center gap-3">
            <HiOutlineLocationMarker size={28} className="text-brand" />
            <span className="text-lg text-gray-600">
              {t('home.service_location')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
