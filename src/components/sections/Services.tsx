import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const serviceCards = [
  { title: "Extractions", description: "Safe and comfortable tooth removal procedures for damaged or problematic teeth." },
  { title: "Fillings", description: "Durable, tooth-colored restorations to repair cavities and restore tooth structure." },
  { title: "Root Canal Treatment", description: "Expert endodontic therapy to save infected teeth and relieve pain." },
  { title: "Tooth Whitening", description: "Professional whitening treatments to brighten your smile by several shades." },
  { title: "Pulp Treatment", description: "Specialized care for the inner tooth tissue to preserve natural teeth." },
  { title: "Removal Appliances", description: "Dentures, flexible dentures, removable orthodontic appliances, space maintainers, and habit breakers." },
  { title: "Topical Fluoride", description: "Protective fluoride application to strengthen enamel and prevent decay." },
  { title: "Fissure Sealants", description: "Thin protective coatings applied to chewing surfaces to prevent cavities." },
  { title: "Sensitive Teeth Treatment", description: "Targeted treatments to reduce tooth sensitivity and discomfort." },
  { title: "Teeth Alignment Consultations", description: "Expert consultations to explore options for straightening your teeth." },
  { title: "Crowns, Bridges & Implant Consultations", description: "Restorative solutions including crowns, bridges, and implant planning." },
  { title: "Veneers – Composite", description: "Custom composite veneers for a natural, beautiful smile transformation." },
  { title: "Acrylic & Porcelain Bridges", description: "Acrylic and porcelain fused to metal bridges for reliable tooth replacement." },
  { title: "Outreach & School Visits", description: "Community dental health education and preventive care at schools." },
  { title: "Corporate Visits", description: "On-site dental check-ups and care programs for banks and corporate organizations." },
  { title: "Preventive Mouthguards", description: "Custom-made mouthguards to protect teeth during sports and from grinding." },
  { title: "Dietary Counselling", description: "Nutritional guidance to support optimal oral health and prevent dental issues." },
  { title: "Special Needs Dentistry", description: "Compassionate, tailored dental care for patients with special needs." },
  { title: "Geriatric Care", description: "Gentle, specialized dental services designed for older adults." },
];

const COLORS = [
  "from-primary/80 to-primary",
  "from-accent/80 to-accent",
  "from-secondary/80 to-secondary",
  "from-primary/60 to-accent/80",
  "from-accent/60 to-primary/80",
];

const Services = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section id="services" className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">A Wide Range of Services</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            From routine check-ups to advanced procedures, we offer a full spectrum of dental services.
          </p>
        </div>

        <div className="relative">
          {canScrollLeft && (
            <Button
              variant="outline"
              size="icon"
              className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg bg-background/90 backdrop-blur-sm"
              onClick={() => scroll(-1)}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}
          {canScrollRight && (
            <Button
              variant="outline"
              size="icon"
              className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg bg-background/90 backdrop-blur-sm"
              onClick={() => scroll(1)}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 px-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {serviceCards.map((service, i) => (
              <div
                key={i}
                className="min-w-[260px] max-w-[280px] snap-start flex-shrink-0 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
              >
                <div className={`h-28 bg-gradient-to-br ${COLORS[i % COLORS.length]} flex items-center justify-center p-4`}>
                  <h3 className="text-lg font-bold text-primary-foreground text-center leading-tight">{service.title}</h3>
                </div>
                <div className="p-5 bg-card">
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
