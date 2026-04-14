export default function SectionHeader({ eyebrow, title, subtitle, light = false, center = true }) {
  return (
    <div className={`mb-10 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accent/80">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-serif text-3xl font-bold leading-tight md:text-4xl lg:text-5xl ${
          light ? 'text-white' : 'text-brand-dark'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-lg leading-relaxed ${
            center ? 'mx-auto' : ''
          } ${light ? 'text-gray-300' : 'text-gray-600'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
