'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createClient } from '@supabase/supabase-js';

export async function getSettings(id: string) {
  try {
    // We can use a standard server client for reading
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`[getSettings] error fetching ${id}:`, error);
      return null;
    }

    return data?.value || null;
  } catch (error) {
    console.error(`[getSettings] unexpected error:`, error);
    return null;
  }
}

export async function updateSettings(id: string, value: any) {
  try {
    const supabase = await createSupabaseServerClient();
    
    const { error } = await supabase
      .from('site_settings')
      .upsert({ id, value, updated_at: new Date().toISOString() });

    if (error) {
      console.error(`[updateSettings] error updating ${id}:`, error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error(`[updateSettings] unexpected error:`, error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
