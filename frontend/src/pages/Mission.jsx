import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Button from '../components/common/Button';

const sections = [
  { titleKey: 'mission.god_seeks', textKey: 'mission.god_seeks_text', refs: ['Genesis 3', 'Luke 19:10'] },
  { titleKey: 'mission.god_shapes', textKey: 'mission.god_shapes_text', refs: ['2 Corinthians 5:17', 'Isaiah 64:8'] },
  { titleKey: 'mission.god_sends', textKey: 'mission.god_sends_text', refs: ['Mark 16:15', 'Isaiah 6:8'] },
  { titleKey: 'mission.seek_others', textKey: 'mission.seek_others_text', refs: ['Acts 1:8', 'Matthew 28:18-20'] },
  { titleKey: 'mission.shape_others', textKey: 'mission.shape_others_text', refs: ['2 Timothy 2:2', 'Hebrews 10:24-25'] },
  { titleKey: 'mission.send_others', textKey: 'mission.send_others_text', refs: ['Romans 10:14'] },
];

export default function Mission() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Mission — Community Church Oxford</title>
      </Helmet>

      <div
        className="relative flex min-h-[40vh] items-center justify-center overflow-hidden"
        style={{ backgroundImage: "url('src/assets/people.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Yellow opaque overlay */}
        <div className="absolute inset-0 bg-brand/30" />
        {/* SEEK SHAPE SEND cutout image */}
        <img
          src="/SEEKSHAPESEND.png"
          alt="Seek Shape Send"
          className="relative z-10 w-full max-w-4xl px-6 drop-shadow-lg"
        />
      </div>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <p className="mb-12 text-center text-lg leading-relaxed text-gray-600">
            {t('mission.intro')}
          </p>

          <div className="space-y-12">
            {sections.map((s, i) => (
              <div
                key={s.titleKey}
                className={`flex flex-col gap-6 md:flex-row ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                } items-start`}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand text-xl font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <h3 className="mb-2 font-serif text-2xl font-bold text-brand-dark">
                    {t(s.titleKey)}
                  </h3>
                  <p className="mb-3 leading-relaxed text-gray-600">
                    {t(s.textKey)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {s.refs.map((ref) => (
                      <a
                        key={ref}
                        href={`https://www.bible.com/search/bible?q=${encodeURIComponent(ref)}&version_id=59`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-warm px-3 py-1 text-xs font-medium text-brand transition hover:bg-accent hover:text-white"
                      >
                        {ref}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-brand p-10 text-center text-white shadow-lg">
            <p className="font-serif text-xl font-semibold">
              {t('mission.essentials_cta')}
            </p>
            <div className="mt-6">
              <Button variant="white" href="https://communityoxford.ccbchurch.com/form_response.php?id=23">
                Register
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
