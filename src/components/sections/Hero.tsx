"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

const clients = [
  { name: "Spirali Engenharia", logo: "/clients/spirali.png" },
  { name: "Captar", logo: "/clients/captar.png" },
  { name: "Távora & Dantas", logo: "/clients/tavora-dantas.png" },
  { name: "Paulo Dantas", logo: "/clients/paulo-dantas.png" },
  { name: "Essentials Contabilidade", logo: "/clients/essentials.png" },
  { name: "Classic Baby", logo: "/clients/classic-baby.png" },
  { name: "Phoenixbor", logo: "/clients/phoenixbor.png" },
  { name: "Selavie Femme", logo: "/clients/selavie.png" },
];

function HeroComponent() {
  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Imagem de fundo full-bleed */}
      <Image
        src="/brand/hero-bg.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        unoptimized
        aria-hidden
      />

      {/* Overlay escuro para legibilidade do texto */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0b0f]/65 via-[#0a0b0f]/20 to-transparent"
        aria-hidden
      />

      {/* Conteúdo por cima */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-between px-6 pt-28 pb-0 md:px-12 md:pt-32 md:pb-0">
        <div className="mx-auto flex w-full max-w-7xl flex-1 items-center">
          <div className="max-w-xl">
            <motion.div
              className="mb-6 flex items-center gap-2.5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0071e3]" />
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#a3a3ab]">
                Estratégia · Criatividade · Resultados
              </p>
            </motion.div>

            <motion.h1
              id="hero-heading"
              className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,5.5vw,3.5rem)] font-bold uppercase leading-[1.12] tracking-[-0.02em] text-white"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              Conectamos marcas às{" "}
              <span className="text-[#0071e3]">pessoas certas.</span>
            </motion.h1>

            <motion.p
              className="mt-7 max-w-md text-[15px] leading-[1.7] text-[#c8c8cc] md:text-base"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
            >
              Soluções completas em publicidade para impulsionar sua marca e gerar
              resultados que realmente importam.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <motion.a
                href="#servicos"
                className="group inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#0071e3] px-6 text-[12px] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_10px_28px_rgba(0,113,227,0.35)] transition-colors hover:bg-[#1a8cff]"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.985 }}
              >
                Nossos serviços
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </motion.a>
              <motion.a
                href="#simbolo"
                className="group inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-white/35 bg-transparent px-6 text-[12px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:border-white/60 hover:bg-white/[0.04]"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.985 }}
              >
                Ver portfólio
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Marcas que confiam — carrossel infinito */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          <div className="border-t border-white/10 bg-black/40 py-4">
            <p className="mb-3 text-center text-[11px] font-medium tracking-[0.15em] text-[#999]">
              Empresas de diversos segmentos confiam na Reta Publicidade para fortalecer suas marcas
            </p>
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
              <div className="flex w-max animate-scroll items-center gap-12">
                {[...clients, ...clients, ...clients].map((client, i) => (
                  <div
                    key={`${client.name}-${i}`}
                    className="flex h-16 w-32 shrink-0 items-center justify-center md:h-20 md:w-40"
                  >
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={140}
                      height={70}
                      className="max-h-14 w-auto object-contain mix-blend-lighten md:max-h-[4.5rem]"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export const Hero = memo(HeroComponent);
