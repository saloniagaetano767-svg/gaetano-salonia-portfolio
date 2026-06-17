import { MeshReflectorMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { OceanPhases } from "./oceanPhases";

interface CinematicWaterProps {
  phases: OceanPhases;
  simplified?: boolean;
}

export function CinematicWater({ phases, simplified }: CinematicWaterProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const waterColor = useRef(new THREE.Color("#1a5a72"));
  const sunsetTint = useRef(new THREE.Color("#5a4030"));
  const deepColor = useRef(new THREE.Color("#010608"));
  const targetColor = useRef(new THREE.Color("#1a5a72"));

  const visible = phases.skyOpacity > 0.02 || phases.underwater < 0.92;
  const opacity = Math.max(0.12, 1 - phases.underwater * 0.7);

  useFrame(() => {
    targetColor.current.copy(waterColor.current).lerp(sunsetTint.current, phases.sunsetT * 0.4);
    targetColor.current.lerp(deepColor.current, phases.underwater);
    waterColor.current.lerp(targetColor.current, 0.028);

    const mat = meshRef.current?.material as THREE.MeshStandardMaterial | undefined;
    if (mat?.color) mat.color.copy(waterColor.current);
  });

  if (!visible) return null;

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.02, 0]}
    >
      <planeGeometry args={[400, 400]} />
      <MeshReflectorMaterial
        blur={[simplified ? 180 : 360, simplified ? 40 : 90]}
        resolution={simplified ? 512 : 1024}
        mixBlur={0.88}
        mixStrength={0.58 + phases.sunsetT * 0.28}
        roughness={0.32 + phases.underwater * 0.42}
        depthScale={1.15}
        minDepthThreshold={0.32}
        maxDepthThreshold={1.3}
        color="#1a5a72"
        metalness={0.18}
        mirror={0.7 + phases.sunsetT * 0.22}
        distortion={0.1}
        mixContrast={1.08}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}
