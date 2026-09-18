import { createClient } from '@supabase/supabase-js';
import { sendEmail } from './mailer';
import {
  DEFAULT_EMAIL_SETTINGS,
  WaitlistEmailSettings,
  RoleEmailTemplate,
  renderEmailHtml,
  interpolateVariables,
} from './templates';

export interface WaitlistEntryData {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  role: 'driver' | 'provider' | 'business' | string;
  city?: string | null;
  state?: string | null;
  vehicle_type?: string | null;
  service_type?: string | null;
  company?: string | null;
  business_type?: string | null;
  fleet_size?: string | null;
  message?: string | null;
  address?: string | null;
}

/**
 * Fetch current waitlist email settings from Supabase site_settings,
 * falling back to defaults if not yet configured.
 */
export async function getWaitlistEmailSettings(): Promise<WaitlistEmailSettings> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('id', 'waitlist_email_templates')
      .single();

    if (error || !data?.value) {
      return DEFAULT_EMAIL_SETTINGS;
    }

    const saved = data.value as Partial<WaitlistEmailSettings>;
    return {
      driver: { ...DEFAULT_EMAIL_SETTINGS.driver, ...(saved.driver || {}) },
      provider: { ...DEFAULT_EMAIL_SETTINGS.provider, ...(saved.provider || {}) },
      business: { ...DEFAULT_EMAIL_SETTINGS.business, ...(saved.business || {}) },
    };
  } catch (err) {
    console.error('[getWaitlistEmailSettings] Error fetching settings, using defaults:', err);
    return DEFAULT_EMAIL_SETTINGS;
  }
}

/**
 * Sends the automated welcome email to a new waitlist subscriber based on their role.
 * Non-blocking: will log errors without rethrowing to avoid breaking user signup.
 */
export async function sendWaitlistWelcomeEmail(entry: WaitlistEntryData) {
  try {
    if (!entry.email) {
      console.warn('[sendWaitlistWelcomeEmail] Missing recipient email, skipping.');
      return { success: false, reason: 'No email provided' };
    }

    const role = (entry.role || 'driver').toLowerCase() as 'driver' | 'provider' | 'business';
    const settings = await getWaitlistEmailSettings();
    const template: RoleEmailTemplate = settings[role] || settings.driver;

    if (!template || template.enabled === false) {
      console.log(`[sendWaitlistWelcomeEmail] Automated emails disabled for role: ${role}`);
      return { success: false, reason: 'Emails disabled for this role' };
    }

    const subject = interpolateVariables(template.subject, entry);
    const html = renderEmailHtml(template, entry);

    const result = await sendEmail({
      to: entry.email,
      subject,
      html,
    });

    if (result.success) {
      console.log(`[sendWaitlistWelcomeEmail] Successfully sent welcome email to ${entry.email} (Role: ${role})`);
    } else {
      console.error(`[sendWaitlistWelcomeEmail] Failed to send to ${entry.email}:`, result.error);
    }

    return result;
  } catch (err: any) {
    console.error('[sendWaitlistWelcomeEmail] Unexpected error:', err);
    return { success: false, error: err.message || 'Unexpected email error' };
  }
}
