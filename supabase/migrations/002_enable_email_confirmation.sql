-- Enable email confirmation in Supabase Auth
-- Run this in your Supabase SQL Editor

-- This is handled by Supabase dashboard settings, not SQL
-- Go to: Authentication > Providers > Email > Enable "Confirm email"

-- However, you can update the auth.config if needed:
-- Note: These settings are typically managed through the Supabase Dashboard

-- To prevent fake emails, Supabase will:
-- 1. Send a confirmation email to the provided address
-- 2. User must click the link to verify their email
-- 3. Only verified users can sign in

-- If you want to require email confirmation (recommended):
-- Go to Supabase Dashboard > Authentication > Providers > Email
-- Toggle "Confirm email" to ON

-- If you want to disable email confirmation (not recommended):
-- Go to Supabase Dashboard > Authentication > Providers > Email
-- Toggle "Confirm email" to OFF
