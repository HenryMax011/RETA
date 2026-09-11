"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  memo,
  useCallback,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { SiteScreen, type SiteProject } from "@/components/ui/SiteDevice";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const DRAG_THRESHOLD = 56;

interface Slide extends SiteProject {
  client: string;
  category: string;
  color: string;
  href: string;
}

const slides: Slide[] = [
  {
    client: "Selavie Femme",
    name: "Selavie",
    category: "Branding",
    image: "/portfolio/selavie-3.jpg",
    color: "#5ac8fa",
    href: "https://selaviefemme.com.br/",
    tone: "selavie",
    mark: "hexagon",
    letter: "S",
    slogan: "Cuidado que permanece.",
  },
  {
    client: "Phoenixbor",
    name: "Phoenixbor",
    category: "Site",
    image: "/portfolio/phoenix-1.jpg",
    color: "#34c759",
    href: "https://phoenixbor.com.br/",
    tone: "phoenix",
    mark: "circle",
    letter: "P",
    slogan: "Precisão em cada vedação.",
  },
  {
    client: "Nexotechh",
    name: "Nexotechh",
    category: "Site",
    image: "/portfolio/nexotechh-1.jpg",
    color: "#c8f542",
    href: "https://nexotechh.vercel.app/",
    tone: "nexo",
    mark: "diamond",
    letter: "N",
    slogan: "Sites que transformam negócios.",
  },
  {
    client: "HTRAP & DENIMM",
    name: "HTRAP",
    category: "E-commerce",
    image: "/portfolio/htrap-1.jpg",
    color: "#e8dcc8",
    href: "#",
    tone: "nexo",
    mark: "circle",
    letter: "H",
    slogan: "Streetwear com atitude.",
  },
  {
    client: "Távora & Dantas",
    name: "Távora",
    category: "Site",
    image: "/portfolio/tavora-1.jpg",
    color: "#0071e3",
    href: "#",
    tone: "tavora",
    mark: "circle",
    letter: "T",
    slogan: "Licenciamento empresarial com agilidade.",
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
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const startX = useRef(0);
  const lastX = useRef(0);
  const pressed = useRef<number | null>(null);
  const dragging = useRef(false);
  const frame = useRef(0);
  const pendingX = useRef(0);

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

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    dragging.current = true;
    startX.current = e.clientX;
    lastX.current = e.clientX;
    const card = (e.target as HTMLElement).closest("[data-slide]");
    pressed.current = card ? Number(card.getAttribute("data-slide")) : null;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    lastX.current = e.clientX;
    pendingX.current = e.clientX - startX.current;
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const dx = pendingX.current;
      setDragX(dx);
      if (Math.abs(dx) > 8) setIsDragging(true);
    });
  }, []);

  const finishDrag = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    cancelAnimationFrame(frame.current);
    frame.current = 0;

    const dx = lastX.current - startX.current;
    const from = pressed.current;
    pressed.current = null;
    setDragX(0);
    setIsDragging(false);

    if (Math.abs(dx) >= DRAG_THRESHOLD) {
      go(dx < 0 ? 1 : -1);
      return;
    }

    if (from == null || from === active) return;
    goTo(from);
  }, [active, go, goTo]);

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
            className={`fan-stage relative h-[420px] select-none lg:h-[460px]${isDragging ? " is-dragging" : ""}`}
            role="region"
            aria-roledescription="carrossel"
            aria-label="Projetos do portfólio"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
          >
            {slides.map((slide, index) => {
              const offset = circularOffset(index, active, n);
              const abs = Math.abs(offset);
              if (abs > 1) return null;

              return (
                <article
                  key={slide.image ?? `${slide.name}-${index}`}
                  data-slide={index}
                  aria-label={slide.client}
                  aria-current={offset === 0}
                  className={`fan-card fan-card--stage${isDragging ? " is-dragging" : ""}`}
                  style={{
                    zIndex: 10 - abs,
                    transform: `translate3d(calc(-50% + ${offset * 280 + dragX * 0.55}px), calc(-50% + ${abs * 18}px), 0) scale(${offset === 0 ? 1 : 0.86})`,
                  }}
                >
                  <SiteScreen project={slide} priority={offset === 0} />
                </article>
              );
            })}
          </div>
        ) : (
          <div
            className={`fan-stage${isDragging ? " is-dragging" : ""}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
          >
            <article
              data-slide={active}
              className="fan-card mx-auto"
              aria-label={current.client}
              style={{
                transform: `translate3d(${dragX * 0.4}px, 0, 0)`,
                transition: isDragging ? "none" : "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <SiteScreen project={current} priority />
              {next.image ? (
                <span className="sr-only" aria-hidden>
                  <Image src={next.image} alt="" width={8} height={8} quality={75} />
                </span>
              ) : null}
            </article>
          </div>
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
                key={slide.image ?? `${slide.name}-${i}`}
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
