import type { PageSection } from "@/context/JourneyScrollContext";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { OceanPhases } from "./oceanPhases";

type MarinePreset = {
  count: number;
  color: string;
  emissive?: string;
  scale: [number, number, number];
  depth: number;
  spread: number;
  speed: number;
};

const PRESETS: Record<Exclude<PageSection, "intro">, MarinePreset> = {
  about: {
    count: 8,
    color: "#8ab4c4",
    scale: [0.5, 0.14, 0.12],
    depth: -1.2,
    spread: 14,
    speed: 0.38,
  },
  skills: {
    count: 12,
    color: "#ff9f43",
    emissive: "#ff6b1a",
    scale: [0.55, 0.16, 0.14],
    depth: -2.5,
    spread: 18,
    speed: 0.5,
  },
  milestones: {
    count: 6,
    color: "#4a6a8a",
    scale: [1.1, 0.2, 0.22],
    depth: -4.2,
    spread: 22,
    speed: 0.3,
  },
  contact: {
    count: 4,
    color: "#2a4a5a",
    emissive: "#1a3040",
    scale: [2.2, 0.1, 1.6],
    depth: -5.5,
    spread: 24,
    speed: 0.16,
  },
};

const MAX_FISH = 12;

interface MarineLifeProps {
  phases: OceanPhases;
  activeSection: PageSection;
}

export function MarineLife({ phases, activeSection }: MarineLifeProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const offsets = useRef<Float32Array | null>(null);
  const blendRef = useRef(1);
  const colorRef = useRef(new THREE.Color("#8ab4c4"));
  const targetColor = useRef(new THREE.Color("#8ab4c4"));

  const targetPreset =
    activeSection !== "intro" ? PRESETS[activeSection] : PRESETS.about;
  const showLife =
    activeSection !== "intro" &&
    (phases.underwater > 0.05 || phases.descent > 0.25);

  const geometry = useMemo(() => new THREE.CapsuleGeometry(0.2, 0.6, 4, 8), []);

  useEffect(() => {
    offsets.current = new Float32Array(MAX_FISH * 3);
    for (let i = 0; i < MAX_FISH; i++) {
      offsets.current[i * 3] = (Math.random() - 0.5) * targetPreset.spread;
      offsets.current[i * 3 + 1] = (Math.random() - 0.5) * 2;
      offsets.current[i * 3 + 2] = (Math.random() - 0.5) * targetPreset.spread;
    }
    targetColor.current.set(targetPreset.color);
  }, [targetPreset]);

  useFrame((state) => {
    if (!meshRef.current || !offsets.current || !showLife) return;

    blendRef.current = THREE.MathUtils.lerp(blendRef.current, 1, 0.06);
    colorRef.current.lerp(targetColor.current, 0.05);

    const t = state.clock.elapsedTime * targetPreset.speed;
    const visibility = THREE.MathUtils.smoothstep(0.08, 0.4, phases.underwater);
    meshRef.current.visible = visibility > 0.04;

    const activeCount = Math.min(targetPreset.count, MAX_FISH);
    for (let i = 0; i < MAX_FISH; i++) {
      if (i >= activeCount) {
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        continue;
      }

      const ox = offsets.current[i * 3];
      const oy = offsets.current[i * 3 + 1];
      const oz = offsets.current[i * 3 + 2];

      const swimX = ox + Math.sin(t + i * 0.7) * 3;
      const swimY = targetPreset.depth + oy + Math.sin(t * 1.3 + i) * 0.5;
      const swimZ = oz + Math.cos(t * 0.8 + i * 0.5) * 2.5;

      dummy.position.set(swimX, swimY, swimZ);
      dummy.rotation.y = Math.atan2(
        Math.cos(t * 0.8 + i * 0.5) * 2.5,
        Math.sin(t + i * 0.7) * 3,
      );
      dummy.scale.set(
        targetPreset.scale[0],
        targetPreset.scale[1],
        targetPreset.scale[2],
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.opacity = visibility * 0.8 * blendRef.current;
    mat.color.copy(colorRef.current);
    mat.emissive.set(targetPreset.emissive ?? "#000000");
    mat.emissiveIntensity = targetPreset.emissive ? 0.22 : 0;
    mat.transparent = true;
  });

  if (!showLife) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, MAX_FISH]}
      frustumCulled={false}
    >
      <meshStandardMaterial
        color="#8ab4c4"
        roughness={0.4}
        metalness={0.12}
        transparent
        opacity={0}
      />
    </instancedMesh>
  );
}
