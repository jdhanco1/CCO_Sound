import { useState } from 'react';
import { HiX } from 'react-icons/hi';

export default function StaffCard({ name, title, photo, bio, email, phone }) {
  const [open, setOpen] = useState(false);
  const hasBio = bio || email || phone;
  const imgSrc = photo?.url
    || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1e3a5f&color=fff&size=600`;

  return (
    <>
      {/* Card */}
      <div
        className={`group relative overflow-hidden rounded-2xl shadow-lg ${
          hasBio ? 'cursor-pointer' : ''
        }`}
        onClick={() => hasBio && setOpen(true)}
      >
        {/* Photo */}
        <div className="aspect-[3/4] w-full">
          <img
            src={imgSrc}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Persistent bottom gradient + name */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-accent/95 via-accent/60 to-transparent px-4 pb-5 pt-16">
          <h3 className="text-base font-bold leading-tight text-white">{name}</h3>
          <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-brand">{title}</p>
        </div>

        {/* Hover CTA — slides up */}
        {hasBio && (
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-end justify-center pb-4 transition-transform duration-300 group-hover:translate-y-0">
            <span className="rounded-full bg-brand px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-dark shadow-lg">
              Read Bio
            </span>
          </div>
        )}
      </div>

      {/* Bio modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              aria-label="Close"
            >
              <HiX size={20} />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 h-24 w-24 overflow-hidden rounded-full shadow-lg">
                <img src={imgSrc} alt={name} className="h-full w-full object-cover" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-dark">{name}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-accent">{title}</p>
            </div>
            {bio && (
              <p className="mt-6 text-sm leading-relaxed text-gray-600">{bio}</p>
            )}
            <div className="mt-4 space-y-1">
              {email && (
                <a href={`mailto:${email}`} className="block text-sm text-accent underline hover:text-accent-light">
                  {email}
                </a>
              )}
              {phone && (
                <a href={`tel:${phone}`} className="block text-sm text-accent underline hover:text-accent-light">
                  {phone}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
