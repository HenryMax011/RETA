"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send } from "lucide-react";
import { FormEvent, memo, useEffect, useRef, useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { RetaLogo } from "@/components/brand/RetaLogo";
import { cn } from "@/lib/utils";

const WA_PHONE = "5511999999999";

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
    return "Perfeito. Me conte o segmento da sua marca e o objetivo principal (tráfego, branding ou IA). Depois clique em Continuar no WhatsApp para falar com o time.";
  }
  if (t.includes("tráfego") || t.includes("performance") || t.includes("ads") || t.includes("site")) {
    return "Tráfego, site e performance — combinamos estratégia e mídia com ROI mensurável. Quando quiser, continue no WhatsApp com o que você descreveu.";
  }
  if (t.includes("brand") || t.includes("criativ") || t.includes("identidade")) {
    return "Branding & Criatividade: identidade e narrativas com sofisticação. Posso te conectar com o time pelo WhatsApp agora.";
  }
  if (t.includes("ia") || t.includes("tecnologia") || t.includes("automação")) {
    return "Tecnologia & IA a serviço da estratégia. Clique em Continuar no WhatsApp para enviarmos o que você pediu ao time.";
  }
  if (t.includes("whatsapp") || t.includes("falar") || t.includes("contato")) {
    return "Ótimo — use o botão Continuar no WhatsApp abaixo. Sua última mensagem vai junto, pronta para enviar.";
  }
  return "Entendi. Pode detalhar um pouco mais ou escolher uma opção rápida. Quando terminar, continue no WhatsApp.";
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
        {
          id: `b-${Date.now()}`,
          role: "bot",
          text: botReply(clean),
        },
      ]);
      setTyping(false);
    }, 650 + Math.random() * 450);
  };

  const onChatSubmit = (e: FormEvent) => {
    e.preventDefault();
    pushUser(draft);
  };

  const openWhatsApp = () => {
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-[#1d1d1f] px-6 py-28 md:px-12 md:py-36"
      aria-labelledby="contact-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(0,113,227,0.28),transparent_58%)]" />
        <div className="absolute bottom-0 left-1/2 h-[40%] w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,145,255,0.1),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-xl">
        <ScrollReveal className="text-center">
          <div className="relative mx-auto mb-7 w-fit">
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0071e3]/25 blur-2xl"
              aria-hidden
            />
            <div className="relative z-[1]">
              <RetaLogo variant="mark" size="md" showWordmark={false} theme="dark" />
            </div>
          </div>

          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.42em] text-[#4da3ff]">
            Nova geração da publicidade
          </p>
          <h2
            id="contact-heading"
            className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,4.2vw,2.9rem)] font-bold tracking-tight text-white"
          >
            Seja bem-vindo à <span className="text-blue-glow">Reta</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-[#a1a1a6] md:text-base">
            Converse com o assistente. Quando terminar, sua última mensagem vai
            direto para o WhatsApp.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-10 md:mt-12">
          <div className="flex min-h-[560px] flex-col overflow-hidden rounded-[1.35rem] bg-white/[0.04] ring-1 ring-white/[0.08]">
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#0071e3] text-white">
                <Bot className="h-5 w-5" strokeWidth={1.75} />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#1d1d1f] bg-[#34c759]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">Assistente Reta</p>
                <p className="text-[11px] text-[#86868b]">Online agora</p>
              </div>
            </div>

            <div
              ref={listRef}
              className="flex max-h-[360px] min-h-[280px] flex-1 flex-col gap-3 overflow-y-auto px-4 py-4 md:max-h-[420px]"
            >
              <AnimatePresence initial={false}>
                {msgs.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      m.role === "bot"
                        ? "self-start rounded-tl-sm bg-white/[0.08] text-[#e8e8ed]"
                        : "self-end rounded-tr-sm bg-[#0071e3] text-white",
                    )}
                  >
                    {m.text}
                  </motion.div>
                ))}
              </AnimatePresence>

              {typing && (
                <div className="self-start rounded-2xl rounded-tl-sm bg-white/[0.08] px-3.5 py-3">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#86868b]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#86868b] [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#86868b] [animation-delay:240ms]" />
                  </span>
                </div>
              )}

              {!hasUserMessage && (
                <div className="mt-1 flex flex-wrap gap-2">
                  {QUICK.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => pushUser(q)}
                      className="cursor-pointer rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-[#a1a1a6] transition-colors hover:border-[#0071e3]/45 hover:text-[#7ec4ff]"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={onChatSubmit}
              className="flex items-center gap-2 border-t border-white/[0.06] px-3 py-3"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="min-w-0 flex-1 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm text-white outline-none placeholder:text-[#6e6e73] focus:border-[#0071e3]/60"
              />
              <button
                type="submit"
                disabled={!draft.trim() || typing}
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#0071e3] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Enviar mensagem"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            <div className="border-t border-white/[0.06] px-4 py-3">
              <motion.button
                type="button"
                onClick={openWhatsApp}
                disabled={!hasUserMessage}
                className={cn(
                  "relative flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[10px] text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-opacity",
                  hasUserMessage
                    ? "bg-[linear-gradient(165deg,#2a94ff_0%,#0071e3_48%,#005bb8_100%)] shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_12px_32px_rgba(0,113,227,0.35)]"
                    : "cursor-not-allowed bg-white/10 text-white/40",
                )}
                whileHover={hasUserMessage ? { y: -1 } : undefined}
                whileTap={hasUserMessage ? { scale: 0.985 } : undefined}
              >
                {hasUserMessage && (
                  <span
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 to-transparent"
                    aria-hidden
                  />
                )}
                <span className="relative">
                  {hasUserMessage
                    ? "Continuar no WhatsApp"
                    : "Envie uma mensagem para continuar"}
                </span>
              </motion.button>
              {hasUserMessage && (
                <p className="mt-2 text-center text-[11px] text-[#86868b]">
                  Sua última mensagem será enviada pré-preenchida no WhatsApp.
                </p>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export const Contact = memo(ContactComponent);
