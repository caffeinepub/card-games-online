import { Apple, Brain, Droplets, Flame, Home } from "lucide-react";
import { motion } from "motion/react";

const PRIORITIES = [
  {
    num: "01",
    icon: Brain,
    label: "СПОКОЙСТВИЕ",
    desc: "Паниката убива по-бързо от студа. Дишайте, мислете, действайте.",
  },
  {
    num: "02",
    icon: Home,
    label: "УКРИТИЕ",
    desc: "Защита от студ, вятър и дъжд. Без топлина умирате за часове.",
  },
  {
    num: "03",
    icon: Droplets,
    label: "ВОДА",
    desc: "3 дни без вода = смърт. Намерете и пречиствайте непрекъснато.",
  },
  {
    num: "04",
    icon: Flame,
    label: "ОГЪН",
    desc: "Топлина, сигнализиране, готвене, пречистване. Умейте да го правите.",
  },
  {
    num: "05",
    icon: Apple,
    label: "ХРАНА",
    desc: "3 седмици без храна можете. Но тя дава сила и морал за борбата.",
  },
];

export function QuickTips() {
  return (
    <section
      className="py-16 md:py-24 bg-charcoal-800"
      data-ocid="quicktips.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-body tracking-[0.3em] uppercase text-tan mb-3">
            ПРАВИЛОТО НА ТРИТЕ
          </p>
          <h2 className="font-cinzel text-3xl md:text-4xl text-cream tracking-widest uppercase">
            5 ПРИОРИТЕТА НА ОЦЕЛЯВАНЕТО
          </h2>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-5 gap-3"
          data-ocid="quicktips.list"
        >
          {PRIORITIES.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-charcoal-900 border border-border rounded-sm p-5 text-center group hover:border-tan/50 transition-all duration-300"
              data-ocid={`quicktips.item.${i + 1}`}
            >
              <div className="font-cinzel text-4xl font-black text-forest/30 mb-3 group-hover:text-tan/50 transition-colors">
                {p.num}
              </div>
              <div className="w-10 h-10 bg-tan/10 border border-tan/20 rounded-sm flex items-center justify-center mx-auto mb-3">
                <p.icon className="w-5 h-5 text-tan" />
              </div>
              <h3 className="font-cinzel text-sm tracking-widest text-cream mb-2 uppercase">
                {p.label}
              </h3>
              <p className="font-body text-xs text-cream/55 leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
