import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Sky } from "three/addons/objects/Sky.js";
import type { OceanPhases } from "./oceanPhases";
import { sunPositionFromPhases } from "./sunUtils";

interface ProceduralSkyProps {
  phases: OceanPhases;
}

export function ProceduralSky({ phases }: ProceduralSkyProps) {
  const sky = useMemo(() => {
    const mesh = new Sky();
    mesh.scale.setScalar(45_000);
    mesh.frustumCulled = false;
    return mesh;
  }, []);

  const sunRef = useRef(new THREE.Vector3());
  const visibleRef = useRef(1);

  useEffect(() => {
    const mat = sky.material as THREE.ShaderMaterial;
    mat.transparent = true;
    mat.depthWrite = false;
    return () => {
      sky.geometry.dispose();
      mat.dispose();
    };
  }, [sky]);

  useFrame(() => {
    const mat = sky.material as THREE.ShaderMaterial;
    const uniforms = mat.uniforms;

    sunPositionFromPhases(phases, sunRef.current);
    uniforms.sunPosition.value.copy(sunRef.current);

    uniforms.turbidity.value = THREE.MathUtils.lerp(6, 22, phases.sunsetT);
    uniforms.rayleigh.value = THREE.MathUtils.lerp(1.4, 3.8, phases.sunsetT);
    uniforms.mieCoefficient.value = 0.008;
    uniforms.mieDirectionalG.value = 0.855;

    visibleRef.current = THREE.MathUtils.lerp(
      visibleRef.current,
      phases.skyOpacity,
      0.04,
    );
    mat.opacity = visibleRef.current;
    mat.transparent = visibleRef.current < 0.99;
    sky.visible = visibleRef.current > 0.005;
  });

  return <primitive object={sky} />;
}
