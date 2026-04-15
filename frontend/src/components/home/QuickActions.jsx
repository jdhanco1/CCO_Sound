import { useTranslation } from 'react-i18next';
import { HiOutlineHeart, HiOutlineUserGroup, HiOutlineKey, HiOutlineHand, HiOutlineClock, HiOutlineLocationMarker } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const actions = [
  {
    key: 'home.quick_give',
    descKey: 'home.quick_give_desc',
    icon: HiOutlineHeart,
    href: 'https://pushpay.com/pay/communityoxford',
    external: true,
  },
  {
    key: 'home.quick_ministries',
    descKey: 'home.quick_ministries_desc',
    icon: HiOutlineUserGroup,
    to: '/connect',
    external: false,
  },
  {
    key: 'home.quick_prayer',
    descKey: 'home.quick_prayer_desc',
    icon: HiOutlineHand,
    href: 'https://communityoxford.ccbchurch.com/goto/forms/2/responses/new',
    external: true,
  },
  {
    key: 'home.quick_ccb',
    descKey: 'home.quick_ccb_desc',
    icon: HiOutlineKey,
    href: 'https://communityoxford.ccbchurch.com/login.php',
    external: true,
  },
];

export default function QuickActions() {
  const { t } = useTranslation();

  return (
    <section className="bg-brand py-16">
      <div className="mx-auto max-w-5xl px-4">
        {/* ── When & Where ── */}
        <div className="mb-10 text-center">
          <h2 className="mb-6 font-serif text-3xl font-bold text-brand-dark md:text-4xl">
            {t('home.service_label')}
          </h2>
          <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:gap-10">
            <div className="flex items-center gap-3">
              <HiOutlineClock size={28} className="text-brand-dark" />
              <span className="text-2xl font-bold text-brand-dark">
                {t('home.service_time')}
              </span>
            </div>
            <div className="hidden h-8 w-px bg-brand-dark/30 md:block" />
            <div className="flex items-center gap-3">
              <HiOutlineLocationMarker size={28} className="text-brand-dark" />
              <span className="text-lg font-medium text-brand-dark/80">
                {t('home.service_location')}
              </span>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mx-auto mb-10 h-px w-24 bg-brand-dark/20" />

        {/* ── Action Cards ── */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((a) => {
            const Icon = a.icon;
            const content = (
              <div className="group flex flex-col items-center gap-3 rounded-2xl bg-brand-dark/90 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-dark icon-pop">
                  <Icon size={28} />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-white">
                  {t(a.key)}
                </h3>
                <p className="text-xs text-white/60">
                  {t(a.descKey)}
                </p>
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
      </div>
    </section>
  );
}
