import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import PageHero from '../components/common/PageHero';
import SermonCard from '../components/sermons/SermonCard';
import useContent from '../hooks/useContent';
import { getSermons, getPageHeroes, CMS_URL } from '../lib/api';

export default function Sermons() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data, loading } = useContent(() => getSermons(page), [page]);
  const { data: heroes } = useContent(getPageHeroes);

  const heroConfig = heroes?.sermons;
  const heroImage = heroConfig?.heroImage?.url ? `${CMS_URL}${heroConfig.heroImage.url}` : undefined;
  const sermons = data?.items || [];
  const meta = data?.meta;

  return (
    <>
      <Helmet>
        <title>Sermons — Community Church Oxford</title>
      </Helmet>

      <PageHero title={heroConfig?.heroTitle || t('sermons.title')} subtitle={heroConfig?.heroSubtitle} backgroundImage={heroImage} />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          {loading && !sermons.length ? (
            <div className="py-20 text-center text-gray-400">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-accent border-t-transparent" />
              <p className="mt-4">Loading sermons…</p>
            </div>
          ) : sermons.length === 0 ? (
            <div className="rounded-2xl bg-warm p-12 text-center">
              <p className="font-serif text-xl text-gray-500">
                Sermons will appear here once added in the CMS.
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Admins can add sermons with video, audio, speaker, and series info via the CMS.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {sermons.map((s) => (
                  <SermonCard
                    key={s.id}
                    title={s.title}
                    speaker={s.preacher}
                    date={s.date}
                    videoUrl={s.videoUrl}
                    audioUrl={s.audioUrl}
                    thumbnail={s.thumbnail}
                    series={s.series}
                  />
                ))}
              </div>

              {/* Pagination */}
              {meta?.pagination?.pageCount > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  {Array.from({ length: meta.pagination.pageCount }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`h-10 w-10 rounded-full text-sm font-semibold transition ${
                        page === i + 1
                          ? 'bg-accent text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
