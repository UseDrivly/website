'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createClient } from '@supabase/supabase-js';

export async function getSettings(id: string) {
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
      console.error(`[getSettings] error fetching ${id}:`, error);
      return null;
    }

    return data?.value || null;
  } catch (error) {
    console.error(`[getSettings] unexpected error:`, error);
    return null;
  }
}

export async function updateSettings(id: string, value: Record<string, string>) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!supabaseUrl || !serviceKey) {
    return { success: false, error: 'Missing Supabase environment variables.' };
  }

  try {
    // Use the Supabase JS client with the service role key
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { error } = await supabase
      .from('site_settings')
      .upsert(
        { id, value, updated_at: new Date().toISOString() },
        { onConflict: 'id' }
      );

    if (error) {
      console.error(`[updateSettings] Supabase error:`, error);
      // If the table doesn't exist, provide a helpful message
      if (error.message?.includes('schema cache') || error.code === '42P01') {
        return {
          success: false,
          error: 'The site_settings table has not been created yet. Please run the setup SQL in your Supabase SQL Editor.',
        };
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred.';
    console.error(`[updateSettings] unexpected error:`, err);
    return { success: false, error: errorMsg };
  }
}
