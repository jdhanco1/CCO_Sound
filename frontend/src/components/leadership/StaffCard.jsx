import { useState } from 'react';
import { HiX } from 'react-icons/hi';

export default function StaffCard({ name, title, photo, bio, email, phone }) {
  const [open, setOpen] = useState(false);
  const hasBio = bio || email || phone;
  const imgSrc = photo?.url
    || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1e3a5f&color=fff&size=300`;

  return (
    <>
      <div
        className={`group text-center ${hasBio ? 'cursor-pointer' : ''}`}
        onClick={() => hasBio && setOpen(true)}
      >
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
        {hasBio && (
          <p className="mt-1 text-xs text-gray-400">Click to learn more</p>
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
              <p className="mt-1 text-sm font-medium text-accent">{title}</p>
            </div>
            {bio && (
              <p className="mt-6 text-sm leading-relaxed text-gray-600">{bio}</p>
            )}
            <div className="mt-4 space-y-1">
              {email && (
                <a href={`mailto:${email}`} className="block text-sm text-brand underline hover:text-accent">
                  {email}
                </a>
              )}
              {phone && (
                <a href={`tel:${phone}`} className="block text-sm text-brand underline hover:text-accent">
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
