import { STRAPI_URL } from '../../lib/api';

export default function MinistryCard({ name, description, image, schedule }) {
  const imgSrc = image?.url ? `${STRAPI_URL}${image.url}` : null;

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
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
      <div className="p-6">
        <h3 className="mb-2 font-serif text-xl font-bold text-brand-dark">
          {name}
        </h3>
        {schedule && (
          <p className="mb-3 text-sm font-semibold text-accent">{schedule}</p>
        )}
        <p className="text-sm leading-relaxed text-gray-600">{description}</p>
      </div>
    </div>
  );
}
