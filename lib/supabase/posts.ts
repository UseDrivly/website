import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { BlogPost } from '@/types';

/**
 * Supabase table schema — run this in your Supabase SQL editor:
 * ---------------------------------------------------------------
 * CREATE TABLE posts (
 *   id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   slug           TEXT NOT NULL UNIQUE,
 *   title          TEXT NOT NULL,
 *   excerpt        TEXT,
 *   content        TEXT,          -- HTML/rich text from admin editor
 *   category       TEXT,          -- e.g. "Driver Experience", "Trust & Safety"
 *   author_name    TEXT NOT NULL DEFAULT 'Drivly Team',
 *   author_title   TEXT,
 *   cover_image_url TEXT,         -- Supabase Storage public URL
 *   read_time      TEXT,          -- e.g. "6 min read"
 *   is_published   BOOLEAN NOT NULL DEFAULT false,
 *   published_at   TIMESTAMPTZ DEFAULT now(),
 *   created_at     TIMESTAMPTZ DEFAULT now(),
 *   updated_at     TIMESTAMPTZ DEFAULT now()
 * );
 *
 * ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
 *
 * -- Public can read published posts
 * CREATE POLICY "public_read_published" ON posts
 *   FOR SELECT TO anon USING (is_published = true);
 *
 * -- Only authenticated users (admins) can insert/update/delete
 * CREATE POLICY "admin_full_access" ON posts
 *   FOR ALL TO authenticated USING (true) WITH CHECK (true);
 * ---------------------------------------------------------------
 */

interface GetPostsOptions {
  limit?: number;
  category?: string;
}

/**
 * Fetch a list of published blog posts, newest first.
 * Returns an empty array on error so pages degrade gracefully.
 */
export async function getPosts(options: GetPostsOptions = {}): Promise<BlogPost[]> {
  try {
    const supabase = await createSupabaseServerClient();

    let query = supabase
      .from('posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.category) {
      query = query.eq('category', options.category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[getPosts] Supabase error:', error.message);
      return [];
    }

    return (data ?? []) as BlogPost[];
  } catch (err) {
    console.error('[getPosts] Unexpected error:', err);
    return [];
  }
}

/**
 * Fetch a single published post by its slug.
 * Returns null if not found or on error.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      console.error('[getPostBySlug] Supabase error:', error.message);
      return null;
    }

    return data as BlogPost;
  } catch (err) {
    console.error('[getPostBySlug] Unexpected error:', err);
    return null;
  }
}

/**
 * Fetch all published post slugs for generateStaticParams.
 */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from('posts')
      .select('slug')
      .eq('is_published', true);

    if (error) return [];
    return (data ?? []).map((p: { slug: string }) => p.slug);
  } catch {
    return [];
  }
}
