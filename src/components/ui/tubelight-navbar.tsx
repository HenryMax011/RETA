"use client";

import { LayoutGroup, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TubelightNavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: TubelightNavItem[];
  className?: string;
  tone?: "light" | "dark";
}

export function NavBar({ items, className, tone = "light" }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.name);
  const isDark = tone === "dark";

  useEffect(() => {
    const sectionIds = items
      .map((item) => item.url.replace("#", ""))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target.id) return;
        const match = items.find((item) => item.url === `#${visible.target.id}`);
        if (match) setActiveTab(match.name);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <LayoutGroup id="tubelight-nav">
      <div className={cn("flex items-center gap-1 md:gap-2", className)}>
        {items.map((item) => {
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer px-3 py-2 text-[13px] font-medium tracking-wide transition-colors md:px-4 md:text-sm",
                isDark
                  ? isActive
                    ? "text-white"
                    : "text-white/55 hover:text-white"
                  : isActive
                    ? "text-[#1d1d1f]"
                    : "text-[#6e6e73] hover:text-[#1d1d1f]",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-underline"
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full",
                    isDark ? "bg-[#3b9eff]" : "bg-[#0071e3]",
                  )}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
