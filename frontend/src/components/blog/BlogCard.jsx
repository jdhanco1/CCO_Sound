import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function BlogCard({ slug, title, excerpt, coverImage, author, publishedAt }) {
  const { t } = useTranslation();
  const imgSrc = coverImage?.url || null;
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl">
      {imgSrc && (
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={imgSrc}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-6">
        <p className="text-xs font-medium text-gray-400">{formattedDate}</p>
        <h3 className="mt-1 font-serif text-xl font-bold text-brand-dark">
          {title}
        </h3>
        {author && (
          <p className="mt-1 text-sm text-accent">{author}</p>
        )}
        {excerpt && (
          <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-3">
            {excerpt}
          </p>
        )}
        <Link
          to={`/blog/${slug}`}
          className="mt-4 inline-block text-sm font-semibold uppercase tracking-wide text-brand transition hover:text-accent"
        >
          {t('blog.read_more')} →
        </Link>
      </div>
    </article>
  );
}
