import { Spade } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="navy-bg text-white/60 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 gold-gradient rounded flex items-center justify-center">
              <Spade className="w-4 h-4 text-navy-900" fill="currentColor" />
            </div>
            <span className="text-white font-bold tracking-wide">
              CARD MASTERS
            </span>
          </div>
          <p className="text-sm">
            © {year}. Built with ❤️ using{" "}
            <a
              href={utm}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex gap-6 text-sm">
            <span className="text-white/40">
              Belot • Santase • Durak • Spades
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
