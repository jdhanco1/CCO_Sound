import { Link } from 'react-router-dom';

export default function MinistryCard({ slug, name, summary, image, meetingTime, location, leader }) {
  const imgSrc = image?.url || null;

  const inner = (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {imgSrc && (
        <div className="aspect-video overflow-hidden">
          <img
            src={imgSrc}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      {!imgSrc && (
        <div className="aspect-video bg-brand-dark/10 flex items-center justify-center">
          <span className="font-serif text-3xl font-bold text-brand-dark/30">{name.charAt(0)}</span>
        </div>
      )}
      <div className="p-6">
        <h3 className="mb-1 font-serif text-xl font-bold text-brand-dark">{name}</h3>
        {(meetingTime || location || leader) && (
          <div className="mb-3 space-y-0.5">
            {leader && <p className="text-xs font-semibold text-accent">{leader}</p>}
            {meetingTime && <p className="text-xs text-gray-500">{meetingTime}</p>}
            {location && <p className="text-xs text-gray-500">{location}</p>}
          </div>
        )}
        {summary && (
          <p className="text-sm leading-relaxed text-gray-600 line-clamp-3">{summary}</p>
        )}
        <p className="mt-4 text-xs font-bold uppercase tracking-wide text-brand group-hover:text-accent transition">
          Learn More →
        </p>
      </div>
    </div>
  );

  if (slug) {
    return <Link to={`/connect/${slug}`}>{inner}</Link>;
  }
  return inner;
}
