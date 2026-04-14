export default function PageHero({ title, subtitle, backgroundImage, bgClass = 'hero-gradient' }) {
  const hasImage = !!backgroundImage;

  return (
    <section
      className={`relative flex min-h-[320px] items-center justify-center ${hasImage ? '' : bgClass}`}
      style={hasImage ? { backgroundImage: `url('${backgroundImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      <div className={`absolute inset-0 ${hasImage ? 'bg-black/50' : 'bg-black/20'}`} />
      <div className="relative z-10 px-4 text-center">
        <h1 className="animate-fade-in-up font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="animate-fade-in-up-delay-1 mt-4 text-lg text-gray-200 md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
