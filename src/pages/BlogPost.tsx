import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface BlogPostData {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
  slug: string | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-3xl">
          {loading ? (
            <p className="text-center text-muted-foreground py-20">Loading...</p>
          ) : !post ? (
            <div className="text-center py-20 space-y-4">
              <p className="text-muted-foreground">Post not found.</p>
              <Link to="/blog" className="text-primary hover:underline">← Back to blog</Link>
            </div>
          ) : (
            <article className="space-y-6">
              <Link to="/blog" className="text-sm text-primary hover:underline inline-block">
                ← Back to all posts
              </Link>
              {post.cover_image_url && (
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full h-64 sm:h-80 object-cover rounded-xl"
                />
              )}
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <CalendarDays className="w-4 h-4" />
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{post.title}</h1>
              <div className="prose prose-sm sm:prose max-w-none text-foreground/90">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
