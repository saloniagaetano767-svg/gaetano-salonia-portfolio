import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { OceanPhases } from "./oceanPhases";

interface SeagullBirdProps {
  start: [number, number, number];
  speed: number;
  phase: number;
  scale?: number;
  phases: OceanPhases;
}

function SeagullBird({
  start,
  speed,
  phase,
  scale = 1,
  phases,
}: SeagullBirdProps) {
  const group = useRef<THREE.Group>(null);
  const wingL = useRef<THREE.Mesh>(null);
  const wingR = useRef<THREE.Mesh>(null);
  const bodyMat = useRef<THREE.MeshBasicMaterial>(null);
  const wingMatL = useRef<THREE.MeshBasicMaterial>(null);
  const wingMatR = useRef<THREE.MeshBasicMaterial>(null);

  const fadeRef = useRef(1);

  useFrame((state) => {
    if (!group.current) return;
    const goal = phases.skyOpacity * (1 - phases.underwater * 0.85);
    fadeRef.current = THREE.MathUtils.lerp(fadeRef.current, goal, 0.1);
    const alpha = fadeRef.current * 0.92;
    const t = state.clock.elapsedTime * speed + phase;
    group.current.position.x = start[0] + Math.sin(t * 0.7) * 14;
    group.current.position.y =
      start[1] + Math.sin(t * 1.1) * 0.8 + Math.cos(t * 0.4) * 0.4;
    group.current.position.z = start[2] + Math.cos(t * 0.55) * 10;
    group.current.rotation.y = Math.atan2(
      Math.cos(t * 0.7) * 14 * 0.7,
      -Math.sin(t * 0.55) * 10 * 0.55,
    );

    const flap = Math.sin(t * 8) * 0.35;
    if (wingL.current) wingL.current.rotation.z = 0.45 + flap;
    if (wingR.current) wingR.current.rotation.z = -0.45 - flap;

    if (bodyMat.current) bodyMat.current.opacity = alpha;
    if (wingMatL.current) wingMatL.current.opacity = alpha;
    if (wingMatR.current) wingMatR.current.opacity = alpha;
  });

  return (
    <group ref={group} position={start} scale={scale}>
      <mesh>
        <capsuleGeometry args={[0.08, 0.35, 4, 8]} />
        <meshBasicMaterial
          ref={bodyMat}
          color="#f5f5f0"
          transparent
          opacity={1}
        />
      </mesh>
      <mesh ref={wingL} position={[-0.22, 0.05, 0]} rotation={[0, 0, 0.45]}>
        <boxGeometry args={[0.55, 0.03, 0.18]} />
        <meshBasicMaterial
          ref={wingMatL}
          color="#ffffff"
          transparent
          opacity={1}
        />
      </mesh>
      <mesh ref={wingR} position={[0.22, 0.05, 0]} rotation={[0, 0, -0.45]}>
        <boxGeometry args={[0.55, 0.03, 0.18]} />
        <meshBasicMaterial
          ref={wingMatR}
          color="#ffffff"
          transparent
          opacity={1}
        />
      </mesh>
    </group>
  );
}

interface SeagullsProps {
  phases: OceanPhases;
}

export function Seagulls({ phases }: SeagullsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const opacity = useRef(1);

  const birds = useMemo(
    () => [
      {
        start: [-12, 9, -6] as [number, number, number],
        speed: 0.35,
        phase: 0,
        scale: 1.1,
      },
      {
        start: [8, 11, -10] as [number, number, number],
        speed: 0.28,
        phase: 2.1,
        scale: 0.9,
      },
      {
        start: [-4, 13, -14] as [number, number, number],
        speed: 0.32,
        phase: 4.3,
        scale: 1,
      },
    ],
    [],
  );

  useFrame(() => {
    if (!groupRef.current) return;
    const goal = phases.skyOpacity * (1 - phases.underwater * 0.85);
    opacity.current = THREE.MathUtils.lerp(opacity.current, goal, 0.1);
    groupRef.current.visible = opacity.current > 0.03;
  });

  if (phases.skyOpacity < 0.04) return null;

  return (
    <group ref={groupRef}>
      {birds.map((b) => (
        <SeagullBird key={b.phase} {...b} phases={phases} />
      ))}
    </group>
  );
}
