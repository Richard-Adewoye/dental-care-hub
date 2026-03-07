
-- Fix appointments INSERT policy: drop restrictive, create permissive
DROP POLICY "Anyone can create appointments" ON public.appointments;
CREATE POLICY "Anyone can create appointments" ON public.appointments FOR INSERT WITH CHECK (true);

-- Fix contact_messages INSERT policy too
DROP POLICY "Anyone can create contact messages" ON public.contact_messages;
CREATE POLICY "Anyone can create contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Fix payment_records INSERT policy
DROP POLICY "Anyone can create payment records" ON public.payment_records;
CREATE POLICY "Anyone can create payment records" ON public.payment_records FOR INSERT WITH CHECK (true);

-- Add UPDATE policy for appointments (needed for payment status)
CREATE POLICY "Anyone can update appointments" ON public.appointments FOR UPDATE USING (true) WITH CHECK (true);
