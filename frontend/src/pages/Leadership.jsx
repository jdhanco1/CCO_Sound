import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import StaffCard from '../components/leadership/StaffCard';
import useContent from '../hooks/useContent';
import { getStaff, getElders } from '../lib/api';
import Button from '../components/common/Button';

const fallbackStaff = [
  { id: 1, name: 'Fish Robinson', title: 'Lead Pastor/Teaching Elder' },
  { id: 2, name: 'Peggie Wilson', title: 'Ministry Coordinator & Office Coordinator' },
  { id: 3, name: 'Javi Sanchez', title: 'Media Production Director & Director of Spanish Ministry' },
  { id: 4, name: 'Ryan Watson', title: 'Associate Pastor to Families & Discipleship' },
  { id: 5, name: 'Kelsey Cooper', title: 'Student Ministry Team Member' },
  { id: 6, name: 'Lyndsey Thompson', title: 'Minister to College Students' },
  { id: 7, name: 'Grayson Inman', title: 'Associate Pastor to Students & Worship' },
  { id: 8, name: 'Beth Robinson', title: "Creative Director & Women's Ministry Director" },
];

const fallbackElders = [
  { id: 1, name: 'Fish Robinson', title: 'Elder' },
  { id: 2, name: 'John Youngblood', title: 'Elder' },
  { id: 3, name: 'Guy Billups', title: 'Elder' },
  { id: 4, name: 'Braden Theobald', title: 'Elder' },
  { id: 5, name: 'Keith DePriest', title: 'Elder' },
  { id: 6, name: 'Jarred Hancock', title: 'Elder' },
  { id: 7, name: 'Brian Rhodes', title: 'Elder' },
  { id: 8, name: 'Javi Sanchez', title: 'Elder' },
];

export default function Leadership() {
  const { t } = useTranslation();
  const { data: staff } = useContent(getStaff);
  const { data: elders } = useContent(getElders);

  const staffList = staff || fallbackStaff;
  const elderList = elders || fallbackElders;

  return (
    <>
      <Helmet>
        <title>Leadership — Community Church Oxford</title>
      </Helmet>

      <PageHero title={t('leadership.title')} />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader eyebrow="Our Team" title={t('leadership.staff_heading')} />
          <div className="mt-10 grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {staffList.map((s) => (
              <StaffCard key={s.id} name={s.name} title={s.title} photo={s.photo} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader eyebrow="Church Governance" title={t('leadership.elders_heading')} />
          <div className="mt-10 grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {elderList.map((e) => (
              <StaffCard key={e.id} name={e.name} title={e.title} photo={e.photo} />
            ))}
          </div>
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
