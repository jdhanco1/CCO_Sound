export default function Card({ image, title, subtitle, children, className = '' }) {
  return (
    <div
      className={`group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl ${className}`}
    >
      {image && (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-6">
        {title && (
          <h3 className="mb-1 font-serif text-xl font-bold text-brand-dark">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="mb-3 text-sm font-medium text-accent">{subtitle}</p>
        )}
        {children && (
          <div className="text-sm leading-relaxed text-gray-600">{children}</div>
        )}
      </div>
    </div>
  );
}
