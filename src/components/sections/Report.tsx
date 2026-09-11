"use client";

import { ArrowRight } from "lucide-react";
import { memo } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { cn } from "@/lib/utils";

const pillars = [
  {
    title: "Estratégia personalizada",
    text: "Objetivos e ações definidos a partir do seu mercado, do seu público e do momento da sua empresa.",
  },
  {
    title: "Foco em conversão",
    text: "Campanhas, conteúdos e experiências digitais pensados para transformar interesse em oportunidades comerciais.",
  },
  {
    title: "Otimização contínua",
    text: "Analisamos indicadores e ajustamos as ações para melhorar a eficiência do investimento.",
  },
  {
    title: "Transparência em cada etapa",
    text: "Relatórios claros para acompanhar avanços, identificar desafios e orientar as próximas decisões.",
  },
];

const steps = [
  {
    title: "Diagnóstico",
    text: "Entendemos seu negócio, analisamos sua presença digital e identificamos as prioridades para crescer.",
  },
  {
    title: "Execução",
    text: "Transformamos o planejamento em campanhas, conteúdos e soluções digitais alinhados aos seus objetivos.",
  },
  {
    title: "Análise e evolução",
    text: "Acompanhamos o desempenho e usamos os aprendizados para definir os próximos passos.",
  },
];

function ReportComponent() {
  return (
    <section
      id="relatorio"
      className="relative overflow-hidden bg-[#1d1d1f] px-6 py-28 md:px-12 md:py-36"
      aria-labelledby="report-heading"
    >
      <img
        src="/brand/report-bg.jpg"
        alt=""
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[#1d1d1f]/40" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.42em] text-[#4da3ff]">
            Resultados e transparência
          </p>
          <h2
            id="report-heading"
            className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,4.2vw,2.9rem)] font-bold tracking-tight text-white"
          >
            Sua marca cresce com estratégia.
            <br />
            Cada decisão tem <span className="text-blue-glow">direção.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/90 md:text-base">
            Conectamos estratégia, criatividade e dados aos objetivos do seu
            negócio. Você acompanha o desempenho, entende os ajustes e sabe
            quais são os próximos passos.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {pillars.map((pillar, index) => (
            <ScrollReveal key={pillar.title} delay={index * 0.06}>
              <div
                className={cn(
                  "group relative h-full overflow-hidden rounded-[1.15rem] px-6 py-7",
                  "bg-white/[0.04] ring-1 ring-white/[0.08]",
                  "transition-[background-color,box-shadow,transform] duration-400",
                  "hover:-translate-y-0.5 hover:bg-white/[0.06]",
                  "hover:shadow-[0_20px_50px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,145,255,0.2)]",
                )}
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4da3ff]/50 to-transparent opacity-70"
                  aria-hidden
                />
                <p className="font-[family-name:var(--font-display)] text-[1.05rem] font-bold leading-snug tracking-tight text-white md:text-[1.1rem]">
                  {pillar.title}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-white/80">
                  {pillar.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 grid gap-6 border-t border-white/[0.06] pt-10 md:mt-12 md:grid-cols-3 md:gap-8 md:pt-12">
          {steps.map((item, index) => (
            <ScrollReveal key={item.title} delay={0.08 + index * 0.06}>
              <div className="flex gap-4">
                <span className="mt-1 font-mono text-[11px] tracking-[0.2em] text-[#4da3ff]/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/80">
                    {item.text}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-14 text-center md:mt-16">
          <p className="font-[family-name:var(--font-display)] text-[1.25rem] font-bold tracking-tight text-white md:text-[1.5rem]">
            Vamos dar direção ao crescimento da sua marca?
          </p>
          <a
            href="#contato"
            className="group mt-6 inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#0071e3] px-6 text-[12px] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_10px_28px_rgba(0,113,227,0.35)] transition-colors hover:bg-[#1a8cff]"
          >
            Fale com a RETA
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

export const Report = memo(ReportComponent);
