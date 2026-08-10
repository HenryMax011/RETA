"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { FormEvent, memo, useEffect, useRef, useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { RetaLogo } from "@/components/brand/RetaLogo";
import { cn } from "@/lib/utils";

const WA_PHONE = "5511999999999";
const MAP_QUERY = "Rua Perucaba 97, São Paulo, SP";
const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=16&output=embed`;
const MAP_OPEN = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

type ChatMsg = { id: string; role: "bot" | "user"; text: string };

const QUICK = [
  "Quero um orçamento",
  "Tráfego & Performance",
  "Branding & Criatividade",
  "Tecnologia & IA",
];

function botReply(input: string): string {
  const t = input.toLowerCase();
  if (t.includes("orçamento") || t.includes("preço") || t.includes("valor")) {
    return "Perfeito. Me conte o segmento da sua marca e o objetivo principal (tráfego, branding ou IA). Depois continue no WhatsApp para falar com o time.";
  }
  if (
    t.includes("tráfego") ||
    t.includes("performance") ||
    t.includes("ads") ||
    t.includes("site")
  ) {
    return "Tráfego, site e performance — estratégia e mídia com ROI mensurável. Quando quiser, continue no WhatsApp com o que você descreveu.";
  }
  if (t.includes("brand") || t.includes("criativ") || t.includes("identidade")) {
    return "Branding & Criatividade: identidade e narrativas com sofisticação. Posso te conectar com o time pelo WhatsApp agora.";
  }
  if (t.includes("ia") || t.includes("tecnologia") || t.includes("automação")) {
    return "Tecnologia & IA a serviço da estratégia. Continue no WhatsApp para enviarmos o que você pediu ao time.";
  }
  if (t.includes("whatsapp") || t.includes("falar") || t.includes("contato")) {
    return "Ótimo — use Continuar no WhatsApp abaixo. Sua última mensagem vai junto, pronta para enviar.";
  }
  return "Entendi. Pode detalhar um pouco mais ou escolher uma opção. Quando terminar, continue no WhatsApp.";
}

function buildWhatsAppUrl(msgs: ChatMsg[]) {
  const userMsgs = msgs.filter((m) => m.role === "user").map((m) => m.text);
  const last = userMsgs.at(-1);

  const body = last
    ? `Olá! Vim pelo chat do site da Reta Publicidade.\n\nMinha última mensagem:\n${last}${
        userMsgs.length > 1
          ? `\n\n—\nResumo da conversa:\n${userMsgs.map((t, i) => `${i + 1}. ${t}`).join("\n")}`
          : ""
      }`
    : "Olá! Quero colocar minha marca na reta do crescimento.";

  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(body)}`;
}

function ContactComponent() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Olá! Sou o assistente da Reta. Como posso colocar sua marca na reta do crescimento?",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const hasUserMessage = msgs.some((m) => m.role === "user");
  const waUrl = buildWhatsAppUrl(msgs);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs, typing]);

  const pushUser = (text: string) => {
    const clean = text.trim();
    if (!clean || typing) return;

    setMsgs((m) => [
      ...m,
      { id: `u-${Date.now()}`, role: "user", text: clean },
    ]);
    setDraft("");
    setTyping(true);

    window.setTimeout(() => {
      setMsgs((m) => [
        ...m,
        { id: `b-${Date.now()}`, role: "bot", text: botReply(clean) },
      ]);
      setTyping(false);
    }, 650 + Math.random() * 450);
  };

  const onChatSubmit = (e: FormEvent) => {
    e.preventDefault();
    pushUser(draft);
  };

  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-[#1d1d1f] px-6 py-28 md:px-12 md:py-40"
      aria-labelledby="contact-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(0,113,227,0.28),transparent_58%)]" />
        <div className="absolute bottom-0 left-1/2 h-[40%] w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,145,255,0.1),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-[440px]">
          <ScrollReveal className="text-center">
            <div className="relative mx-auto mb-7 w-fit">
              <span
                className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0071e3]/25 blur-2xl"
                aria-hidden
              />
              <div className="relative z-[1]">
                <RetaLogo
                  variant="mark"
                  size="md"
                  showWordmark={false}
                  theme="dark"
                />
              </div>
            </div>

          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.42em] text-[#4da3ff]">
            Contato
          </p>
          <h2
            id="contact-heading"
            className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,4.2vw,2.75rem)] font-bold tracking-tight text-white"
          >
            Seja bem-vindo à <span className="text-blue-glow">Reta</span>
          </h2>
          <p className="mx-auto mt-5 max-w-sm text-[15px] leading-relaxed text-[#a1a1a6]">
            Converse com o assistente. Ao final, sua mensagem segue para o
            WhatsApp.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-10 md:mt-12">
          <div className="relative overflow-hidden rounded-[1.5rem] shadow-[0_24px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.1]">
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_40%,rgba(0,113,227,0.06)_100%)] backdrop-blur-xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
              aria-hidden
            />

            <div className="relative flex min-h-[540px] flex-col bg-[#141416]/80">
              {/* Header */}
              <div className="flex items-center gap-3.5 border-b border-white/[0.06] px-5 py-4 md:px-6">
                <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#0b0b0c] ring-1 ring-white/15">
                  <span className="scale-[0.72]">
                    <RetaLogo
                      variant="mark"
                      size="sm"
                      showWordmark={false}
                      theme="dark"
                    />
                  </span>
                  <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#141416] bg-[#34c759]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold tracking-tight text-white">
                    Assistente Reta
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[#86868b]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#34c759]" />
                    Online agora
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div
                ref={listRef}
                className="flex max-h-[340px] min-h-[260px] flex-1 flex-col gap-3.5 overflow-y-auto px-4 py-5 md:max-h-[380px] md:px-5"
              >
                <AnimatePresence initial={false}>
                  {msgs.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "max-w-[85%] px-4 py-3 text-[13.5px] leading-relaxed",
                        m.role === "bot"
                          ? "self-start rounded-[1.1rem] rounded-tl-md bg-white/[0.07] text-[#e8e8ed] ring-1 ring-white/[0.06]"
                          : "self-end rounded-[1.1rem] rounded-tr-md bg-[#0071e3] text-white shadow-[0_8px_24px_rgba(0,113,227,0.28)]",
                      )}
                    >
                      {m.text}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {typing && (
                  <div className="self-start rounded-[1.1rem] rounded-tl-md bg-white/[0.07] px-4 py-3.5 ring-1 ring-white/[0.06]">
                    <span className="flex gap-1.5">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#86868b]" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#86868b] [animation-delay:140ms]" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#86868b] [animation-delay:280ms]" />
                    </span>
                  </div>
                )}

                {!hasUserMessage && (
                  <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {QUICK.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => pushUser(q)}
                        className="cursor-pointer rounded-[10px] border border-white/[0.1] bg-white/[0.03] px-3.5 py-2.5 text-left text-[12px] font-medium tracking-wide text-[#c7c7cc] transition-[border-color,background-color,color] duration-250 hover:border-[#0071e3]/40 hover:bg-[#0071e3]/10 hover:text-white"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Composer */}
              <form
                onSubmit={onChatSubmit}
                className="border-t border-white/[0.06] px-4 py-3.5 md:px-5"
              >
                <div className="flex items-center gap-2 rounded-[12px] border border-white/12 bg-black/25 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] focus-within:border-[#0071e3]/55">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-[#6e6e73]"
                  />
                  <button
                    type="submit"
                    disabled={!draft.trim() || typing}
                    className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-[9px] bg-[#0071e3] text-white shadow-[0_6px_18px_rgba(0,113,227,0.35)] transition-[opacity,transform] duration-200 enabled:hover:bg-[#1a8cff] disabled:cursor-not-allowed disabled:opacity-35"
                    aria-label="Enviar mensagem"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>

              {/* CTA */}
              <div className="px-4 pb-4 md:px-5 md:pb-5">
                <motion.button
                  type="button"
                  onClick={() =>
                    window.open(waUrl, "_blank", "noopener,noreferrer")
                  }
                  disabled={!hasUserMessage}
                  className={cn(
                    "group relative flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[11px] text-[12px] font-semibold uppercase tracking-[0.14em] transition-all duration-300",
                    hasUserMessage
                      ? "bg-[linear-gradient(165deg,#2a94ff_0%,#0071e3_50%,#005bb8_100%)] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_14px_36px_rgba(0,113,227,0.38)]"
                      : "cursor-not-allowed bg-white/[0.06] text-white/35 ring-1 ring-white/[0.06]",
                  )}
                  whileHover={hasUserMessage ? { y: -1 } : undefined}
                  whileTap={hasUserMessage ? { scale: 0.985 } : undefined}
                >
                  {hasUserMessage && (
                    <span
                      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/18 to-transparent"
                      aria-hidden
                    />
                  )}
                  <span className="relative">
                    {hasUserMessage
                      ? "Continuar no WhatsApp"
                      : "Envie uma mensagem para continuar"}
                  </span>
                  {hasUserMessage && (
                    <ArrowUpRight className="relative h-3.5 w-3.5 opacity-90 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </motion.button>
                {hasUserMessage && (
                  <p className="mt-2.5 text-center text-[11px] leading-relaxed text-[#6e6e73]">
                    Sua última mensagem será pré-preenchida no WhatsApp.
                  </p>
                )}
              </div>
            </div>
          </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-16 md:mt-20">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#86868b]">
                Onde estamos
              </p>
              <p className="mt-1.5 text-[14px] text-[#e8e8ed]">
                Rua Perucaba, 97 — São Paulo, SP
              </p>
            </div>
            <p className="text-[13px] text-[#a1a1a6]">
              Segunda a Sexta, das 8h às 17h40
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
            <a
              href={MAP_OPEN}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-3 top-3 z-10 inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-[12px] font-medium text-[#1d1d1f] shadow-md ring-1 ring-black/5 transition-colors hover:bg-[#f5f5f7]"
            >
              Abrir no Maps
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <iframe
              title="Localização Reta Publicidade — Rua Perucaba, 97"
              src={MAP_EMBED}
              className="h-[240px] w-full border-0 md:h-[300px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export const Contact = memo(ContactComponent);
