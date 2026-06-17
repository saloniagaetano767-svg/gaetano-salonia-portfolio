import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { OceanPhases } from "./oceanPhases";

function createSandTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#d4b896";
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 18000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const g = 175 + Math.random() * 55;
      ctx.fillStyle = `rgba(${g},${g - 22},${g - 48},0.28)`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(24, 8);
  return tex;
}

interface BeachGeometryProps {
  phases: OceanPhases;
}

export function BeachGeometry({ phases }: BeachGeometryProps) {
  const sandTexture = useMemo(() => createSandTexture(), []);
  const sandMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const dryMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const wetRef = useRef<THREE.MeshStandardMaterial>(null);
  const opacityRef = useRef(phases.beachOpacity);
  const timeRef = useRef(0);

  useEffect(() => {
    return () => sandTexture.dispose();
  }, [sandTexture]);

  useFrame((_, delta) => {
    timeRef.current += delta;
    opacityRef.current = THREE.MathUtils.lerp(
      opacityRef.current,
      phases.beachOpacity,
      0.04,
    );
    const o = opacityRef.current;
    const shimmer = 0.38 + Math.sin(timeRef.current * 1.2) * 0.05;
    if (sandMatRef.current) sandMatRef.current.opacity = o;
    if (dryMatRef.current) dryMatRef.current.opacity = o * 0.9;
    if (wetRef.current) wetRef.current.opacity = o * shimmer * 0.42;
  });

  return (
    <group position={[0, -0.35, 4]} rotation={[-0.08, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -6]}>
        <planeGeometry args={[400, 48, 48, 12]} />
        <meshStandardMaterial
          ref={sandMatRef}
          map={sandTexture}
          roughness={0.95}
          metalness={0.02}
          transparent
          opacity={0}
        />
      </mesh>
      <mesh position={[0, 0.04, 10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[400, 18, 32, 4]} />
        <meshStandardMaterial
          ref={dryMatRef}
          color="#edd9b8"
          roughness={1}
          transparent
          opacity={0}
        />
      </mesh>
      <mesh position={[0, 0.03, -22]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[400, 8, 32, 2]} />
        <meshStandardMaterial
          ref={wetRef}
          color="#6a98a8"
          roughness={0.15}
          metalness={0.35}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}
