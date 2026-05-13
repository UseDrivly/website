import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('page_id');
    
    if (!pageId) {
      return NextResponse.json({ error: 'Page ID is required' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch sections
    const { data: sections, error: sectionsError } = await supabase
      .from('cms_sections')
      .select('*')
      .eq('page_id', pageId)
      .order('order_index', { ascending: true });

    if (sectionsError) {
      return NextResponse.json({ error: sectionsError.message }, { status: 500 });
    }

    // Fetch content blocks for all sections
    const sectionIds = sections?.map(s => s.id) || [];
    const { data: contentBlocks, error: blocksError } = await supabase
      .from('cms_content_blocks')
      .select('*')
      .in('section_id', sectionIds)
      .order('order_index', { ascending: true });

    if (blocksError) {
      return NextResponse.json({ error: blocksError.message }, { status: 500 });
    }

    // Combine sections with their content blocks
    const sectionsWithBlocks = sections?.map(section => ({
      ...section,
      content_blocks: contentBlocks?.filter(block => block.section_id === section.id) || []
    })) || [];

    return NextResponse.json(sectionsWithBlocks);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page_id, section_key, title, order_index } = body;

    if (!page_id || !section_key) {
      return NextResponse.json({ error: 'Page ID and section key are required' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('cms_sections')
      .insert({
        page_id,
        section_key,
        title: title || null,
        order_index: order_index ?? 0,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
