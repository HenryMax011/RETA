"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface ParticleFieldProps {
  count: number;
}

function createStarfield(count: number) {
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 32;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 18 - 4;
    scales[i] = Math.random();
  }

  return { positions, scales };
}

export function ParticleField({ count }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  const { positions } = useMemo(() => createStarfield(count), [count]);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;

    // Gentle parallax drift following the cursor for depth
    const px = state.pointer.x * 0.6;
    const py = state.pointer.y * 0.4;
    points.position.x = THREE.MathUtils.lerp(points.position.x, px, 0.02);
    points.position.y = THREE.MathUtils.lerp(points.position.y, py, 0.02);

    // Subtle twinkle
    if (matRef.current) {
      matRef.current.opacity =
        0.5 + Math.sin(state.clock.elapsedTime * 1.5) * 0.12;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={0.035}
        color="#cffafe"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
