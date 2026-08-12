"use client";

import Image from "next/image";
import { memo } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const pillars = ["Estratégia", "Criatividade", "Resultados"] as const;

function AboutComponent() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden bg-[#060810] px-6 py-28 md:px-12 md:py-44"
      aria-labelledby="about-heading"
    >
      {/* Laptop no lado esquerdo */}
      <div className="pointer-events-none absolute inset-y-0 left-[-12%] flex w-[75%] items-center justify-start md:left-[-8%]" aria-hidden>
        <Image
          src="/brand/laptop-mockup.png"
          alt=""
          width={1400}
          height={875}
          className="w-full max-w-5xl object-contain opacity-70"
          unoptimized
        />
      </div>

      {/* Overlay gradiente da direita para legibilidade do texto */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#060810] via-[#060810]/80 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.42em] text-[#0071e3]">
            Quem Somos
          </p>

          <h2
            id="about-heading"
            className="mx-auto max-w-3xl font-[family-name:var(--font-display)] text-[clamp(1.9rem,4.6vw,3.15rem)] font-bold leading-[1.15] tracking-tight text-white"
          >
            Não queremos apenas fazer sua marca{" "}
            <span className="relative inline-block px-0.5 text-[#555]">
              aparecer
              <span
                className="absolute left-0 right-0 top-[52%] h-[1.5px] origin-left rounded-full bg-[#0071e3]"
                aria-hidden
              />
            </span>
            .
            <span className="mt-3 block sm:mt-4">
              Queremos fazer sua marca{" "}
              <span className="relative inline-block text-blue-glow">
                avançar
                <span
                  className="pointer-events-none absolute -inset-x-3 -inset-y-1 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,113,227,0.18),transparent_70%)] blur-md"
                  aria-hidden
                />
              </span>
              .
            </span>
          </h2>

          <p className="mx-auto mt-10 max-w-xl text-[15px] leading-relaxed text-white/90 md:mt-12 md:text-base">
            A Reta Publicidade nasce da união entre estratégia, criatividade,
            tecnologia e inteligência artificial. Guiamos marcas com direção
            clara — da ideia ao resultado.
          </p>

          <div className="mx-auto mt-14 flex max-w-sm flex-col items-center md:mt-16">
            <div className="flex w-full items-center gap-4" aria-hidden>
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3]/70" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <p className="mt-8 font-[family-name:var(--font-display)] text-[1.65rem] font-bold tracking-tight text-white md:text-[2rem]">
              Essa é a <span className="text-blue-glow">RETA</span>.
            </p>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
              {pillars.map((item, i) => (
                <li key={item} className="flex items-center gap-1">
                  {i > 0 && (
                    <span
                      className="mx-2 h-1 w-1 rounded-full bg-[#0071e3]/45"
                      aria-hidden
                    />
                  )}
                  <span className="rounded-md px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0071e3] transition-colors duration-300 hover:bg-[rgba(0,113,227,0.08)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export const About = memo(AboutComponent);
