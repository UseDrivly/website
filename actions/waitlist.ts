'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { WaitlistFormData, ActionResponse } from '@/types';

/**
 * submitWaitlist — Next.js Server Action
 *
 * Receives validated form data from WaitlistForm and inserts
 * a new row into the `waitlist` Supabase table.
 *
 * Supabase table schema (run in Supabase SQL editor):
 * -------------------------------------------------------
 * CREATE TABLE waitlist (
 *   id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   name          TEXT NOT NULL,
 *   email         TEXT NOT NULL,
 *   phone         TEXT,
 *   city          TEXT,
 *   state         TEXT,
 *   role          TEXT NOT NULL CHECK (role IN ('driver', 'provider', 'business')),
 *   vehicle_type  TEXT,
 *   company_name  TEXT,
 *   fleet_size    TEXT,
 *   service_type  TEXT,
 *   business_type TEXT,
 *   message       TEXT,
 *   created_at    TIMESTAMPTZ DEFAULT now()
 * );
 *
 * ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
 *
 * -- Service role key bypasses RLS automatically.
 * -- If you want anon inserts (for public waitlist), also run:
 * CREATE POLICY "allow_anon_insert" ON waitlist
 *   FOR INSERT TO anon WITH CHECK (true);
 * -------------------------------------------------------
 */
export async function submitWaitlist(
  formData: WaitlistFormData | FormData
): Promise<ActionResponse> {
  try {
    const getValue = (key: keyof WaitlistFormData): string | undefined => {
      if (formData instanceof FormData) {
        const v = formData.get(String(key));
        return typeof v === 'string' ? v : undefined;
      }
      const v = formData[key];
      return typeof v === 'string' ? v : undefined;
    };

    const name = (getValue('name') ?? '').trim();
    const email = (getValue('email') ?? '').trim().toLowerCase();
    const role = (getValue('role') ?? '').trim();
    const phone = (getValue('phone') ?? '').trim();
    const city = (getValue('city') ?? '').trim();
    const vehicle_type = (getValue('vehicle_type') ?? '').trim();
    const company_name = (getValue('company_name') ?? '').trim();
    const fleet_size = (getValue('fleet_size') ?? '').trim();

    if (!name || !email || !role) {
      return {
        success: false,
        error: 'Name, email, and role are required.',
      };
    }

    const supabase = await createSupabaseServerClient();

    // Build payload — strip undefined fields
    const payload: Record<string, string> = {
      name,
      email,
      phone,
      city,
      role,
    };

    if (vehicle_type) payload.vehicle_type = vehicle_type;
    if (company_name) payload.company = company_name;
    if (fleet_size) payload.fleet_size = fleet_size;

    const { error } = await supabase.from('waitlist').insert(payload);

    if (error) {
      // Handle duplicate email gracefully
      if (error.code === '23505') {
        return {
          success: false,
          error: `This email is already on the waitlist. We'll be in touch!`,
        };
      }
      console.error('[submitWaitlist] Supabase error:', error.message);
      return {
        success: false,
        error: 'Something went wrong. Please try again.',
      };
    }

    return {
      success: true,
      message: `You're on the list! We'll reach out before we launch.`,
    };
  } catch (err: any) {
    console.error('[submitWaitlist] Unexpected error:', err);
    return {
      success: false,
      error: `An unexpected error occurred: ${err?.message || String(err)}. Please try again later.`,
    };
  }
}
