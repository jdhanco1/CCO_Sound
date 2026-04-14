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

  return (
    <>
      <Helmet>
        <title>Connect — Community Church Oxford</title>
      </Helmet>

      <PageHero title={heroConfig?.heroTitle || t('connect.title')} subtitle={heroConfig?.heroSubtitle || t('connect.intro')} backgroundImage={heroImage} />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          {loading ? (
            <div className="py-20 text-center text-gray-400">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-accent border-t-transparent" />
            </div>
          ) : list.length === 0 ? (
            <div className="rounded-2xl bg-warm p-12 text-center">
              <p className="font-serif text-xl text-gray-500">Ministries will appear here once added in the CMS.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {list.map((m) => (
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
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand py-16 text-center text-white">
        <p className="font-serif text-2xl font-bold">
          {t('connect.questions')}
        </p>
        <div className="mt-6">
          <Button to="/contact" variant="white" size="lg">
            {t('nav.contact')}
          </Button>
        </div>
      </section>
    </>
  );
}
