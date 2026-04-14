import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Button from '../components/common/Button';
import useContent from '../hooks/useContent';
import { getMissionPage, CMS_URL } from '../lib/api';

const visionItems = [
  { bold: 'A Culturally Diverse Church', rest: ' that looks like Oxford, Lafayette County, and the University community' },
  { bold: 'Saturated by Grace', rest: ' and characterized by love' },
  { bold: 'Equipping Its Members', rest: ' to be ministers of the Gospel in their areas of influence' },
  { bold: 'Caring for This Area', rest: ' and longing to see it transformed' },
  { bold: 'Connecting Deeply', rest: ' with college students and young professionals in our community' },
  { bold: 'A Multi-Generational Community', rest: '' },
  { bold: 'Fostering Family-Driven Ministry', rest: '' },
  { bold: 'Caring for Our Neighbors', rest: ' who are under-resourced, oppressed and disenfranchised' },
  { bold: 'Leading People', rest: ' into a growing relationship with Jesus' },
];

const values = [
  { title: 'Scripture-Centered', text: 'We hold the Bible as our ultimate authority for faith and life. Everything we believe and do is measured against God\'s Word.' },
  { title: 'Grace-Saturated', text: 'We believe the Gospel of grace transforms everything. A culture of grace marks our relationships, leadership, and community.' },
  { title: 'Gospel-Driven', text: 'Everything flows from the good news of Jesus Christ. The Gospel is not just how we get in — it\'s how we live every day.' },
  { title: 'Multi-Generational', text: 'We pursue a community that spans every age and stage of life, believing the generations need and strengthen each other.' },
  { title: 'Mission-Focused', text: 'We exist to seek, shape, and send. We are a sent people, on mission locally and globally to make disciples.' },
  { title: 'Family-Centered', text: 'We believe the family is a God-given institution. We equip families to pursue Christ together at home and in community.' },
];

const missionCards = [
  {
    num: '01',
    labelKey: 'mission.god_seeks',
    verse: 'Luke 19:10',
    verseUrl: 'https://www.bible.com/bible/111/LUK.19.10',
    body: (
      <>
        All throughout scripture we see God seeking us;{' '}
        <a href="https://www.bible.com/bible/111/GEN.3" target="_blank" rel="noopener noreferrer" className="underline decoration-brand/60 hover:text-brand">
          in the Garden after Adam and Eve sinned
        </a>
        , and more specifically,{' '}
        <a href="https://www.bible.com/bible/111/LUK.19.10" target="_blank" rel="noopener noreferrer" className="underline decoration-brand/60 hover:text-brand">
          Jesus Christ coming to earth
        </a>
        .
      </>
    ),
  },
  {
    num: '02',
    labelKey: 'mission.god_shapes',
    verse: '2 Corinthians 5:17',
    verseUrl: 'https://www.bible.com/bible/111/2CO.5.17',
    body: (
      <>
        When we choose to follow Christ we are shaped by him. As Paul says in{' '}
        <a href="https://www.bible.com/bible/111/2CO.5.17" target="_blank" rel="noopener noreferrer" className="underline decoration-brand/60 hover:text-brand">
          2 Corinthians
        </a>{' '}
        we become &ldquo;a new creation.&rdquo; We are like clay in the hands of the Father as he molds and shapes us into his disciples.
      </>
    ),
  },
  {
    num: '03',
    labelKey: 'mission.god_sends',
    verse: 'Isaiah 6:8',
    verseUrl: 'https://www.bible.com/bible/111/ISA.6.8',
    body: (
      <>
        God sends us out into the world to proclaim and preach the Gospel, and we should respond with the same heart as{' '}
        <a href="https://www.bible.com/bible/111/ISA.6.8" target="_blank" rel="noopener noreferrer" className="underline decoration-brand/60 hover:text-brand">
          Isaiah saying, &ldquo;Here I am, send me&rdquo;
        </a>
        .
      </>
    ),
  },
];

export default function About() {
  const { t } = useTranslation();
  const { data: cmsData } = useContent(getMissionPage);

  const visionImage1 = cmsData?.visionImages?.visionImage1?.url ? `${CMS_URL}${cmsData.visionImages.visionImage1.url}` : null;
  const visionImage2 = cmsData?.visionImages?.visionImage2?.url ? `${CMS_URL}${cmsData.visionImages.visionImage2.url}` : null;

  return (
    <>
      <Helmet>
        <title>About Us — Community Church Oxford</title>
      </Helmet>

      {/* ── MISSION ── */}
      <section className="bg-brand-dark py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-4 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand/60">Our Mission</p>
          </div>
          <h2 className="mb-4 text-center font-serif text-5xl font-black tracking-tight text-white md:text-6xl lg:text-7xl">
            <span className="text-brand">SEEK</span>
            <span className="mx-3 text-brand/40">›</span>
            <span className="text-white">SHAPE</span>
            <span className="mx-3 text-brand/40">›</span>
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
                <p className="mt-3 text-sm leading-relaxed text-white/70">{item.body}</p>
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
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-brand">Our Vision</p>
              <h2 className="mb-3 font-serif text-5xl font-black uppercase tracking-tight text-brand-dark md:text-6xl">
                Vision
              </h2>
              <p className="mb-8 text-base font-bold uppercase tracking-wider text-gray-600">
                We believe God has called us to be:
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
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-brand">What We Believe</p>
            <h2 className="mb-4 font-serif text-4xl font-black uppercase tracking-tight text-brand-dark md:text-5xl">
              Our Values
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600">
              These core values shape the culture of Community Church Oxford — how we worship, disciple, and serve together.
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
          <h2 className="mb-4 font-serif text-3xl font-bold text-brand-dark md:text-4xl">Want to Go Deeper?</h2>
          <p className="mb-8 text-lg font-medium text-brand-dark/80">
            {t('mission.essentials_cta')}
          </p>
          <Button variant="primary" href="https://communityoxford.ccbchurch.com/form_response.php?id=23">
            Register for Essentials
          </Button>
        </div>
      </section>
    </>
  );
}
