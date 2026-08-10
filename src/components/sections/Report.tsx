"use client";

import { useInView } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { cn } from "@/lib/utils";

const metrics = [
  {
    end: 187,
    prefix: "+",
    suffix: "%",
    decimals: 0,
    label: "ROI médio",
    detail: "em campanhas de performance acompanhadas",
  },
  {
    end: 3.4,
    prefix: "",
    suffix: "x",
    decimals: 1,
    label: "Engajamento",
    detail: "acima da média do segmento",
  },
  {
    end: 42,
    prefix: "",
    suffix: "%",
    decimals: 0,
    label: "CAC reduzido",
    detail: "com funis otimizados por dados",
  },
  {
    end: 98,
    prefix: "",
    suffix: "%",
    decimals: 0,
    label: "Retenção",
    detail: "de clientes após o primeiro ciclo",
  },
];

const highlights = [
  {
    title: "Diagnóstico",
    text: "Leitura de mercado, audiência e canais — o ponto de partida do relatório.",
  },
  {
    title: "Execução",
    text: "Campanhas, criativos e mídia alinhados à estratégia definida.",
  },
  {
    title: "Resultados",
    text: "Indicadores claros, aprendizados e próximos passos na reta.",
  },
];

function CountUp({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.7,
  delay = 0,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let raf = 0;
    let startAt = 0;
    const timeout = window.setTimeout(() => {
      startAt = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - startAt) / (duration * 1000));
        const eased = 1 - (1 - t) ** 3;
        setDisplay(end * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
        else setDisplay(end);
      };
      raf = requestAnimationFrame(tick);
    }, delay * 1000);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [inView, end, duration, delay]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString("pt-BR");

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

function ReportComponent() {
  return (
    <section
      id="relatorio"
      className="relative overflow-hidden bg-[#1d1d1f] px-6 py-28 md:px-12 md:py-36"
      aria-labelledby="report-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,113,227,0.22),transparent_58%)]" />
        <div className="absolute bottom-0 left-1/2 h-[35%] w-[55%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,145,255,0.08),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.42em] text-[#4da3ff]">
            Relatório
          </p>
          <h2
            id="report-heading"
            className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,4.2vw,2.9rem)] font-bold tracking-tight text-white"
          >
            Resultados que colocam sua marca{" "}
            <span className="text-blue-glow">na reta</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-[#a1a1a6] md:text-base">
            Transparência em cada etapa — do diagnóstico ao ROI. Números que
            mostram avanço, não só aparência.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {metrics.map((metric, index) => (
            <ScrollReveal key={metric.label} delay={index * 0.06}>
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
                <p className="font-[family-name:var(--font-display)] text-[2.35rem] font-bold tracking-tight text-white md:text-[2.5rem]">
                  <CountUp
                    end={metric.end}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    decimals={metric.decimals}
                    delay={index * 0.12}
                  />
                </p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4da3ff]">
                  {metric.label}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-[#86868b]">
                  {metric.detail}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 grid gap-6 border-t border-white/[0.06] pt-10 md:mt-12 md:grid-cols-3 md:gap-8 md:pt-12">
          {highlights.map((item, index) => (
            <ScrollReveal key={item.title} delay={0.08 + index * 0.06}>
              <div className="flex gap-4">
                <span className="mt-1 font-mono text-[11px] tracking-[0.2em] text-[#4da3ff]/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#86868b]">
                    {item.text}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export const Report = memo(ReportComponent);
