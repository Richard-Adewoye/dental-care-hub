import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dental1 from "@/assets/dental-1.jpg";
import dental2 from "@/assets/dental-2.jpg";
import dental3 from "@/assets/dental-3.jpg";
import dental4 from "@/assets/dental-4.jpg";

const slides = [
  { image: dental1, alt: "Patient receiving dental care at Exceptional Dental Care" },
  { image: dental2, alt: "Dental procedure at Exceptional Dental Care" },
  { image: dental3, alt: "Bright healthy smile" },
  { image: dental4, alt: "Professional dental treatment" },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const imagesLoaded = useRef(false);

  // Preload all images once and mark ready
  useEffect(() => {
    if (imagesLoaded.current) return;
    let loaded = 0;
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
      img.onload = () => {
        loaded++;
        if (loaded === slides.length) {
          imagesLoaded.current = true;
          setReady(true);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === slides.length) {
          imagesLoaded.current = true;
          setReady(true);
        }
      };
    });
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // After crossfade completes, update displayIndex to match current
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayIndex(current);
    }, 2000); // match CSS transition duration
    return () => clearTimeout(timer);
  }, [current]);

  // Auto-advance
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      {/* All slides stacked — only current one is opacity-100 */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: "opacity 2s ease-in-out",
            zIndex: i === current ? 2 : i === displayIndex ? 1 : 0,
          }}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="sync"
            style={{
              transform: i === current && ready ? "scale(1.08)" : "scale(1)",
              transition: "transform 10s ease-out",
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end container pb-16 pt-32">
        <div className="grid lg:grid-cols-2 gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight">
              Exceptional
              <br />
              dental care.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6 lg:pb-2"
          >
            <p className="text-white/80 text-base md:text-lg max-w-md leading-relaxed">
              Our team is committed to delivering top-quality, compassionate treatments in a comfortable environment.
            </p>
            <button
              onClick={() =>
                document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3.5 rounded-sm bg-white text-foreground font-semibold text-sm uppercase tracking-wider hover:bg-white/90 transition-all"
            >
              Book Now
            </button>
          </motion.div>
        </div>
      </div>

      {/* Navigation arrows */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 right-6 z-20 flex gap-2">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current ? "bg-white scale-110" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
