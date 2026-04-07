import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import BlogCard from '../components/blog/BlogCard';
import useContent from '../hooks/useContent';
import { getBlogPosts } from '../lib/api';

export default function Blog() {
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(1);
  const { data, loading } = useContent(() => getBlogPosts(page, 9, i18n.language), [page, i18n.language]);

  const posts = data?.items || [];
  const meta = data?.meta;

  return (
    <>
      <Helmet>
        <title>{t('blog.title')} — Community Church Oxford</title>
      </Helmet>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="mb-10 font-serif text-3xl font-bold text-brand-dark md:text-4xl">
            {t('blog.title')}
          </h1>
          {loading && !posts.length ? (
            <div className="py-20 text-center text-gray-400">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-accent border-t-transparent" />
              <p className="mt-4">Loading posts…</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-2xl bg-warm p-12 text-center">
              <p className="font-serif text-xl text-gray-500">
                Blog posts & devotionals will appear here once added in the CMS.
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Pastors and staff can publish posts with rich text, images, and author info via the CMS.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((p) => (
                  <BlogCard
                    key={p.id}
                    slug={p.slug}
                    title={p.title}
                    excerpt={p.excerpt}
                    coverImage={p.coverImage}
                    author={p.author}
                    publishedAt={p.publishedDate}
                  />
                ))}
              </div>

              {meta?.pagination?.pageCount > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  {Array.from({ length: meta.pagination.pageCount }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`h-10 w-10 rounded-full text-sm font-semibold transition ${
                        page === i + 1
                          ? 'bg-accent text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
