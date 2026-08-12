"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { memo, useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Badge } from "@/components/ui/badge";

interface Project {
  label: string;
  description: string;
  images: { src: string; badge: string }[];
  color: string;
}

const projects: Project[] = [
  {
    label: "Távora & Dantas",
    description: "Site institucional para licenciamento empresarial com agilidade.",
    images: [
      { src: "/portfolio/tavora-2.png", badge: "Site" },
      { src: "/portfolio/tavora-1.png", badge: "Landing Page" },
      { src: "/portfolio/tavora-3.png", badge: "Soluções" },
    ],
    color: "#0ea5e9",
  },
  {
    label: "Selavie Femme",
    description: "E-commerce premium para cosméticos com elegância e sofisticação.",
    images: [
      { src: "/portfolio/selavie-3.png", badge: "Branding" },
      { src: "/portfolio/selavie-1.png", badge: "E-commerce" },
      { src: "/portfolio/selavie-2.png", badge: "Loja Online" },
    ],
    color: "#67e8f9",
  },
  {
    label: "Phoenixbor",
    description: "Presença digital premium para vedação industrial.",
    images: [
      { src: "/portfolio/phoenix-1.png", badge: "Site" },
      { src: "/portfolio/phoenix-3.png", badge: "Trajetória" },
      { src: "/portfolio/phoenix-2.png", badge: "Identidade" },
    ],
    color: "#22c55e",
  },
];

function ProjectStack({ project, index }: { project: Project; index: number }) {
  const reverse = index % 2 === 1;
  const [frontIdx, setFrontIdx] = useState(0);
  const total = project.images.length;

  const getStackPosition = (imgIdx: number) => {
    return (imgIdx - frontIdx + total) % total;
  };

  const handleClick = (imgIdx: number) => {
    if (getStackPosition(imgIdx) !== 0) {
      setFrontIdx(imgIdx);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group/stack"
    >
      {/* Header */}
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <span
          className="inline-block rounded-full px-5 py-2 text-sm font-bold uppercase tracking-[0.2em]"
          style={{
            backgroundColor: `${project.color}15`,
            color: project.color,
            border: `1px solid ${project.color}30`,
            boxShadow: `0 0 20px ${project.color}15`,
          }}
        >
          {project.label}
        </span>
        <p className="max-w-lg text-base font-medium text-white/70 md:text-lg">{project.description}</p>
      </div>

      {/* Cards */}
      <div className="relative mx-auto h-[30rem] max-w-6xl sm:h-[36rem] lg:h-[48rem]">
        {project.images.map((img, imgIdx) => {
          const pos = getStackPosition(imgIdx);
          const isFront = pos === 0;
          const isSecond = pos === 1;

          const xOffset = reverse
            ? isFront ? "10%" : isSecond ? "30%" : "20%"
            : isFront ? "10%" : isSecond ? "-10%" : "0%";
          const topOffset = isFront ? 0 : isSecond ? 24 : 48;
          const rotation = isFront
            ? (reverse ? 1.5 : -1.5)
            : isSecond
              ? (reverse ? -3 : 4)
              : (reverse ? -5.5 : 6.5);
          const zIdx = isFront ? 30 : isSecond ? 20 : 10;
          const scaleVal = isFront ? 1 : isSecond ? 0.94 : 0.88;

          return (
            <motion.div
              key={img.src}
              className="absolute w-[85%] cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] sm:w-[80%]"
              style={{
                boxShadow: isFront
                  ? `0 30px 80px rgba(0,0,0,0.6), 0 0 40px ${project.color}10`
                  : "0 20px 50px rgba(0,0,0,0.4)",
              }}
              animate={{
                x: xOffset,
                y: topOffset,
                rotate: rotation,
                zIndex: zIdx,
                scale: scaleVal,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 26,
                mass: 0.9,
              }}
              onClick={() => handleClick(imgIdx)}
              whileHover={
                !isFront
                  ? { scale: scaleVal + 0.03, y: topOffset - 8, transition: { duration: 0.3 } }
                  : { scale: 1.01, transition: { duration: 0.3 } }
              }
            >
              <Badge className="absolute right-4 top-4 z-10 rounded-full border-0 bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-black shadow-lg backdrop-blur-md sm:right-5 sm:top-5 sm:px-4 sm:text-xs">
                {img.badge}
              </Badge>
              <Image
                src={img.src}
                alt={`${project.label} - ${img.badge}`}
                width={1600}
                height={1000}
                quality={95}
                className="h-full w-full object-cover object-top"
                priority={imgIdx === 0 && index === 0}
                unoptimized
              />
              {/* Overlay escuro nos cards de trás */}
              {!isFront && (
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  animate={{ opacity: isSecond ? 0.15 : 0.3 }}
                  style={{ backgroundColor: "#000" }}
                />
              )}
              {/* Borda glow no card da frente */}
              {isFront && (
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover/stack:opacity-100"
                  style={{
                    boxShadow: `inset 0 0 30px ${project.color}15, 0 0 20px ${project.color}10`,
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Indicators */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {project.images.map((img, imgIdx) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setFrontIdx(imgIdx)}
            className="group/dot flex h-8 w-8 cursor-pointer items-center justify-center"
            aria-label={`Ver ${img.badge}`}
          >
            <span
              className="block h-2 w-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: frontIdx === imgIdx ? project.color : "rgba(255,255,255,0.2)",
                transform: frontIdx === imgIdx ? "scale(1.4)" : "scale(1)",
                boxShadow: frontIdx === imgIdx ? `0 0 8px ${project.color}60` : "none",
              }}
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function PortfolioComponent() {
  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-[#0a0b0f] px-6 py-28 md:px-12 md:py-36"
      aria-labelledby="portfolio-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,113,227,0.08),transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_50%_100%,rgba(0,113,227,0.05),transparent_60%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="text-center">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.42em] text-[#0071e3]">
            Portfólio
          </p>

          <h2
            id="portfolio-heading"
            className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,4.4vw,3rem)] font-bold tracking-tight text-white"
          >
            Projetos que <span className="text-blue-glow">entregam resultados</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/60 md:text-base">
            Clique nos cards para explorar cada projeto.
          </p>
        </ScrollReveal>

        <div className="mt-20 flex flex-col gap-28 md:gap-36">
          {projects.map((project, i) => (
            <ProjectStack key={project.label} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export const Portfolio = memo(PortfolioComponent);
