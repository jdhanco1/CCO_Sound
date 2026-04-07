import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith('es') ? 'es' : 'en';

  const toggle = () => {
    i18n.changeLanguage(current === 'en' ? 'es' : 'en');
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 rounded-full border border-gray-300 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-600 transition hover:border-accent hover:text-accent"
      aria-label="Toggle language"
    >
      <span className={current === 'en' ? 'font-bold text-brand' : ''}>EN</span>
      <span className="text-gray-300">|</span>
      <span className={current === 'es' ? 'font-bold text-brand' : ''}>ES</span>
    </button>
  );
}
