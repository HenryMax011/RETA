"use client";

import { memo } from "react";
import { RetaLogo } from "@/components/brand/RetaLogo";
import { cn } from "@/lib/utils";

const socials = [
  { name: "Instagram", href: "https://www.instagram.com/retapublicidade/", short: "IG" },
  { name: "LinkedIn", href: "https://linkedin.com", short: "IN" },
];

const links = [
  { name: "Início", href: "#inicio" },
  { name: "Serviços", href: "#servicos" },
  { name: "Relatório", href: "#relatorio" },
  { name: "Contato", href: "#contato" },
];

function FooterComponent() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden bg-[#f5f5f7]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0071e3]/35 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-6 py-14 md:px-8 md:py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="max-w-xs">
            <a
              href="#inicio"
              aria-label="Reta Publicidade"
              className="inline-flex cursor-pointer"
            >
              <img
                src="/brand/reta-wordmark-light.png"
                alt="Reta Publicidade"
                className="h-14 w-auto object-contain md:h-16"
              />
            </a>
            <p className="mt-5 text-[13px] leading-relaxed text-[#1d1d1f]">
              Estratégia, criatividade e tecnologia — a nova geração da
              publicidade.
            </p>
            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#0071e3]">
              Estratégia · Criatividade · Resultados
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-10 sm:flex-row sm:justify-end sm:gap-16 md:gap-20">
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1d1d1f]">
                Navegação
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="cursor-pointer text-[14px] text-[#1d1d1f] transition-colors hover:text-[#0071e3]"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1d1d1f]">
                Social
              </p>
              <ul className="flex flex-col gap-2.5">
                {socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex cursor-pointer items-center gap-2.5 text-[14px] text-[#1d1d1f] transition-colors hover:text-[#0071e3]"
                    >
                      <span
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-md text-[9px] font-bold tracking-wide",
                          "bg-white text-[#6e6e73] ring-1 ring-black/[0.06]",
                          "transition-colors group-hover:bg-[#0071e3]/10 group-hover:text-[#0071e3] group-hover:ring-[#0071e3]/25",
                        )}
                      >
                        {social.short}
                      </span>
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-black/[0.06] pt-6 sm:flex-row sm:items-center">
          <p className="text-[12px] text-[#1d1d1f]">
            &copy; {year} Reta Publicidade. Todos os direitos reservados.
          </p>
          <a
            href="#contato"
            className="cursor-pointer text-[12px] font-medium text-[#0071e3] transition-opacity hover:opacity-80"
          >
            Fale conosco →
          </a>
        </div>
      </div>
    </footer>
  );
}

export const Footer = memo(FooterComponent);
