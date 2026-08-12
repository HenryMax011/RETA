"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { memo, useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { cn } from "@/lib/utils";

const pillars = [
  {
    id: "tecnologia",
    label: "Tecnologia & IA",
    short: "IA",
    title: "Tecnologia & IA",
    lead: "Transformar dados em inteligência.",
    accent: "inteligência",
    body: "Usamos tecnologia e inteligência artificial para ler o mercado, antecipar movimentos e transformar dados brutos em decisões que geram vantagem competitiva real para a sua marca.",
    detail:
      "Do monitoramento à automação criativa — cada insight alimenta campanhas mais precisas, rápidas e mensuráveis.",
    highlights: ["Dados", "IA", "Automação", "Insights"],
  },
  {
    id: "direcao",
    label: "Direção",
    short: "Direção",
    title: "Direção & Estratégia",
    lead: "Escolher o caminho certo.",
    accent: "caminho certo",
    body: "Estratégia é direção. Definimos onde sua marca precisa chegar e traçamos a rota com clareza — posicionamento, mídia, mensagem e prioridades alinhadas ao crescimento.",
    detail:
      "Sem achismo: cada passo é guiado por objetivos, dados e um plano que coloca sua marca na reta do crescimento.",
    highlights: ["Estratégia", "Posicionamento", "Plano", "Crescimento"],
  },
  {
    id: "criatividade",
    label: "Criatividade",
    short: "Criativa",
    title: "Criatividade",
    lead: "Fazer sua marca se destacar.",
    accent: "destacar",
    body: "Criatividade com sofisticação. Conceitos, identidades e narrativas que cortam o ruído — presença premium, memorável e coerente com quem você é.",
    detail:
      "Do branding à campanha: estética e ideia a serviço de diferenciação e autoridade.",
    highlights: ["Branding", "Campanhas", "Narrativa", "Autoridade"],
  },
  {
    id: "performance",
    label: "Performance",
    short: "Performance",
    title: "Performance",
    lead: "Transformar atenção em resultados.",
    accent: "resultados",
    body: "Atenção sem conversão não basta. Otimizamos mídia, funis e experiências para que cada clique, view e contato vire resultado mensurável.",
    detail:
      "Performance contínua: testes, escala e ROI — sua marca não só aparece, ela avança.",
    highlights: ["Mídia", "Funis", "ROI", "Escala"],
  },
];

function LeadTitle({ lead, accent }: { lead: string; accent: string }) {
  const idx = lead.toLowerCase().lastIndexOf(accent.toLowerCase());
  if (idx < 0) return <>{lead}</>;
  const before = lead.slice(0, idx);
  const word = lead.slice(idx, idx + accent.length);
  const after = lead.slice(idx + accent.length);
  return (
    <>
      {before}
      <span className="text-blue-glow">{word}</span>
      {after}
    </>
  );
}

function SymbolComponent() {
  const [active, setActive] = useState(0);
  const current = pillars[active];

  const go = (dir: -1 | 1) => {
    setActive((i) => (i + dir + pillars.length) % pillars.length);
  };

  return (
    <section
      id="simbolo"
      className="relative overflow-hidden bg-[#f5f5f7] px-6 py-28 md:px-12 md:py-40"
      aria-labelledby="symbol-heading"
      style={{ backgroundImage: "url(/brand/services-bg.png)", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <ScrollReveal className="text-center">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.42em] text-[#0071e3]">
            Nosso Símbolo
          </p>

          <h2
            id="symbol-heading"
            className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,4.4vw,3rem)] font-bold tracking-tight text-[#1d1d1f]"
          >
            Aquilo em que <span className="text-blue-glow">acreditamos</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[#1d1d1f] md:text-base">
            A Reta Publicidade nasce da união entre estratégia, criatividade,
            tecnologia e inteligência artificial.
          </p>
        </ScrollReveal>

        <div className="mt-14 md:mt-16">
          {/* Tabs — grid no mobile, linha no desktop */}
          <div
            role="tablist"
            aria-label="Pilares da Reta"
            className="mx-auto grid max-w-3xl grid-cols-2 gap-2 border-b-0 sm:flex sm:items-center sm:justify-start sm:gap-0 sm:overflow-x-auto sm:border-b sm:border-black/[0.08] sm:px-1 md:justify-center"
          >
            {pillars.map((pillar, index) => {
              const isActive = active === index;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${pillar.id}`}
                  id={`tab-${pillar.id}`}
                  onClick={() => setActive(index)}
                  className={cn(
                    "relative cursor-pointer rounded-xl px-3 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors sm:rounded-none sm:whitespace-nowrap sm:px-4 sm:py-4 sm:text-center sm:tracking-[0.14em] md:px-5 md:text-[12px]",
                    isActive
                      ? "bg-[#0071e3]/10 text-[#0071e3] sm:bg-transparent"
                      : "bg-white text-[#86868b] ring-1 ring-black/[0.05] hover:text-[#1d1d1f] sm:bg-transparent sm:ring-0",
                  )}
                >
                  <span className="flex items-center gap-2 sm:justify-center">
                    <span
                      className={cn(
                        "font-mono text-[10px] tabular-nums",
                        isActive ? "text-[#0071e3]/70" : "text-[#c7c7cc]",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate sm:hidden">{pillar.short}</span>
                    <span className="hidden sm:inline">{pillar.label}</span>
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="symbol-tab-line"
                      className="absolute inset-x-3 bottom-0 hidden h-[2px] rounded-full bg-[#0071e3] sm:block sm:inset-x-4 md:inset-x-5"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-2 hidden border-b border-black/[0.08] sm:block" aria-hidden />

          <div className="relative mt-10">
            <AnimatePresence mode="wait">
              <motion.article
                key={current.id}
                id={`panel-${current.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${current.id}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-[1.5rem] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04]"
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_100%_0%,rgba(0,113,227,0.07),transparent_60%)]"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute -right-2 top-2 select-none font-[family-name:var(--font-display)] text-[7rem] font-bold leading-none text-[#1d1d1f]/[0.03] md:right-6 md:top-4 md:text-[9rem]"
                  aria-hidden
                >
                  {String(active + 1).padStart(2, "0")}
                </span>

                <div className="relative grid md:grid-cols-[5.5rem_1fr]">
                  {/* Rail lateral */}
                  <aside className="hidden flex-col items-center justify-between border-r border-black/[0.05] py-10 md:flex">
                    <div className="flex flex-col items-center gap-6">
                      <span className="font-mono text-[11px] tracking-[0.28em] text-[#0071e3]">
                        {String(active + 1).padStart(2, "0")}
                      </span>
                      <span className="flex h-10 w-px bg-gradient-to-b from-[#0071e3]/50 to-transparent" aria-hidden />
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => go(-1)}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#86868b] transition-colors hover:bg-[#f5f5f7] hover:text-[#0071e3]"
                        aria-label="Pilar anterior"
                      >
                        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
                      </button>
                      <button
                        type="button"
                        onClick={() => go(1)}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#86868b] transition-colors hover:bg-[#f5f5f7] hover:text-[#0071e3]"
                        aria-label="Próximo pilar"
                      >
                        <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                      </button>
                    </div>
                  </aside>

                  <div className="relative px-7 py-9 md:px-12 md:py-12 lg:px-14">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-[#0071e3]">
                      {current.title}
                    </p>

                    <h3 className="mt-4 max-w-xl font-[family-name:var(--font-display)] text-[1.7rem] font-bold tracking-tight text-[#1d1d1f] md:text-[2.2rem] md:leading-[1.2]">
                      <LeadTitle lead={current.lead} accent={current.accent} />
                    </h3>

                    <div className="mt-7 max-w-2xl space-y-3">
                      <p className="text-[15px] font-bold leading-relaxed text-[#1d1d1f] md:text-base">
                        {current.body}
                      </p>
                      <p className="text-sm font-bold leading-relaxed text-[#1d1d1f]/80 md:text-[15px]">
                        {current.detail}
                      </p>
                    </div>

                    {/* Tags tipográficas */}
                    <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-2.5">
                      {current.highlights.map((tag) => (
                        <li
                          key={tag}
                          className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1d1d1f]"
                        >
                          <span className="h-1 w-1 rounded-full bg-[#0071e3]" aria-hidden />
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10 flex items-center justify-between gap-4 border-t border-black/[0.05] pt-5">
                      <div className="flex gap-1.5 md:hidden">
                        <button
                          type="button"
                          onClick={() => go(-1)}
                          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#f5f5f7] text-[#6e6e73]"
                          aria-label="Pilar anterior"
                        >
                          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
                        </button>
                        <button
                          type="button"
                          onClick={() => go(1)}
                          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#f5f5f7] text-[#6e6e73]"
                          aria-label="Próximo pilar"
                        >
                          <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                        </button>
                      </div>
                      <div className="hidden h-px flex-1 bg-black/[0.05] md:block" />
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[#86868b]">
                        {String(active + 1).padStart(2, "0")} /{" "}
                        {String(pillars.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Symbol = memo(SymbolComponent);
