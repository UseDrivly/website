// ============================================================
// DRIVLY — Shared TypeScript Interfaces & Types
// ============================================================

// ------------------------------------------------------------------
// Navigation
// ------------------------------------------------------------------
export interface NavLink {
  label: string;
  href: string;
}

// ------------------------------------------------------------------
// Stats Bar
// ------------------------------------------------------------------
export interface StatItem {
  value: string;
  label: string;
}

// ------------------------------------------------------------------
// Services Grid
// ------------------------------------------------------------------
export interface ServiceItem {
  icon: string;        // emoji or icon name
  title: string;
  description: string;
}

// ------------------------------------------------------------------
// Waitlist / Form
// ------------------------------------------------------------------
export type WaitlistRole = 'driver' | 'provider' | 'business';

export interface WaitlistFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  role: WaitlistRole;
  vehicle_type?: string;
  company_name?: string;
  fleet_size?: string;
}

export interface WaitlistEntry extends WaitlistFormData {
  id: string;
  created_at: string;
}

export interface WaitlistFieldConfig {
  id: keyof WaitlistFormData;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select';
  placeholder?: string;
  required: boolean;
  options?: { value: string; label: string }[];
}

export interface WaitlistFormConfig {
  /** e.g. "Driver Waitlist" */
  title: string;
  /** Subtitle below the title */
  subtitle: string;
  /** The role value to submit */
  role: WaitlistRole;
  /** Fields to render (in order) */
  fields: WaitlistFieldConfig[];
  /** Label on the submit button */
  ctaLabel: string;
}

// ------------------------------------------------------------------
// Blog / Posts (Supabase table: posts)
// ------------------------------------------------------------------
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;          // Rich text / HTML stored by admin
  category: string;         // e.g. "Driver Experience", "Trust & Safety"
  author_name: string;
  author_title?: string;
  cover_image_url: string;  // URL of the hero/cover image
  read_time: string;        // e.g. "6 min read"
  published_at: string;     // ISO timestamp
  is_published: boolean;
}

// ------------------------------------------------------------------
// Careers / Jobs
// ------------------------------------------------------------------
export interface CareerJob {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  is_published: boolean;
  created_at?: string;
}

// ------------------------------------------------------------------
// App Showcase (Step list items)
// ------------------------------------------------------------------
export interface ShowcaseStep {
  label: string;
  description?: string;
}

// ------------------------------------------------------------------
// Value Prop Cards (e.g., "Keep 85% of every job")
// ------------------------------------------------------------------
export interface ValuePropCard {
  eyebrow?: string;
  heading: string;
  body: string;
  variant?: 'dark' | 'light' | 'accent';
}

// ------------------------------------------------------------------
// Industry Tile (Businesses page)
// ------------------------------------------------------------------
export interface IndustryTile {
  label: string;
  image_url: string;
}

// ------------------------------------------------------------------
// Server Action Response
// ------------------------------------------------------------------
export interface ActionResponse {
  success: boolean;
  error?: string;
  message?: string;
}
