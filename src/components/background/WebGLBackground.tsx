"use client";

import {
  Component,
  type ErrorInfo,
  type ReactNode,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { Aurora } from "./Aurora";
import { CanvasAuroraBackground } from "./CanvasAuroraBackground";
import { ParticleField } from "./ParticleField";

function Scene() {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  const starCount = useMemo(() => {
    if (reducedMotion) return 120;
    return isMobile ? 350 : 900;
  }, [isMobile, reducedMotion]);

  const intensity = reducedMotion ? 0.7 : 1.1;

  return (
    <>
      <Aurora intensity={intensity} />
      <ParticleField count={starCount} />
    </>
  );
}

interface WebGLErrorBoundaryProps {
  children: ReactNode;
  onError: () => void;
}

interface WebGLErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<
  WebGLErrorBoundaryProps,
  WebGLErrorBoundaryState
> {
  state: WebGLErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): WebGLErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn(
      "[Background] WebGL indisponível, usando Canvas 2D.",
      error.message,
    );
    this.props.onError();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function WebGLCanvas({ onFail }: { onFail: () => void }) {
  return (
    <Canvas
      dpr={[1, 1.25]}
      camera={{ position: [0, 0, 12], fov: 60 }}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      }}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", () => {
          onFail();
        });
      }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}

export function WebGLBackground() {
  const webglSupported = useWebGLSupport();
  const [webglFailed, setWebglFailed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const rejectHandler = (event: PromiseRejectionEvent) => {
      const message = String(event.reason?.message ?? event.reason ?? "");
      if (/webgl|WebGL|context/i.test(message)) {
        event.preventDefault();
        setWebglFailed(true);
      }
    };

    window.addEventListener("unhandledrejection", rejectHandler);
    return () => window.removeEventListener("unhandledrejection", rejectHandler);
  }, []);

  if (!mounted || !webglSupported || webglFailed) {
    return <CanvasAuroraBackground />;
  }

  return (
    <div className="fixed inset-0 z-0 h-full w-full" aria-hidden="true">
      <WebGLErrorBoundary onError={() => setWebglFailed(true)}>
        <WebGLCanvas onFail={() => setWebglFailed(true)} />
      </WebGLErrorBoundary>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030712]/70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(34,211,238,0.10),transparent_55%)]" />
    </div>
  );
}
