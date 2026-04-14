import useContent from '../../hooks/useContent';
import { getHomePage, CMS_URL } from '../../lib/api';

export default function Hero() {
  const { data } = useContent(getHomePage);

  // CMS hero image → fallback to local back.jpg
  const heroImage =
    data?.heroImage?.url ? `${CMS_URL}${data.heroImage.url}` : '/back.jpg';
  const heroTitle = data?.heroTitle || "WE'RE GLAD YOU'RE HERE";

  return (
    <section
      className="relative flex min-h-[320px] items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('${heroImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white" />

      <div className="relative z-10 mx-auto px-6 text-center">
        <h1 className="animate-fade-in-up whitespace-nowrap font-serif text-5xl font-black leading-tight tracking-wide text-white md:text-6xl lg:text-7xl">
          {heroTitle}
        </h1>
      </div>
    </section>
  );
}
