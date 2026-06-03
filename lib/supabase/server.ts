import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

/**
 * Supabase server-side client.
 * ONLY import this in:
 *  - Server Components
 *  - Server Actions ('use server')
 *  - Route Handlers (app/api/*)
 *
 * Uses the SERVICE ROLE KEY for full DB access (bypasses RLS).
 * Never expose the service_role key to the browser.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — cookies are read-only.
            // Safe to ignore in this context.
          }
        },
      },
    }
  );
}

/**
 * Supabase client for static/public data reads (no cookies).
 * Use this for:
 *  - Blog posts (public reads)
 *  - Public content
 *  - Static page generation (generateStaticParams, etc.)
 *
 * Does NOT use cookies, allowing pages to be statically prerendered.
 */
export function createSupabasePublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
