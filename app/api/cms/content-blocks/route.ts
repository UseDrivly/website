import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, content, content_json, image_url, image_alt, order_index } = body;

    if (!id) {
      return NextResponse.json({ error: 'Content block ID is required' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (content !== undefined) updateData.content = content;
    if (content_json !== undefined) updateData.content_json = content_json;
    if (image_url !== undefined) updateData.image_url = image_url;
    if (image_alt !== undefined) updateData.image_alt = image_alt;
    if (order_index !== undefined) updateData.order_index = order_index;

    const { data, error } = await supabase
      .from('cms_content_blocks')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { section_id, block_key, block_type, content, content_json, image_url, image_alt, order_index } = body;

    if (!section_id || !block_key || !block_type) {
      return NextResponse.json({ error: 'Section ID, block key, and block type are required' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('cms_content_blocks')
      .insert({
        section_id,
        block_key,
        block_type,
        content: content || null,
        content_json: content_json || null,
        image_url: image_url || null,
        image_alt: image_alt || null,
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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Content block ID is required' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase
      .from('cms_content_blocks')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
