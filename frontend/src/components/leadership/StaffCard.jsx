import { STRAPI_URL } from '../../lib/api';

export default function StaffCard({ name, title, photo }) {
  const imgSrc = photo?.url
    ? `${STRAPI_URL}${photo.url}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1e3a5f&color=fff&size=300`;

  return (
    <div className="group text-center">
      <div className="mx-auto mb-4 h-48 w-48 overflow-hidden rounded-full shadow-lg ring-4 ring-white transition-all duration-300 group-hover:ring-accent">
        <img
          src={imgSrc}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <h3 className="font-serif text-lg font-bold text-brand-dark">{name}</h3>
      <p className="text-sm text-accent">{title}</p>
    </div>
  );
}
