"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Home,
  Images,
  Mail,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import Image from "next/image";
import { memo, useEffect, useState } from "react";
import { RetaLogo } from "@/components/brand/RetaLogo";
import {
  NavBar as TubelightNav,
  type TubelightNavItem,
} from "@/components/ui/tubelight-navbar";
import { cn } from "@/lib/utils";

const navItems: TubelightNavItem[] = [
  { name: "Início", url: "#inicio", icon: Home },
  { name: "Portfólio", url: "#simbolo", icon: Images },
  { name: "Serviços", url: "#servicos", icon: Briefcase },
  { name: "Sobre nós", url: "#sobre", icon: Sparkles },
  { name: "Contato", url: "#contato", icon: Mail },
];

function NavbarComponent() {
  const [overHero, setOverHero] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("inicio");
      if (!hero) {
        setOverHero(false);
        return;
      }
      const bottom = hero.getBoundingClientRect().bottom;
      setOverHero(bottom > 72);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const linkTone = overHero || menuOpen;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={cn(
          "border-b backdrop-blur-xl transition-colors duration-300",
          overHero
            ? "border-transparent bg-black/40"
            : "border-white/[0.06] bg-[#0a0b0f]/90",
        )}
      >
        <nav
          className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:h-[4.25rem] md:gap-4 md:px-8"
          aria-label="Navegação principal"
        >
          <a
            href="#inicio"
            aria-label="Reta Publicidade — início"
            className="relative z-10 shrink-0 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
              <Image
                src="/brand/reta-wordmark-dark.png"
                alt="Reta Publicidade"
                width={120}
                height={60}
                className="h-24 w-auto object-contain md:h-28"
                unoptimized
              />
          </a>

          <TubelightNav
            items={navItems}
            tone="dark"
            className="hidden min-w-0 flex-1 justify-center lg:flex"
          />

          <div className="relative z-10 flex shrink-0 items-center gap-2">
            <motion.a
              href="#contato"
              className={cn(
                "group relative hidden cursor-pointer items-center justify-center gap-1.5 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 sm:inline-flex md:px-5",
                overHero
                  ? "rounded-full border border-[#0071e3] text-white hover:bg-[#0071e3]/15"
                  : "rounded-full border border-[#0071e3] bg-[#0071e3] text-white hover:bg-[#0077ed]",
              )}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setMenuOpen(false)}
            >
              <span className="relative">Fale Conosco</span>
              <ArrowRight className="relative h-3 w-3 opacity-80 transition-transform duration-300 group-hover:translate-x-0.5" />
            </motion.a>

            <button
              type="button"
              className={cn(
                "inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-[9px] transition-colors lg:hidden",
                overHero
                  ? "text-white hover:bg-white/10"
                  : "text-[#1d1d1f] hover:bg-black/[0.05]",
              )}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <X className="h-5 w-5" strokeWidth={2} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={2} />
              )}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Fechar menu"
              className="fixed inset-0 z-40 bg-black/45 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className={cn(
                "absolute inset-x-0 top-full z-50 border-b px-4 pb-6 pt-2 shadow-[0_20px_50px_rgba(0,0,0,0.18)] lg:hidden",
                linkTone
                  ? "border-white/10 bg-[#111113]/98 backdrop-blur-xl"
                  : "border-black/[0.06] bg-white/98 backdrop-blur-xl",
              )}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="flex flex-col gap-0.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <a
                        href={item.url}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3.5 text-[15px] font-medium transition-colors",
                          linkTone
                            ? "text-white/85 hover:bg-white/[0.08] hover:text-white"
                            : "text-[#1d1d1f] hover:bg-black/[0.04]",
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-[18px] w-[18px]",
                            linkTone ? "text-[#7ec4ff]" : "text-[#0071e3]",
                          )}
                          strokeWidth={2}
                        />
                        {item.name}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <a
                href="#contato"
                onClick={() => setMenuOpen(false)}
                className="mt-4 flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-full border border-[#0071e3] px-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white"
              >
                Fale Conosco
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export const Navbar = memo(NavbarComponent);
