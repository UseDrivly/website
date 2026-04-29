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
  
  -- Business specific
  company TEXT,
  state TEXT,
  business_type TEXT,
  fleet_size TEXT,
  message TEXT,

  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enforce: provider rows must include service_type
ALTER TABLE public.waitlist
  ADD CONSTRAINT waitlist_provider_service_type_required
  CHECK (
    role <> 'provider'
    OR (service_type IS NOT NULL AND btrim(service_type) <> '')
  );

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
CREATE POLICY "Allow public insert to waitlist"
ON public.waitlist
FOR INSERT 
TO public
WITH CHECK (true);

-- Allow ANYONE (anon) to insert into careers
CREATE POLICY "Allow public insert to careers"
ON public.career_applications
FOR INSERT 
TO public
WITH CHECK (true);

-- Allow ANYONE (anon) to read published job listings
CREATE POLICY "Allow public read published jobs"
ON public.career_jobs
FOR SELECT 
TO public
USING (is_published = true);

-- Allow ANYONE (anon) to read published blog posts
CREATE POLICY "Allow public read published posts"
ON public.posts
FOR SELECT 
TO public
USING (is_published = true);

-- Note: Operations utilizing the SUPABASE_SERVICE_ROLE_KEY automatically 
-- bypass RLS, so the Admin Panel doesn't need explicit SQL policies 
-- to read/update/delete records.
