import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (data) setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-5xl">
          {selectedPost ? (
            <article className="space-y-6">
              <button
                onClick={() => setSelectedPost(null)}
                className="text-sm text-primary hover:underline mb-4 inline-block"
              >
                ← Back to all posts
              </button>
              {selectedPost.cover_image_url && (
                <img
                  src={selectedPost.cover_image_url}
                  alt={selectedPost.title}
                  className="w-full h-64 sm:h-80 object-cover rounded-xl"
                />
              )}
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <CalendarDays className="w-4 h-4" />
                {new Date(selectedPost.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{selectedPost.title}</h1>
              <div className="prose prose-sm sm:prose max-w-none text-foreground/90">
                <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
              </div>
            </article>
          ) : (
            <>
              <div className="text-center mb-12">
                <Badge className="mb-3">Blog</Badge>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                  Dental Health Insights
                </h1>
                <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
                  Expert tips and advice from Exceptional Dental Care
                </p>
              </div>

              {loading ? (
                <p className="text-center text-muted-foreground py-20">Loading posts...</p>
              ) : posts.length === 0 ? (
                <p className="text-center text-muted-foreground py-20">
                  No blog posts yet. Check back soon!
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className="group text-left rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      {post.cover_image_url ? (
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-44 bg-primary/10 flex items-center justify-center">
                          <span className="text-4xl">🦷</span>
                        </div>
                      )}
                      <div className="p-5 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CalendarDays className="w-3 h-3" />
                          {new Date(post.created_at).toLocaleDateString()}
                        </div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                          Read more <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
