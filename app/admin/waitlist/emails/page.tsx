'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DEFAULT_EMAIL_SETTINGS,
  WaitlistEmailSettings,
  RoleEmailTemplate,
  renderEmailHtml,
} from '@/lib/email/templates';
import {
  getEmailSettingsAction,
  saveEmailSettingsAction,
  sendTestEmailAction,
} from '@/actions/email-templates';

type RoleKey = 'driver' | 'provider' | 'business';

const ROLE_INFO: Record<RoleKey, { label: string; icon: string; mockData: Record<string, any> }> = {
  driver: {
    label: 'Drivers',
    icon: '🚗',
    mockData: {
      name: 'Divine Igbinoba',
      email: 'divine@example.com',
      phone: '+234 801 234 5678',
      role: 'driver',
      city: 'Lagos (Ikeja)',
      vehicle_type: 'Sedan (Toyota Camry)',
      year: new Date().getFullYear(),
    },
  },
  provider: {
    label: 'Providers',
    icon: '🔧',
    mockData: {
      name: 'Sunday Okafor',
      email: 'sunday@example.com',
      phone: '+234 802 987 6543',
      role: 'provider',
      city: 'Lagos (Lekki)',
      service_type: 'Towing & Recovery',
      address: '14 Admiralty Way, Lekki Phase 1',
      year: new Date().getFullYear(),
    },
  },
  business: {
    label: 'Businesses',
    icon: '🏢',
    mockData: {
      name: 'Tunde Adeleke',
      email: 'tunde@logisticsplus.ng',
      phone: '+234 803 555 1212',
      role: 'business',
      company: 'Logistics Plus Nigeria',
      business_type: 'Haulage & Distribution',
      fleet_size: '25-50',
      state: 'Lagos',
      year: new Date().getFullYear(),
    },
  },
};

const VARIABLE_PILLS: Record<RoleKey, string[]> = {
  driver: ['{{name}}', '{{city}}', '{{vehicle_type}}', '{{email}}', '{{phone}}', '{{year}}'],
  provider: ['{{name}}', '{{service_type}}', '{{city}}', '{{email}}', '{{phone}}', '{{year}}'],
  business: ['{{name}}', '{{company}}', '{{fleet_size}}', '{{business_type}}', '{{email}}', '{{year}}'],
};

export default function WaitlistEmailTemplatesPage() {
  const [activeRole, setActiveRole] = useState<RoleKey>('driver');
  const [settings, setSettings] = useState<WaitlistEmailSettings>(DEFAULT_EMAIL_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await getEmailSettingsAction();
      if (res.success && res.data) {
        setSettings(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch email settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateChange = <K extends keyof RoleEmailTemplate>(
    field: K,
    value: RoleEmailTemplate[K]
  ) => {
    setSettings((prev) => ({
      ...prev,
      [activeRole]: {
        ...prev[activeRole],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await saveEmailSettingsAction(settings);
      if (res.success) {
        setMessage({ type: 'success', text: 'Email templates saved successfully!' });
      } else {
        setMessage({ type: 'error', text: res.error || 'Failed to save email templates.' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'An unexpected error occurred.' });
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = () => {
    if (confirm(`Reset ${ROLE_INFO[activeRole].label} email template back to default?`)) {
      setSettings((prev) => ({
        ...prev,
        [activeRole]: { ...DEFAULT_EMAIL_SETTINGS[activeRole] },
      }));
      setMessage({ type: 'success', text: `Reset ${ROLE_INFO[activeRole].label} template to defaults.` });
    }
  };

  const handleSendTestEmail = async () => {
    if (!testEmail || !testEmail.includes('@')) {
      alert('Please enter a valid email address for testing.');
      return;
    }

    setTesting(true);
    setMessage(null);
    try {
      const res = await sendTestEmailAction({
        role: activeRole,
        recipientEmail: testEmail,
        templateOverride: settings[activeRole],
      });

      if (res.success) {
        setMessage({
          type: 'success',
          text: `Test email successfully sent to ${testEmail}! Check your inbox.`,
        });
      } else {
        setMessage({
          type: 'error',
          text: res.error || 'Failed to send test email. Please check SMTP configuration.',
        });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error sending test email.' });
    } finally {
      setTesting(false);
    }
  };

  const insertVariable = (variable: string) => {
    const currentBody = settings[activeRole].body || '';
    handleTemplateChange('body', currentBody + ` ${variable} `);
  };

  const currentTemplate = settings[activeRole];
  const renderedHtml = renderEmailHtml(currentTemplate, ROLE_INFO[activeRole].mockData);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-[#D8E8D0] shadow-sm p-8">
        <div className="text-center text-[#4A5E46]">Loading email template configuration...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Sub-Nav */}
      <div className="bg-white rounded-2xl border border-[#D8E8D0] shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/waitlist"
                className="text-sm font-semibold text-[#5F9908] hover:underline"
              >
                &larr; Back to Waitlist Entries
              </Link>
            </div>
            <h2 className="text-2xl font-bold text-[#0D3D21] mt-1">
              Automated Waitlist Emails
            </h2>
            <p className="text-sm text-[#4A5E46] mt-1">
              Configure automated welcome emails sent immediately when users join the waitlist.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetDefaults}
              className="px-4 py-2 text-sm font-semibold text-[#4A5E46] bg-[#F7FAF2] hover:bg-[#D8E8D0] rounded-lg transition"
            >
              Reset to Default
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 text-sm font-bold text-[#0D3D21] bg-[#7AB800] hover:opacity-90 rounded-lg transition shadow-sm disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>

        {/* Status Message Banner */}
        {message && (
          <div
            className={`mt-4 p-4 rounded-xl text-sm font-semibold ${
              message.type === 'success'
                ? 'bg-[#F7FAF2] text-[#0D3D21] border border-[#C8E99A]'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Role Tabs */}
        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-[#D8E8D0]">
          {(['driver', 'provider', 'business'] as RoleKey[]).map((role) => {
            const isActive = activeRole === role;
            const info = ROLE_INFO[role];
            const isEnabled = settings[role].enabled;

            return (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  isActive
                    ? 'bg-[#0D3D21] text-white shadow-sm'
                    : 'bg-[#F7FAF2] text-[#4A5E46] hover:bg-[#D8E8D0]'
                }`}
              >
                <span>{info.icon}</span>
                <span>{info.label}</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    isEnabled ? 'bg-[#7AB800]' : 'bg-gray-400'
                  }`}
                  title={isEnabled ? 'Enabled' : 'Disabled'}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Editor on Left, Live Preview on Right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Editor Form (7 cols) */}
        <div className="xl:col-span-6 bg-white rounded-2xl border border-[#D8E8D0] shadow-sm p-6 space-y-6">
          
          {/* Active Role Header & Toggle */}
          <div className="flex items-center justify-between pb-4 border-b border-[#D8E8D0]">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{ROLE_INFO[activeRole].icon}</span>
              <div>
                <h3 className="font-bold text-[#0D3D21] text-lg">
                  {ROLE_INFO[activeRole].label} Email Template
                </h3>
                <p className="text-xs text-[#6E826C]">
                  Dispatched to {activeRole} registrations
                </p>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer bg-[#F7FAF2] px-3 py-1.5 rounded-lg border border-[#D8E8D0]">
              <input
                type="checkbox"
                checked={currentTemplate.enabled}
                onChange={(e) => handleTemplateChange('enabled', e.target.checked)}
                className="w-4 h-4 accent-[#7AB800]"
              />
              <span className="text-xs font-bold text-[#0D3D21]">
                {currentTemplate.enabled ? 'Automated Email Active' : 'Disabled'}
              </span>
            </label>
          </div>

          {/* Subject Line */}
          <div>
            <label className="block text-sm font-bold text-[#0D3D21] mb-1.5">
              Subject Line
            </label>
            <input
              type="text"
              value={currentTemplate.subject}
              onChange={(e) => handleTemplateChange('subject', e.target.value)}
              className="w-full h-[45px] px-4 rounded-lg bg-[#F7FAF2] border-[1.5px] border-[#D8E8D0] outline-none text-[#2A3B2C] text-sm focus:border-[#7AB800]"
              placeholder="e.g. Welcome to Drivly, {{name}}!"
            />
          </div>

          {/* Header Title & Subheading */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#0D3D21] mb-1.5">
                Card Heading (H1)
              </label>
              <input
                type="text"
                value={currentTemplate.heading}
                onChange={(e) => handleTemplateChange('heading', e.target.value)}
                className="w-full h-[45px] px-4 rounded-lg bg-[#F7FAF2] border-[1.5px] border-[#D8E8D0] outline-none text-[#2A3B2C] text-sm focus:border-[#7AB800]"
                placeholder="Main card title"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0D3D21] mb-1.5">
                Subheading
              </label>
              <input
                type="text"
                value={currentTemplate.subheading}
                onChange={(e) => handleTemplateChange('subheading', e.target.value)}
                className="w-full h-[45px] px-4 rounded-lg bg-[#F7FAF2] border-[1.5px] border-[#D8E8D0] outline-none text-[#2A3B2C] text-sm focus:border-[#7AB800]"
                placeholder="Tagline or subtitle"
              />
            </div>
          </div>

          {/* Email Body & Variables */}
          <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
              <label className="block text-sm font-bold text-[#0D3D21]">
                Email Body (HTML supported)
              </label>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-[#6E826C]">Click to insert:</span>
                {VARIABLE_PILLS[activeRole].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => insertVariable(v)}
                    className="text-[11px] font-mono bg-[#EFF7DB] text-[#0D3D21] px-2 py-0.5 rounded border border-[#C8E99A] hover:bg-[#7AB800] hover:text-white transition"
                    title={`Insert ${v}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={currentTemplate.body}
              onChange={(e) => handleTemplateChange('body', e.target.value)}
              rows={8}
              className="w-full p-4 rounded-lg bg-[#F7FAF2] border-[1.5px] border-[#D8E8D0] outline-none text-[#2A3B2C] text-sm font-mono focus:border-[#7AB800] leading-relaxed"
              placeholder="HTML markup or text..."
            />
          </div>

          {/* Button CTA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#0D3D21] mb-1.5">
                Button Text
              </label>
              <input
                type="text"
                value={currentTemplate.buttonText}
                onChange={(e) => handleTemplateChange('buttonText', e.target.value)}
                className="w-full h-[45px] px-4 rounded-lg bg-[#F7FAF2] border-[1.5px] border-[#D8E8D0] outline-none text-[#2A3B2C] text-sm focus:border-[#7AB800]"
                placeholder="e.g. Visit Website"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0D3D21] mb-1.5">
                Button URL
              </label>
              <input
                type="text"
                value={currentTemplate.buttonUrl}
                onChange={(e) => handleTemplateChange('buttonUrl', e.target.value)}
                className="w-full h-[45px] px-4 rounded-lg bg-[#F7FAF2] border-[1.5px] border-[#D8E8D0] outline-none text-[#2A3B2C] text-sm focus:border-[#7AB800]"
                placeholder="https://drivly.ng/..."
              />
            </div>
          </div>

          {/* Color & Styling Options */}
          <div className="pt-4 border-t border-[#D8E8D0]">
            <h4 className="font-bold text-sm text-[#0D3D21] mb-3">
              Styling & Brand Colors
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A5E46] mb-1.5">
                  Primary Button Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={currentTemplate.primaryColor}
                    onChange={(e) => handleTemplateChange('primaryColor', e.target.value)}
                    className="w-10 h-10 p-0 border border-[#D8E8D0] rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={currentTemplate.primaryColor}
                    onChange={(e) => handleTemplateChange('primaryColor', e.target.value)}
                    className="flex-1 h-[40px] px-3 rounded-lg bg-[#F7FAF2] border border-[#D8E8D0] text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A5E46] mb-1.5">
                  Header Background
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={currentTemplate.headerBgColor}
                    onChange={(e) => handleTemplateChange('headerBgColor', e.target.value)}
                    className="w-10 h-10 p-0 border border-[#D8E8D0] rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={currentTemplate.headerBgColor}
                    onChange={(e) => handleTemplateChange('headerBgColor', e.target.value)}
                    className="flex-1 h-[40px] px-3 rounded-lg bg-[#F7FAF2] border border-[#D8E8D0] text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div>
            <label className="block text-sm font-bold text-[#0D3D21] mb-1.5">
              Footer Text
            </label>
            <input
              type="text"
              value={currentTemplate.footerText}
              onChange={(e) => handleTemplateChange('footerText', e.target.value)}
              className="w-full h-[45px] px-4 rounded-lg bg-[#F7FAF2] border-[1.5px] border-[#D8E8D0] outline-none text-[#2A3B2C] text-sm focus:border-[#7AB800]"
              placeholder="e.g. Drivly Technologies Inc. • info@usedrivly.com"
            />
          </div>

          {/* Send Test Email Section */}
          <div className="pt-4 border-t border-[#D8E8D0] bg-[#F7FAF2] p-4 rounded-xl">
            <h4 className="font-bold text-sm text-[#0D3D21] mb-1">
              Send a Test Email
            </h4>
            <p className="text-xs text-[#6E826C] mb-3">
              Send this exact template to your email to verify how it displays in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="your-email@domain.com"
                className="flex-1 h-[42px] px-3.5 rounded-lg bg-white border border-[#D8E8D0] outline-none text-sm focus:border-[#7AB800]"
              />
              <button
                type="button"
                onClick={handleSendTestEmail}
                disabled={testing}
                className="px-5 py-2 bg-[#0D3D21] text-white hover:bg-[#16502E] rounded-lg text-xs font-bold transition disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {testing ? 'Sending...' : '✉️ Send Test'}
              </button>
            </div>
          </div>

        </div>

        {/* Live Preview Panel (6 cols) */}
        <div className="xl:col-span-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between bg-white px-5 py-3 rounded-xl border border-[#D8E8D0]">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#0D3D21]">Live Email Preview</span>
              <span className="text-xs px-2 py-0.5 bg-[#EFF7DB] text-[#5F9908] rounded-full font-semibold">
                Sample Data
              </span>
            </div>

            <div className="flex items-center gap-1 bg-[#F7FAF2] p-1 rounded-lg border border-[#D8E8D0]">
              <button
                type="button"
                onClick={() => setPreviewMode('desktop')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  previewMode === 'desktop'
                    ? 'bg-[#0D3D21] text-white'
                    : 'text-[#4A5E46] hover:text-[#0D3D21]'
                }`}
              >
                🖥️ Desktop
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode('mobile')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  previewMode === 'mobile'
                    ? 'bg-[#0D3D21] text-white'
                    : 'text-[#4A5E46] hover:text-[#0D3D21]'
                }`}
              >
                📱 Mobile
              </button>
            </div>
          </div>

          {/* Email Subject simulation */}
          <div className="bg-white px-5 py-2.5 rounded-xl border border-[#D8E8D0] text-xs text-[#2A3B2C] flex items-center gap-2">
            <span className="font-bold text-[#6E826C]">Subject:</span>
            <span className="font-medium truncate">{currentTemplate.subject}</span>
          </div>

          {/* Iframe Preview Container */}
          <div
            className={`bg-[#E8EDE4] p-4 rounded-2xl border border-[#D8E8D0] flex justify-center transition-all ${
              previewMode === 'mobile' ? 'max-w-[420px] mx-auto w-full' : 'w-full'
            }`}
          >
            <iframe
              srcDoc={renderedHtml}
              title="Email Preview"
              className="w-full h-[650px] rounded-xl bg-white shadow-sm border-0"
              sandbox="allow-same-origin"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
