"use client";

import { memo, useEffect, useRef } from "react";
import { renderAuroraFrame } from "./auroraShader2d";

const SHADER_MIN_MS = 8;

function getRenderSize(width: number, height: number) {
  const isMobile = width < 768;
  const scale = isMobile ? 0.65 : 0.88;
  let renderW = Math.max(1, Math.floor(width * scale));
  let renderH = Math.max(1, Math.floor(height * scale));

  const maxW = isMobile ? 600 : 1100;
  if (renderW > maxW) {
    const ratio = maxW / renderW;
    renderW = maxW;
    renderH = Math.max(1, Math.floor(renderH * ratio));
  }

  return { renderW, renderH };
}

function CanvasAuroraBackgroundComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let renderW = 0;
    let renderH = 0;
    let aspect = 1;
    let auroraBuffer: HTMLCanvasElement | null = null;
    let auroraCtx: CanvasRenderingContext2D | null = null;
    let fallbackImageData: ImageData | null = null;
    let worker: Worker | null = null;
    let rafId = 0;
    let lastShaderAt = 0;
    let mouseUvX = 0.5;
    let mouseUvY = 0.5;
    let latestTime = 0;
    let latestBitmap: ImageBitmap | null = null;

    const setupBuffers = () => {
      const size = getRenderSize(width, height);
      renderW = size.renderW;
      renderH = size.renderH;
      aspect = renderW / renderH;

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      auroraBuffer = document.createElement("canvas");
      auroraBuffer.width = renderW;
      auroraBuffer.height = renderH;
      auroraCtx = auroraBuffer.getContext("2d", { alpha: false });
      fallbackImageData = auroraCtx?.createImageData(renderW, renderH) ?? null;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      latestBitmap?.close();
      latestBitmap = null;
      lastShaderAt = 0;
    };

    const blitAurora = () => {
      if (latestBitmap) {
        ctx.drawImage(latestBitmap, 0, 0, renderW, renderH, 0, 0, width, height);
      } else if (auroraBuffer) {
        ctx.drawImage(auroraBuffer, 0, 0, renderW, renderH, 0, 0, width, height);
      }
    };

    const uploadFallback = () => {
      if (!auroraBuffer || !fallbackImageData || !auroraCtx) return;
      auroraCtx.putImageData(fallbackImageData, 0, 0);
    };

    const tryQueueShader = (now: number) => {
      if (now - lastShaderAt < SHADER_MIN_MS) return;

      if (worker) {
        lastShaderAt = now;
        worker.postMessage({
          renderW,
          renderH,
          aspect,
          time: latestTime,
          mouseX: mouseUvX,
          mouseY: mouseUvY,
        });
        return;
      }

      if (!fallbackImageData) return;
      lastShaderAt = now;
      renderAuroraFrame(
        fallbackImageData.data,
        renderW,
        renderH,
        aspect,
        latestTime,
        mouseUvX,
        mouseUvY,
        1.25,
      );
      uploadFallback();
    };

    const onMove = (event: MouseEvent) => {
      if (!width || !height) return;
      const mx = (event.clientX / width) * 2 - 1;
      const my = -(event.clientY / height) * 2 + 1;
      mouseUvX = mx * 0.5 + 0.5;
      mouseUvY = my * 0.5 + 0.5;
    };

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);
      latestTime = now * 0.001;

      tryQueueShader(now);
      blitAurora();
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else if (!reducedMotion) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      setupBuffers();
      tryQueueShader(performance.now());
      blitAurora();
    };

    try {
      worker = new Worker(new URL("./aurora.worker.ts", import.meta.url));
      worker.onmessage = (event: MessageEvent<{ bitmap: ImageBitmap }>) => {
        latestBitmap?.close();
        latestBitmap = event.data.bitmap;
        tryQueueShader(performance.now());
      };
      worker.onerror = () => {
        worker?.terminate();
        worker = null;
      };
    } catch {
      worker = null;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    if (!reducedMotion) {
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafId);
      latestBitmap?.close();
      worker?.terminate();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 h-full w-full overflow-hidden" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ imageRendering: "auto" }}
      />
      {/* Estrelas + profundidade */}
      <div className="pointer-events-none absolute inset-0 opacity-70 aurora-bg__stars" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_28%,rgba(0,234,255,0.1),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.45)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#02050c]/30 via-transparent to-black/75" />
    </div>
  );
}

export const CanvasAuroraBackground = memo(CanvasAuroraBackgroundComponent);
