import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { HiX } from 'react-icons/hi';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import RichText from '../components/common/RichText';
import useContent from '../hooks/useContent';
import { getMissionPartners, getPageHeroes, CMS_URL } from '../lib/api';

export default function Missions() {
  const { t } = useTranslation();
  const { data: partners, loading } = useContent(getMissionPartners);
  const { data: heroes } = useContent(getPageHeroes);
  const [activePartner, setActivePartner] = useState(null);

  const heroConfig = heroes?.missions;
  const heroImage = heroConfig?.heroImage?.url ? `${CMS_URL}${heroConfig.heroImage.url}` : undefined;
  const partnerList = partners || [];

  return (
    <>
      <Helmet>
        <title>{t('missions.title')} — Community Church Oxford</title>
        <meta name="description" content="Learn about mission partnerships and global outreach at Community Church Oxford in Oxford, MS." />
        <link rel="canonical" href="https://communityoxford.com/missions" />
        <meta property="og:title" content={`${t('missions.title')} — Community Church Oxford`} />
        <meta property="og:description" content="Mission partnerships and global outreach at Community Church Oxford." />
        <meta property="og:url" content="https://communityoxford.com/missions" />
      </Helmet>

      {heroImage && (
        <PageHero
          title={heroConfig?.heroTitle || t('missions.title')}
          subtitle={heroConfig?.heroSubtitle}
          backgroundImage={heroImage}
        />
      )}

      {/* Intro */}
      <section className="bg-brand-dark py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand">Community Oxford</p>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">{t('missions.title')}</h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-300">{t('missions.intro')}</p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow={t('missions.eyebrow')}
            title={t('missions.partners_heading')}
            subtitle={t('missions.partners_sub')}
          />
          {loading ? (
            <div className="py-20 text-center text-gray-400">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-accent border-t-transparent" />
            </div>
          ) : partnerList.length === 0 ? (
            <p className="mt-10 text-center text-gray-400">{t('missions.empty')}</p>
          ) : (
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {partnerList.map((p) => {
                const imgSrc = p.image?.url || null;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePartner(p)}
                    className="group overflow-hidden rounded-2xl bg-white text-left shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {imgSrc ? (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={imgSrc}
                          alt={p.image.alt || p.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-video items-center justify-center bg-brand-dark/10">
                        <span className="font-serif text-3xl font-bold text-brand-dark/30">{p.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="mb-1 font-serif text-xl font-bold text-brand-dark">{p.name}</h3>
                      {p.summary && (
                        <p className="text-sm leading-relaxed text-gray-600 line-clamp-3">{p.summary}</p>
                      )}
                      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-accent transition group-hover:text-brand-dark">
                        {t('missions.learn_more')} →
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Partner Modal */}
      {activePartner && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setActivePartner(null)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            {activePartner.image?.url ? (
              <div className="relative h-52 w-full shrink-0 overflow-hidden">
                <img
                  src={activePartner.image.url}
                  alt={activePartner.image.alt || activePartner.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            ) : (
              <div className="h-2 w-full shrink-0 bg-accent" />
            )}

            {/* Body */}
            <div className="overflow-y-auto p-8">
              <button
                onClick={() => setActivePartner(null)}
                className="absolute right-4 top-4 rounded-full bg-white/80 p-1.5 text-gray-600 shadow hover:bg-white hover:text-gray-900"
                aria-label="Close"
              >
                <HiX size={18} />
              </button>

              <h3 className="font-serif text-2xl font-bold text-brand-dark">{activePartner.name}</h3>

              {activePartner.description ? (
                <div className="mt-5">
                  <RichText content={activePartner.description} />
                </div>
              ) : activePartner.summary ? (
                <p className="mt-5 text-sm leading-relaxed text-gray-600">{activePartner.summary}</p>
              ) : null}

              <div className="mt-6 flex gap-3">
                {activePartner.partnerUrl && (
                  <a
                    href={activePartner.partnerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-gray-800 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-gray-700"
                  >
                    {t('missions.visit_partner')}
                  </a>
                )}
                <button
                  onClick={() => setActivePartner(null)}
                  className="rounded-full border-2 border-gray-300 px-5 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
                >
                  {t('missions.close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
