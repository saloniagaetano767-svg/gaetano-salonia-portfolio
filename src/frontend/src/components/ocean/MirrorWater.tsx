import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Water } from "three/addons/objects/Water.js";
import type { OceanPhases } from "./oceanPhases";
import { sunPositionFromPhases } from "./sunUtils";

const WATER_NORMALS = "/assets/ocean/waternormals.jpg";
const COLOR_LERP = 0.05;

interface MirrorWaterProps {
  phases: OceanPhases;
  simplified?: boolean;
}

export function MirrorWater({ phases, simplified }: MirrorWaterProps) {
  const normalMap = useLoader(THREE.TextureLoader, WATER_NORMALS);
  const { camera } = useThree();
  const sunDir = useRef(new THREE.Vector3());
  const alphaRef = useRef(1);
  const surfaceColor = useRef(new THREE.Color("#1a5a72"));
  const deepColor = useRef(new THREE.Color("#010608"));
  const warmTint = useRef(new THREE.Color("#2a5a6a"));
  const sunsetTint = useRef(new THREE.Color("#6a4030"));

  const water = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(4000, 4000);
    const mesh = new Water(geometry, {
      textureWidth: simplified ? 1024 : 2048,
      textureHeight: simplified ? 1024 : 2048,
      waterNormals: normalMap,
      sunDirection: new THREE.Vector3(0.4, 0.75, 0.35),
      sunColor: 0xffd4a8,
      waterColor: 0x1a5a72,
      distortionScale: simplified ? 4.2 : 7.2,
      fog: true,
      alpha: 1,
    });
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = 0;
    mesh.frustumCulled = false;
    return mesh;
  }, [normalMap, simplified]);

  useEffect(() => {
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(4, 4);
  }, [normalMap]);

  useEffect(() => {
    return () => {
      water.geometry.dispose();
      (water.material as THREE.ShaderMaterial).dispose();
    };
  }, [water]);

  useFrame((_state, delta) => {
    const mat = water.material as THREE.ShaderMaterial;
    const uniforms = mat.uniforms;

    uniforms.time.value += delta * (simplified ? 0.75 : 1.05);

    sunPositionFromPhases(phases, sunDir.current);
    uniforms.sunDirection.value.copy(sunDir.current).normalize();

    const underwater = phases.underwater;
    warmTint.current.set("#2a5a6a");
    sunsetTint.current.set("#6a4030");
    surfaceColor.current
      .copy(warmTint.current)
      .lerp(sunsetTint.current, phases.sunsetT * 0.55);
    const targetWater = new THREE.Color().lerpColors(
      surfaceColor.current,
      deepColor.current,
      underwater,
    );
    uniforms.waterColor.value.lerp(targetWater, COLOR_LERP);

    const warmSun = phases.sunsetT < 0.92 && underwater < 0.45;
    const sunHex = warmSun ? 0xffcc88 : 0x5599bb;
    const currentSun = uniforms.sunColor.value.getHex();
    if (currentSun !== sunHex) {
      uniforms.sunColor.value.lerp(
        new THREE.Color(sunHex),
        COLOR_LERP,
      );
    }

    const distHigh = simplified ? 4.2 : 7.2;
    const distLow = simplified ? 2.2 : 3.4;
    const distGoal = THREE.MathUtils.lerp(distHigh, distLow, underwater);
    uniforms.distortionScale.value = THREE.MathUtils.lerp(
      uniforms.distortionScale.value,
      distGoal,
      COLOR_LERP,
    );

    targetAlpha(uniforms, underwater, alphaRef);
    uniforms.eye.value.copy(camera.position);
    water.visible = phases.skyOpacity > 0.005 || underwater < 0.98;
  });

  return <primitive object={water} />;
}

function targetAlpha(
  uniforms: Record<string, THREE.IUniform>,
  underwater: number,
  alphaRef: React.MutableRefObject<number>,
) {
  const goal =
    underwater > 0.5
      ? THREE.MathUtils.lerp(1, 0.35, (underwater - 0.5) / 0.5)
      : 1;
  alphaRef.current = THREE.MathUtils.lerp(alphaRef.current, goal, 0.05);
  uniforms.alpha.value = alphaRef.current;
}
