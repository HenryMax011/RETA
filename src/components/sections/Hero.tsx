"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { memo } from "react";
import { RetaLogo } from "@/components/brand/RetaLogo";

const WA_URL =
  "https://wa.me/5511999999999?text=Olá!%20Quero%20colocar%20minha%20marca%20na%20reta%20do%20crescimento.";

const WaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

function HeroComponent() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#050508] px-6 pt-24 pb-16 md:px-12"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <video
          className="h-full w-full scale-105 object-cover opacity-[0.82] brightness-[0.78] saturate-[0.8]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/videos/hero-ai.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0a0a0c]/34" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,0.58)_0%,rgba(8,8,10,0.26)_45%,rgba(8,8,10,0.65)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_50%_48%,rgba(8,8,10,0.45)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        {/* Halo suave atrás do conteúdo — texto sobressai */}
        <div
          className="pointer-events-none absolute left-1/2 top-[42%] h-[min(65vw,380px)] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.4)_0%,transparent_72%)] blur-2xl"
          aria-hidden
        />

        <motion.p
          className="relative mb-5 text-[11px] font-medium uppercase tracking-[0.42em] text-white/55 md:mb-6 md:text-xs md:tracking-[0.48em]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Estratégia · Criatividade · IA
        </motion.p>

        <motion.h1
          id="hero-heading"
          className="relative w-full max-w-[min(88vw,440px)] drop-shadow-[0_4px_32px_rgba(0,0,0,0.65)] md:max-w-[520px]"
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <span className="sr-only">Reta Publicidade</span>
          <RetaLogo
            variant="wordmark"
            size="hero"
            theme="dark"
            withFlare={false}
          />
        </motion.h1>

        <motion.p
          className="relative mt-5 max-w-md font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)] md:mt-6 md:text-[1.4rem]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.22 }}
        >
          Precisão em cada campanha.
        </motion.p>

        <motion.div
          className="relative mt-10 flex w-full max-w-[340px] flex-col items-stretch gap-3 md:mt-12"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* Explorar — vidro + borda azul (formato retangular) */}
          <motion.a
            href="#simbolo"
            className="group relative z-[1] flex min-h-[52px] cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-[10px] border border-white/25 bg-white/[0.08] px-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_0_1px_rgba(0,113,227,0.35),0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-[border-color,background-color,box-shadow,transform] duration-300 hover:border-[#5ab0ff]/70 hover:bg-[#0071e3]/25 hover:shadow-[0_0_0_1px_rgba(90,176,255,0.55),0_16px_48px_rgba(0,113,227,0.35)]"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.985 }}
          >
            <span
              className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute -inset-x-8 -top-10 h-20 bg-[radial-gradient(ellipse_at_center,rgba(0,145,255,0.35),transparent_70%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden
            />
            <span className="relative">Explorar</span>
            <ArrowUpRight className="relative h-3.5 w-3.5 text-[#7ec4ff] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>

          {/* WhatsApp — sólido editorial */}
          <motion.a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative z-[1] flex min-h-[52px] cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-[10px] bg-[#1fad55] px-7 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_12px_36px_rgba(31,173,85,0.35)] transition-[background-color,box-shadow,transform] duration-300 hover:bg-[#25c261] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_16px_44px_rgba(37,194,97,0.45)]"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.985 }}
          >
            <span
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 to-transparent opacity-80"
              aria-hidden
            />
            <WaIcon className="relative h-4 w-4" />
            <span className="relative">Orçamento via WhatsApp</span>
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        aria-hidden
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/45">
          Scroll
        </span>
        <motion.span
          className="h-8 w-px origin-top bg-gradient-to-b from-white/50 to-transparent"
          animate={{ scaleY: [0.55, 1, 0.55], opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

export const Hero = memo(HeroComponent);
