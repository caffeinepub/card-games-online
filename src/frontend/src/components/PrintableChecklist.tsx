export function PrintableChecklist() {
  const dateStr = new Date().toLocaleDateString("bg-BG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div id="printable-checklist">
      <div className="print-header">
        <h1>РОДОПИ — ОЦЕЛЯВАНЕ: ПЪЛЕН КОНТРОЛЕН СПИСЪК</h1>
        <p>Дата на печат: {dateStr}</p>
        <p>rhodope-survival-guide.caffeine.la</p>
      </div>

      <section className="print-section">
        <h2>ЕКИПИРОВКА — ПРИОРИТЕТ 1 (Животозапазващо)</h2>
        <ul>
          {[
            "Нож с фиксирано острие (качествен)",
            "Кремък (fire steel) + запалки + кибрит",
            "Спешна бивуашка чанта (emergency bivouac)",
            "Комплект за първа помощ + турникет",
            "Вода 2л + LifeStraw / Sawyer филтър",
            "Компас + топографска карта на Родопите",
          ].map((item) => (
            <li key={item}>□ {item}</li>
          ))}
        </ul>
      </section>

      <section className="print-section">
        <h2>ЕКИПИРОВКА — ПРИОРИТЕТ 2 (Силно препоръчително)</h2>
        <ul>
          {[
            "Палатка / тарпалин 3x3м",
            "Спален чувал до -10°C",
            "Многофункционален инструмент (Leatherman)",
            "Сгъваем трион / брадва",
            "Светещ фенер + резервни батерии",
            "Йодни таблетки за вода",
            "3-дневен хранителен резерв (freeze-dried)",
          ].map((item) => (
            <li key={item}>□ {item}</li>
          ))}
        </ul>
      </section>

      <section className="print-section">
        <h2>ЕКИПИРОВКА — ПРИОРИТЕТ 3 (Желателно)</h2>
        <ul>
          {[
            "GPS устройство (Garmin)",
            "Радиоприемник с ъгъл (кранк)",
            "Сигнално огледало + свирка",
            "Захранен от слънце зарядник",
            "Риболовен комплект",
            "Парашко (550 paracord) 30м",
            "Свещи + херметически запалки",
          ].map((item) => (
            <li key={item}>□ {item}</li>
          ))}
        </ul>
      </section>

      <section className="print-section">
        <h2>ОБЛЕКЛО</h2>
        <ul>
          {[
            "Термо бельо (мерино вълна) — основен слой",
            "Поларно яке (fleece 300) — среден слой",
            "Водоустойчив шел (Gore-Tex) — горен слой",
            "Трекинг обувки с глезенна опора (Gore-Tex)",
            "Вълнени чорапи — 3 чифта",
            "Шапка + ръкавици (водоустойчиви)",
            "Дъждобран / пончо",
          ].map((item) => (
            <li key={item}>□ {item}</li>
          ))}
        </ul>
      </section>

      <section className="print-section">
        <h2>ЯДИВНИ РАСТЕНИЯ И ГЪБИ</h2>
        <ul>
          {[
            "Манатарки (Porcini) — разпознайте добре",
            "Лисички (Chanterelles) — ярко оранжево-жълти",
            "Дива чесна (Wild Garlic) — листата, пролет",
            "Коприва (Nettles) — задължително сварете",
            "Глухарче (Dandelion) — листа, корен, цветове",
            "Шипки (Rose Hips) — богати на вит. С",
            "Малини (Raspberries) — Юли–Август",
            "Къпини (Blackberries) — Август–Септември",
            "Горски ягоди (Wild Strawberries) — Юни–Юли",
            "Жълъди (Acorns) — накисвайте преди ядене",
            "Бъз (Elder) — само зрели плодове",
            "Глог (Hawthorn Berries) — зрели са есента",
          ].map((item) => (
            <li key={item}>□ {item}</li>
          ))}
        </ul>
      </section>

      <section className="print-section print-danger">
        <h2>⚠ ОПАСНИ ВИДОВЕ — НИКОГА НЕ ЯЖТЕ</h2>
        <ul>
          <li>✗ Беладона (Atropa belladonna) — смъртоносно отровна</li>
          <li>✗ Непознати гъби — само ако сте 100% сигурни</li>
          <li>✗ Воден чемерик — изглежда като моркови</li>
          <li>✗ Стояща вода — винаги пречиствайте</li>
        </ul>
      </section>

      <section className="print-section">
        <h2>КРИТИЧНИ УМЕНИЯ</h2>
        <ul>
          <li>□ Ориентация — компас, топографска карта, звезди</li>
          <li>□ Укриване — пещери, дебрис хижа, lean-to с тарп</li>
          <li>□ Огън — кремък, суха дървесина, поддържане в дъжд</li>
          <li>□ Първа помощ — рани, хипотермия, ухапвания от усойница</li>
          <li>□ Сигнализиране — SOS огъни, 3 свирки, сигнално огледало</li>
          <li>□ Скрито движение — шумова дисциплина, нощни терени</li>
          <li>□ Психологическа устойчивост — спокойствие, приоритети</li>
          <li>□ Пречистване на вода — кипене, LifeStraw, йодни таблетки</li>
        </ul>
      </section>

      <div className="print-footer">
        <p>rhodope-survival-guide.caffeine.la | Родопи — Оцеляване</p>
        <p>Приоритет при кризис: УКРИТИЕ → ВОДА → ОГЪН → ХРАНА</p>
      </div>
    </div>
  );
}
