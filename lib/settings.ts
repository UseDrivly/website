import { createClient } from '@supabase/supabase-js';

export async function getSettingsValue(id: string) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`[getSettingsValue] error fetching ${id}:`, error);
      return null;
    }

    return data?.value || null;
  } catch (error) {
    console.error(`[getSettingsValue] unexpected error:`, error);
    return null;
  }
}
