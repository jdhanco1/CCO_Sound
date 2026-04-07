import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import MinistryCard from '../components/connect/MinistryCard';
import Button from '../components/common/Button';
import useContent from '../hooks/useContent';
import { getMinistries } from '../lib/api';

// Fallback data based on the current site
const fallbackMinistries = [
  {
    id: 1,
    name: 'Community Groups',
    description:
      'Community Groups are designed for you to connect with other people on a more personal level and do life together. Groups are typically 10-15 people, meeting in people\'s homes or the church office throughout the week.',
    schedule: 'Various days throughout the week',
  },
  {
    id: 2,
    name: "Men's Ministry",
    description:
      'We believe it is good and healthy to continue relationships with other Godly men. We typically meet the second and fourth Mondays of each month to hang out, eat, learn more about Biblical manhood and encourage each other.',
    schedule: '2nd & 4th Mondays, 6:00 PM at office building',
  },
  {
    id: 3,
    name: "Women's Ministry",
    description:
      "We offer Ladies' Bible Studies, Exhale events (Ladies' Night Out, classes, events) and Ladies' Book Club. No matter what season of life you are in, all ladies love some quality \"girl time.\"",
  },
  {
    id: 4,
    name: 'Next Gen (Children)',
    description:
      'We want to work alongside parents to give their children Biblical knowledge of who God truly is. We offer classes for children (infants through 5th grade) during our Sunday morning services.',
    schedule: 'Sunday mornings during service',
  },
  {
    id: 5,
    name: 'Mission Kids',
    description:
      'Mission Kids is our mid-week gathering for children (Kindergarten through 5th grade). Dinner is provided. We use The Gospel Project for Kids curriculum.',
    schedule: 'Wednesdays 5:30-7:30 PM at Lafayette Middle School',
  },
  {
    id: 6,
    name: 'CCO Students (6th-12th Grade)',
    description:
      'Our ministry is centered around John 17:3. We want to lead students towards Jesus and help give them a Biblical worldview.',
    schedule: 'Wednesdays 5:30-7:30 PM at church office',
  },
  {
    id: 7,
    name: 'College Ministry',
    description:
      'We love for college students to get plugged in at CCO! We have Community Groups designed specifically for college students, as well as opportunities to serve and do life with others.',
  },
  {
    id: 8,
    name: 'Serve Teams',
    description:
      'Because we meet in a school, many of our elements are portable. We have teams that help load-in and load-out all of our equipment each week, greeting, parking, and making coffee.',
    schedule: 'Sunday mornings',
  },
];

export default function Connect() {
  const { t, i18n } = useTranslation();
  const { data: ministries } = useContent(() => getMinistries(i18n.language), [i18n.language]);

  const list = ministries || fallbackMinistries;

  return (
    <>
      <Helmet>
        <title>Connect — Community Church Oxford</title>
      </Helmet>

      <PageHero title={t('connect.title')} subtitle={t('connect.intro')} />

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {list.map((m) => (
              <MinistryCard
                key={m.id}
                name={m.name}
                description={m.description}
                image={m.image}
                schedule={m.schedule}
              />
            ))}
          </div>
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
