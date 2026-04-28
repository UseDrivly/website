import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types';

interface BlogPreviewProps {
  posts: BlogPost[];
  /** Pass headline/subtitle if you want the component to render its own section header */
  headline?: string;
  subtitle?: string;
  showViewAll?: boolean;
}

/**
 * BlogCard — matches Figma spec:
 * white bg, rgba(122,184,0,0.15) border, 18px radius,
 * image top half, category uppercase #7AB800 11px,
 * title bold #0E1510 21px, "Read article →" in #7AB800,
 * green bottom accent bar.
 */
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
      }}
    >
      {/* Cover image — top half */}
      <Link href={`/blog/${post.slug}`} style={{ display: 'block', position: 'relative', height: '248px', overflow: 'hidden', background: '#F7FAF2', borderRadius: '18px 18px 0 0', flexShrink: 0 }}>
        {post.cover_image_url ? (
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, 387px"
            className="object-cover"
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span style={{ fontSize: '32px' }}>📰</span>
            <p style={{ fontSize: '11px', color: '#8FA489', textAlign: 'center', padding: '0 16px' }}>
              Cover image set via Supabase admin panel.
            </p>
          </div>
        )}
      </Link>

      {/* Card body */}
      <div style={{ padding: '10.9px 29px 28px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {/* Category */}
        {post.category && (
          <p style={{
            fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 400,
            fontSize: '11px', lineHeight: '13px',
            letterSpacing: '1.1px', textTransform: 'uppercase', color: '#7AB800',
          }}>
            {post.category}
          </p>
        )}

        {/* Title */}
        <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700,
            fontSize: '21.18px', lineHeight: '28px', color: '#0E1510',
          }}>
            {post.title}
          </h3>
        </Link>

        {/* Read link */}
        <Link href={`/blog/${post.slug}`} style={{
          fontFamily: 'DM Sans, Inter, sans-serif', fontWeight: 400,
          fontSize: '12px', lineHeight: '16px', color: '#7AB800',
          textDecoration: 'none', marginTop: 'auto',
        }}>
          Read article →
        </Link>
      </div>

      {/* Green bottom accent bar */}
      <div style={{ height: '5px', background: '#7AB800', borderRadius: '3px', margin: '0 29px', position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </article>
  );
}

/**
 * BlogPreview — 3-up card grid.
 * When headline is empty (called from page.tsx with its own header), renders only the grid.
 */
export default function BlogPreview({
  posts,
  headline,
  subtitle,
  showViewAll = false,
}: BlogPreviewProps) {
  const hasHeader = headline && headline.length > 0;

  return (
    <div>
      {/* Optional header */}
      {hasHeader && (
        <div className="mb-10">
          <h2 style={{ fontFamily: 'Helvetica Neue, Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: '75px', letterSpacing: '-2.16px', color: '#5F9908', textAlign: 'center' }}>
            {headline}
          </h2>
          {subtitle && (
            <p style={{ fontSize: '19px', lineHeight: '33px', color: '#0D3D21', textAlign: 'center', maxWidth: '485px', margin: '0 auto' }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Grid or empty state */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 16px', gap: '12px', background: '#F7FAF2', borderRadius: '18px', textAlign: 'center' }}>
          <span style={{ fontSize: '40px' }}>✍️</span>
          <p style={{ color: '#4A5E46', fontWeight: 500 }}>Articles coming soon, stay tuned.</p>
          <p style={{ fontSize: '12px', color: '#8FA489' }}>Publish posts via the admin panel to see them appear here.</p>
        </div>
      )}

      {showViewAll && posts.length > 0 && (
        <div className="flex justify-center mt-8">
          <Link href="/blog" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            height: '48px', padding: '0 20px',
            border: '1px solid #DCDCDC', borderRadius: '12px',
            fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#0D3D21',
            textDecoration: 'none',
          }}>
            View all articles →
          </Link>
        </div>
      )}
    </div>
  );
}
