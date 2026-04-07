import { useTranslation } from 'react-i18next';
import { HiOutlineHeart, HiOutlineUserGroup, HiOutlineKey } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const actions = [
  {
    key: 'home.quick_give',
    icon: HiOutlineHeart,
    href: 'https://pushpay.com/pay/communityoxford',
    external: true,
  },
  {
    key: 'home.quick_ministries',
    icon: HiOutlineUserGroup,
    to: '/connect',
    external: false,
  },
  {
    key: 'home.quick_ccb',
    icon: HiOutlineKey,
    href: 'https://communityoxford.ccbchurch.com/login.php',
    external: true,
  },
];

export default function QuickActions() {
  const { t } = useTranslation();

  return (
    <section className="-mt-16 relative z-20 mx-auto max-w-5xl px-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {actions.map((a) => {
          const Icon = a.icon;
          const content = (
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Icon size={28} />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-brand-dark">
                {t(a.key)}
              </h3>
            </div>
          );

          if (a.external) {
            return (
              <a
                key={a.key}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            );
          }

          return (
            <Link key={a.key} to={a.to}>
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
