import { ExternalLink, Mountain } from "lucide-react";

const LINKS = {
  guide: [
    { label: "Храна и вода", href: "#food" },
    { label: "Екипировка", href: "#equipment" },
    { label: "Умения", href: "#skills" },
    { label: "Спешни случаи", href: "#emergency" },
  ],
  resources: [
    { label: "Карти на Родопите", href: "https://bgmaps.net" },
    { label: "Гражданска защита", href: "https://www.civilprotection.bg" },
    { label: "Планинска спасителна служба", href: "https://pss.bg" },
    { label: "Метео предупреждения", href: "https://meteo.bg" },
  ],
};

const handleNav = (href: string) => {
  if (href.startsWith("#")) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.open(href, "_blank", "noopener,noreferrer");
  }
};

export function SurvivalFooter() {
  const year = new Date().getFullYear();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-charcoal-900 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="w-6 h-6 text-forest-light" />
              <span className="font-cinzel font-bold text-base tracking-widest text-cream uppercase">
                RHODOPE <span className="text-forest-light">WILD</span>
              </span>
            </div>
            <p className="font-body text-sm text-cream/50 leading-relaxed max-w-xs">
              Пълно ръководство за оцеляване в Родопите при природни бедствия,
              военен конфликт или лична криза.
            </p>
            <div className="mt-6 p-4 bg-rust/10 border border-rust/30 rounded-sm">
              <p className="font-body text-xs text-rust font-semibold mb-1">
                ОТКАЗ ОТ ОТГОВОРНОСТ
              </p>
              <p className="font-body text-xs text-cream/40 leading-relaxed">
                Информацията е образователна. Практикувайте уменията преди
                нужда. При реална опасност следвайте официалните власти.
              </p>
            </div>
          </div>

          {/* Guide links */}
          <div>
            <p className="font-cinzel text-xs tracking-[0.2em] uppercase text-cream/50 mb-4">
              Ръководство
            </p>
            <ul className="space-y-2">
              {LINKS.guide.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => handleNav(link.href)}
                    className="font-body text-sm text-cream/60 hover:text-cream transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* External resources */}
          <div>
            <p className="font-cinzel text-xs tracking-[0.2em] uppercase text-cream/50 mb-4">
              Ресурси
            </p>
            <ul className="space-y-2">
              {LINKS.resources.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => handleNav(link.href)}
                    className="font-body text-sm text-cream/60 hover:text-cream transition-colors flex items-center gap-1"
                    data-ocid="footer.link"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-cream/30">
            © {year} Rhodope Wild. Всички права запазени.
          </p>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-cream/30 hover:text-cream/60 transition-colors"
          >
            Built with ❤ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
