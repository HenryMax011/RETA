"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { FormEvent, memo, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface WhatsAppCTAProps {
  phone?: string;
  className?: string;
}

const QUICK_REPLIES = [
  "Quero um orçamento",
  "Tráfego & Performance",
  "Branding & Criatividade",
  "Tecnologia & IA",
  "Outro assunto",
];

const WaIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

function openWhatsApp(phone: string, text: string) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function WhatsAppCTAComponent({
  phone = "5511999999999",
  className,
}: WhatsAppCTAProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 280);
    return () => clearTimeout(t);
  }, [open]);

  const send = (text: string) => {
    const message = text.trim();
    if (!message) return;
    openWhatsApp(
      phone,
      `Olá! Vim pelo site da Reta Publicidade.\n\n${message}`,
    );
    setDraft("");
    setOpen(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(draft);
  };

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-50 flex flex-col items-end md:bottom-8 md:right-8",
        className,
      )}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 flex w-[min(100vw-2.5rem,360px)] flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.12)]"
            role="dialog"
            aria-label="Atendimento Reta Publicidade"
          >
            <div className="flex items-center gap-3 border-b border-black/[0.06] bg-[#f5f5f7] px-4 py-3.5">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0071e3] text-white">
                <WaIcon className="h-5 w-5" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#f5f5f7] bg-[#34c759]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#1d1d1f]">
                  Reta Publicidade
                </p>
                <p className="flex items-center gap-1.5 text-[11px] text-[#6e6e73]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#34c759]" />
                  online agora
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#6e6e73] transition-colors hover:bg-black/[0.05] hover:text-[#1d1d1f]"
                aria-label="Fechar chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative flex max-h-[380px] flex-col gap-3 overflow-y-auto bg-[#f5f5f7] px-4 py-4">
              <div className="mx-auto rounded-full bg-black/[0.06] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#6e6e73]">
                Hoje
              </div>

              <div className="max-w-[90%] self-start rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm leading-relaxed text-[#1d1d1f] shadow-sm">
                Olá! Bem-vindo à{" "}
                <span className="font-semibold text-[#0071e3]">Reta</span>.
                <span className="mt-1 block text-[10px] text-[#86868b]">agora</span>
              </div>

              <div className="max-w-[90%] self-start rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm leading-relaxed text-[#1d1d1f] shadow-sm">
                Como podemos colocar sua marca na reta do crescimento?
                <span className="mt-1 block text-[10px] text-[#86868b]">agora</span>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => send(reply)}
                    className="cursor-pointer rounded-full border border-[#0071e3]/35 bg-white px-3.5 py-2 text-left text-[13px] font-medium text-[#0071e3] transition-colors hover:border-[#0071e3] hover:bg-[#0071e3]/08"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-black/[0.06] bg-white px-3 py-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="min-w-0 flex-1 rounded-full border border-black/[0.1] bg-[#f5f5f7] px-4 py-2.5 text-sm text-[#1d1d1f] outline-none placeholder:text-[#86868b] focus:border-[#0071e3]"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#0071e3] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Enviar no WhatsApp"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {!open && (
          <span
            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#0071e3]/35 blur-xl"
            style={{ animation: "wa-fab-glow 2.6s ease-in-out infinite" }}
            aria-hidden
          />
        )}
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar WhatsApp" : "Abrir WhatsApp"}
          aria-expanded={open}
          className={cn(
            "relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full text-white md:h-[3.75rem] md:w-[3.75rem]",
            "bg-[#0071e3]",
            "ring-1 ring-white/20",
            "shadow-[0_10px_28px_rgba(0,113,227,0.45),0_2px_8px_rgba(0,0,0,0.25)]",
            "transition-[box-shadow,background-color,transform] duration-300",
            "hover:bg-[#1a8cff] hover:shadow-[0_14px_36px_rgba(0,145,255,0.5),0_4px_12px_rgba(0,0,0,0.2)]",
          )}
          whileHover={{ y: -3, scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 220 }}
        >
          <span className="relative z-10">
            {open ? (
              <X className="h-6 w-6" strokeWidth={2.25} />
            ) : (
              <WaIcon className="h-7 w-7" />
            )}
          </span>
        </motion.button>
      </div>
    </div>
  );
}

export const WhatsAppCTA = memo(WhatsAppCTAComponent);
