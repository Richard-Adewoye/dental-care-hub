import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

const testimonials = [
  {
    number: "1",
    headline: "Painless Cleaning",
    quote:
      "I used to dread dental cleanings, but Dr Samuel's team made it completely painless. The hygienist was gentle, thorough, and even explained every step. My teeth have never felt this clean!",
    name: "Amina J.",
  },
  {
    number: "2",
    headline: "Informative Consult",
    quote:
      "From the moment I walked in, I felt welcome. The dentist took time to explain my treatment options without rushing me. I finally understand my dental health, and I feel confident about my care plan.",
    name: "Chukwudi O.",
  },
  {
    number: "3",
    headline: "Expert Implant",
    quote:
      "After losing a tooth in an accident, I was nervous about implants. The procedure was smooth, recovery was quick, and the result looks completely natural. I smile freely again thanks to Dr Samuel!",
    name: "Fatima B.",
  },
];

const Testimonials = () => (
  <section className="py-20 bg-primary/95 text-primary-foreground relative overflow-hidden">
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-accent-foreground/30 blur-3xl" />
    </div>

    <div className="container relative z-10">
      <div className="text-center mb-12 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/60">
          What Our Patients Say
        </span>
        <h2 className="text-3xl md:text-4xl font-bold">Our Testimonials</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 space-y-4"
          >
            <span className="text-4xl font-bold text-primary-foreground/20">
              {t.number}
            </span>
            <h3 className="text-lg font-semibold">{t.headline}</h3>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Avatar className="h-8 w-8 bg-primary-foreground/10">
                <AvatarFallback className="bg-primary-foreground/10 text-primary-foreground">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-primary-foreground/80">
                {t.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
