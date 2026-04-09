
ALTER TABLE public.blog_posts ADD COLUMN slug text UNIQUE;

-- Generate slugs for existing posts
UPDATE public.blog_posts 
SET slug = lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
