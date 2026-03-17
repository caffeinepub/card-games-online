import {
  Brain,
  Compass,
  Eye,
  Flame,
  Heart,
  Home,
  Radio,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";

const SKILLS = [
  {
    icon: Compass,
    color: "text-tan",
    bg: "bg-tan/10",
    border: "border-tan/30",
    title: "Ориентация",
    content: [
      "Четене на топографски карти с хоризонтали",
      "Работа с компас — азимут и обратен азимут",
      "Разпознаване на ключови ориентири в Родопите",
      "Навигация нощем по звездите",
    ],
  },
  {
    icon: Home,
    color: "text-forest-light",
    bg: "bg-forest/10",
    border: "border-forest/30",
    title: "Укриване",
    content: [
      "Намиране на естествено укритие (пещери, скали)",
      "Изграждане на дебрис хижа (debris hut)",
      "Lean-to укритие с тарп",
      "Изолация от земята — спи на листа и клони",
    ],
  },
  {
    icon: Flame,
    color: "text-amber",
    bg: "bg-amber/10",
    border: "border-amber/30",
    title: "Огън",
    content: [
      "Суха букова и дъбова дървесина — предпочитана",
      "Тепи (tipi), хоризонтална и колибена наредба",
      "Поддържане на огъня в дъжд",
      "Безопасно угасяване — никога не оставяйте жив огън",
    ],
  },
  {
    icon: Heart,
    color: "text-rust",
    bg: "bg-rust/10",
    border: "border-rust/30",
    title: "Първа помощ",
    content: [
      "Лечение на рани — дезинфекция, превръзка, шев",
      "Хипотермия — сигнали, затопляне, предотвратяване",
      "Ухапвания от усойница — не засмуквайте",
      "Импровизирани шини при счупени кости",
    ],
  },
  {
    icon: Radio,
    color: "text-tan",
    bg: "bg-tan/10",
    border: "border-tan/30",
    title: "Сигнализиране",
    content: [
      "SOS — 3 огъня в триъгълник",
      "3 свирки — пауза — 3 свирки (международен знак)",
      "Сигнално огледало към самолет",
      "Видими маркери на земята от въздух",
    ],
  },
  {
    icon: Eye,
    color: "text-moss",
    bg: "bg-moss/10",
    border: "border-moss/30",
    title: "Скрито движение",
    content: [
      "Шумова дисциплина — бавно, по земята",
      "Избягвайте ридовете — силует на фона на небето",
      "Движение нощем — следвайте ниски терени",
      "Избягвайте пътища и открити поляни",
    ],
  },
  {
    icon: Brain,
    color: "text-amber",
    bg: "bg-amber/10",
    border: "border-amber/30",
    title: "Психологическа устойчивост",
    content: [
      "Останете спокойни — паниката убива",
      "Приоритизирайте: укритие > вода > огън > храна",
      "Вземайте решения бавно и обмислено",
      "Поддържайте дневен режим и малки цели",
    ],
  },
  {
    icon: Shield,
    color: "text-forest-light",
    bg: "bg-forest/10",
    border: "border-forest/30",
    title: "Пречистване на вода",
    content: [
      "Кипене — 5+ минути на висока температура",
      "Филтриране с LifeStraw или Sawyer Squeeze",
      "Йодни таблетки — ефективни до 30°C вода",
      "Импровизиран филтър: пясък, въглен, плат",
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-24 bg-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-body tracking-[0.3em] uppercase text-amber mb-3">
            КАТЕГОРИЯ 03
          </p>
          <h2 className="font-cinzel text-3xl md:text-5xl text-cream tracking-widest uppercase mb-4">
            КРИТИЧНИ УМЕНИЯ
          </h2>
          <p className="font-body text-cream/60 max-w-2xl text-base leading-relaxed">
            Умения, придобити преди кризата — единственото нещо, което никой не
            може да ви вземе.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          data-ocid="skills.list"
        >
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.08 }}
              className={`${skill.bg} border ${skill.border} rounded-sm p-5`}
              data-ocid={`skills.item.${i + 1}`}
            >
              <div
                className={`w-9 h-9 ${skill.bg} ${skill.border} border rounded-sm flex items-center justify-center mb-4`}
              >
                <skill.icon className={`w-4.5 h-4.5 ${skill.color}`} />
              </div>
              <h3
                className={`font-cinzel text-sm font-semibold tracking-wide uppercase ${skill.color} mb-3`}
              >
                {skill.title}
              </h3>
              <ul className="space-y-1.5">
                {skill.content.map((point) => (
                  <li
                    key={point}
                    className="font-body text-xs text-cream/60 leading-snug pl-2 relative before:absolute before:left-0 before:top-1.5 before:w-1 before:h-1 before:rounded-full before:bg-current before:opacity-40"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Skills image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <img
            src="/assets/generated/rhodope-skills.dim_800x500.jpg"
            alt="Fire making skills in Rhodope mountains"
            className="w-full h-56 md:h-72 object-cover rounded-sm border border-border object-top"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
