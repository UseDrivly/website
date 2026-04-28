import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs, getPosts } from '@/lib/supabase/posts';

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Article Not Found | Drivly' };
  return {
    title: `${post.title} | Drivly Blog`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : [],
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author_name],
    },
  };
}

const Arrow = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const [post, relatedPosts] = await Promise.all([
    getPostBySlug(slug),
    getPosts({ limit: 3 }),
  ]);

  if (!post) notFound();

  /* Format date as "April 2026" */
  const dateLabel = new Date(post.published_at).toLocaleDateString('en-NG', { year: 'numeric', month: 'long' });

  return (
    <>
      {/* ══ HERO — #0D3D21 bg, centred white title (72px) ══ */}
      <section style={{ background: '#0D3D21', minHeight: '388px', position: 'relative', overflow: 'hidden' }}>
        {/* Cover image */}
        {post.cover_image_url && (
          <Image src={post.cover_image_url} alt={post.title} fill className="object-cover object-center" priority />
        )}

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'clamp(60px, 10vw, 96px) 24px' }}>
          {/* Article title — 72px per spec */}
          <h1 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: '75px', letterSpacing: '-2.16px', color: '#FFFFFF', maxWidth: '1133px' }}>
            {post.title}
          </h1>
          {/* Breadcrumb: "Blog / {category}" */}
          <p style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 500, fontSize: '19px', lineHeight: '33px', color: '#FFFFFF', marginTop: '14px' }}>
            Blog{post.category ? <> / <span style={{ color: '#7AB800' }}>{post.category}</span></> : ''}
          </p>
        </div>
      </section>

      {/* ══ ARTICLE BODY — white bg, 913px centred ══ */}
      <section className="bg-white" style={{ paddingTop: '60px', paddingBottom: '48px' }}>
        <div style={{ maxWidth: '913px', margin: '0 auto', padding: '0 24px' }}>
          {/* Article prose */}
          <div
            className="prose-drivly"
            style={{
              fontFamily: 'Helvetica Neue, Inter, sans-serif',
              fontWeight: 400,
              fontSize: '19px',
              lineHeight: '33px',
              color: '#000000',
              maxWidth: '100%',
              overflowWrap: 'anywhere',
              wordBreak: 'break-word',
            }}
            dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
          />
        </div>
      </section>

      {/* ══ AUTHOR ROW ══ */}
      <section className="bg-white" style={{ paddingBottom: '32px' }}>
        <div style={{ maxWidth: '913px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Avatar circle (100px) */}
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#EFF7DB', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '22px', color: '#0D3D21' }}>
            {post.author_name?.charAt(0) ?? 'D'}
          </div>
          {/* Left: author name */}
          <span style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 300, fontSize: '19px', lineHeight: '33px', color: '#000000', flex: 1 }}>
            {post.author_name} · Drivly
          </span>
          {/* Right: date + read time */}
          <span style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 300, fontSize: '19px', lineHeight: '33px', color: '#000000', whiteSpace: 'nowrap' }}>
            {dateLabel} · {post.read_time}
          </span>
        </div>
      </section>

      {/* ══ CTA BUTTONS — centred, side-by-side ══ */}
      <section className="bg-white" style={{ paddingBottom: '80px' }}>
        <div style={{ maxWidth: '913px', margin: '0 auto', padding: '24px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {/* Back to Blog — outline */}
          <Link href="/blog" id="back-to-blog" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '246px', height: '47px', border: '1px solid #DCDCDC', borderRadius: '12px', background: 'transparent', fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#0C0B0B', textDecoration: 'none' }}>
            ← Back to Blog
          </Link>
          {/* Join the waitlist — green */}
          <Link href="/#waitlist" id="blog-post-waitlist-cta" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '241px', height: '47px', background: '#7AB800', border: '1px solid #DCDCDC', borderRadius: '12px', fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#0D3D21', textDecoration: 'none' }}>
            Join the waitlist <Arrow />
          </Link>
        </div>
      </section>

      {/* ══ READ MORE BLOGS ══ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-[1512px] mx-auto px-6 lg:px-20">
          {/* Headline — #5F9908, 72px */}
          <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: '75px', letterSpacing: '-2.16px', color: '#5F9908', textAlign: 'center', marginBottom: '40px' }}>
            Read more blogs
          </h2>

          {/* 3 blog cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts
              .filter((p) => p.slug !== slug)
              .slice(0, 3)
              .map((p) => (
                <article key={p.id} style={{ background: '#FFFFFF', border: '1px solid rgba(122,184,0,0.15)', borderRadius: '18px', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  {/* Cover */}
                  <Link href={`/blog/${p.slug}`} style={{ display: 'block', height: '248px', background: '#F7FAF2', overflow: 'hidden', borderRadius: '18px 18px 0 0', flexShrink: 0, position: 'relative' }}>
                    {p.cover_image_url ? (
                      <Image src={p.cover_image_url} alt={p.title} fill className="object-cover" />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '40px' }}>📰</div>
                    )}
                  </Link>

                  {/* Body */}
                  <div style={{ padding: '24px 29px 28px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    {p.category && (
                      <span style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400, fontSize: '11px', lineHeight: '13px', letterSpacing: '1.1px', textTransform: 'uppercase', color: '#7AB800' }}>
                        {p.category}
                      </span>
                    )}
                    <h3 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: '21.18px', lineHeight: '28px', color: '#0E1510', margin: 0 }}>
                      <Link href={`/blog/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>{p.title}</Link>
                    </h3>
                    <Link href={`/blog/${p.slug}`} style={{ fontFamily: 'DM Sans, Inter, sans-serif', fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: '#7AB800', textDecoration: 'none', marginTop: 'auto' }}>
                      Read article →
                    </Link>
                  </div>

                  {/* Green bottom bar */}
                  <div style={{ height: '5px', background: '#7AB800', borderRadius: '3px', position: 'absolute', bottom: 0, left: '29px', right: '29px' }} />
                </article>
              ))}
          </div>

          {/* View all articles */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <Link href="/blog" id="blog-post-view-all" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', height: '48px', padding: '0 20px', border: '1px solid #DCDCDC', borderRadius: '12px', background: 'transparent', fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#0D3D21', textDecoration: 'none' }}>
              View all articles <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
