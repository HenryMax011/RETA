"use client";

import Image from "next/image";
import { memo } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Tráfego & Performance",
    description:
      "Campanhas que transformam atenção em resultado — Google, Meta e LinkedIn com otimização contínua e ROI mensurável.",
    features: ["Mídia paga", "Funis", "ROI"],
    image: "/services/trafego.jpg",
    imageAlt: "Dashboard de performance e análises digitais",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Branding & Criatividade",
    description:
      "Identidade e narrativas com sofisticação — para sua marca se destacar e construir autoridade.",
    features: ["Identidade", "Campanhas", "Conteúdo"],
    image: "/services/branding.jpg",
    imageAlt: "Estúdio criativo e design de identidade visual",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
  },
  {
    title: "Tecnologia & IA",
    description:
      "Dados e inteligência artificial a serviço da estratégia — decisões mais rápidas, criativos mais precisos.",
    features: ["IA", "Automação", "Analytics"],
    image: "/services/tecnologia.jpg",
    imageAlt: "Tecnologia e inteligência artificial",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
];

function ServicesComponent() {
  return (
    <section
      id="servicos"
      className="relative overflow-hidden bg-[#f5f5f7] px-6 py-28 md:px-12 md:py-40"
      aria-labelledby="services-heading"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.42em] text-[#0071e3]">
            Serviços
          </p>
          <h2
            id="services-heading"
            className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,4.2vw,3rem)] font-bold tracking-tight text-[#1d1d1f]"
          >
            Como colocamos sua marca{" "}
            <span className="text-blue-glow">na reta</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-[#1d1d1f] md:text-base">
            Estratégia, criatividade e tecnologia — execução completa para
            fazer sua marca avançar.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 md:mt-20 md:grid-cols-3 md:gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.1}>
              <article className="group flex h-full flex-col">
                {/* Quadro fotográfico — editorial */}
                <div className="relative overflow-hidden rounded-[1.25rem] bg-[#d2d2d7] shadow-[0_20px_50px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.04] transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:shadow-[0_28px_60px_rgba(0,0,0,0.12)]">
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"
                      aria-hidden
                    />

                    <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#0071e3] shadow-[0_8px_24px_rgba(0,0,0,0.15)] backdrop-blur-md">
                      {service.icon}
                    </div>

                    <span className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.28em] text-white/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Conteúdo solto — sem “caixa” */}
                <div className="flex flex-1 flex-col px-1 pt-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-px w-6 bg-[#0071e3]" aria-hidden />
                    <h3 className="font-[family-name:var(--font-display)] text-[1.15rem] font-semibold tracking-tight text-[#1d1d1f] md:text-[1.2rem]">
                      {service.title}
                    </h3>
                  </div>

                  <p className="max-w-[34ch] text-[14px] leading-relaxed text-[#1d1d1f]">
                    {service.description}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-black/[0.06] pt-5">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className={cn(
                          "text-[11px] font-medium uppercase tracking-[0.16em] text-[#1d1d1f]",
                          "transition-colors duration-300 group-hover:text-[#0071e3]",
                        )}
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export const Services = memo(ServicesComponent);
