import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import dental5 from "@/assets/dental-5.jpg";

const bullets = [
  "Advanced dental equipment and sterilization protocols",
  "Personalized treatment plans for every patient",
  "Comfortable and relaxing clinic environment",
];

const AboutUs = () => (
  <section id="about" className="py-20 bg-background">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden">
            <img
              src={dental5}
              alt="Dental care at Exceptional Dental Care clinic"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {/* Logo overlay */}
          <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg">
            <p className="text-sm font-bold">Exceptional</p>
            <p className="text-xs opacity-70">Dental Care</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">About Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            35+ Years of Experience in Dental Care
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            At Exceptional Dental Care, we are dedicated to providing outstanding dental care with a compassionate approach. Our team of experienced professionals uses state-of-the-art technology to ensure you receive the best treatment possible.
          </p>
          <ul className="space-y-3">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground text-sm">{b}</span>
              </li>
            ))}
          </ul>
          <Button variant="outline" className="mt-2">Learn More</Button>
        </div>
      </div>
    </div>
  </section>
);

export default AboutUs;
