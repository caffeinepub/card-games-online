import { Apple, Backpack, Brain, Siren } from "lucide-react";
import { motion } from "motion/react";

const CATEGORIES = [
  {
    id: "food",
    icon: Apple,
    color: "text-moss",
    bgColor: "bg-moss/10",
    borderColor: "border-moss/30",
    label: "ХРАНА И ВОДА",
    title: "Намиране на прехрана",
    desc: "Ядивни растения, гъби, дивеч и пречистване на вода в Родопите.",
    href: "#food",
  },
  {
    id: "equipment",
    icon: Backpack,
    color: "text-tan",
    bgColor: "bg-tan/10",
    borderColor: "border-tan/30",
    label: "ЕКИПИРОВКА",
    title: "Задължително снаряжение",
    desc: "Пълен списък с необходимите инструменти, облекло и оборудване.",
    href: "#equipment",
  },
  {
    id: "skills",
    icon: Brain,
    color: "text-amber",
    bgColor: "bg-amber/10",
    borderColor: "border-amber/30",
    label: "УМЕНИЯ",
    title: "Критични умения",
    desc: "Ориентация, разпалване на огън, укриване и оказване на първа помощ.",
    href: "#skills",
  },
  {
    id: "emergency",
    icon: Siren,
    color: "text-rust",
    bgColor: "bg-rust/10",
    borderColor: "border-rust/30",
    label: "СПЕШНИ СЛУЧАИ",
    title: "Военни и кризисни сценарии",
    desc: "Протоколи при военен конфликт, евакуация и дългосрочно оцеляване.",
    href: "#emergency",
  },
];

export function CategoryCards() {
  const handleClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="categories" className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="text-xs font-body tracking-[0.3em] uppercase text-forest-light mb-3">
          ЧЕТИРИ СТЪЛБА
        </p>
        <h2 className="font-cinzel text-3xl md:text-4xl text-cream tracking-widest uppercase">
          НА ОЦЕЛЯВАНЕТО
        </h2>
      </motion.div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
        data-ocid="categories.list"
      >
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            data-ocid={`categories.item.${i + 1}`}
          >
            <button
              type="button"
              onClick={() => handleClick(cat.href)}
              className={`w-full text-left flex items-start gap-5 p-6 md:p-8 bg-charcoal-800 border ${cat.borderColor} rounded-sm hover:bg-charcoal-700 transition-all duration-300 card-glow group`}
              data-ocid={`categories.${cat.id}.button`}
            >
              <div
                className={`flex-shrink-0 w-12 h-12 ${cat.bgColor} ${cat.borderColor} border rounded-sm flex items-center justify-center`}
              >
                <cat.icon className={`w-6 h-6 ${cat.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-xs font-body font-semibold tracking-[0.2em] uppercase mb-1 ${cat.color}`}
                >
                  {cat.label}
                </p>
                <h3 className="font-cinzel text-lg text-cream mb-2 tracking-wide">
                  {cat.title}
                </h3>
                <p className="font-body text-sm text-cream/60 leading-relaxed">
                  {cat.desc}
                </p>
                <span
                  className={`inline-block mt-4 text-xs font-body font-semibold tracking-widest uppercase ${cat.color} group-hover:translate-x-1 transition-transform duration-200`}
                >
                  ВИЖ РЪКОВОДСТВО →
                </span>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
