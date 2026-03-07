
-- Drop all existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can view appointments" ON public.appointments;
DROP POLICY IF EXISTS "Anyone can create appointments" ON public.appointments;
DROP POLICY IF EXISTS "Anyone can update appointments" ON public.appointments;
DROP POLICY IF EXISTS "Authenticated users can view contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can create contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated users can view payment records" ON public.payment_records;
DROP POLICY IF EXISTS "Anyone can create payment records" ON public.payment_records;

-- Recreate as PERMISSIVE policies
CREATE POLICY "Anyone can insert appointments" ON public.appointments FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can select appointments" ON public.appointments FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can update appointments" ON public.appointments FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can select contact messages" ON public.contact_messages FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anyone can insert payment records" ON public.payment_records FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can select payment records" ON public.payment_records FOR SELECT TO anon, authenticated USING (true);
