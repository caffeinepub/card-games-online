import { Backpack, Check } from "lucide-react";
import { motion } from "motion/react";

const TIERS = [
  {
    priority: "ПРИОРИТЕТ 1",
    label: "Животозапазващо",
    color: "text-rust",
    borderColor: "border-rust/40",
    bgColor: "bg-rust/10",
    items: [
      "Нож с фиксирано острие (качествен)",
      "Кремък (fire steel) + запалки + кибрит",
      "Спешна бивуашка чанта (emergency bivouac)",
      "Комплект за първа помощ + турникет",
      "Вода 2л + LifeStraw / Sawyer филтър",
      "Компас + топографска карта на Родопите",
    ],
  },
  {
    priority: "ПРИОРИТЕТ 2",
    label: "Силно препоръчително",
    color: "text-amber",
    borderColor: "border-amber/40",
    bgColor: "bg-amber/10",
    items: [
      "Палатка / тарпалин 3x3м",
      "Спален чувал до -10°C",
      "Многофункционален инструмент (Leatherman)",
      "Сгъваем трион / брадва",
      "Светещ фенер + резервни батерии",
      "Йодни таблетки за вода",
      "3-дневен хранителен резерв (freeze-dried)",
    ],
  },
  {
    priority: "ПРИОРИТЕТ 3",
    label: "Желателно",
    color: "text-forest-light",
    borderColor: "border-forest/40",
    bgColor: "bg-forest/10",
    items: [
      "GPS устройство (Garmin)",
      "Радиоприемник с ъгъл (кранк)",
      "Сигнално огледало + свирка",
      "Захранен от слънце зарядник",
      "Риболовен комплект",
      "Параш ко (550 paracord) 30м",
      "Свещи + херметически запалки",
    ],
  },
];

const CLOTHING = [
  "Термо бельо (мерино вълна) — основен слой",
  "Поларно яке (fleece 300) — среден слой",
  "Водоустойчив шел (Gore-Tex) — горен слой",
  "Трекинг обувки с глезенна опора (Gore-Tex)",
  "Вълнени чорапи — 3 чифта",
  "Шапка + ръкавици (водоустойчиви)",
  "Дъждобран / пончо",
];

export function EquipmentSection() {
  return (
    <section id="equipment" className="py-16 md:py-24 bg-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-body tracking-[0.3em] uppercase text-tan mb-3">
            КАТЕГОРИЯ 02
          </p>
          <h2 className="font-cinzel text-3xl md:text-5xl text-cream tracking-widest uppercase mb-4">
            ЕКИПИРОВКА
          </h2>
          <p className="font-body text-cream/60 max-w-2xl text-base leading-relaxed">
            Правилното снаряжение може да спаси живота ви. Сортирано по
            приоритет — носете поне приоритет 1 винаги с вас.
          </p>
        </motion.div>

        {/* Image + intro */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <img
              src="/assets/generated/rhodope-equipment.dim_800x500.jpg"
              alt="Survival equipment"
              className="w-full h-64 lg:h-full object-cover rounded-sm border border-border"
              loading="lazy"
            />
          </motion.div>

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.priority}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${tier.bgColor} border ${tier.borderColor} rounded-sm p-5`}
                data-ocid={`equipment.item.${i + 1}`}
              >
                <p
                  className={`text-xs font-body font-bold tracking-[0.2em] uppercase ${tier.color} mb-1`}
                >
                  {tier.priority}
                </p>
                <p className="font-cinzel text-sm text-cream/80 mb-4 tracking-wide">
                  {tier.label}
                </p>
                <ul className="space-y-2">
                  {tier.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check
                        className={`w-3.5 h-3.5 ${tier.color} mt-0.5 flex-shrink-0`}
                      />
                      <span className="font-body text-xs text-cream/70 leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Clothing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-charcoal-800 border border-border rounded-sm p-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <Backpack className="w-5 h-5 text-tan" />
            <h3 className="font-cinzel text-lg text-cream tracking-wide uppercase">
              Облекло — Слоеста система
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {CLOTHING.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 py-1.5 border-b border-border/40 last:border-0"
              >
                <span className="text-tan mt-1 flex-shrink-0 text-xs">●</span>
                <span className="font-body text-sm text-cream/70">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
