-- ==============================================================================
-- CMS CONTENT SEED DATA
-- Run this after creating the CMS tables to seed initial content
-- ==============================================================================

-- Insert Home Page
INSERT INTO public.cms_pages (slug, title, description, is_published) VALUES
('home', 'Home', 'Drivly homepage - Roadside Help. Fixed Price. One Tap Away.', true)
ON CONFLICT (slug) DO NOTHING;

-- Get the home page ID (for use in subsequent inserts)
-- Note: In production, you'd use a transaction or CTE, but for seeding we'll assume the ID

-- Home Page Sections
INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT 
  id,
  'hero',
  'Hero Section',
  0
FROM public.cms_pages WHERE slug = 'home'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT 
  id,
  'stats_bar',
  'Stats Bar',
  1
FROM public.cms_pages WHERE slug = 'home'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT 
  id,
  'problem',
  'The Problem',
  2
FROM public.cms_pages WHERE slug = 'home'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT 
  id,
  'who_its_for',
  'Who It''s For',
  3
FROM public.cms_pages WHERE slug = 'home'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT 
  id,
  'for_drivers',
  'For Drivers',
  4
FROM public.cms_pages WHERE slug = 'home'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT 
  id,
  'for_providers',
  'For Service Providers',
  5
FROM public.cms_pages WHERE slug = 'home'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT 
  id,
  'what_we_cover',
  'What We Cover',
  6
FROM public.cms_pages WHERE slug = 'home'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT 
  id,
  'blog_preview',
  'Blogs & Articles',
  7
FROM public.cms_pages WHERE slug = 'home'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT 
  id,
  'waitlist',
  'Join the Waitlist',
  8
FROM public.cms_pages WHERE slug = 'home'
ON CONFLICT (page_id, section_key) DO NOTHING;

-- Hero Section Content Blocks
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT 
  s.id,
  'headline',
  'text',
  'Roadside help. Fixed price. One tap away.',
  0
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'hero'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT 
  s.id,
  'subheadline',
  'text',
  'Nigeria''s first app-based roadside assistance platform. Verified mechanics, tow operators, and specialists dispatched to you at a fixed price, in minutes. Launching in Lagos 2025.',
  1
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'hero'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, image_url, image_alt, order_index)
SELECT 
  s.id,
  'background_image',
  'image',
  '/images/hero-home.jpg',
  'Drivly home hero',
  2
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'hero'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT 
  s.id,
  'cta_driver',
  'json',
  '{"label": "I''m a Driver – Join the Waitlist", "href": "/#waitlist"}',
  3
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'hero'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT 
  s.id,
  'cta_provider',
  'json',
  '{"label": "I''m a Provider – Apply Now", "href": "/#waitlist"}',
  4
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'hero'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- Stats Bar Content
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT 
  s.id,
  'stats',
  'json',
  '[
    {"value": "2M+", "label": "Registered vehicles in Lagos State"},
    {"value": "8min", "label": "Target average provider arrival"},
    {"value": "₦0", "label": "Negotiation on any job ever"},
    {"value": "85%", "label": "Of every job fee goes to the provider"}
  ]',
  0
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'stats_bar'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- The Problem Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT 
  s.id,
  'headline',
  'text',
  'Every driver fears this moment',
  0
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'problem'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT 
  s.id,
  'body',
  'text',
  'Breaking down leaves drivers completely on their own no emergency number, no organised service, no way to verify who shows up or what they''ll charge. The experience is universal, unpredictable, and has never been properly solved.',
  1
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'problem'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, image_url, image_alt, order_index)
SELECT 
  s.id,
  'image',
  'image',
  '/images/driver-distressed.jpg',
  'Driver distressed',
  2
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'problem'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT 
  s.id,
  'cta',
  'json',
  '{"label": "See how Drivly fixes it", "href": "/#how-it-works"}',
  3
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'problem'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- Who It's For Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT 
  s.id,
  'headline',
  'text',
  'Built for drivers. Built for providers.',
  0
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'who_its_for'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT 
  s.id,
  'body',
  'text',
  'Two audiences. One platform. Everyone benefits when jobs are done right.',
  1
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'who_its_for'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT 
  s.id,
  'driver_card',
  'json',
  '{
    "icon": "🚗",
    "title": "For drivers",
    "description": "Whether you drive a saloon, an SUV, or a commercial vehicle, Drivly has you covered when things go wrong on the road.",
    "benefits": [
      "Fixed price shown before you pay, no surprises",
      "Every provider is verified and carries a Drivly ID card",
      "Real-time tracking from dispatch to arrival",
      "Subscribers get workshop access and priority dispatch"
    ],
    "cta": {"label": "Join the Driver Waitlist", "href": "/drivers"}
  }',
  2
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'who_its_for'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT 
  s.id,
  'provider_card',
  'json',
  '{
    "icon": "🔧",
    "title": "For providers",
    "description": "Drivly sends paying jobs directly to your phone filling the hours when you''d otherwise be waiting for walk-ins.",
    "benefits": [
      "Keep 85% of every job. Drivly takes only 15%",
      "Payment straight to your bank account after every job",
      "No joining fee, zero cost to get started",
      "Set your own availability, work when it suits you",
      "Build your reputation with verified ratings from every job"
    ],
    "cta": {"label": "Apply to be a Provider", "href": "/providers"}
  }',
  3
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'who_its_for'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- For Drivers Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT 
  s.id,
  'headline',
  'text',
  'From stuck to sorted in four steps',
  0
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'for_drivers'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT 
  s.id,
  'body',
  'text',
  'Whether you drive a saloon, an SUV, or a commercial vehicle. Drivly has you covered the moment something goes wrong on the road.',
  1
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'for_drivers'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT 
  s.id,
  'steps',
  'json',
  '[
    {"n": "01", "label": "Fixed price shown before you pay, no roadside surprises"},
    {"n": "02", "label": "You know who is coming. Every provider is verified"},
    {"n": "03", "label": "Real-time map tracking from dispatch to arrival"},
    {"n": "04", "label": "Back on the road. Like it never happened"}
  ]',
  2
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'for_drivers'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, image_url, image_alt, order_index)
SELECT 
  s.id,
  'phone_image',
  'image',
  '/images/driver-screen.png',
  'Driver app screen',
  3
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'for_drivers'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT 
  s.id,
  'cta',
  'json',
  '{"label": "Join the Driver Waitlist", "href": "/drivers"}',
  4
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'for_drivers'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- For Service Providers Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT 
  s.id,
  'headline',
  'text',
  'Earn more from your skills',
  0
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'for_providers'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT 
  s.id,
  'body',
  'text',
  'Drivly sends paying jobs directly to your phone filling the hours when you''d otherwise be waiting for walk-ins at your workshop or motor park.',
  1
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'for_providers'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT 
  s.id,
  'steps',
  'json',
  '[
    {"n": "01", "label": "Keep 85% of every job Drivly takes only 15%"},
    {"n": "02", "label": "Payment goes straight to your bank account after every job"},
    {"n": "03", "label": "No joining fee, zero cost to get started on the platform"},
    {"n": "04", "label": "Set your own availability work the hours that suit you"}
  ]',
  2
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'for_providers'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, image_url, image_alt, order_index)
SELECT 
  s.id,
  'phone_image',
  'image',
  '/images/provider-screen.png',
  'Provider app screen',
  3
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'for_providers'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT 
  s.id,
  'cta',
  'json',
  '{"label": "Apply to be a Provider", "href": "/providers"}',
  4
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'for_providers'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- What We Cover Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT 
  s.id,
  'headline',
  'text',
  'Six ways Drivly has you covered.',
  0
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'what_we_cover'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT 
  s.id,
  'services',
  'json',
  '[
    {"icon": "😖", "title": "Flat Tyre Repair", "description": "A tyre specialist comes to you with everything needed to get you moving again."},
    {"icon": "🔋", "title": "Battery Jump Start", "description": "Dead battery? A specialist arrives with a jump pack or replacement in minutes."},
    {"icon": "🚙", "title": "Tow Truck", "description": "Vehicle recovery to any destination or a Drivly partner workshop, your call."},
    {"icon": "⛽", "title": "Emergency Fuel", "description": "Ran out of petrol or diesel? We bring fuel so you can get to the nearest station."},
    {"icon": "🔑", "title": "Car Lockout", "description": "A verified locksmith gets you back in your car without causing any damage."},
    {"icon": "🔧", "title": "Mobile Mechanic", "description": "A mechanic comes to diagnose or fix the problem on-site, wherever you are."}
  ]',
  1
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'what_we_cover'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- Blog Preview Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT 
  s.id,
  'headline',
  'text',
  'Blogs & Articles',
  0
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'blog_preview'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT 
  s.id,
  'subtitle',
  'text',
  'Dive into well-researched articles, industry insights, and actionable ideas designed to expand your thinking.',
  1
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'blog_preview'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT 
  s.id,
  'cta',
  'json',
  '{"label": "View all articles", "href": "/blog"}',
  2
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'blog_preview'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- Waitlist Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT 
  s.id,
  'headline',
  'text',
  'Join the network before we launch',
  0
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'waitlist'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT 
  s.id,
  'subtitle',
  'text',
  'We''re launching in Lagos. Sign up now and we''ll reach out the moment we go live in your area.',
  1
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'home' AND s.section_key = 'waitlist'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- ==============================================================================
-- DRIVERS PAGE
-- ==============================================================================

-- Insert Drivers Page
INSERT INTO public.cms_pages (slug, title, description, is_published) VALUES
('drivers', 'For Drivers', 'Drivly for drivers - Roadside help at a fixed price', true)
ON CONFLICT (slug) DO NOTHING;

-- Drivers Page Sections
INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'hero', 'Hero', 0 FROM public.cms_pages WHERE slug = 'drivers'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'problem', 'You''ve Been Here Before', 1 FROM public.cms_pages WHERE slug = 'drivers'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'how_it_works', 'From Stuck to Sorted', 2 FROM public.cms_pages WHERE slug = 'drivers'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'what_we_cover', 'What We Cover', 3 FROM public.cms_pages WHERE slug = 'drivers'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'blog_preview', 'Blogs & Articles', 4 FROM public.cms_pages WHERE slug = 'drivers'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'waitlist', 'Join the Waitlist', 5 FROM public.cms_pages WHERE slug = 'drivers'
ON CONFLICT (page_id, section_key) DO NOTHING;

-- Drivers Hero Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'headline', 'text', 'Help is one tap away', 0
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'drivers' AND s.section_key = 'hero'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'subtitle', 'text', 'Drivly is built for you', 1
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'drivers' AND s.section_key = 'hero'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, image_url, image_alt, order_index)
SELECT s.id, 'background_image', 'image', '/images/hero-drivers.jpg', 'Drivly drivers hero', 2
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'drivers' AND s.section_key = 'hero'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'stats', 'json', '[{"value": "2M+", "label": "Registered vehicles in Lagos State"}, {"value": "8min", "label": "Target average provider arrival"}, {"value": "₦0", "label": "Negotiation on any job ever"}]', 3
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'drivers' AND s.section_key = 'hero'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- Drivers Problem Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'headline', 'text', 'You''ve been here before', 0
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'drivers' AND s.section_key = 'problem'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'body', 'text', 'Your car stops, you''re stranded, vulnerable, and exposed with no one to call and no way to know who will show up. Every stranger who approaches is a risk you didn''t sign up for. Every price named is one you have no power to question. We built Drivly to change exactly that.', 1
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'drivers' AND s.section_key = 'problem'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, image_url, image_alt, order_index)
SELECT s.id, 'image', 'image', '/images/driver-stressed.jpg', 'Stressed driver', 2
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'drivers' AND s.section_key = 'problem'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'cta', 'json', '{"label": "Join the Driver Waitlist", "href": "/#waitlist"}', 3
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'drivers' AND s.section_key = 'problem'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- Drivers How It Works Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'headline', 'text', 'From stuck to sorted in four steps', 0
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'drivers' AND s.section_key = 'how_it_works'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'body', 'text', 'Whether you drive a saloon, an SUV, or a commercial vehicle. Drivly has you covered the moment something goes wrong on the road.', 1
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'drivers' AND s.section_key = 'how_it_works'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'steps', 'json', '[{"n": "01", "label": "Fixed price shown before you pay, no roadside surprises"}, {"n": "02", "label": "You know who is coming. Every provider is verified"}, {"n": "03", "label": "Real-time map tracking from dispatch to arrival"}, {"n": "04", "label": "Back on the road. Like it never happened"}]', 2
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'drivers' AND s.section_key = 'how_it_works'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, image_url, image_alt, order_index)
SELECT s.id, 'phone_image', 'image', '/images/driver-screen.png', 'Driver app screen', 3
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'drivers' AND s.section_key = 'how_it_works'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'cta', 'json', '{"label": "Join the Driver Waitlist", "href": "/drivers"}', 4
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'drivers' AND s.section_key = 'how_it_works'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- Drivers What We Cover Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'headline', 'text', 'Six ways Drivly has you covered.', 0
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'drivers' AND s.section_key = 'what_we_cover'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'services', 'json', '[{"icon": "😖", "title": "Flat Tyre Repair", "description": "A tyre specialist comes to you with everything needed to get you moving again."}, {"icon": "🔋", "title": "Battery Jump Start", "description": "Dead battery? A specialist arrives with a jump pack or replacement in minutes."}, {"icon": "🚙", "title": "Tow Truck", "description": "Vehicle recovery to any destination or a Drivly partner workshop, your call."}, {"icon": "⛽", "title": "Emergency Fuel", "description": "Ran out of petrol or diesel? We bring fuel so you can get to the nearest station."}, {"icon": "🔑", "title": "Car Lockout", "description": "A verified locksmith gets you back in your car without causing any damage."}, {"icon": "🔧", "title": "Mobile Mechanic", "description": "A mechanic comes to diagnose or fix the problem on-site, wherever you are."}]', 1
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'drivers' AND s.section_key = 'what_we_cover'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- Drivers Blog Preview Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'headline', 'text', 'Blogs & Articles', 0
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'drivers' AND s.section_key = 'blog_preview'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'subtitle', 'text', 'Dive into well-researched articles, industry insights, and actionable ideas designed to expand your thinking.', 1
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'drivers' AND s.section_key = 'blog_preview'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'cta', 'json', '{"label": "View all articles", "href": "/blog"}', 2
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'drivers' AND s.section_key = 'blog_preview'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- Drivers Waitlist Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'headline', 'text', 'Join the network before we launch', 0
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'drivers' AND s.section_key = 'waitlist'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'subtitle', 'text', 'Leave your details and you''ll be the first to know when we go live in your area', 1
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'drivers' AND s.section_key = 'waitlist'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- ==============================================================================
-- PROVIDERS PAGE
-- ==============================================================================

-- Insert Providers Page
INSERT INTO public.cms_pages (slug, title, description, is_published) VALUES
('providers', 'For Providers', 'Drivly for providers - Earn more from your skills', true)
ON CONFLICT (slug) DO NOTHING;

-- Providers Page Sections
INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'hero', 'Hero', 0 FROM public.cms_pages WHERE slug = 'providers'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'bento_cards', 'Benefit Cards', 1 FROM public.cms_pages WHERE slug = 'providers'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'earn_more', 'Earn More', 2 FROM public.cms_pages WHERE slug = 'providers'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'service_centre', 'Service Centre', 3 FROM public.cms_pages WHERE slug = 'providers'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'blog_preview', 'Blogs & Articles', 4 FROM public.cms_pages WHERE slug = 'providers'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'waitlist', 'Join the Waitlist', 5 FROM public.cms_pages WHERE slug = 'providers'
ON CONFLICT (page_id, section_key) DO NOTHING;

-- Providers Hero Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'headline', 'text', 'Whether you own a workshop, manage a fleet, or run a company', 0
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'hero'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'subtitle', 'text', 'Drivly is built for you', 1
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'hero'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, image_url, image_alt, order_index)
SELECT s.id, 'background_image', 'image', '/images/hero-providers.jpg', 'Drivly providers hero', 2
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'hero'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'stats', 'json', '[{"value": "2M+", "label": "Registered vehicles in Lagos State"}, {"value": "8min", "label": "Target average provider arrival"}, {"value": "₦0", "label": "Negotiation on any job ever"}, {"value": "85%", "label": "Of every job fee goes to the provider"}]', 3
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'hero'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- Providers Bento Cards Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'earnings_card', 'json', '{"eyebrow": "Earnings", "heading": "Keep 85% of every job.", "body": "Drivly takes only 15%. The rest goes straight to your linked bank account after every completed job automatically, no cash involve"}', 0
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'bento_cards'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'flexibility_card', 'json', '{"eyebrow": "Flexibility", "heading": "You choose when you work", "body": "Set your own availability. Accept jobs when it suits you and decline when it doesn''t. Drivly works around your schedule, not the other way around"}', 1
FROM public.cms_sections s JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'bento_cards'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'work_card', 'json', '{"eyebrow": "Work", "heading": "Jobs come directly to you", "body": "No more waiting at the motor park or relying on personal contacts.", "stat": "8 min", "stat_label": "Average dispatch time from job request"}', 2
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'bento_cards'
ON CONFLICT (section_id, block_key) DO NOTHING;


INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'reputation_card', 'json', '{"eyebrow": "Reputation", "heading": "Build a verified reputation that follows you.", "body": "Every completed job earns you a rating from the driver.", "rating": "4.9"}', 3
FROM public.cms_sections s
JOIN public.cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'bento_cards'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- Providers Earn More Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'headline', 'text', 'Earn more from your skills', 0
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'earn_more'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'body', 'text', 'Drivly sends paying jobs directly to your phone filling the hours when you''d otherwise be waiting for walk-ins at your workshop or motor park.', 1
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'earn_more'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'steps', 'json', '[{"n": "01", "label": "Keep 85% of every job, Drivly takes only 15%"}, {"n": "02", "label": "Payment goes straight to your bank account after every job"}, {"n": "03", "label": "No joining fee, zero cost to get started on the platform"}, {"n": "04", "label": "Set your own availability. Work the hours that suit you"}]', 2
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'earn_more'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, image_url, image_alt, order_index)
SELECT s.id, 'phone_image', 'image', '/images/provider-screen.png', 'Provider app screen', 3
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'earn_more'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'cta', 'json', '{"label": "Apply to be a Provider", "href": "/#waitlist"}', 4
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'earn_more'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- Providers Service Centre Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'headline', 'text', 'Become a Drivly Service Centre', 0
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'service_centre'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'body', 'text', 'A Drivly Service Centre is a vetted mechanic workshop listed in our app and recommended to drivers when they need professional repair work. Drivers can book drive-in appointments, route tow trucks to your bay, or be referred to you after a mobile mechanic assessment.', 1
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'service_centre'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, image_url, image_alt, order_index)
SELECT s.id, 'image', 'image', '/images/service-centre.jpg', 'Service centre workshop', 2
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'service_centre'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'cta', 'json', '{"label": "Apply to be a Provider", "href": "/#waitlist"}', 3
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'service_centre'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- Providers Blog Preview Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'headline', 'text', 'Blogs & Articles', 0
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'blog_preview'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'subtitle', 'text', 'Dive into well-researched articles, industry insights, and actionable ideas designed to expand your thinking.', 1
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'blog_preview'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'cta', 'json', '{"label": "View all articles", "href": "/blog"}', 2
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'blog_preview'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- Providers Waitlist Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'headline', 'text', 'Join the network before we launch', 0
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'waitlist'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'subtitle', 'text', 'We''re launching in Lagos. Sign up now and we''ll reach out the moment we go live in your area.', 1
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'providers' AND s.section_key = 'waitlist'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- ==============================================================================
-- BUSINESSES PAGE
-- ==============================================================================

-- Insert Businesses Page
INSERT INTO public.cms_pages (slug, title, description, is_published) VALUES
('fleet', 'For Business', 'Drivly for businesses - Real-Time Rescue and Fleet Management', true)
ON CONFLICT (slug) DO NOTHING;

-- Businesses Page Sections
INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'hero', 'Hero', 0 FROM public.cms_pages WHERE slug = 'fleet'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'we_take_over', 'We Take Over', 1 FROM public.cms_pages WHERE slug = 'fleet'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'powering_industry', 'Powering Every Industry', 2 FROM public.cms_pages WHERE slug = 'fleet'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'what_we_cover', 'What We Cover', 3 FROM public.cms_pages WHERE slug = 'fleet'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'blog_preview', 'Blogs & Articles', 4 FROM public.cms_pages WHERE slug = 'fleet'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'waitlist', 'Join the Waitlist', 5 FROM public.cms_pages WHERE slug = 'fleet'
ON CONFLICT (page_id, section_key) DO NOTHING;

-- Businesses Hero Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'headline', 'text', 'Real-Time Rescue and Fleet Management', 0
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'fleet' AND s.section_key = 'hero'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'subtitle', 'text', 'Built for your business', 1
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'fleet' AND s.section_key = 'hero'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, image_url, image_alt, order_index)
SELECT s.id, 'background_image', 'image', '/images/hero-fleet.jpg', 'Drivly fleet hero', 2
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'fleet' AND s.section_key = 'hero'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'stats', 'json', '[{"value": "2M+", "label": "Registered vehicles in Lagos State"}, {"value": "8min", "label": "Target average provider arrival"}, {"value": "₦0", "label": "Negotiation on any job ever"}, {"value": "85%", "label": "Of every job fee goes to the provider"}]', 3
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'fleet' AND s.section_key = 'hero'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- Businesses We Take Over Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'headline', 'text', 'We Take Over When Things Go Wrong', 0
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'fleet' AND s.section_key = 'we_take_over'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'body', 'text', 'We take over the moment something goes wrong dispatching rescue, coordinating fixes, and keeping your fleet moving without disruption.', 1
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'fleet' AND s.section_key = 'we_take_over'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, image_url, image_alt, order_index)
SELECT s.id, 'image', 'image', '/images/fleet-breakdown.jpg', 'Fleet breakdown', 2
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'fleet' AND s.section_key = 'we_take_over'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'cta', 'json', '{"label": "Join the Waitlist", "href": "/#waitlist"}', 3
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'fleet' AND s.section_key = 'we_take_over'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- Businesses Powering Industry Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'headline', 'text', 'Powering Every Industry', 0
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'fleet' AND s.section_key = 'powering_industry'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'body', 'text', 'Trusted across Lagos to keep operations running', 1
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'fleet' AND s.section_key = 'powering_industry'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'industries', 'json', '[{"label": "Hospitality", "img": "/images/industry-hospitality.jpg"}, {"label": "Logistics", "img": "/images/industry-logistics.jpg"}, {"label": "Manufacturing", "img": "/images/industry-manufacturing.jpg"}, {"label": "School", "img": "/images/industry-school.jpg"}, {"label": "Corporate Fleet Operations", "img": "/images/industry-corporate.jpg"}, {"label": "Retail", "img": "/images/industry-retail.jpg"}]', 2
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'fleet' AND s.section_key = 'powering_industry'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- Businesses What We Cover Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'headline', 'text', 'Six ways Drivly has you covered.', 0
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'fleet' AND s.section_key = 'what_we_cover'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'services', 'json', '[{"icon": "😖", "title": "Flat Tyre Repair", "description": "A tyre specialist comes to you with everything needed to get you moving again."}, {"icon": "🔋", "title": "Battery Jump Start", "description": "Dead battery? A specialist arrives with a jump pack or replacement in minutes."}, {"icon": "🚙", "title": "Tow Truck", "description": "Vehicle recovery to any destination or a Drivly partner workshop, your call."}, {"icon": "⛽", "title": "Emergency Fuel", "description": "Ran out of petrol or diesel? We bring fuel so you can get to the nearest station."}, {"icon": "🔑", "title": "Car Lockout", "description": "A verified locksmith gets you back in your car without causing any damage."}, {"icon": "🔧", "title": "Mobile Mechanic", "description": "A mechanic comes to diagnose or fix the problem on-site, wherever you are."}]', 1
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'fleet' AND s.section_key = 'what_we_cover'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- Businesses Blog Preview Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'headline', 'text', 'Blogs & Articles', 0
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'fleet' AND s.section_key = 'blog_preview'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'subtitle', 'text', 'Dive into well-researched articles, industry insights, and actionable ideas designed to expand your thinking.', 1
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'fleet' AND s.section_key = 'blog_preview'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'cta', 'json', '{"label": "View all articles", "href": "/blog"}', 2
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'fleet' AND s.section_key = 'blog_preview'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- Businesses Waitlist Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'headline', 'text', 'Join the network before we launch', 0
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'fleet' AND s.section_key = 'waitlist'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'subtitle', 'text', 'Leave your details and you''ll be the first to know when we go live in your area', 1
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'fleet' AND s.section_key = 'waitlist'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- ==============================================================================
-- ABOUT PAGE
-- ==============================================================================

-- Insert About Page
INSERT INTO public.cms_pages (slug, title, description, is_published) VALUES
('about', 'About Us', 'Learn about Drivly - Nigeria''s first app-based roadside assistance platform', true)
ON CONFLICT (slug) DO NOTHING;

-- About Page Sections
INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'hero', 'Hero', 0 FROM public.cms_pages WHERE slug = 'about'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'about_body', 'About Body', 1 FROM public.cms_pages WHERE slug = 'about'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'quote', 'Quote Section', 2 FROM public.cms_pages WHERE slug = 'about'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'team', 'The Team', 3 FROM public.cms_pages WHERE slug = 'about'
ON CONFLICT (page_id, section_key) DO NOTHING;

INSERT INTO public.cms_sections (page_id, section_key, title, order_index)
SELECT id, 'media', 'Media Enquiries', 4 FROM public.cms_pages WHERE slug = 'about'
ON CONFLICT (page_id, section_key) DO NOTHING;

-- About Hero Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'headline', 'text', 'About us', 0
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'about' AND s.section_key = 'hero'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, image_url, image_alt, order_index)
SELECT s.id, 'background_image', 'image', '/images/hero-about.jpg', 'Drivly about hero', 1
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'about' AND s.section_key = 'hero'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- About Body Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'paragraphs', 'json', '["Drivly is a Nigerian technology company building the country''s first organised, app-based roadside assistance platform. We connect drivers with verified mechanics, tow operators, and roadside specialists at a fixed price, with real-time tracking, and full accountability from start to finish.", "Every driver in Nigeria knows the feeling. The engine cuts out. The car drifts to the side of the road. And then the silence because there is nobody to call, no dispatch, no organised service, just you, the road, and the task of figuring it out alone. It is a moment every Nigerian driver has lived through at least once. Most have lived through it more.", "We started Drivly because that moment should not exist the way it does. Not in a country with thousands of skilled mechanics and tow operators who are ready to work. Not with the technology available today to connect a distressed driver to the right person in minutes.", "Drivly is that connection. A driver breaks down, opens the app, and within minutes a verified specialist is on the way at a price agreed before anyone moves, tracked live until they arrive. No strangers. No guesswork. No cash negotiations on the side of a busy road.", "We are building what Nigerian roads have never had a system that makes help certain, not a gamble. A platform where every provider is checked before they join, every price is fixed before anyone pays, and every job is tracked from the moment it begins to the moment the driver is back on the road.", "We are launching in Nigeria in 2026. And we are just getting started.", "Join the waitlist now."]', 0
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'about' AND s.section_key = 'about_body'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'cta', 'json', '{"label": "Join the waitlist", "href": "/#waitlist"}', 1
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'about' AND s.section_key = 'about_body'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- About Quote Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'quote', 'text', 'The problem we''re solving is not technical. It''s structural. Nigeria has thousands of skilled mechanics and tow operators, and millions of drivers who need them. What has never existed is the organised infrastructure connecting them. That is what Drivly is building and there has never been a better time to build it.', 0
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'about' AND s.section_key = 'quote'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'founder', 'json', '{"name": "Oriabure Alfred", "title": "Founder & CEO, Drivly App Ltd", "image": "/images/team-alfred.jpg"}', 1
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'about' AND s.section_key = 'quote'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- About Team Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'headline', 'text', 'The Team', 0
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'about' AND s.section_key = 'team'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'team_row1', 'json', '[{"name": "Oriabure Alfred", "role": "Founder & CEO", "initials": "OA", "img": "/images/team-alfred.jpg"}, {"name": "Evbuomwan Victoria", "role": "Head of Product", "initials": "EV", "img": "/images/team-victoria.jpg"}, {"name": "Divine Igbinoba", "role": "Head of Engineering", "initials": "DI", "img": "/images/team-divine.jpg"}]', 1
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'about' AND s.section_key = 'team'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'team_row2', 'json', '[{"name": "Temiloluwa Ajayi", "role": "Social Media Marketer", "initials": "TA", "img": "/images/team-temi.jpg"}, {"name": "Evbuomwan Micheal", "role": "Head of Strategy", "initials": "EM", "img": "/images/team-micheal.jpg"}]', 2
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'about' AND s.section_key = 'team'
ON CONFLICT (section_id, block_key) DO NOTHING;

-- About Media Section
INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'headline', 'text', 'Media enquiries', 0
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'about' AND s.section_key = 'media'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content, order_index)
SELECT s.id, 'body', 'text', 'For press and media enquiries, contact us directly', 1
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'about' AND s.section_key = 'media'
ON CONFLICT (section_id, block_key) DO NOTHING;

INSERT INTO public.cms_content_blocks (section_id, block_key, block_type, content_json, order_index)
SELECT s.id, 'cta', 'json', '{"label": "hello@drivly.ng", "href": "mailto:hello@drivly.ng"}', 2
FROM public.cms_sections s JOIN public cms_pages p ON s.page_id = p.id
WHERE p.slug = 'about' AND s.section_key = 'media'
ON CONFLICT (section_id, block_key) DO NOTHING;
