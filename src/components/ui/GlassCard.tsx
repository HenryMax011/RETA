"use client";

import { memo, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  enableTilt?: boolean;
  glowColor?: "cyan" | "electric";
}

function GlassCardComponent({
  children,
  className,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-[#fafafa] p-6 transition-[border-color,box-shadow,transform,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-black/[0.1] hover:bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] md:p-8",
        className,
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export const GlassCard = memo(GlassCardComponent);
