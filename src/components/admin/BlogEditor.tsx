import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Loader2, Save, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

interface BlogPost {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  cover_image_url: string;
  published: boolean;
  slug?: string;
}

const generateSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

interface TopicSuggestion {
  title: string;
  description: string;
}

interface BlogEditorProps {
  post?: BlogPost;
  onSaved: () => void;
  onCancel: () => void;
}

const BlogEditor = ({ post, onSaved, onCancel }: BlogEditorProps) => {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [coverUrl, setCoverUrl] = useState(post?.cover_image_url || "");
  const [published, setPublished] = useState(post?.published || false);
  const [saving, setSaving] = useState(false);
  const [suggestions, setSuggestions] = useState<TopicSuggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    setSaving(true);
    try {
      if (post?.id) {
        const { error } = await supabase.from("blog_posts").update({
          title: title.trim(),
          content: content.trim(),
          excerpt: excerpt.trim() || null,
          cover_image_url: coverUrl.trim() || null,
          published,
          slug: generateSlug(title.trim()),
          updated_at: new Date().toISOString(),
        }).eq("id", post.id);
        if (error) throw error;
        toast.success("Post updated!");
      } else {
        const { error } = await supabase.from("blog_posts").insert({
          title: title.trim(),
          content: content.trim(),
          excerpt: excerpt.trim() || null,
          cover_image_url: coverUrl.trim() || null,
          published,
          slug: generateSlug(title.trim()),
        });
        if (error) throw error;
        toast.success("Post created!");
      }
      onSaved();
    } catch (e: any) {
      toast.error(e.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const fetchSuggestions = async () => {
    setLoadingSuggestions(true);
    try {
      const resp = await supabase.functions.invoke("suggest-topics", {
        body: { title, content },
      });
      if (resp.error) throw resp.error;
      setSuggestions(resp.data?.suggestions || []);
    } catch (e: any) {
      toast.error("Failed to get suggestions");
      console.error(e);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const applySuggestion = (suggestion: TopicSuggestion) => {
    setTitle(suggestion.title);
    setExcerpt(suggestion.description);
    setSuggestions([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">
          {post?.id ? "Edit Post" : "New Blog Post"}
        </h2>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="w-4 h-4 mr-1" /> Cancel
        </Button>
      </div>

      {/* AI Suggestions */}
      <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            AI Topic Suggestions
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchSuggestions}
            disabled={loadingSuggestions}
          >
            {loadingSuggestions ? (
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            ) : (
              <Lightbulb className="w-3 h-3 mr-1" />
            )}
            {title || content ? "Suggest Related" : "Suggest Topics"}
          </Button>
        </div>
        {suggestions.length > 0 && (
          <div className="space-y-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => applySuggestion(s)}
                className="w-full text-left p-3 rounded-md bg-background border border-border hover:border-primary/50 transition-colors"
              >
                <p className="text-sm font-medium text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Blog post title..." />
        </div>
        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Input id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short summary..." />
        </div>
        <div>
          <Label htmlFor="cover">Cover Image URL</Label>
          <Input id="cover" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} placeholder="https://..." />
        </div>
        <div>
          <Label htmlFor="content">Content (Markdown supported)</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog post content here..."
            className="min-h-[250px]"
          />
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={published} onCheckedChange={setPublished} id="published" />
          <Label htmlFor="published" className="cursor-pointer">
            {published ? <Badge>Published</Badge> : <Badge variant="secondary">Draft</Badge>}
          </Label>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleSave} disabled={saving} className="flex-1">
          {saving ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}
          {post?.id ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </div>
  );
};

export default BlogEditor;
