"use client";

import Image from "next/image";
import { memo } from "react";
import { cn } from "@/lib/utils";

type LogoVariant = "wordmark" | "mark";
type LogoSize = "sm" | "md" | "lg" | "hero";
type LogoTheme = "dark" | "light";

interface RetaLogoProps {
  className?: string;
  variant?: LogoVariant;
  size?: LogoSize;
  showWordmark?: boolean;
  withFlare?: boolean;
  theme?: LogoTheme;
}

const wordmarkSize = {
  sm: { w: 200, h: 50 },
  md: { w: 280, h: 70 },
  lg: { w: 400, h: 100 },
  hero: { w: 640, h: 160 },
};

const markSize = {
  sm: { w: 56, h: 28 },
  md: { w: 80, h: 40 },
  lg: { w: 100, h: 50 },
  hero: { w: 160, h: 80 },
};

function RetaLogoComponent({
  className,
  variant = "wordmark",
  size = "md",
  showWordmark = false,
  withFlare = false,
  theme = "dark",
}: RetaLogoProps) {
  const isLight = theme === "light";

  if (variant === "mark") {
    const s = markSize[size];
    return (
      <span className={cn("relative inline-flex items-center gap-2.5", className)}>
        <Image
          src={
            isLight
              ? "/brand/reta-mark-light.png?v=1"
              : "/brand/reta-mark-clear.png?v=3"
          }
          alt=""
          width={s.w}
          height={s.h}
          className={cn(
            "relative z-[1] object-contain",
            isLight
              ? "h-8 w-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)] md:h-9"
              : size === "lg"
                ? "h-10 w-auto brightness-150 contrast-125 drop-shadow-[0_0_12px_rgba(255,255,255,0.35)] md:h-11"
                : "h-8 w-auto brightness-140 contrast-120 drop-shadow-[0_0_10px_rgba(255,255,255,0.28)] md:h-9",
          )}
          aria-hidden
          priority={size === "sm"}
          unoptimized
        />
        {showWordmark && (size === "sm" || size === "md") && (
          <span className="relative z-[1] hidden flex-col leading-none sm:flex">
            <span
              className={cn(
                "font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-[0.18em]",
                isLight ? "text-[#1d1d1f]" : "text-metal",
              )}
            >
              Reta
            </span>
            <span
              className={cn(
                "mt-0.5 text-[9px] font-medium uppercase tracking-[0.35em]",
                isLight ? "text-[#0071e3]" : "text-[#00b8ff]",
              )}
            >
              Publicidade
            </span>
          </span>
        )}
      </span>
    );
  }

  const dims = wordmarkSize[size];
  const isHero = size === "hero";

  return (
    <span
      className={cn(
        "relative mx-auto flex w-full flex-col items-center",
        isHero && "max-w-[min(92vw,560px)]",
        className,
      )}
    >
      {withFlare && (
        <span className="logo-flare" aria-hidden>
          <span className="logo-flare__glow" />
          <span className="logo-flare__core" />
          <span className="logo-flare__hot" />
        </span>
      )}

      <Image
        src={
          isLight
            ? "/brand/reta-wordmark-light-clear.png?v=1"
            : "/brand/reta-wordmark-clear-new.png?v=2"
        }
        alt="Reta Publicidade"
        width={dims.w}
        height={dims.h}
        className={cn(
          "relative z-[1] mx-auto h-auto w-full object-contain",
          !isLight && isHero && "drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)]",
        )}
        priority={isHero}
        unoptimized
      />
    </span>
  );
}

export const RetaLogo = memo(RetaLogoComponent);
