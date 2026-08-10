"use client";

import { useSyncExternalStore } from "react";

function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2", {
      failIfMajorPerformanceCaveat: false,
    }) ??
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false }) ??
      canvas.getContext("experimental-webgl", {
        failIfMajorPerformanceCaveat: false,
      })) as WebGLRenderingContext | null;

    if (!gl) return false;

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (debugInfo) {
      const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) as string;
      const renderer = gl.getParameter(
        debugInfo.UNMASKED_RENDERER_WEBGL,
      ) as string;

      if (
        vendor === "Disabled" ||
        renderer === "Disabled" ||
        /swiftshader|llvmpipe|software/i.test(renderer)
      ) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("load", onStoreChange);
  return () => window.removeEventListener("load", onStoreChange);
}

function getSnapshot() {
  return detectWebGL();
}

function getServerSnapshot() {
  return false;
}

export function useWebGLSupport(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
