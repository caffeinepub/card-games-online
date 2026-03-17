import { EyeOff, Leaf, MapPin, Siren, Stethoscope, Users } from "lucide-react";
import { motion } from "motion/react";

const PROTOCOLS = [
  {
    icon: Siren,
    color: "text-rust",
    bg: "bg-rust/10",
    border: "border-rust/40",
    title: "Незабавни приоритети",
    steps: [
      "1. Отдалечете се от опасността — веднага",
      "2. Намерете укритие — ниски места, гора",
      "3. Оценете ситуацията спокойно",
      "4. Избягвайте открити места и пътища",
      "5. Не ползвайте мобилен телефон без нужда",
    ],
  },
  {
    icon: MapPin,
    color: "text-tan",
    bg: "bg-tan/10",
    border: "border-tan/30",
    title: "Маршрути към Родопите",
    steps: [
      "От Пловдив: А1 → Асеновград → Смолян (180 км)",
      "От София: Ботевград → Ихтиман → Пазарджик (220 км)",
      "Алтернативен: Благоевград → Доспат (горски пътища)",
      "Избягвайте магистрали при масова евакуация",
      "Имайте поне 2 алтернативни маршрута",
    ],
  },
  {
    icon: EyeOff,
    color: "text-forest-light",
    bg: "bg-forest/10",
    border: "border-forest/30",
    title: "Укриване и маскировка",
    steps: [
      "Никога не застивайте на силуета на рида",
      "Използвайте гора, а не открити поляни",
      "Дим само нощем — денем е видим от далеч",
      "Огньовете — в ниши, долини, гористи места",
      "Шум — минимален, особено в нощта",
    ],
  },
  {
    icon: Users,
    color: "text-amber",
    bg: "bg-amber/10",
    border: "border-amber/30",
    title: "Групово оцеляване",
    steps: [
      "Назначете роли: наблюдател, готвач, медик",
      "Установете охранителен график (2ч. смени)",
      "Кешове в поне 3 различни места",
      "Комуникационни пунктове при разделяне",
      "Планирайте евакуационен маршрут предварително",
    ],
  },
  {
    icon: Stethoscope,
    color: "text-rust",
    bg: "bg-rust/10",
    border: "border-rust/40",
    title: "Медицина без болница",
    steps: [
      "Инфекции: почиствайте с чиста вода и йод",
      "Хипотермия: сухо облекло + захар + бавно топлене",
      "Ухапване от усойница: покой, не засмуквайте",
      "Счупване: импровизирана шина от клони",
      "Изгаряне: студена вода 15 мин, стерилна превръзка",
    ],
  },
  {
    icon: Leaf,
    color: "text-moss",
    bg: "bg-moss/10",
    border: "border-moss/30",
    title: "Дългосрочно оцеляване",
    steps: [
      "Основен лагер близо до вода, но не на брега",
      "Завъртате фуражни зони — не изчерпвайте едно место",
      "Улавяне на дъждовна вода — листни фунии",
      "Елементарна градинка: коприва, картофи",
      "Съхранение за зима: сушене, пушене, консервиране",
    ],
  },
];

export function EmergencySection() {
  return (
    <section id="emergency" className="py-16 md:py-24 bg-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-body tracking-[0.3em] uppercase text-rust mb-3">
            КАТЕГОРИЯ 04
          </p>
          <h2 className="font-cinzel text-3xl md:text-5xl text-cream tracking-widest uppercase mb-4">
            СПЕШНИ СЛУЧАИ
          </h2>
          <p className="font-body text-cream/60 max-w-2xl text-base leading-relaxed">
            Протоколи за военен конфликт, масова евакуация и екстремни ситуации
            в планинска среда.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          data-ocid="emergency.list"
        >
          {PROTOCOLS.map((proto, i) => (
            <motion.div
              key={proto.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className={`${proto.bg} border ${proto.border} rounded-sm p-6`}
              data-ocid={`emergency.item.${i + 1}`}
            >
              <div
                className={`w-10 h-10 ${proto.bg} ${proto.border} border rounded-sm flex items-center justify-center mb-4`}
              >
                <proto.icon className={`w-5 h-5 ${proto.color}`} />
              </div>
              <h3
                className={`font-cinzel text-base font-semibold tracking-wide uppercase ${proto.color} mb-4`}
              >
                {proto.title}
              </h3>
              <ul className="space-y-2">
                {proto.steps.map((step) => (
                  <li
                    key={step}
                    className="font-body text-xs text-cream/65 leading-snug"
                  >
                    {step}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
