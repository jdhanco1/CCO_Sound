import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useContent from '../hooks/useContent';
import { getBlogPost } from '../lib/api';
import RichText from '../components/common/RichText';

export default function BlogPost() {
  const { slug } = useParams();
  const { data: post, loading, error } = useContent(() => getBlogPost(slug), [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <p className="font-serif text-2xl text-gray-500">Post not found.</p>
        <Link to="/blog" className="text-sm font-semibold text-brand underline hover:text-accent">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const coverSrc = post.coverImage?.url || null;
  const formattedDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <>
      <Helmet>
        <title>{post.title} — Community Church Oxford</title>
        {post.excerpt && <meta name="description" content={post.excerpt} />}
        <link rel="canonical" href={`https://communityoxford.com/blog/${post.slug}`} />
        <meta property="og:title" content={`${post.title} — Community Church Oxford`} />
        {post.excerpt && <meta property="og:description" content={post.excerpt} />}
        <meta property="og:url" content={`https://communityoxford.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt || '',
          "url": `https://communityoxford.com/blog/${post.slug}`,
          "datePublished": post.publishedDate || undefined,
          "author": { "@type": "Organization", "name": "Community Church Oxford" },
          "publisher": {
            "@type": "Organization",
            "name": "Community Church Oxford",
            "logo": { "@type": "ImageObject", "url": "https://communityoxford.com/SEEKSHAPESEND.png" }
          }
        })}</script>
      </Helmet>

      <article className="mx-auto max-w-3xl px-4 py-12">
        {/* Back link */}
        <Link
          to="/blog"
          className="mb-6 inline-block text-sm font-semibold uppercase tracking-wide text-brand transition hover:text-accent"
        >
          ← Back to Blog
        </Link>

        {/* Meta */}
        <div className="mb-6">
          {formattedDate && (
            <p className="text-sm font-medium text-gray-400">{formattedDate}</p>
          )}
          <h1 className="mt-2 font-serif text-3xl font-bold text-brand-dark md:text-4xl">
            {post.title}
          </h1>
          {post.author && (
            <p className="mt-2 text-sm text-accent">{post.author}</p>
          )}
          {post.excerpt && (
            <p className="mt-4 text-lg leading-relaxed text-gray-600">{post.excerpt}</p>
          )}
        </div>

        {/* Cover image inline */}
        {coverSrc && (
          <div className="mb-8 overflow-hidden rounded-2xl">
            <img
              src={coverSrc}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        <hr className="mb-8 border-gray-200" />

        {/* Body */}
        {post.content ? (
          <RichText content={post.content} className="prose-base" />
        ) : (
          <p className="text-gray-500 italic">No content yet.</p>
        )}

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t.id}
                className="rounded-full bg-warm px-3 py-1 text-xs font-semibold text-brand-dark"
              >
                {t.tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </>
  );
}
