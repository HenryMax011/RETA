"use client";

import { useCallback, useRef } from "react";

interface TiltOptions {
  maxTilt?: number;
  scale?: number;
}

export function useTilt<T extends HTMLElement>({
  maxTilt = 12,
  scale = 1.02,
}: TiltOptions = {}) {
  const ref = useRef<T>(null);
  const frameRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;

      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        el.style.transform = `perspective(800px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale3d(${scale}, ${scale}, ${scale})`;
      });
    },
    [maxTilt, scale],
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    cancelAnimationFrame(frameRef.current);
    el.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
