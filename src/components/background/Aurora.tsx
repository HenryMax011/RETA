"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uIntensity;

  // Simplex-ish value noise
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    float m = step(a.y, a.x);
    vec2 o = vec2(m, 1.0 - m);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(
      dot(a, hash(i + 0.0)),
      dot(b, hash(i + o)),
      dot(c, hash(i + 1.0))
    );
    return dot(n, vec3(70.0));
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 st = uv;
    st.x *= aspect;

    float t = uTime * 0.06;

    // Flowing aurora bands
    vec2 q = vec2(fbm(st * 1.5 + t), fbm(st * 1.5 - t + 4.2));
    vec2 r = vec2(
      fbm(st * 2.0 + q * 1.8 + vec2(1.7, 9.2) + t),
      fbm(st * 2.0 + q * 1.8 + vec2(8.3, 2.8) - t)
    );
    float f = fbm(st * 2.5 + r * 2.0);

    // Subtle mouse parallax pull
    float md = distance(uv, uMouse * 0.5 + 0.5);
    f += (1.0 - smoothstep(0.0, 0.6, md)) * 0.15;

    float band = smoothstep(0.0, 1.0, f + r.x * 0.6);

    vec3 color = mix(uColorA, uColorB, clamp(band, 0.0, 1.0));
    color = mix(color, uColorC, clamp(r.y * 0.7, 0.0, 1.0));

    // Vertical fade so it reads as ambient lighting from top
    float vGrad = smoothstep(1.1, -0.2, uv.y);
    float glow = pow(clamp(f * 0.5 + 0.5, 0.0, 1.0), 2.2);

    vec3 finalColor = color * glow * uIntensity * (0.5 + vGrad * 0.8);

    // Deep space base
    vec3 base = vec3(0.011, 0.027, 0.071);
    finalColor += base;

    // Vignette
    float vig = smoothstep(1.3, 0.2, length(uv - 0.5));
    finalColor *= mix(0.65, 1.0, vig);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

interface AuroraProps {
  intensity?: number;
}

export function Aurora({ intensity = 1.1 }: AuroraProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();
  const mouseTarget = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(size.width, size.height),
      },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color("#003c78") },
      uColorB: { value: new THREE.Color("#00d4ff") },
      uColorC: { value: new THREE.Color("#0055ff") },
      uIntensity: { value: intensity },
    }),
    // uniforms object is created once; values updated in useFrame
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((state) => {
    const mat = materialRef.current;
    if (!mat) return;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uResolution.value.set(
      state.size.width,
      state.size.height,
    );
    mouseTarget.current.lerp(state.pointer, 0.04);
    mat.uniforms.uMouse.value.copy(mouseTarget.current);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]} position={[0, 0, 0]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}
