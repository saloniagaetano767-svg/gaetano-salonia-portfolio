import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { OceanPhases } from "./oceanPhases";
import { sunPositionFromPhases } from "./sunUtils";

interface SunDiscProps {
  phases: OceanPhases;
}

export function SunDisc({ phases }: SunDiscProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const outerGlowRef = useRef<THREE.Mesh>(null);
  const sunVec = useMemo(() => new THREE.Vector3(), []);
  const sunPos = useMemo(() => new THREE.Vector3(), []);
  const opacityRef = useRef(0);

  useFrame(() => {
    opacityRef.current = THREE.MathUtils.lerp(
      opacityRef.current,
      phases.skyOpacity,
      0.04,
    );
    const o = opacityRef.current;
    if (!meshRef.current || o < 0.01) {
      if (meshRef.current) meshRef.current.visible = false;
      if (glowRef.current) glowRef.current.visible = false;
      if (outerGlowRef.current) outerGlowRef.current.visible = false;
      return;
    }

    sunPositionFromPhases(phases, sunVec);
    sunPos.copy(sunVec).normalize().multiplyScalar(220);
    meshRef.current.position.copy(sunPos);
    meshRef.current.visible = true;
    if (glowRef.current) {
      glowRef.current.position.copy(sunPos);
      glowRef.current.scale.setScalar((1 + phases.sunHeight * 0.4) * 2.8);
      glowRef.current.visible = true;
    }
    if (outerGlowRef.current) {
      outerGlowRef.current.position.copy(sunPos);
      outerGlowRef.current.scale.setScalar(3.8 + phases.sunHeight * 1.2);
      outerGlowRef.current.visible = true;
    }
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = o * 0.98;
    const glowMat = glowRef.current?.material as THREE.MeshBasicMaterial;
    if (glowMat) glowMat.opacity = o * 0.28;
    const outerMat = outerGlowRef.current?.material as THREE.MeshBasicMaterial;
    if (outerMat) outerMat.opacity = o * 0.1;
  });

  return (
    <group>
      <mesh ref={outerGlowRef} visible={false}>
        <sphereGeometry args={[18, 24, 24]} />
        <meshBasicMaterial
          color="#ff6622"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={glowRef} visible={false}>
        <sphereGeometry args={[14, 32, 32]} />
        <meshBasicMaterial
          color="#ff8844"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={meshRef} visible={false}>
        <sphereGeometry args={[5.5, 32, 32]} />
        <meshBasicMaterial
          color="#ffcc66"
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
