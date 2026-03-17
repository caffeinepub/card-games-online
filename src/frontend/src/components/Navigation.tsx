import { Menu, Mountain, Printer, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const NAV_LINKS_BG = [
  { label: "Начало", href: "#hero" },
  { label: "Храна", href: "#food" },
  { label: "Екипировка", href: "#equipment" },
  { label: "Умения", href: "#skills" },
  { label: "Карта", href: "#map" },
  { label: "Спешни", href: "#emergency" },
];

const NAV_LINKS_EN = [
  { label: "Home", href: "#hero" },
  { label: "Food", href: "#food" },
  { label: "Equipment", href: "#equipment" },
  { label: "Skills", href: "#skills" },
  { label: "Map", href: "#map" },
  { label: "Emergency", href: "#emergency" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<"BG" | "EN">("BG");

  const links = lang === "BG" ? NAV_LINKS_BG : NAV_LINKS_EN;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-scrolled" : "nav-gradient"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-2.5 group"
            data-ocid="nav.link"
          >
            <Mountain className="w-7 h-7 text-forest-light transition-colors group-hover:text-tan" />
            <span className="font-cinzel font-bold text-lg tracking-widest text-cream uppercase">
              RHODOPE <span className="text-forest-light">WILD</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-4 lg:gap-6"
            aria-label="Primary navigation"
          >
            {links.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-body text-sm font-medium text-cream/70 hover:text-cream transition-colors tracking-wide uppercase"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Print / PDF button */}
            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 text-xs font-body border border-border rounded px-2.5 py-1.5 text-cream/70 hover:text-cream hover:border-tan transition-colors"
              data-ocid="nav.primary_button"
              title="Печат / PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PDF</span>
            </button>

            {/* Language toggle */}
            <button
              type="button"
              onClick={() => setLang((l) => (l === "BG" ? "EN" : "BG"))}
              className="hidden sm:flex items-center gap-1 text-xs font-mono border border-border rounded px-2 py-1 text-cream/60 hover:text-cream hover:border-forest transition-colors"
              data-ocid="nav.toggle"
            >
              {lang === "BG" ? "EN" : "BG"}
            </button>

            {/* CTA */}
            <button
              type="button"
              onClick={() => handleNavClick("#food")}
              className="hidden sm:inline-flex items-center gap-2 bg-forest text-cream text-sm font-medium px-4 py-2 rounded-full hover:bg-forest-light transition-colors font-cinzel tracking-wider"
              data-ocid="nav.primary_button"
            >
              {lang === "BG" ? "РЪКОВОДСТВО" : "GUIDE"}
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden text-cream p-1"
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="md:hidden bg-charcoal-800 border-t border-border"
        >
          <div className="px-4 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left font-body text-base text-cream/80 hover:text-cream py-2 border-b border-border/50 last:border-b-0 tracking-wide"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-2 text-sm text-cream/70 hover:text-cream py-2"
              data-ocid="nav.primary_button"
            >
              <Printer className="w-4 h-4" />
              Печат / PDF
            </button>
            <button
              type="button"
              onClick={() => setLang((l) => (l === "BG" ? "EN" : "BG"))}
              className="text-left text-xs text-cream/50 hover:text-cream mt-2"
              data-ocid="nav.toggle"
            >
              Switch to {lang === "BG" ? "English" : "Български"}
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
