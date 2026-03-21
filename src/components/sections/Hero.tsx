import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroMan from "@/assets/hero-man.jpg";

const navCards = [
  { label: "Our cases", active: false },
  { label: "+300 patients treated", active: true },
  { label: "About Us", active: false },
  { label: "Team", active: false },
  { label: "Why choose us", active: false },
];

const Hero = () => (
  <section id="home" className="relative min-h-[90vh] flex flex-col overflow-hidden">
    {/* Split background */}
    <div className="absolute inset-0 flex">
      <div className="w-full lg:w-1/2 bg-primary" />
      <div className="hidden lg:block w-1/2 relative">
        <img
          src={heroMan}
          alt="Smiling patient at Dr Samuel's Dental Clinic"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/20 to-transparent" />
      </div>
    </div>

    {/* Content */}
    <div className="relative z-10 flex-1 flex flex-col justify-center container">
      <div className="grid lg:grid-cols-2 gap-8 items-center py-20 lg:py-0">
        {/* Left text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] tracking-tight">
            Your Bright{" "}
            <span className="block">Smile</span>{" "}
            <span className="block">Awaits</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-md leading-relaxed">
            Experience world-class dental care with Dr Samuel's team. We combine expertise with compassion for your perfect smile.
          </p>
          <button
            onClick={() => document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 text-primary-foreground font-semibold text-sm uppercase tracking-wider hover:bg-primary-foreground/20 transition-all"
          >
            Book An Appointment
          </button>
        </motion.div>

        {/* Mobile image */}
        <div className="lg:hidden relative rounded-3xl overflow-hidden aspect-[3/4] max-w-sm mx-auto">
          <img
            src={heroMan}
            alt="Smiling patient at Dr Samuel's Dental Clinic"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      </div>
    </div>

    {/* Navigation arrows */}
    <div className="relative z-10 container flex justify-end gap-2 pb-4 -mt-4 lg:mt-0">
      <button className="w-10 h-10 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-all">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button className="w-10 h-10 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-all">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>

    {/* Glassmorphism bottom cards */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative z-10 container pb-8"
    >
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {navCards.map((card) => (
          <button
            key={card.label}
            className={`flex-shrink-0 px-6 py-3 rounded-xl backdrop-blur-lg border text-sm font-medium transition-all whitespace-nowrap ${
              card.active
                ? "bg-primary-foreground/25 border-primary-foreground/40 text-primary-foreground"
                : "bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground/70 hover:bg-primary-foreground/15"
            }`}
          >
            {card.label}
          </button>
        ))}
      </div>
    </motion.div>
  </section>
);

export default Hero;
