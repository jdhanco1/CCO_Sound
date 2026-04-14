import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiMenu, HiX } from 'react-icons/hi';
import LanguageToggle from '../common/LanguageToggle';
import logo from '../../assets/Logo.svg';

const links = [
  { to: '/about', key: 'nav.mission' },
  { to: '/leadership', key: 'nav.leadership' },
  { to: '/connect', key: 'nav.connect' },
  { to: '/events', key: 'nav.events' },
  { to: '/contact', key: 'nav.contact' },
];

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const activeClass = 'text-brand font-semibold';
  const baseClass =
    'transition-colors duration-200 hover:text-brand text-sm tracking-wide uppercase';

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo / Church name */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Community Church Oxford" className="h-20 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : 'text-white'}`
              }
            >
              {t(l.key)}
            </NavLink>
          ))}
          <a
            href="https://pushpay.com/pay/communityoxford"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand px-5 py-2 text-sm font-semibold uppercase text-brand-dark shadow-md transition hover:bg-brand/80 hover:shadow-lg"
          >
            {t('nav.give')}
          </a>
          <LanguageToggle />
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="text-brand lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav className="border-t border-gray-800 bg-black/80 backdrop-blur-xl px-4 pb-6 pt-2 lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${baseClass} py-1 ${isActive ? activeClass : 'text-white'}`
                }
              >
                {t(l.key)}
              </NavLink>
            ))}
            <a
              href="https://pushpay.com/pay/communityoxford"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full bg-brand px-5 py-2 text-center text-sm font-semibold uppercase text-brand-dark shadow-md"
            >
              {t('nav.give')}
            </a>
            <LanguageToggle />
          </div>
        </nav>
      )}
    </header>
  );
}
