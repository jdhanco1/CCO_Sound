import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { HiExternalLink } from 'react-icons/hi';
import PageHero from '../components/common/PageHero';
import SectionHeader from '../components/common/SectionHeader';
import useContent from '../hooks/useContent';
import { getMerchItems, getPageHeroes, CMS_URL } from '../lib/api';

export default function Store() {
  const { t } = useTranslation();
  const { data: items, loading } = useContent(getMerchItems);
  const { data: heroes } = useContent(getPageHeroes);
  const [activeCategory, setActiveCategory] = useState('all');

  const heroConfig = heroes?.store;
  const heroImage = heroConfig?.heroImage?.url
    ? `${CMS_URL}${heroConfig.heroImage.url}`
    : undefined;

  const allItems = items || [];
  const featured = allItems.filter((i) => i.featured);
  const categories = ['all', ...new Set(allItems.map((i) => i.category).filter(Boolean))];
  const filtered =
    activeCategory === 'all'
      ? allItems
      : allItems.filter((i) => i.category === activeCategory);

  const categoryLabel = (cat) =>
    t(`store.cat_${cat}`, { defaultValue: cat.charAt(0).toUpperCase() + cat.slice(1) });

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

  return (
    <>
      <Helmet>
        <title>{t('store.title')} — Community Church Oxford</title>
      </Helmet>

      {heroImage && (
        <PageHero
          title={heroConfig?.heroTitle || t('store.title')}
          subtitle={heroConfig?.heroSubtitle}
          backgroundImage={heroImage}
        />
      )}

      {/* Intro banner */}
      <section className="bg-brand-dark py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Community Oxford
          </p>
          <h1 className="font-serif text-4xl font-bold md:text-5xl">
            {t('store.title')}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-300">
            {t('store.intro')}
          </p>
        </div>
      </section>

      {/* Featured items */}
      {featured.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <SectionHeader
              //eyebrow={t('store.featured_eyebrow')}
              title={t('store.featured_heading')}
            />
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item) => (
                <ProductCard key={item.id} item={item} formatPrice={formatPrice} t={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All items with category filter */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader
            eyebrow={t('store.all_eyebrow')}
            title={t('store.all_heading')}
            subtitle={t('store.all_sub')}
          />

          {/* Category filter pills */}
          {categories.length > 2 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-wide transition ${
                    activeCategory === cat
                      ? 'bg-brand text-brand-dark'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'all' ? t('store.cat_all') : categoryLabel(cat)}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="mt-12 text-center text-gray-400">{t('store.loading')}</div>
          ) : filtered.length === 0 ? (
            <div className="mt-12 text-center text-gray-400">{t('store.empty')}</div>
          ) : (
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((item) => (
                <ProductCard key={item.id} item={item} formatPrice={formatPrice} t={t} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function ProductCard({ item, formatPrice, t }) {
  const imgUrl = item.image?.url;

  return (
    <a
      href={item.purchaseUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={item.image?.alt || item.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-300">
            <span className="text-5xl">🛍️</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="font-sans text-lg font-bold text-gray-900 group-hover:text-brand-dark transition">
            {item.name}
          </h3>
          {item.description && (
            <p className="mt-1 text-sm leading-relaxed text-gray-500 line-clamp-2">
              {item.description}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-brand-dark">
            {formatPrice(item.price)}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase text-brand-dark transition group-hover:bg-brand group-hover:text-brand-dark">
            {t('store.buy_now')} <HiExternalLink className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </a>
  );
}
