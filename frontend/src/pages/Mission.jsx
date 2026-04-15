import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Button from '../components/common/Button';
import useContent from '../hooks/useContent';
import { getMissionPage, CMS_URL } from '../lib/api';

const missionCards = [
  {
    num: '01',
    labelKey: 'mission.god_seeks',
    verse: 'Luke 19:10',
    verseUrl: 'https://www.bible.com/bible/111/LUK.19.10',
    bodyKey: 'mission.god_seeks_text',
  },
  {
    num: '02',
    labelKey: 'mission.god_shapes',
    verse: '2 Corinthians 5:17',
    verseUrl: 'https://www.bible.com/bible/111/2CO.5.17',
    bodyKey: 'mission.god_shapes_text',
  },
  {
    num: '03',
    labelKey: 'mission.god_sends',
    verse: 'Isaiah 6:8',
    verseUrl: 'https://www.bible.com/bible/111/ISA.6.8',
    bodyKey: 'mission.god_sends_text',
  },
];

const VISION_COUNT = 9;
const VALUE_COUNT = 6;

export default function About() {
  const { t } = useTranslation();
  const { data: cmsData } = useContent(getMissionPage);

  const visionImage1 = cmsData?.visionImages?.visionImage1?.url ? `${CMS_URL}${cmsData.visionImages.visionImage1.url}` : null;
  const visionImage2 = cmsData?.visionImages?.visionImage2?.url ? `${CMS_URL}${cmsData.visionImages.visionImage2.url}` : null;

  // Build vision items from i18n keys
  const visionItems = Array.from({ length: VISION_COUNT }, (_, i) => ({
    bold: t(`mission.vision_${i + 1}_bold`),
    rest: t(`mission.vision_${i + 1}_rest`),
  }));

  // Build values from i18n keys
  const values = Array.from({ length: VALUE_COUNT }, (_, i) => ({
    title: t(`mission.value_${i + 1}_title`),
    text: t(`mission.value_${i + 1}_text`),
  }));

  return (
    <>
      <Helmet>
        <title>{t('nav.mission')} — Community Church Oxford</title>
      </Helmet>

      {/* ── MISSION ── */}
      <section className="bg-brand-dark py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-4 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand/60">{t('mission.title')}</p>
          </div>
          <h2 className="mb-4 text-center font-serif text-3xl font-black tracking-tight text-white sm:text-4xl md:text-6xl lg:text-7xl">
            <span className="text-brand">SEEK</span>
            <span className="mx-1 text-brand/40 sm:mx-2 md:mx-3">›</span>
            <span className="text-white">SHAPE</span>
            <span className="mx-1 text-brand/40 sm:mx-2 md:mx-3">›</span>
            <span className="text-brand">SEND</span>
          </h2>
          <p className="mx-auto mb-14 max-w-2xl text-center text-base leading-relaxed text-white/60">
            {t('mission.intro')}
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {missionCards.map((item) => (
              <div key={item.num} className="rounded-2xl border border-white/10 p-8">
                <p className="mb-3 font-mono text-xs font-bold text-brand/50">{item.num}</p>
                <a
                  href={item.verseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mb-1 flex items-center gap-2"
                >
                  <h3 className="font-serif text-xl font-bold text-brand transition-colors group-hover:text-brand/70">
                    {t(item.labelKey)}
                  </h3>
                  <span className="text-xs font-semibold text-brand/40 transition-colors group-hover:text-brand/70">
                    {item.verse} ↗
                  </span>
                </a>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{t(item.bodyKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start">

            {/* Left: stacked image collage */}
            <div className="flex flex-col gap-4 lg:w-[42%]">
              {visionImage1 ? (
                <img src={visionImage1} alt="Our community" className="w-full rounded-2xl object-cover shadow-lg" style={{ aspectRatio: '4/3' }} />
              ) : (
                <div className="flex w-full items-center justify-center rounded-2xl bg-gray-100 shadow-sm" style={{ aspectRatio: '4/3' }}>
                  <p className="text-sm text-gray-400">Vision photo 1 · upload via CMS → About Page</p>
                </div>
              )}
              {visionImage2 ? (
                <img src={visionImage2} alt="Our community" className="w-full rounded-2xl object-cover shadow-lg" style={{ aspectRatio: '16/9' }} />
              ) : (
                <div className="flex w-full items-center justify-center rounded-2xl bg-gray-50 shadow-sm" style={{ aspectRatio: '16/9' }}>
                  <p className="text-sm text-gray-400">Vision photo 2 · upload via CMS → About Page</p>
                </div>
              )}
            </div>

            {/* Right: vision content */}
            <div className="lg:flex-1">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-brand">{t('mission.vision_eyebrow')}</p>
              <h2 className="mb-3 font-serif text-5xl font-black uppercase tracking-tight text-brand-dark md:text-6xl">
                {t('mission.vision_title')}
              </h2>
              <p className="mb-8 text-base font-bold uppercase tracking-wider text-gray-600">
                {t('mission.vision_intro')}
              </p>
              <ul className="space-y-3">
                {visionItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-brand" />
                    <p className="text-sm uppercase leading-relaxed tracking-wide text-gray-700">
                      <strong className="font-bold text-brand-dark">{item.bold}</strong>
                      {item.rest}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-warm py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-brand">{t('mission.values_eyebrow')}</p>
            <h2 className="mb-4 font-serif text-4xl font-black uppercase tracking-tight text-brand-dark md:text-5xl">
              {t('mission.values_title')}
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">
              {t('mission.values_intro')}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 h-1 w-10 rounded-full bg-brand" />
                <h3 className="mb-3 font-serif text-lg font-bold uppercase tracking-wide text-brand-dark">{v.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESSENTIALS CTA ── */}
      <section className="bg-brand py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold text-brand-dark md:text-4xl">{t('mission.essentials_heading')}</h2>
          <p className="mb-8 text-lg font-medium text-brand-dark/80">
            {t('mission.essentials_cta')}
          </p>
          <Button variant="primary" href="https://communityoxford.ccbchurch.com/form_response.php?id=23">
            {t('mission.essentials_button')}
          </Button>
        </div>
      </section>
    </>
  );
}
