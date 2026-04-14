import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import MinistryCard from '../components/connect/MinistryCard';
import Button from '../components/common/Button';
import useContent from '../hooks/useContent';
import { getMinistries, getPageHeroes, CMS_URL } from '../lib/api';

export default function Connect() {
  const { t } = useTranslation();
  const { data: ministries, loading } = useContent(getMinistries);
  const { data: heroes } = useContent(getPageHeroes);

  const heroConfig = heroes?.connect;
  const heroImage = heroConfig?.heroImage?.url ? `${CMS_URL}${heroConfig.heroImage.url}` : undefined;
  const list = ministries || [];

  const serveAreas = list.filter((m) => !m.type || m.type === 'serve_area');
  const groups = list.filter((m) => m.type === 'community_group');

  const Spinner = () => (
    <div className="py-20 text-center text-gray-400">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-accent border-t-transparent" />
    </div>
  );

  const MinistryGrid = ({ items, emptyKey }) =>
    items.length === 0 ? (
      <div className="rounded-2xl bg-warm p-10 text-center">
        <p className="text-gray-500">{t(emptyKey)}</p>
      </div>
    ) : (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((m) => (
          <MinistryCard
            key={m.id}
            slug={m.slug}
            name={m.name}
            summary={m.summary}
            image={m.image}
            meetingTime={m.meetingTime}
            location={m.location}
            leader={m.leader}
          />
        ))}
      </div>
    );

  return (
    <>
      <Helmet>
        <title>{t('connect.title')} — Community Church Oxford</title>
      </Helmet>

      {heroImage && (
        <PageHero
          title={heroConfig?.heroTitle}
          subtitle={heroConfig?.heroSubtitle}
          backgroundImage={heroImage}
        />
      )}

      {/* Intro banner */}
      <section className="bg-brand-dark py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand">Community Oxford</p>
          <h1 className="font-serif text-4xl font-bold md:text-5xl">{t('connect.title')}</h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-300">{t('connect.intro')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#serve" className="rounded-full bg-brand px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-brand-dark shadow transition hover:bg-brand/80">
              {t('connect.serve_heading')}
            </a>
            <a href="#groups" className="rounded-full border-2 border-white px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-brand-dark">
              {t('connect.groups_heading')}
            </a>
          </div>
        </div>
      </section>

      {/* Serve Areas */}
      <section id="serve" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow="Serve"
            title={t('connect.serve_heading')}
            subtitle={t('connect.serve_sub')}
          />
          {loading ? <Spinner /> : <MinistryGrid items={serveAreas} emptyKey="connect.empty_serve" />}
        </div>
      </section>

      {/* Community Groups */}
      <section id="groups" className="bg-warm py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow="Grow"
            title={t('connect.groups_heading')}
            subtitle={t('connect.groups_sub')}
          />
          {loading ? <Spinner /> : <MinistryGrid items={groups} emptyKey="connect.empty_groups" />}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent py-16 text-center text-white">
        <div className="mx-auto max-w-xl px-4">
          <p className="font-serif text-2xl font-bold">{t('connect.questions')}</p>
          <div className="mt-6">
            <Button to="/contact" variant="white" size="lg">
              {t('nav.contact')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
