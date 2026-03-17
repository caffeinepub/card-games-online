import { ChevronDown, Shield } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  const scrollToGuide = () => {
    document.querySelector("#food")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCategories = () => {
    document
      .querySelector("#categories")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/rhodope-hero.dim_1920x1080.jpg')",
        }}
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 text-xs font-body tracking-[0.25em] uppercase text-forest-light border border-forest/40 rounded-full px-4 py-1.5 mb-8">
            <Shield className="w-3.5 h-3.5" />
            България · Родопи · Оцеляване
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="font-cinzel font-black text-5xl sm:text-7xl lg:text-8xl tracking-widest uppercase text-cream leading-none mb-6"
        >
          ОЦЕЛЕЙ
          <br />
          <span className="text-tan">В РОДОПИТЕ</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="font-body text-lg sm:text-xl text-cream/70 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Пълно ръководство за оцеляване в Родопите — храна, екипировка, умения
          и действия при извънредни ситуации и военен конфликт.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={scrollToGuide}
            className="inline-flex items-center gap-2 bg-tan text-charcoal-900 font-cinzel font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded-sm hover:bg-tan-light transition-all duration-300 hover:shadow-glow"
            data-ocid="hero.primary_button"
          >
            ЗАПОЧНИ СЕГА
          </button>
          <button
            type="button"
            onClick={scrollToCategories}
            className="inline-flex items-center gap-2 border border-cream/30 text-cream/80 font-body text-sm tracking-wide px-8 py-4 rounded-sm hover:border-cream/60 hover:text-cream transition-all duration-300"
            data-ocid="hero.secondary_button"
          >
            Виж категориите
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={scrollToCategories}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/40 hover:text-cream/70 transition-colors"
        aria-label="Scroll down"
        data-ocid="hero.button"
      >
        <ChevronDown className="w-8 h-8 animate-bounce" />
      </motion.button>

      {/* Mountain silhouette SVG divider */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-20"
        >
          <path
            d="M0,80 L0,55 L60,35 L120,50 L200,20 L280,45 L360,15 L440,40 L520,10 L600,38 L680,5 L760,32 L840,8 L920,35 L1000,12 L1080,42 L1160,18 L1240,45 L1320,22 L1380,48 L1440,30 L1440,80 Z"
            fill="oklch(0.08 0.003 150)"
          />
        </svg>
      </div>
    </section>
  );
}
