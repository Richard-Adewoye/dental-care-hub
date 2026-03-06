import { Users, Cpu, HeartHandshake, Banknote } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Experienced Staff",
    description: "Our team of seasoned dental professionals brings years of expertise and continuous learning to every procedure.",
  },
  {
    icon: Cpu,
    title: "Advanced Technology",
    description: "We use cutting-edge dental equipment including digital X-rays, 3D imaging, and laser treatments.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Care",
    description: "Every patient receives an individualized treatment plan tailored to their unique dental needs and goals.",
  },
  {
    icon: Banknote,
    title: "Affordable Pricing",
    description: "Quality dental care shouldn't break the bank. We offer competitive pricing and flexible payment options.",
  },
];

const WhyChooseUs = () => (
  <section id="why-choose-us" className="py-20 bg-background">
    <div className="container">
      <div className="text-center mb-12 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Why Choose Us</span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Patients Trust Us</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          We go above and beyond to deliver dental care that exceeds expectations.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((r, i) => (
          <div key={i} className="text-center p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow group">
            <div className="w-14 h-14 rounded-full dental-gradient flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <r.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-bold text-card-foreground mb-2">{r.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
