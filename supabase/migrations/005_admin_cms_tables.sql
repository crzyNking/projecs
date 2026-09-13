-- =====================================================
-- ADMIN CMS TABLES
-- Migration 005: Complete Admin CMS System
-- =====================================================

-- 1. ADMIN ROLE SYSTEM
-- Add role column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user'));

-- 2. ANNOUNCEMENTS TABLE
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN DEFAULT false,
  button_text TEXT DEFAULT '',
  button_url TEXT DEFAULT '',
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  bg_color TEXT DEFAULT '#13275c',
  text_color TEXT DEFAULT '#ffffff',
  priority INTEGER DEFAULT 0,
  close_button BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. NEWS TABLE
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT '',
  slug TEXT NOT NULL DEFAULT '',
  summary TEXT DEFAULT '',
  content TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  category TEXT DEFAULT 'general',
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. EVENTS TABLE
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT '',
  slug TEXT NOT NULL DEFAULT '',
  description TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  event_date TIMESTAMPTZ,
  event_time TEXT DEFAULT '',
  location TEXT DEFAULT '',
  organizer TEXT DEFAULT '',
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. ENROLLMENT SETTINGS TABLE
CREATE TABLE IF NOT EXISTS enrollment_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  is_open BOOLEAN DEFAULT false,
  academic_year TEXT DEFAULT '2026-2027',
  announcement TEXT DEFAULT '',
  instructions TEXT DEFAULT '',
  requirements TEXT DEFAULT '',
  contact_info TEXT DEFAULT '',
  application_url TEXT DEFAULT '/enrollment',
  k12_info TEXT DEFAULT '',
  college_info TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. PROGRAMS TABLE
CREATE TABLE IF NOT EXISTS programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT '',
  slug TEXT NOT NULL DEFAULT '',
  description TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  category TEXT DEFAULT 'college',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT '',
  description TEXT DEFAULT '',
  icon TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 8. GALLERY TABLE
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT DEFAULT '',
  caption TEXT DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  category TEXT DEFAULT 'general',
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. SCHOOL SETTINGS TABLE (singleton - one row)
CREATE TABLE IF NOT EXISTS school_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_name TEXT DEFAULT 'Cebu Eastern College',
  school_description TEXT DEFAULT '',
  address TEXT DEFAULT 'Leon Kilat St., Cebu City',
  phone TEXT DEFAULT '(032) 256 2523',
  email TEXT DEFAULT 'cebueasterncollege1915@yahoo.com',
  office_hours TEXT DEFAULT 'Mon-Fri 8:00 AM - 5:00 PM',
  facebook TEXT DEFAULT '',
  website_logo TEXT DEFAULT '',
  website_favicon TEXT DEFAULT '',
  footer_text TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 10. HOMEPAGE CONTENT TABLE (singleton)
CREATE TABLE IF NOT EXISTS homepage_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title TEXT DEFAULT 'Excellence in Education',
  hero_subtitle TEXT DEFAULT 'Cebu Eastern College',
  hero_description TEXT DEFAULT 'Building future leaders through quality education since 1915.',
  hero_image TEXT DEFAULT '',
  hero_button_text TEXT DEFAULT 'Enroll Now',
  hero_button_url TEXT DEFAULT '/enrollment',
  hero_secondary_text TEXT DEFAULT 'Learn More',
  hero_secondary_url TEXT DEFAULT '/about',
  featured_news BOOLEAN DEFAULT true,
  featured_events BOOLEAN DEFAULT true,
  featured_enrollment BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 11. WEBSITE SETTINGS TABLE (singleton)
CREATE TABLE IF NOT EXISTS website_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  announcement_bar BOOLEAN DEFAULT true,
  news_section BOOLEAN DEFAULT true,
  events_section BOOLEAN DEFAULT true,
  enrollment_section BOOLEAN DEFAULT true,
  programs_section BOOLEAN DEFAULT true,
  gallery_section BOOLEAN DEFAULT true,
  services_section BOOLEAN DEFAULT true,
  contact_section BOOLEAN DEFAULT true,
  maintenance_mode BOOLEAN DEFAULT false,
  maintenance_message TEXT DEFAULT 'Website is currently under maintenance. Please check back soon.',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 12. ADMIN ACTIVITY LOGS TABLE
CREATE TABLE IF NOT EXISTS admin_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT DEFAULT '',
  entity_id UUID,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_news_published ON news(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_events_published ON events(is_published, event_date DESC);
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(is_active);
CREATE INDEX IF NOT EXISTS idx_programs_category ON programs(category, sort_order);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category, sort_order);
CREATE INDEX IF NOT EXISTS idx_admin_logs_user ON admin_activity_logs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- =====================================================
-- RLS POLICIES
-- =====================================================

-- Helper: Check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ANNOUNCEMENTS - anyone can read, admin can manage
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read announcements" ON announcements FOR SELECT USING (true);
CREATE POLICY "Admin insert announcements" ON announcements FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admin update announcements" ON announcements FOR UPDATE USING (is_admin());
CREATE POLICY "Admin delete announcements" ON announcements FOR DELETE USING (is_admin());

-- NEWS - anyone can read published, admin can manage all
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published news" ON news FOR SELECT USING (is_published = true);
CREATE POLICY "Admin read all news" ON news FOR SELECT USING (is_admin());
CREATE POLICY "Admin insert news" ON news FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admin update news" ON news FOR UPDATE USING (is_admin());
CREATE POLICY "Admin delete news" ON news FOR DELETE USING (is_admin());

-- EVENTS - anyone can read published, admin can manage all
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published events" ON events FOR SELECT USING (is_published = true);
CREATE POLICY "Admin read all events" ON events FOR SELECT USING (is_admin());
CREATE POLICY "Admin insert events" ON events FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admin update events" ON events FOR UPDATE USING (is_admin());
CREATE POLICY "Admin delete events" ON events FOR DELETE USING (is_admin());

-- ENROLLMENT SETTINGS - anyone can read, admin can manage
ALTER TABLE enrollment_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read enrollment" ON enrollment_settings FOR SELECT USING (true);
CREATE POLICY "Admin update enrollment" ON enrollment_settings FOR UPDATE USING (is_admin());
CREATE POLICY "Admin insert enrollment" ON enrollment_settings FOR INSERT WITH CHECK (is_admin());

-- PROGRAMS - anyone can read active, admin can manage all
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active programs" ON programs FOR SELECT USING (is_active = true);
CREATE POLICY "Admin read all programs" ON programs FOR SELECT USING (is_admin());
CREATE POLICY "Admin insert programs" ON programs FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admin update programs" ON programs FOR UPDATE USING (is_admin());
CREATE POLICY "Admin delete programs" ON programs FOR DELETE USING (is_admin());

-- SERVICES - anyone can read active, admin can manage all
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Admin read all services" ON services FOR SELECT USING (is_admin());
CREATE POLICY "Admin insert services" ON services FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admin update services" ON services FOR UPDATE USING (is_admin());
CREATE POLICY "Admin delete services" ON services FOR DELETE USING (is_admin());

-- GALLERY - anyone can read published, admin can manage all
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published gallery" ON gallery FOR SELECT USING (is_published = true);
CREATE POLICY "Admin read all gallery" ON gallery FOR SELECT USING (is_admin());
CREATE POLICY "Admin insert gallery" ON gallery FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admin update gallery" ON gallery FOR UPDATE USING (is_admin());
CREATE POLICY "Admin delete gallery" ON gallery FOR DELETE USING (is_admin());

-- SCHOOL SETTINGS - anyone can read, admin can manage
ALTER TABLE school_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read school settings" ON school_settings FOR SELECT USING (true);
CREATE POLICY "Admin update school settings" ON school_settings FOR UPDATE USING (is_admin());
CREATE POLICY "Admin insert school settings" ON school_settings FOR INSERT WITH CHECK (is_admin());

-- HOMEPAGE CONTENT - anyone can read, admin can manage
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read homepage" ON homepage_content FOR SELECT USING (true);
CREATE POLICY "Admin update homepage" ON homepage_content FOR UPDATE USING (is_admin());
CREATE POLICY "Admin insert homepage" ON homepage_content FOR INSERT WITH CHECK (is_admin());

-- WEBSITE SETTINGS - anyone can read, admin can manage
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read website settings" ON website_settings FOR SELECT USING (true);
CREATE POLICY "Admin update website settings" ON website_settings FOR UPDATE USING (is_admin());
CREATE POLICY "Admin insert website settings" ON website_settings FOR INSERT WITH CHECK (is_admin());

-- ADMIN ACTIVITY LOGS - only admin can read, system can insert
ALTER TABLE admin_activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin read logs" ON admin_activity_logs FOR SELECT USING (is_admin());
CREATE POLICY "Admin insert logs" ON admin_activity_logs FOR INSERT WITH CHECK (is_admin());

-- PROFILES - users read own, admin reads all; admin can update roles
CREATE POLICY "Admin read all profiles" ON profiles FOR SELECT USING (is_admin());
CREATE POLICY "Admin update profiles" ON profiles FOR UPDATE USING (is_admin());

-- =====================================================
-- STORAGE BUCKETS
-- =====================================================

-- Create storage buckets for CMS content
INSERT INTO storage.buckets (id, name, public) VALUES ('cms-images', 'cms-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for cms-images bucket
CREATE POLICY "Public read cms-images" ON storage.objects
  FOR SELECT USING (bucket_id = 'cms-images');

CREATE POLICY "Admin upload cms-images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'cms-images' AND is_admin());

CREATE POLICY "Admin delete cms-images" ON storage.objects
  FOR DELETE USING (bucket_id = 'cms-images' AND is_admin());

-- Storage policies for gallery bucket
CREATE POLICY "Public read gallery" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Admin upload gallery" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'gallery' AND is_admin());

CREATE POLICY "Admin delete gallery" ON storage.objects
  FOR DELETE USING (bucket_id = 'gallery' AND is_admin());

-- =====================================================
-- SEED DATA
-- =====================================================

-- Insert default school settings
INSERT INTO school_settings (school_name, school_description, address, phone, email, office_hours)
VALUES (
  'Cebu Eastern College',
  'A premier educational institution in Cebu City, providing quality education from kindergarten through college since 1915.',
  '40 Leon Kilat Street, Pahina Central, Cebu City',
  '(032) 256 2523',
  'cebueasterncollege1915@yahoo.com',
  'Monday - Friday, 8:00 AM - 5:00 PM'
) ON CONFLICT DO NOTHING;

-- Insert default homepage content
INSERT INTO homepage_content (hero_title, hero_subtitle, hero_description)
VALUES (
  'Excellence in Education',
  'Cebu Eastern College',
  'Building future leaders through quality education since 1915.'
) ON CONFLICT DO NOTHING;

-- Insert default website settings
INSERT INTO website_settings (announcement_bar, news_section, events_section, enrollment_section, programs_section, gallery_section, services_section, contact_section)
VALUES (true, true, true, true, true, true, true, true)
ON CONFLICT DO NOTHING;

-- Insert default enrollment settings
INSERT INTO enrollment_settings (is_open, academic_year, announcement)
VALUES (true, '2026-2027', 'Enrollment for Academic Year 2026-2027 is now open!')
ON CONFLICT DO NOTHING;
