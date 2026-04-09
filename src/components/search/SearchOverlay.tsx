import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, FileText, Stethoscope, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  type: "service" | "blog";
  title: string;
  description: string;
  action: () => void;
}

const services = [
  { title: "Extractions", description: "Safe and comfortable tooth removal procedures.", section: "services" },
  { title: "Fillings", description: "Durable restorations to repair cavities.", section: "services" },
  { title: "Root Canal Treatment", description: "Expert therapy to save infected teeth.", section: "services" },
  { title: "Tooth Whitening", description: "Professional whitening treatments.", section: "services" },
  { title: "Pulp Treatment", description: "Specialized care for inner tooth tissue.", section: "services" },
  { title: "Removal Appliances", description: "Dentures, flexible dentures, orthodontic appliances.", section: "services" },
  { title: "Topical Fluoride", description: "Protective fluoride to strengthen enamel.", section: "services" },
  { title: "Fissure Sealants", description: "Protective coatings to prevent cavities.", section: "services" },
  { title: "Sensitive Teeth Treatment", description: "Treatments to reduce tooth sensitivity.", section: "services" },
  { title: "Teeth Alignment Consultations", description: "Options for straightening teeth.", section: "services" },
  { title: "Crowns, Bridges & Implants", description: "Restorative crowns, bridges, and implant planning.", section: "services" },
  { title: "Veneers – Composite", description: "Custom composite veneers for a beautiful smile.", section: "services" },
  { title: "Acrylic & Porcelain Bridges", description: "Porcelain fused to metal bridges.", section: "services" },
  { title: "Outreach & School Visits", description: "Community dental health education.", section: "services" },
  { title: "Corporate Visits", description: "On-site dental care for organizations.", section: "services" },
  { title: "Preventive Mouthguards", description: "Custom mouthguards for protection.", section: "services" },
  { title: "Dietary Counselling", description: "Nutritional guidance for oral health.", section: "services" },
  { title: "Special Needs Dentistry", description: "Tailored care for special needs patients.", section: "services" },
  { title: "Geriatric Care", description: "Specialized dental services for older adults.", section: "services" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ open, onClose }: Props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [blogPosts, setBlogPosts] = useState<{ id: string; title: string; excerpt: string | null }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      supabase
        .from("blog_posts")
        .select("id, title, excerpt")
        .eq("published", true)
        .then(({ data }) => {
          if (data) setBlogPosts(data);
        });
    } else {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const doSearch = useCallback(
    (q: string) => {
      if (!q.trim()) {
        setResults([]);
        return;
      }
      const lower = q.toLowerCase();
      const matched: SearchResult[] = [];

      // Search services
      services.forEach((s) => {
        if (s.title.toLowerCase().includes(lower) || s.description.toLowerCase().includes(lower)) {
          matched.push({
            type: "service",
            title: s.title,
            description: s.description,
            action: () => {
              onClose();
              if (window.location.pathname !== "/") {
                navigate("/");
                setTimeout(() => {
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }, 300);
              } else {
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
              }
            },
          });
        }
      });

      // Search blog posts
      blogPosts.forEach((p) => {
        if (
          p.title.toLowerCase().includes(lower) ||
          (p.excerpt && p.excerpt.toLowerCase().includes(lower))
        ) {
          matched.push({
            type: "blog",
            title: p.title,
            description: p.excerpt || "Read this blog post",
            action: () => {
              onClose();
              navigate("/blog");
            },
          });
        }
      });

      setResults(matched);
    },
    [blogPosts, navigate, onClose]
  );

  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 150);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search services, blog posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
          />
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {query.trim() === "" ? (
            <div className="px-5 py-8 text-center text-sm text-muted-foreground">
              Type to search for services or blog posts
            </div>
          ) : results.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-muted-foreground">
              No results found for "{query}"
            </div>
          ) : (
            <div className="py-2">
              {results.map((r, i) => (
                <button
                  key={`${r.type}-${i}`}
                  onClick={r.action}
                  className="w-full flex items-start gap-3 px-5 py-3 hover:bg-muted/50 transition-colors text-left group"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      r.type === "service"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-purple-500/10 text-purple-500"
                    }`}
                  >
                    {r.type === "service" ? (
                      <Stethoscope className="w-4 h-4" />
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground truncate">{r.title}</p>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded shrink-0">
                        {r.type}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{r.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-2.5 border-t border-border bg-muted/30 flex items-center gap-4 text-[10px] text-muted-foreground">
          <span><kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
