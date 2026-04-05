
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published blog posts" ON public.blog_posts
  FOR SELECT TO anon, authenticated USING (published = true);

CREATE POLICY "Anyone can insert blog posts" ON public.blog_posts
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can update blog posts" ON public.blog_posts
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can delete blog posts" ON public.blog_posts
  FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Anyone can select all blog posts for admin" ON public.blog_posts
  FOR SELECT TO anon, authenticated USING (true);
