-- Create site_settings table for storing site-wide configuration
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access to everyone
CREATE POLICY "Allow read access to site_settings"
  ON public.site_settings
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow authenticated users to update settings
CREATE POLICY "Allow authenticated users to update site_settings"
  ON public.site_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index on updated_at for sorting
CREATE INDEX IF NOT EXISTS site_settings_updated_at_idx ON public.site_settings(updated_at);

-- Insert default social media settings
INSERT INTO public.site_settings (id, value)
VALUES ('social_media', '{"twitter": "", "facebook": "", "instagram": "", "linkedin": ""}'::jsonb)
ON CONFLICT (id) DO NOTHING;
