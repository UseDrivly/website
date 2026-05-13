import { createClient } from '@supabase/supabase-js';
import type { CMSPage, CMSPageWithSections, CMSSection, CMSContentBlock, CMSImage } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function createSupabaseClient() {
  return createClient(supabaseUrl, supabaseKey);
}

/**
 * Fetch a page by slug with all its sections and content blocks
 */
export async function getPageBySlug(slug: string): Promise<CMSPageWithSections | null> {
  const supabase = await createSupabaseClient();

  const { data: page, error: pageError } = await supabase
    .from('cms_pages')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (pageError || !page) {
    console.error(`[CMS] Error fetching page ${slug}:`, pageError);
    return null;
  }

  const { data: sections, error: sectionsError } = await supabase
    .from('cms_sections')
    .select(`
      *,
      content_blocks (*)
    `)
    .eq('page_id', page.id)
    .order('order_index', { ascending: true });

  if (sectionsError) {
    console.error(`[CMS] Error fetching sections for page ${slug}:`, sectionsError);
    return { ...page, sections: [] };
  }

  // Sort content blocks within each section
  const sortedSections = sections?.map(section => ({
    ...section,
    content_blocks: section.content_blocks?.sort((a: CMSContentBlock, b: CMSContentBlock) => 
      a.order_index - b.order_index
    ) || []
  })) || [];

  return { ...page, sections: sortedSections };
}

/**
 * Fetch all pages
 */
export async function getAllPages(): Promise<CMSPage[]> {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase
    .from('cms_pages')
    .select('*')
    .order('slug', { ascending: true });

  if (error) {
    console.error('[CMS] Error fetching pages:', error);
    return [];
  }

  return data || [];
}

/**
 * Get a text content block from a section
 */
export function getTextBlock(blocks: CMSContentBlock[], key: string): string {
  const block = blocks.find(b => b.block_key === key && b.block_type === 'text');
  return block?.content || '';
}

/**
 * Get an image content block from a section
 */
export function getImageBlock(blocks: CMSContentBlock[], key: string): { url: string; alt: string } {
  const block = blocks.find(b => b.block_key === key && b.block_type === 'image');
  return {
    url: block?.image_url || '',
    alt: block?.image_alt || ''
  };
}

/**
 * Get a JSON content block from a section
 */
export function getJsonBlock<T = any>(blocks: CMSContentBlock[], key: string): T | null {
  const block = blocks.find(b => b.block_key === key && b.block_type === 'json');
  return (block?.content_json as T) || null;
}

/**
 * Get stats from a section
 */
export function getStats(blocks: CMSContentBlock[], key: string): Array<{ value: string; label: string }> {
  const block = blocks.find(b => b.block_key === key && b.block_type === 'json');
  if (!block?.content_json) return [];
  return block.content_json as Array<{ value: string; label: string }>;
}

/**
 * Get services from a section
 */
export function getServices(blocks: CMSContentBlock[], key: string): Array<{ icon: string; title: string; description: string }> {
  const block = blocks.find(b => b.block_key === key && b.block_type === 'json');
  if (!block?.content_json) return [];
  return block.content_json as Array<{ icon: string; title: string; description: string }>;
}

/**
 * Get industries from a section
 */
export function getIndustries(blocks: CMSContentBlock[], key: string): Array<{ label: string; img: string }> {
  const block = blocks.find(b => b.block_key === key && b.block_type === 'json');
  if (!block?.content_json) return [];
  return block.content_json as Array<{ label: string; img: string }>;
}

/**
 * Get steps from a section
 */
export function getSteps(blocks: CMSContentBlock[], key: string): Array<{ n: string; label: string }> {
  const block = blocks.find(b => b.block_key === key && b.block_type === 'json');
  if (!block?.content_json) return [];
  return block.content_json as Array<{ n: string; label: string }>;
}
