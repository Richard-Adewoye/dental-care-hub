import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const DedicatedCare = () => (
  <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
    {/* Subtle decorative elements */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-accent-foreground/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent-foreground/10 blur-3xl" />
    </div>

    <div className="container relative z-10 text-center max-w-3xl mx-auto space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold tracking-tight"
      >
        Dedicated Dental Care
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-primary-foreground/80 text-base md:text-lg leading-relaxed"
      >
        At Dr Samuel's Dental Clinic, we provide top-quality dental care with a
        personal touch. Our experienced team offers a wide range of services to
        meet your unique needs in a warm and welcoming environment.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <Button
          size="lg"
          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8 font-semibold shadow-lg"
          onClick={() => document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth" })}
        >
          Schedule Appointment
        </Button>
      </motion.div>
    </div>
  </section>
);

export default DedicatedCare;
