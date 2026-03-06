import { Sparkles, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import serviceWhitening from "@/assets/service-whitening.jpg";
import serviceImplant from "@/assets/service-implant.jpg";
import serviceCheckup from "@/assets/service-checkup.jpg";

const serviceCards = [
  {
    icon: Sparkles,
    title: "Teeth Whitening",
    description: "Professional teeth whitening treatments to restore your smile's natural brightness and boost your confidence.",
    image: serviceWhitening,
  },
  {
    icon: Heart,
    title: "Dental Implants",
    description: "Permanent tooth replacement solutions using the latest implant technology for a natural look and feel.",
    image: serviceImplant,
  },
  {
    icon: Shield,
    title: "General Dentistry",
    description: "Comprehensive dental care including check-ups, cleanings, fillings, and preventive treatments.",
    image: serviceCheckup,
  },
];

const Services = () => (
  <section id="services" className="py-20 bg-muted/50">
    <div className="container">
      <div className="text-center mb-12 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Our Services</span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">A Wide Range of Services</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          From routine check-ups to advanced cosmetic procedures, we offer a full spectrum of dental services.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {serviceCards.map((service, i) => (
          <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
            <div className="relative h-48 overflow-hidden">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              <div className="absolute -bottom-5 left-6 w-12 h-12 rounded-full dental-gradient flex items-center justify-center shadow-lg">
                <service.icon className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <div className="p-6 pt-8">
              <h3 className="text-lg font-bold text-card-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
              <a href="#" className="text-sm font-medium text-primary hover:underline">Learn more →</a>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Button variant="outline" size="lg">Explore All Services</Button>
      </div>
    </div>
  </section>
);

export default Services;
