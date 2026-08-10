"use client";

import { motion } from "framer-motion";
import { memo, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

function GlowButtonComponent({
  children,
  href,
  onClick,
  variant = "primary",
  className,
}: GlowButtonProps) {
  const baseStyles = cn(
    "relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300",
    variant === "primary"
      ? "bg-gradient-to-b from-[#1a8cff] to-[#0071e3] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.15)_inset,0_4px_16px_rgba(0,113,227,0.32)] hover:from-[#2a95ff] hover:to-[#0077ed] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,0_6px_20px_rgba(0,113,227,0.4)]"
      : "border border-[#0071e3]/70 bg-white/40 text-[#0071e3] shadow-[0_0_16px_rgba(0,113,227,0.1)] backdrop-blur-sm hover:border-[#0071e3] hover:bg-[#0071e3]/08 hover:shadow-[0_0_24px_rgba(0,113,227,0.18)]",
    className,
  );

  const content = (
    <>
      {variant === "primary" && (
        <span
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/15 to-transparent"
          aria-hidden
        />
      )}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={baseStyles}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={baseStyles}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}

export const GlowButton = memo(GlowButtonComponent);
