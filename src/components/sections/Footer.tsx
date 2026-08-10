"use client";

import { memo } from "react";
import { RetaLogo } from "@/components/brand/RetaLogo";

function FooterComponent() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-black/[0.06] bg-white px-4 py-12 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        <a href="#inicio" aria-label="Reta Publicidade">
          <RetaLogo variant="mark" size="sm" showWordmark={false} theme="light" />
        </a>

        <div className="text-center">
          <p className="tagline mb-2 text-[0.6rem]">
            Estratégia. Criatividade. Resultados.
          </p>
          <p className="text-xs text-[#6e6e73]">
            &copy; {year} Reta Publicidade. Todos os direitos reservados.
          </p>
        </div>

        <div className="flex gap-6">
          {["Instagram", "LinkedIn", "Behance"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-xs text-[#6e6e73] transition-colors hover:text-[#0071e3]"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export const Footer = memo(FooterComponent);
