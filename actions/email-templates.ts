'use server';

import { createClient } from '@supabase/supabase-js';
import {
  DEFAULT_EMAIL_SETTINGS,
  WaitlistEmailSettings,
  RoleEmailTemplate,
  renderEmailHtml,
  interpolateVariables,
} from '@/lib/email/templates';
import { sendEmail, verifySmtpConnection } from '@/lib/email/mailer';

/**
 * Fetch current email template settings from site_settings.
 */
export async function getEmailSettingsAction(): Promise<{ success: boolean; data?: WaitlistEmailSettings; error?: string }> {
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
      return { success: true, data: DEFAULT_EMAIL_SETTINGS };
    }

    const saved = data.value as Partial<WaitlistEmailSettings>;
    const merged: WaitlistEmailSettings = {
      driver: { ...DEFAULT_EMAIL_SETTINGS.driver, ...(saved.driver || {}) },
      provider: { ...DEFAULT_EMAIL_SETTINGS.provider, ...(saved.provider || {}) },
      business: { ...DEFAULT_EMAIL_SETTINGS.business, ...(saved.business || {}) },
    };

    return { success: true, data: merged };
  } catch (err: any) {
    console.error('[getEmailSettingsAction] Error:', err);
    return { success: false, error: err.message || 'Failed to load email settings' };
  }
}

/**
 * Save updated email template settings to site_settings.
 */
export async function saveEmailSettingsAction(
  settings: WaitlistEmailSettings
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseUrl || !serviceKey) {
      return { success: false, error: 'Missing Supabase server credentials.' };
    }

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { error } = await supabase
      .from('site_settings')
      .upsert(
        {
          id: 'waitlist_email_templates',
          value: settings,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

    if (error) {
      console.error('[saveEmailSettingsAction] Supabase error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('[saveEmailSettingsAction] Unexpected error:', err);
    return { success: false, error: err.message || 'Failed to save email settings' };
  }
}

/**
 * Send a test email to a given address to preview formatting in a real inbox.
 */
export async function sendTestEmailAction({
  role,
  recipientEmail,
  templateOverride,
}: {
  role: 'driver' | 'provider' | 'business';
  recipientEmail: string;
  templateOverride?: RoleEmailTemplate;
}): Promise<{ success: boolean; error?: string }> {
  try {
    if (!recipientEmail || !recipientEmail.includes('@')) {
      return { success: false, error: 'Please provide a valid recipient email address.' };
    }

    let template: RoleEmailTemplate;
    if (templateOverride) {
      template = templateOverride;
    } else {
      const res = await getEmailSettingsAction();
      const settings = res.data || DEFAULT_EMAIL_SETTINGS;
      template = settings[role] || settings.driver;
    }

    // Mock sample data for preview
    const sampleData = {
      name: 'Divine Igbinoba',
      email: recipientEmail,
      phone: '+234 801 234 5678',
      role,
      city: 'Lagos (Ikeja)',
      vehicle_type: 'Sedan (Toyota Camry)',
      service_type: 'Towing & Recovery',
      company: 'Logistics Pro Nigeria Ltd',
      fleet_size: '15-25',
      year: new Date().getFullYear(),
    };

    const subject = `[TEST] ${interpolateVariables(template.subject, sampleData)}`;
    const html = renderEmailHtml(template, sampleData);

    const result = await sendEmail({
      to: recipientEmail,
      subject,
      html,
    });

    return result;
  } catch (err: any) {
    console.error('[sendTestEmailAction] Unexpected error:', err);
    return { success: false, error: err.message || 'Failed to send test email.' };
  }
}

/**
 * Quick check to see if the SMTP connection is working.
 */
export async function testSmtpConnectionAction(): Promise<{ success: boolean; error?: string }> {
  return await verifySmtpConnection();
}
