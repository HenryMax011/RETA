"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { memo, useCallback, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface Slide {
  client: string;
  category: string;
  src: string;
  color: string;
}

const slides: Slide[] = [
  {
    client: "Selavie Femme",
    category: "Branding",
    src: "/portfolio/selavie-3.jpg",
    color: "#5ac8fa",
  },
  {
    client: "Selavie Femme",
    category: "E-commerce",
    src: "/portfolio/selavie-1.jpg",
    color: "#5ac8fa",
  },
  {
    client: "Phoenixbor",
    category: "Site",
    src: "/portfolio/phoenix-1.jpg",
    color: "#34c759",
  },
  {
    client: "Nexotechh",
    category: "Site",
    src: "/portfolio/nexotechh-1.jpg",
    color: "#c8f542",
  },
  {
    client: "Nexotechh",
    category: "Site",
    src: "/portfolio/nexotechh-2.jpg",
    color: "#c8f542",
  },
];

function wrapIndex(i: number, length: number) {
  return ((i % length) + length) % length;
}

function circularOffset(index: number, active: number, length: number) {
  let delta = index - active;
  const half = Math.floor(length / 2);
  if (delta > half) delta -= length;
  if (delta < -half) delta += length;
  return delta;
}

function PortfolioComponent() {
  const n = slides.length;
  const [active, setActive] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const go = useCallback(
    (dir: -1 | 1) => {
      setActive((i) => wrapIndex(i + dir, n));
    },
    [n],
  );

  const goTo = useCallback(
    (index: number) => {
      setActive(wrapIndex(index, n));
    },
    [n],
  );

  const current = slides[active];
  const next = slides[wrapIndex(active + 1, n)];

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-[#f5f5f7] px-4 py-16 md:px-6 md:py-32"
      aria-labelledby="portfolio-heading"
    >
      <div className="relative z-10 mx-auto max-w-[92rem]">
        <div className="mb-8 flex flex-col gap-4 md:mb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.42em] text-[#0071e3]">
              Portfólio
            </p>
            <h2
              id="portfolio-heading"
              className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,8vw,3.4rem)] font-bold leading-[1.2] tracking-tight text-[#1d1d1f]"
            >
              Projetos que
              <br />
              <span className="mt-1 inline-block w-fit bg-[#0071e3] px-2 py-0.5 text-white">
                entregam resultados
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-[#6e6e73] md:max-w-xs md:text-right md:text-[15px]">
            Estratégia e expressão visual em projetos pensados para marcas — e
            construídos para resultado.
          </p>
        </div>

        {isDesktop ? (
          <div
            className="relative h-[500px] select-none lg:h-[540px]"
            role="region"
            aria-roledescription="carrossel"
            aria-label="Projetos do portfólio"
          >
            {slides.map((slide, index) => {
              const offset = circularOffset(index, active, n);
              const abs = Math.abs(offset);
              if (abs > 1) return null;

              return (
                <button
                  key={slide.src}
                  type="button"
                  aria-label={slide.client}
                  aria-current={offset === 0}
                  className="absolute left-1/2 top-1/2 cursor-pointer overflow-hidden rounded-[1.35rem] border-0 bg-[#0c0c0e] text-left shadow-[0_20px_50px_rgba(0,0,0,0.22)] [contain:layout_paint] [transition:transform_280ms_cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    width: "min(72vw, 820px)",
                    height: "min(38vw, 430px)",
                    zIndex: 10 - abs,
                    transform: `translate3d(calc(-50% + ${offset * 38}vw), calc(-50% + ${abs * 16}px), 0) scale(${offset === 0 ? 1 : 0.84})`,
                  }}
                  onClick={() => {
                    if (offset === 0) go(1);
                    else goTo(index);
                  }}
                >
                  <Image
                    src={slide.src}
                    alt=""
                    fill
                    sizes="820px"
                    quality={75}
                    className="object-contain"
                    draggable={false}
                    priority={offset === 0}
                  />
                </button>
              );
            })}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => go(1)}
            className="relative mx-auto block aspect-[16/9] w-full max-w-[28rem] cursor-pointer overflow-hidden rounded-2xl bg-[#0c0c0e] shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
            aria-label={`Próximo projeto — ${current.client}`}
          >
            <Image
              src={current.src}
              alt={current.client}
              fill
              sizes="(max-width: 448px) 92vw, 448px"
              quality={75}
              className="object-contain"
              priority
              draggable={false}
            />
            {/* Pré-carrega o próximo slide sem pintar na tela */}
            <span className="sr-only" aria-hidden>
              <Image src={next.src} alt="" width={8} height={8} quality={75} />
            </span>
          </button>
        )}

        <div className="mt-5 flex items-center justify-center gap-4 md:mt-8">
          <button
            type="button"
            aria-label="Projeto anterior"
            onClick={() => go(-1)}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-[#1d1d1f] shadow-sm md:h-11 md:w-11"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <p className="min-w-[4.5rem] text-center font-mono text-[13px] tabular-nums text-[#86868b]">
            {String(active + 1).padStart(2, "0")}
            <span className="text-[#d2d2d7]"> / </span>
            {String(n).padStart(2, "0")}
          </p>
          <button
            type="button"
            aria-label="Próximo projeto"
            onClick={() => go(1)}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-[#1d1d1f] shadow-sm md:h-11 md:w-11"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="font-[family-name:var(--font-display)] text-[1.15rem] font-bold tracking-tight text-[#1d1d1f] md:text-[1.35rem]">
            {current.client}
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#86868b] md:text-[12px]">
            {current.category}
          </p>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`Ir para ${slide.client}`}
                onClick={() => goTo(i)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center"
              >
                <span
                  className="block rounded-full transition-transform duration-200"
                  style={{
                    width: i === active ? 8 : 6,
                    height: i === active ? 8 : 6,
                    backgroundColor: i === active ? current.color : "#d2d2d7",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const Portfolio = memo(PortfolioComponent);
