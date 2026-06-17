import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { OceanPhases } from "./oceanPhases";
import { smoothstep } from "./oceanPhases";

interface UnderwaterVolumeProps {
  phases: OceanPhases;
}

export function UnderwaterVolume({ phases }: UnderwaterVolumeProps) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const depthColor = useRef(new THREE.Color("#021830"));
  const abyssColor = useRef(new THREE.Color("#000204"));
  const reefTint = useRef(new THREE.Color("#0a1828"));

  const geometry = useMemo(() => new THREE.BoxGeometry(500, 120, 500), []);

  useFrame(() => {
    if (!matRef.current) return;
    const u = phases.underwaterT;
    const targetOpacity =
      u > 0.05
        ? smoothstep(0.05, 0.75, u) * 0.88 + phases.reefWeight * 0.08
        : 0;
    matRef.current.opacity = THREE.MathUtils.lerp(
      matRef.current.opacity,
      targetOpacity,
      0.04,
    );
    depthColor.current.lerpColors(
      new THREE.Color("#021830"),
      abyssColor.current,
      phases.underwater,
    );
    depthColor.current.lerp(reefTint.current, phases.reefWeight * 0.35);
    matRef.current.color.copy(depthColor.current);
  });

  return (
    <mesh geometry={geometry} position={[0, -55, 0]}>
      <meshBasicMaterial
        ref={matRef}
        color="#021018"
        transparent
        opacity={0}
        depthWrite={false}
        side={THREE.BackSide}
      />
    </mesh>
  );
}
