import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPosts } from '@/lib/supabase/posts';
import type { BlogPost } from '@/types';

export const metadata: Metadata = {
  title: 'Blog - Driving Guides & Industry Insights | Drivly',
  description:
    'Driving guides, safety tips, and industry insights from the Drivly team. Launching in Lagos 2026.',
};

/* ─── Blog card (387 × 427px spec) ─────────────────────────────────────── */
function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(122,184,0,0.15)',
        borderRadius: '18px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '427px',
      }}
    >
      {/* ── Cover image (248px) ── */}
      <Link
        href={`/blog/${post.slug}`}
        style={{
          display: 'block',
          width: '100%',
          height: '248px',
          background: '#F7FAF2',
          borderRadius: '18px 18px 0 0',
          overflow: 'hidden',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        {post.cover_image_url ? (
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              fontSize: '48px',
            }}
          >
            📰
          </div>
        )}
      </Link>

      {/* ── Card body ── */}
      <div
        style={{
          padding: '16px 29px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          flex: 1,
        }}
      >
        {/* Category */}
        {post.category && (
          <span
            style={{
              fontFamily: 'Helvetica Neue, Inter, sans-serif',
              fontWeight: 400,
              fontSize: '11px',
              lineHeight: '13px',
              letterSpacing: '1.1px',
              textTransform: 'uppercase',
              color: '#7AB800',
            }}
          >
            {post.category}
          </span>
        )}

        {/* Title */}
        <h2
          style={{
            fontFamily: 'Helvetica Neue, Inter, sans-serif',
            fontWeight: 700,
            fontSize: '21.18px',
            lineHeight: '28px',
            color: '#0E1510',
            margin: 0,
            flex: 1,
          }}
        >
          <Link
            href={`/blog/${post.slug}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {post.title}
          </Link>
        </h2>

        {/* Read article → */}
        <Link
          href={`/blog/${post.slug}`}
          style={{
            fontFamily: 'DM Sans, Inter, sans-serif',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '16px',
            color: '#7AB800',
            textDecoration: 'none',
          }}
        >
          Read article →
        </Link>
      </div>

      {/* ── 5px green bottom bar ── */}
      <div
        style={{
          height: '5px',
          background: '#7AB800',
          borderRadius: '3px',
          position: 'absolute',
          bottom: 0,
          left: '29px',
          right: '29px',
        }}
      />
    </article>
  );
}

/* ─── Empty state ──────────────────────────────────────────────────────── */
function EmptyGrid() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 0',
        gap: '16px',
        textAlign: 'center',
      }}
    >
      <span style={{ fontSize: '48px' }}>✍️</span>
      <p
        style={{
          fontFamily: 'Helvetica Neue, Inter, sans-serif',
          fontWeight: 700,
          fontSize: '21px',
          color: '#0E1510',
        }}
      >
        Articles coming soon, stay tuned.
      </p>
      <p
        style={{
          fontFamily: 'Helvetica Neue, Inter, sans-serif',
          fontWeight: 400,
          fontSize: '13px',
          color: '#4A5E46',
        }}
      >
        Publish posts via the admin panel to see them appear here.
      </p>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────── */
export default async function BlogPage() {
  // Fetch from Supabase
  const posts = await getPosts();
  const featured = posts[0] ?? null;
  const gridPosts = posts.length > 0 ? posts : [];

  return (
    <>
      {/* ══ HERO — featured article title + "Click to read" ══ */}
      <section
        style={{
          background: '#0D3D21',
          minHeight: '388px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/images/hero-blog.jpg"
          alt="Drivly Blog"
          fill
          className="object-cover object-center"
          priority
        />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 'clamp(60px,10vw,100px) 24px',
            minHeight: '388px',
            gap: '32px',
          }}
        >
          {/* Featured title or fallback */}
          <h1
            style={{
              fontFamily: 'Helvetica Neue, Inter, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: '1.04',
              letterSpacing: '-2.16px',
              color: '#FFFFFF',
              maxWidth: '1133px',
              margin: 0,
            }}
          >
            {featured
              ? featured.title
              : 'How Drivly Verifies Every Provider Before They Take a Job'}
          </h1>

          {/* "Click to read" green button */}
          <Link
            href={featured ? `/blog/${featured.slug}` : '#'}
            id="blog-hero-cta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '166px',
              height: '47px',
              background: '#7AB800',
              border: '1px solid #FFFFFF',
              borderRadius: '8px',
              fontFamily: 'Poppins, Inter, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              color: '#0D3D21',
              textDecoration: 'none',
            }}
          >
            Click to read
          </Link>
        </div>
      </section>

      {/* ══ BLOG GRID — 3 columns, up to 9 posts per visible chunk ══ */}
      <section className="bg-white" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
        <div
          style={{
            maxWidth: '1250px',
            margin: '0 auto',
            padding: '0 24px',
          }}
        >
          {gridPosts.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
                gap: '24px',
              }}
            >
              {gridPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <EmptyGrid />
          )}
        </div>
      </section>
    </>
  );
}
