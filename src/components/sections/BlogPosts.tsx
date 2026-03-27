import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Tips for a Healthier Smile",
    excerpt: "Discover daily habits that keep your teeth and gums in perfect shape.",
    date: "Coming Soon",
    link: "#",
  },
  {
    id: 2,
    title: "Understanding Root Canal Therapy",
    excerpt: "Everything you need to know about root canal treatment and why it's nothing to fear.",
    date: "Coming Soon",
    link: "#",
  },
  {
    id: 3,
    title: "The Benefits of Teeth Whitening",
    excerpt: "Learn how professional whitening can transform your confidence and appearance.",
    date: "Coming Soon",
    link: "#",
  },
  {
    id: 4,
    title: "Children's Dental Health Guide",
    excerpt: "A parent's guide to keeping your child's teeth healthy from the very first tooth.",
    date: "Coming Soon",
    link: "#",
  },
  {
    id: 5,
    title: "Dental Implants vs Bridges",
    excerpt: "Comparing two popular solutions for missing teeth — which one is right for you?",
    date: "Coming Soon",
    link: "#",
  },
];

const BlogPosts = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const startAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    autoSlideRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scroll("right");
      }
    }, 4000);
  };

  useEffect(() => {
    checkScroll();
    startAutoSlide();
    const el = scrollRef.current;
    el?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, []);

  return (
    <section className="py-20 bg-primary/95 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent-foreground/20 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/60">
            Stay Updated
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Blog & Updates</h2>
          <p className="text-primary-foreground/70 max-w-lg mx-auto text-sm md:text-base">
            Follow our latest posts and updates on dental health tips, clinic news, and more.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Arrows */}
          {canScrollLeft && (
            <button
              onClick={() => { scroll("left"); startAutoSlide(); }}
              className="absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => { scroll("right"); startAutoSlide(); }}
              className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar px-1 py-2 snap-x snap-mandatory"
          >
            {blogPosts.map((post, i) => (
              <motion.a
                key={post.id}
                href={post.link}
                target={post.link !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[260px] sm:min-w-[300px] md:min-w-[320px] snap-start bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-5 md:p-6 flex flex-col gap-3 hover:bg-primary-foreground/10 transition-colors group shrink-0"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-primary-foreground/50 font-medium">{post.date}</span>
                  <ExternalLink className="w-4 h-4 text-primary-foreground/30 group-hover:text-primary-foreground/70 transition-colors" />
                </div>
                <h3 className="text-base md:text-lg font-semibold leading-snug">{post.title}</h3>
                <p className="text-sm text-primary-foreground/60 leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <span className="text-xs font-medium text-primary-foreground/40 group-hover:text-primary-foreground/80 transition-colors mt-auto">
                  Read on Facebook →
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
