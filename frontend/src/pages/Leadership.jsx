import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import StaffCard from '../components/leadership/StaffCard';
import useContent from '../hooks/useContent';
import { getStaff, getElders } from '../lib/api';
import Button from '../components/common/Button';

export default function Leadership() {
  const { t } = useTranslation();
  const { data: staff, loading: staffLoading } = useContent(getStaff);
  const { data: elders, loading: eldersLoading } = useContent(getElders);

  const staffList = staff || [];
  const elderList = elders || [];

  return (
    <>
      <Helmet>
        <title>Leadership — Community Church Oxford</title>
      </Helmet>

      <PageHero title={t('leadership.title')} />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader eyebrow="Our Team" title={t('leadership.staff_heading')} />
          {staffLoading ? (
            <div className="py-16 text-center text-gray-400">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-accent border-t-transparent" />
            </div>
          ) : staffList.length === 0 ? (
            <p className="mt-8 text-center text-gray-400">Staff members will appear here once added in the CMS.</p>
          ) : (
            <div className="mt-10 grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {staffList.map((s) => (
                <StaffCard key={s.id} name={s.name} title={s.title} photo={s.photo} bio={s.bio} email={s.email} phone={s.phone} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-warm py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader eyebrow="Church Governance" title={t('leadership.elders_heading')} />
          {eldersLoading ? (
            <div className="py-16 text-center text-gray-400">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-accent border-t-transparent" />
            </div>
          ) : elderList.length === 0 ? (
            <p className="mt-8 text-center text-gray-400">Elders will appear here once added in the CMS.</p>
          ) : (
            <div className="mt-10 grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {elderList.map((e) => (
                <StaffCard key={e.id} name={e.name} title={e.title} photo={e.photo} bio={e.bio} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 text-center">
        <p className="font-serif text-2xl font-bold text-brand-dark">
          Want to get involved with us at Community Oxford?
        </p>
        <div className="mt-6">
          <Button to="/connect" variant="primary" size="lg">
            Get Connected
          </Button>
        </div>
      </section>
    </>
  );
}
