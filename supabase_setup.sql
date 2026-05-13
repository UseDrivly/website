-- ==============================================================================
-- DRIVLY SUPABASE SCHEMA SETUP
-- Copy and paste this entire file into the Supabase SQL Editor and click "Run"
-- ==============================================================================

-- 1. Create Waitlist Table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL, -- 'driver', 'provider', 'business'
  
  -- Driver specific
  city TEXT,
  vehicle_type TEXT,

  -- Provider specific
  service_type TEXT,
  address TEXT,

  -- Business specific
  company TEXT,
  state TEXT,
  business_type TEXT,
  fleet_size TEXT,
  message TEXT,

  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Ensure new columns exist when table already created
ALTER TABLE public.waitlist
  ADD COLUMN IF NOT EXISTS address TEXT;

-- Enforce: provider rows must include service_type
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'waitlist_provider_service_type_required'
  ) THEN
    ALTER TABLE public.waitlist
      ADD CONSTRAINT waitlist_provider_service_type_required
      CHECK (
        role <> 'provider'
        OR (service_type IS NOT NULL AND btrim(service_type) <> '')
      );
  END IF;
END $$;

-- Note: Address constraint removed to allow existing provider rows without address
-- The form now requires address for new submissions

-- 2. Create Career Applications Table
CREATE TABLE IF NOT EXISTS public.career_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL,
  why TEXT,
  portfolio TEXT,
  submitted_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. Create Career Jobs Table (for admin-managed job listings)
CREATE TABLE IF NOT EXISTS public.career_jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 4. Create Posts (Blog) Table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  author_name TEXT DEFAULT 'Drivly Team',
  author_title TEXT,
  cover_image_url TEXT,
  read_time TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Allow ANYONE (anon) to insert into waitlist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policy 
    WHERE polname = 'Allow public insert to waitlist'
  ) THEN
    CREATE POLICY "Allow public insert to waitlist"
    ON public.waitlist
    FOR INSERT 
    TO public
    WITH CHECK (true);
  END IF;
END $$;

-- Allow ANYONE (anon) to insert into careers
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policy 
    WHERE polname = 'Allow public insert to careers'
  ) THEN
    CREATE POLICY "Allow public insert to careers"
    ON public.career_applications
    FOR INSERT 
    TO public
    WITH CHECK (true);
  END IF;
END $$;

-- Allow ANYONE (anon) to read published job listings
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policy 
    WHERE polname = 'Allow public read published jobs'
  ) THEN
    CREATE POLICY "Allow public read published jobs"
    ON public.career_jobs
    FOR SELECT 
    TO public
    USING (is_published = true);
  END IF;
END $$;

-- Allow ANYONE (anon) to read published blog posts
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policy 
    WHERE polname = 'Allow public read published posts'
  ) THEN
    CREATE POLICY "Allow public read published posts"
    ON public.posts
    FOR SELECT 
    TO public
    USING (is_published = true);
  END IF;
END $$;

-- Note: Operations utilizing the SUPABASE_SERVICE_ROLE_KEY automatically 
-- bypass RLS, so the Admin Panel doesn't need explicit SQL policies 
-- to read/update/delete records.

-- ==========================================
-- CMS (Content Management System) TABLES
-- ==========================================

-- 5. CMS Pages - Page metadata and settings
CREATE TABLE IF NOT EXISTS public.cms_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 6. CMS Sections - Sections within pages
CREATE TABLE IF NOT EXISTS public.cms_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL REFERENCES public.cms_pages(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL, -- e.g., 'hero', 'stats_bar', 'problem'
  title TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(page_id, section_key)
);

-- 7. CMS Content Blocks - Individual content items
CREATE TABLE IF NOT EXISTS public.cms_content_blocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id UUID NOT NULL REFERENCES public.cms_sections(id) ON DELETE CASCADE,
  block_key TEXT NOT NULL, -- e.g., 'headline', 'subheadline', 'body'
  block_type TEXT NOT NULL, -- 'text', 'image', 'stat', 'service', 'industry', 'step', 'json'
  content TEXT, -- For text content
  content_json JSONB, -- For complex content (stats, services, industries)
  image_url TEXT,
  image_alt TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(section_id, block_key)
);

-- 8. CMS Images - Image asset management
CREATE TABLE IF NOT EXISTS public.cms_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  alt TEXT,
  width INTEGER,
  height INTEGER,
  mime_type TEXT,
  file_size INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS on CMS tables
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_images ENABLE ROW LEVEL SECURITY;

-- Allow public to read published CMS content
CREATE POLICY "Allow public read published cms pages"
ON public.cms_pages
FOR SELECT
TO public
USING (is_published = true);

CREATE POLICY "Allow public read cms sections"
ON public.cms_sections
FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public read cms content blocks"
ON public.cms_content_blocks
FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public read cms images"
ON public.cms_images
FOR SELECT
TO public
USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS cms_pages_slug_idx ON public.cms_pages(slug);
CREATE INDEX IF NOT EXISTS cms_sections_page_id_idx ON public.cms_sections(page_id);
CREATE INDEX IF NOT EXISTS cms_sections_page_key_idx ON public.cms_sections(page_id, section_key);
CREATE INDEX IF NOT EXISTS cms_content_blocks_section_id_idx ON public.cms_content_blocks(section_id);
CREATE INDEX IF NOT EXISTS cms_content_blocks_section_key_idx ON public.cms_content_blocks(section_id, block_key);
