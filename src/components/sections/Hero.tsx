import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const Hero = () => (
  <section id="home" className="relative overflow-hidden bg-background">
    <div className="container py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider">
            Top-Notch Dental Care
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Your Best{" "}
            <span className="text-primary">Dental Experience</span>{" "}
            Awaits
          </h1>
          <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
            We provide the highest quality dental care, using the latest technology and techniques to give you a healthy, beautiful smile.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <Button size="lg" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
              Explore Our Services
            </Button>
            <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group">
              <span className="w-10 h-10 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Play className="w-4 h-4 ml-0.5" />
              </span>
              Watch Video
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-6 border-t border-border mt-6">
            <div>
              <p className="text-2xl font-bold text-primary">15+</p>
              <p className="text-xs text-muted-foreground">Years Experience</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">10K+</p>
              <p className="text-xs text-muted-foreground">Happy Patients</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">20+</p>
              <p className="text-xs text-muted-foreground">Expert Doctors</p>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="relative flex justify-center">
          <div className="absolute top-8 right-0 w-80 h-80 rounded-full bg-primary/10 -z-10" />
          <div className="absolute bottom-0 left-8 w-48 h-48 rounded-full bg-accent -z-10" />
          <div className="relative w-full max-w-md">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-accent">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=800&fit=crop"
                alt="Professional dentist at Dr Samuel's Dental Clinic"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-5 py-3 rounded-xl shadow-lg">
              <p className="text-2xl font-bold">15+</p>
              <p className="text-xs opacity-80">Years of Expertise</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
