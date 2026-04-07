import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const footerLinks = [
  { to: '/mission', key: 'nav.mission' },
  { to: '/leadership', key: 'nav.leadership' },
  { to: '/connect', key: 'nav.connect' },
  { to: '/sermons', key: 'nav.sermons' },
  { to: '/events', key: 'nav.events' },
  { to: '/contact', key: 'nav.contact' },
];

const socials = [
  { href: 'https://www.facebook.com/communityoxford', icon: FaFacebookF, label: 'Facebook' },
  { href: 'https://twitter.com/CommunityOxford', icon: FaTwitter, label: 'Twitter' },
  { href: '#', icon: FaInstagram, label: 'Instagram' },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Branding */}
          <div>
            <h3 className="mb-3 font-serif text-xl font-bold tracking-tight">
              Community Church Oxford
            </h3>
            <p className="text-sm leading-relaxed text-gray-300">
              Seek · Shape · Send
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Lafayette High School Gym<br />
              Oxford, MS 38655
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-gray-300 transition hover:text-accent"
                  >
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / Give */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-accent"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
            <a
              href="https://pushpay.com/pay/communityoxford"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-accent px-6 py-2.5 text-sm font-semibold uppercase text-white shadow transition hover:bg-accent-light"
            >
              {t('nav.give')}
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
