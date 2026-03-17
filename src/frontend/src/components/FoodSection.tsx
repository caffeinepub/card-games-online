import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Droplets, Fish, Flame } from "lucide-react";
import { motion } from "motion/react";

const FOOD_ITEMS = [
  {
    bg: "Манатарки",
    en: "Porcini Mushroom",
    note: "Разпознайте добре",
    img: "/assets/generated/food-porcini.dim_400x300.jpg",
    type: "mushroom" as const,
  },
  {
    bg: "Лисички",
    en: "Chanterelles",
    note: "Ярко оранжево-жълти",
    img: "/assets/generated/food-chanterelle.dim_400x300.jpg",
    type: "mushroom" as const,
  },
  {
    bg: "Дива чесна",
    en: "Wild Garlic",
    note: "Листата — пролет",
    img: "/assets/generated/food-wild-garlic.dim_400x300.jpg",
    type: "plant" as const,
  },
  {
    bg: "Коприва",
    en: "Nettles",
    note: "Задължително сварете",
    img: "/assets/generated/food-nettles.dim_400x300.jpg",
    type: "plant" as const,
  },
  {
    bg: "Глухарче",
    en: "Dandelion",
    note: "Листа, корен, цветове",
    img: "/assets/generated/food-dandelion.dim_400x300.jpg",
    type: "plant" as const,
  },
  {
    bg: "Шипки",
    en: "Rose Hips",
    note: "Богати на вит. С",
    img: "/assets/generated/food-rosehips.dim_400x300.jpg",
    type: "berry" as const,
  },
  {
    bg: "Малини",
    en: "Raspberries",
    note: "Юли–Август",
    img: "/assets/generated/food-raspberries.dim_400x300.jpg",
    type: "berry" as const,
  },
  {
    bg: "Къпини",
    en: "Blackberries",
    note: "Август–Септември",
    img: "/assets/generated/food-blackberries.dim_400x300.jpg",
    type: "berry" as const,
  },
  {
    bg: "Горски ягоди",
    en: "Wild Strawberries",
    note: "Юни–Юли",
    img: "/assets/generated/food-wild-strawberries.dim_400x300.jpg",
    type: "berry" as const,
  },
  {
    bg: "Жълъди",
    en: "Acorns",
    note: "Накисвайте преди ядене",
    img: "/assets/generated/food-acorns.dim_400x300.jpg",
    type: "plant" as const,
    warning: true,
  },
  {
    bg: "Бъз",
    en: "Elder",
    note: "Само зрели плодове",
    img: "/assets/generated/food-elderberries.dim_400x300.jpg",
    type: "berry" as const,
    warning: true,
  },
  {
    bg: "Глог",
    en: "Hawthorn Berries",
    note: "Зрели са есента",
    img: "/assets/generated/food-hawthorn.dim_400x300.jpg",
    type: "berry" as const,
  },
];

const DANGERS = [
  { name: "Беладона (Atropa belladonna)", desc: "Смъртоносно отровна" },
  { name: "Непознати гъби", desc: "Само ако сте 100% сигурни" },
  { name: "Воден чемерик", desc: "Изглежда като моркови" },
  { name: "Стояща вода", desc: "Винаги пречиствайте" },
];

const badgeConfig = {
  plant: {
    label: "Растение",
    className: "bg-forest/20 text-forest-light border-forest/40",
  },
  berry: {
    label: "Плод/Горска",
    className: "bg-moss/20 text-moss border-moss/40",
  },
  mushroom: {
    label: "Гъба",
    className: "bg-amber/20 text-amber border-amber/40",
  },
};

export function FoodSection() {
  return (
    <section id="food" className="py-16 md:py-24 bg-charcoal-800">
      <div className="relative" aria-hidden="true">
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-10 -mt-10 mb-12"
        >
          <path
            d="M0,0 L0,50 L1440,50 L1440,0 L1380,25 L1300,5 L1220,30 L1140,8 L1060,32 L980,10 L900,38 L820,12 L740,40 L660,8 L580,35 L500,12 L420,38 L340,8 L260,35 L180,12 L100,40 L20,15 Z"
            fill="oklch(0.08 0.003 150)"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-body tracking-[0.3em] uppercase text-moss mb-3">
            КАТЕГОРИЯ 01
          </p>
          <h2 className="font-cinzel text-3xl md:text-5xl text-cream tracking-widest uppercase mb-4">
            ХРАНА И ВОДА
          </h2>
          <p className="font-body text-cream/60 max-w-2xl text-base leading-relaxed">
            Родопите предлагат богато разнообразие от ядивни растения и дивеч,
            но знанието за опасните видове е въпрос на живот и смърт.
          </p>
        </motion.div>

        {/* Photo card grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {FOOD_ITEMS.map((item, i) => {
            const badge = badgeConfig[item.type];
            return (
              <motion.div
                key={item.bg}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.06 }}
                className="bg-charcoal-900 border border-border rounded-sm overflow-hidden group card-glow"
                data-ocid={`food.item.${i + 1}`}
              >
                <div className="relative overflow-hidden h-40">
                  <img
                    src={item.img}
                    alt={`${item.bg} / ${item.en}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {item.warning && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-rust/80 text-cream border-rust text-[10px] px-1.5 py-0.5">
                        ⚠ Внимание
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-cinzel text-base text-cream font-semibold leading-tight mb-0.5">
                    {item.bg}
                  </p>
                  <p className="font-body text-xs text-cream/45 mb-2">
                    {item.en}
                  </p>
                  <p className="font-body text-xs text-cream/60 mb-2 leading-snug">
                    {item.note}
                  </p>
                  <Badge
                    variant="outline"
                    className={`text-[10px] px-1.5 py-0 ${badge.className}`}
                  >
                    {badge.label}
                  </Badge>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Water + Hunting + Preservation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-charcoal-900 border border-border rounded-sm p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="w-5 h-5 text-tan" />
              <h3 className="font-cinzel text-lg text-cream tracking-wide uppercase">
                Вода
              </h3>
            </div>
            <ul className="space-y-2">
              <li className="font-body text-sm text-cream/70">
                ✓ Планински извори и потоци — предпочитани
              </li>
              <li className="font-body text-sm text-cream/70">
                ✓ Варете минимум 5 минути или използвайте LifeStraw
              </li>
              <li className="font-body text-sm text-cream/70">
                ✓ Йодни таблетки — 2 на 1 литър, изчакайте 30 мин
              </li>
              <li className="font-body text-sm text-rust">
                ✗ Стояща вода — избягвайте
              </li>
              <li className="font-body text-sm text-rust">
                ✗ Вода под животновъдни ферми — опасна
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-charcoal-900 border border-border rounded-sm p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Fish className="w-5 h-5 text-amber" />
              <h3 className="font-cinzel text-lg text-cream tracking-wide uppercase">
                Лов и капани
              </h3>
            </div>
            <ul className="space-y-2">
              <li className="font-body text-sm text-cream/70">
                → Дива свиня — капани при водопои
              </li>
              <li className="font-body text-sm text-cream/70">
                → Зайци — примки от тел при пътеки
              </li>
              <li className="font-body text-sm text-cream/70">
                → Птици — клопки и мрежи
              </li>
              <li className="font-body text-sm text-cream/70">
                → Риболов в планински реки
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-charcoal-900 border border-border rounded-sm p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Flame className="w-5 h-5 text-amber" />
              <h3 className="font-cinzel text-lg text-cream tracking-wide uppercase">
                Консервиране
              </h3>
            </div>
            <ul className="space-y-2">
              <li className="font-body text-sm text-cream/70">
                • Пушене — при нисък огън 6–12 часа
              </li>
              <li className="font-body text-sm text-cream/70">
                • Сушене на слънце или близо до огъня
              </li>
              <li className="font-body text-sm text-cream/70">
                • Осоляване — 1 ч. сол на 4 ч. месо
              </li>
              <li className="font-body text-sm text-cream/70">
                • Замразяване при зимни условия
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Danger box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-rust/10 border border-rust/40 rounded-sm p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-rust" />
            <h3 className="font-cinzel text-lg text-rust tracking-wide uppercase">
              ВНИМАНИЕ — Опасни видове
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DANGERS.map((d) => (
              <div key={d.name} className="flex items-start gap-2">
                <span className="text-rust mt-0.5 flex-shrink-0">⚠</span>
                <div>
                  <span className="font-body font-semibold text-sm text-cream">
                    {d.name}
                  </span>
                  <span className="font-body text-xs text-cream/50 ml-2">
                    {d.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
