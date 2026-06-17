import { useJourneyScroll } from "@/context/JourneyScrollContext";
import {
  tierIsSimplified,
  useOceanQualityTier,
  type OceanQualityTier,
} from "@/hooks/useOceanQuality";
import { useOceanPhasesFromScroll } from "@/hooks/useSmoothedOceanPhases";
import { markWebglReady } from "@/lib/journeyReady";
import { usePrefersReducedMotion } from "@/lib/motion";
import { Sparkles } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { BeachGeometry } from "./BeachGeometry";
import { CoralReef } from "./CoralReef";
import { MirrorWater } from "./MirrorWater";
import { OceanEnvironment } from "./OceanEnvironment";
import { OceanPostFX } from "./OceanPostFX";
import { ProceduralSky } from "./ProceduralSky";
import { SunDisc } from "./SunDisc";
import { UnderwaterVolume } from "./UnderwaterVolume";
import { skyGradientAt } from "./oceanColors";
import {
  type OceanPhases,
  computeOceanPhases,
} from "./oceanPhases";

const CAMERA_LERP = 0.09;
const LOOK_LERP = 0.085;
const FOV_LERP = 0.05;

function WebglReadyReporter() {
  const reported = useRef(false);
  useFrame(() => {
    if (reported.current) return;
    reported.current = true;
    markWebglReady();
  });
  return null;
}

function CameraRig({ phases }: { phases: OceanPhases }) {
  const { camera } = useThree();
  const goal = useRef({
    y: phases.cameraY,
    z: phases.cameraZ,
    lookY: phases.lookAtY,
    lookZ: phases.lookAtZ,
  });
  const lookAt = useRef(new THREE.Vector3(0, phases.lookAtY, phases.lookAtZ));

  useEffect(() => {
    goal.current = {
      y: phases.cameraY,
      z: phases.cameraZ,
      lookY: phases.lookAtY,
      lookZ: phases.lookAtZ,
    };
  }, [phases]);

  useFrame(() => {
    const g = goal.current;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, CAMERA_LERP);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, g.y, CAMERA_LERP);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, g.z, CAMERA_LERP);

    lookAt.current.y = THREE.MathUtils.lerp(lookAt.current.y, g.lookY, LOOK_LERP);
    lookAt.current.z = THREE.MathUtils.lerp(lookAt.current.z, g.lookZ, LOOK_LERP);
    camera.lookAt(lookAt.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      const targetFov = 40 + phases.underwater * 9 + phases.reefT * 4;
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, FOV_LERP);
      camera.updateProjectionMatrix();
    }
  });
  return null;
}

function OceanFog({ phases }: { phases: OceanPhases }) {
  const { scene } = useThree();
  const fogRef = useRef<THREE.Fog | null>(null);
  const color = useRef(new THREE.Color("#0a1824"));

  useEffect(() => {
    const fog = new THREE.Fog("#0a1824", 14, 60);
    scene.fog = fog;
    fogRef.current = fog;
    return () => {
      scene.fog = null;
      fogRef.current = null;
    };
  }, [scene]);

  useFrame(() => {
    const fog = fogRef.current;
    if (!fog) return;
    const nearGoal = 14 + phases.underwater * 10 + phases.reefT * 6;
    const farGoal = 60 + phases.underwater * 90 + phases.fogStrength * 45;
    fog.near = THREE.MathUtils.lerp(fog.near, nearGoal, 0.04);
    fog.far = THREE.MathUtils.lerp(fog.far, farGoal, 0.04);
    color.current.set("#0a1824").lerp(new THREE.Color("#061018"), phases.reefT * 0.35);
    fog.color.lerp(color.current, 0.04);
  });

  return null;
}

function OceanLights({ phases }: { phases: OceanPhases }) {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const dirRef = useRef<THREE.DirectionalLight>(null);
  const warmColor = useRef(new THREE.Color("#ffddaa"));
  const coolColor = useRef(new THREE.Color("#88aacc"));

  useFrame(() => {
    const amb = ambientRef.current;
    const hemi = hemiRef.current;
    const dir = dirRef.current;
    if (!amb || !hemi || !dir) return;

    const ambGoal = 0.22 + phases.skyOpacity * 0.14;
    const hemiGoal = 0.38 + phases.skyOpacity * 0.32;
    amb.intensity = THREE.MathUtils.lerp(amb.intensity, ambGoal, 0.04);
    hemi.intensity = THREE.MathUtils.lerp(hemi.intensity, hemiGoal, 0.04);

    const warm = phases.sunsetT < 0.88 && phases.seaWeight > 0.15;
    const targetColor = warm ? warmColor.current : coolColor.current;
    dir.color.lerp(targetColor, 0.04);
    const dirGoal = 0.9 + phases.skyOpacity * 0.55;
    dir.intensity = THREE.MathUtils.lerp(dir.intensity, dirGoal, 0.04);
    dir.position.set(80, 60 + phases.sunHeight * 50, 40);
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.22} />
      <hemisphereLight
        ref={hemiRef}
        args={["#d4e8f8", "#061018", 0.38]}
      />
      <directionalLight ref={dirRef} position={[80, 60, 40]} intensity={0.9} castShadow />
    </>
  );
}

function OceanWorld({
  phases,
  simplified,
  qualityTier,
}: {
  phases: OceanPhases;
  simplified: boolean;
  qualityTier: OceanQualityTier;
}) {
  const showCorals = qualityTier !== "low";
  const showHdri = qualityTier !== "low";
  const sparkleOpacity =
    phases.seaWeight * 0.55 + phases.reefWeight * 0.25 + phases.underwater * 0.2;

  return (
    <>
      <color attach="background" args={["#061018"]} />
      <WebglReadyReporter />
      <OceanFog phases={phases} />
      <OceanLights phases={phases} />

      {showHdri && (
        <OceanEnvironment
          intensity={phases.sunsetWeight * 0.85 + phases.seaWeight * 0.25}
        />
      )}

      <ProceduralSky phases={phases} />
      <SunDisc phases={phases} />

      <BeachGeometry phases={phases} />

      <MirrorWater phases={phases} simplified={simplified} />

      <UnderwaterVolume phases={phases} />

      <Sparkles
        count={simplified ? 35 : 70}
        scale={[28, 14, 28]}
        position={[0, -2 - phases.underwater * 4, 0]}
        size={simplified ? 1.2 : 1.8}
        speed={0.2}
        opacity={sparkleOpacity * 0.35}
        color="#5ee7d0"
      />

      {showCorals && (
        <CoralReef phases={phases} reduced={qualityTier === "medium"} />
      )}

      <CameraRig phases={phases} />

      {!simplified && (
        <EffectComposer multisampling={0}>
          <OceanPostFX phases={phases} />
        </EffectComposer>
      )}
    </>
  );
}

function OceanCanvas({
  phases,
  simplified,
  qualityTier,
}: {
  phases: OceanPhases;
  simplified: boolean;
  qualityTier: OceanQualityTier;
}) {
  return (
    <Canvas
      dpr={simplified ? [1, 1.25] : [1, 2]}
      gl={{
        alpha: true,
        antialias: !simplified,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: simplified ? 0.95 : 1.12,
      }}
      shadows={!simplified}
      style={{ pointerEvents: "none" }}
      camera={{
        position: [0, phases.cameraY, phases.cameraZ],
        fov: 40,
        near: 1,
        far: 3000,
      }}
    >
      <Suspense fallback={null}>
        <OceanWorld
          phases={phases}
          simplified={simplified}
          qualityTier={qualityTier}
        />
      </Suspense>
    </Canvas>
  );
}

function OceanStatic({ phases }: { phases: OceanPhases }) {
  return (
    <div className="absolute inset-0 bg-[#061018]" aria-hidden>
      {phases.skyOpacity > 0.02 && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: skyGradientAt(phases.sunsetT),
            opacity: phases.skyOpacity,
          }}
        />
      )}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(18,72,96,0.5) 35%, rgba(4,16,24,0.95) 62%, rgb(2,8,12) 100%)",
          opacity: 0.65 + phases.underwater * 0.35,
        }}
      />
    </div>
  );
}

export function OceanScene() {
  const { reducedMotion, pageProgress, introProgress, introEndRatio, experienceReady } =
    useJourneyScroll();
  const qualityTier = useOceanQualityTier();
  const simplified = tierIsSimplified(qualityTier);
  const [visible, setVisible] = useState(true);

  const phases = useOceanPhasesFromScroll();
  const staticPhases = useMemo(
    () =>
      computeOceanPhases({
        introProgress,
        pageProgress,
        introEndRatio,
        experienceReady,
      }),
    [introProgress, pageProgress, introEndRatio, experienceReady],
  );

  useEffect(() => {
    if (reducedMotion) markWebglReady();
  }, [reducedMotion]);

  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const showWebGL = !reducedMotion && visible;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#061018]" aria-hidden>
      {showWebGL ? (
        <OceanCanvas
          phases={phases}
          simplified={simplified}
          qualityTier={qualityTier}
        />
      ) : (
        <OceanStatic phases={staticPhases} />
      )}
    </div>
  );
}
