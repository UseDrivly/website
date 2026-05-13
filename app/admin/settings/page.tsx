'use client';

import { useState, useEffect } from 'react';
import { getSettings, updateSettings } from '@/actions/settings';

export default function AdminSettings() {
  const [socialLinks, setSocialLinks] = useState({
    twitter: '',
    facebook: '',
    instagram: '',
    linkedin: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await getSettings('social_media');
      if (data) {
        setSocialLinks({
          twitter: data.twitter || '',
          facebook: data.facebook || '',
          instagram: data.instagram || '',
          linkedin: data.linkedin || '',
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialLinks(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      const result = await updateSettings('social_media', socialLinks);
      if (result.success) {
        setMessage('Settings saved successfully!');
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage('An unexpected error occurred.');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-[#D8E8D0] shadow-sm p-8">
        <div className="text-center text-[#4A5E46]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl border border-[#D8E8D0] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#D8E8D0]">
          <h2 className="text-xl font-bold text-[#0D3D21]">Site Settings</h2>
        </div>
        
        <div className="p-6">
          {message && (
            <div className={`p-4 mb-6 rounded-lg text-sm font-semibold ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-[#F7FAF2] text-[#5F9908]'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#0D3D21] mb-4">Social Media Links</h3>
              <p className="text-sm text-[#4A5E46] mb-4">Update the URLs for your social media handles. These will be displayed in the website footer.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#4A5E46] mb-1">Twitter / X URL</label>
                  <input
                    type="url"
                    name="twitter"
                    value={socialLinks.twitter}
                    onChange={handleChange}
                    placeholder="https://twitter.com/..."
                    className="w-full px-4 py-2 border border-[#D8E8D0] rounded-lg focus:ring-2 focus:ring-[#7AB800] focus:border-transparent outline-none transition-shadow"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#4A5E46] mb-1">Facebook URL</label>
                  <input
                    type="url"
                    name="facebook"
                    value={socialLinks.facebook}
                    onChange={handleChange}
                    placeholder="https://facebook.com/..."
                    className="w-full px-4 py-2 border border-[#D8E8D0] rounded-lg focus:ring-2 focus:ring-[#7AB800] focus:border-transparent outline-none transition-shadow"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#4A5E46] mb-1">Instagram URL</label>
                  <input
                    type="url"
                    name="instagram"
                    value={socialLinks.instagram}
                    onChange={handleChange}
                    placeholder="https://instagram.com/..."
                    className="w-full px-4 py-2 border border-[#D8E8D0] rounded-lg focus:ring-2 focus:ring-[#7AB800] focus:border-transparent outline-none transition-shadow"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#4A5E46] mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={socialLinks.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/company/..."
                    className="w-full px-4 py-2 border border-[#D8E8D0] rounded-lg focus:ring-2 focus:ring-[#7AB800] focus:border-transparent outline-none transition-shadow"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D8E8D0]">
              <button
                type="submit"
                disabled={saving}
                className="bg-[#7AB800] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#5F9908] transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
