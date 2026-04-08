
-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  related_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read notifications" ON public.notifications FOR SELECT USING (true);
CREATE POLICY "Anyone can insert notifications" ON public.notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update notifications" ON public.notifications FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete notifications" ON public.notifications FOR DELETE USING (true);

-- Create push_subscriptions table
CREATE TABLE public.push_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  device_type TEXT DEFAULT 'unknown',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read push subscriptions" ON public.push_subscriptions FOR SELECT USING (true);
CREATE POLICY "Anyone can insert push subscriptions" ON public.push_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete push subscriptions" ON public.push_subscriptions FOR DELETE USING (true);

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- Trigger: new appointment → notification
CREATE OR REPLACE FUNCTION public.notify_new_appointment()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notifications (type, title, message, related_id)
  VALUES (
    'appointment',
    'New Appointment Booked',
    'Patient ' || NEW.name || ' booked an appointment for ' || NEW.preferred_date || ' at ' || NEW.preferred_time,
    NEW.id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER on_new_appointment
AFTER INSERT ON public.appointments
FOR EACH ROW EXECUTE FUNCTION public.notify_new_appointment();

-- Trigger: new contact message → notification
CREATE OR REPLACE FUNCTION public.notify_new_message()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notifications (type, title, message, related_id)
  VALUES (
    'message',
    'New Contact Message',
    NEW.name || ' sent a message: ' || LEFT(NEW.message, 100),
    NEW.id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER on_new_contact_message
AFTER INSERT ON public.contact_messages
FOR EACH ROW EXECUTE FUNCTION public.notify_new_message();

-- Trigger: blog post published → notification
CREATE OR REPLACE FUNCTION public.notify_new_blog_post()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.published = true AND (OLD IS NULL OR OLD.published = false) THEN
    INSERT INTO public.notifications (type, title, message, related_id)
    VALUES (
      'blog',
      'New Blog Post Published',
      'A new blog post "' || NEW.title || '" has been published.',
      NEW.id
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER on_blog_post_published
AFTER INSERT OR UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.notify_new_blog_post();

-- Add delete policy for appointments (needed for Clear All)
CREATE POLICY "Anyone can delete appointments" ON public.appointments FOR DELETE USING (true);

-- Add delete policy for contact_messages (needed for Clear All)
CREATE POLICY "Anyone can delete contact messages" ON public.contact_messages FOR DELETE USING (true);
