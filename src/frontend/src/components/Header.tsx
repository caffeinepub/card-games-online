import { AuthModal } from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallerProfile } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { LogOut, Spade, User } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function Header() {
  const [authOpen, setAuthOpen] = useState(false);
  const { identity, clear } = useInternetIdentity();
  const { data: profile } = useCallerProfile();

  const isLoggedIn = !!identity;

  return (
    <header className="navy-bg sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="header.link"
          >
            <div className="w-9 h-9 gold-gradient rounded-lg flex items-center justify-center shadow-gold">
              <Spade className="w-5 h-5 text-navy-900" fill="currentColor" />
            </div>
            <span className="text-white font-display font-bold text-xl tracking-wider uppercase">
              Card Masters
            </span>
          </Link>

          {/* Nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {[
              { label: "Games", href: "/#games" },
              { label: "Lobby", href: "/#lobby" },
              { label: "Rankings", href: "/#rankings" },
              { label: "How to Play", href: "/#how-to-play" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white/75 hover:text-gold-400 text-sm font-medium tracking-wide uppercase transition-colors duration-200"
                data-ocid="header.link"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Auth actions */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white bg-transparent hover:bg-white/10 gap-2"
                    data-ocid="header.dropdown_menu"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {profile?.username ?? "Player"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem
                    onClick={clear}
                    className="gap-2 text-destructive focus:text-destructive"
                    data-ocid="header.button"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAuthOpen(true)}
                  className="text-white/80 hover:text-white hover:bg-white/10"
                  data-ocid="header.button"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => setAuthOpen(true)}
                  className="gold-gradient text-navy-900 font-bold uppercase tracking-wide hover:opacity-90 shadow-gold border-0"
                  data-ocid="header.primary_button"
                >
                  Play Now
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </header>
  );
}
