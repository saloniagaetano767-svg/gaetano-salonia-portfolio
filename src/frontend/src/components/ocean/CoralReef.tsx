import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { OceanPhases } from "./oceanPhases";

interface CoralReefProps {
  phases: OceanPhases;
  reduced?: boolean;
}

const CORAL_COLORS = [
  "#e87898",
  "#ff9a6c",
  "#d4648a",
  "#6ec4b8",
  "#c45c8a",
  "#f0a878",
];

function createBranchCoral(
  seed: number,
  height: number,
  spread: number,
): THREE.BufferGeometry {
  const rng = (n: number) => {
    const x = Math.sin(seed * 127.1 + n * 311.7) * 43758.5453;
    return x - Math.floor(x);
  };

  const points: THREE.Vector3[] = [new THREE.Vector3(0, 0, 0)];
  let y = 0;
  for (let i = 0; i < 8; i++) {
    y += height / 8;
    points.push(
      new THREE.Vector3(
        (rng(i) - 0.5) * spread,
        y,
        (rng(i + 10) - 0.5) * spread,
      ),
    );
  }

  const curve = new THREE.CatmullRomCurve3(points);
  return new THREE.TubeGeometry(curve, 20, 0.16 + rng(5) * 0.1, 8, false);
}

function createBrainCoral(radius: number, detail: number): THREE.BufferGeometry {
  const geo = new THREE.IcosahedronGeometry(radius, detail);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const bump = 1 + Math.sin(x * 9) * Math.cos(z * 9) * 0.14;
    pos.setXYZ(i, x * bump, y * bump * 0.85, z * bump);
  }
  geo.computeVertexNormals();
  return geo;
}

interface CoralPlacement {
  x: number;
  z: number;
  type: "branch" | "brain" | "fan";
  scale: number;
  rotY: number;
  color: string;
}

function buildPlacements(reduced: boolean): CoralPlacement[] {
  const placements: CoralPlacement[] = [];
  const count = reduced ? 16 : 32;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + i * 0.35;
    const radius = 7 + (i % 6) * 3.2;
    const type = i % 3 === 0 ? "brain" : i % 3 === 1 ? "branch" : "fan";
    placements.push({
      x: Math.cos(angle) * radius,
      z: Math.sin(angle) * radius - 18,
      type,
      scale: 0.75 + (i % 4) * 0.22,
      rotY: angle + Math.PI,
      color: CORAL_COLORS[i % CORAL_COLORS.length],
    });
  }
  return placements;
}

function BranchCoralMesh({
  color,
  scale,
  seed,
}: {
  color: string;
  scale: number;
  seed: number;
}) {
  const geo = useMemo(
    () => createBranchCoral(seed, 2.4 * scale, 0.9),
    [seed, scale],
  );
  useEffect(() => () => geo.dispose(), [geo]);
  return (
    <mesh geometry={geo} castShadow>
      <meshStandardMaterial
        color={color}
        roughness={0.62}
        metalness={0.06}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

function BrainCoralMesh({ color, scale }: { color: string; scale: number }) {
  const geo = useMemo(() => createBrainCoral(0.95 * scale, 2), [scale]);
  useEffect(() => () => geo.dispose(), [geo]);
  return (
    <mesh geometry={geo} castShadow scale={[1, 0.72, 1]}>
      <meshStandardMaterial
        color={color}
        roughness={0.68}
        metalness={0.05}
        emissive={color}
        emissiveIntensity={0.08}
      />
    </mesh>
  );
}

function FanCoralMesh({ color, scale }: { color: string; scale: number }) {
  const geo = useMemo(
    () => new THREE.ConeGeometry(0.85 * scale, 1.5 * scale, 6),
    [scale],
  );
  useEffect(() => () => geo.dispose(), [geo]);
  return (
    <mesh geometry={geo} rotation={[0.35, 0, 0]} castShadow>
      <meshStandardMaterial
        color={color}
        roughness={0.58}
        metalness={0.07}
        side={THREE.DoubleSide}
        emissive={color}
        emissiveIntensity={0.09}
      />
    </mesh>
  );
}

function ProceduralReef({ placements }: { placements: CoralPlacement[] }) {
  return (
    <>
      {placements.map((p, i) => (
        <group
          key={`${p.type}-${i}`}
          position={[p.x, 0, p.z]}
          rotation={[0, p.rotY, 0]}
          scale={p.scale}
        >
          {p.type === "branch" && (
            <BranchCoralMesh color={p.color} scale={1} seed={i * 1.7} />
          )}
          {p.type === "brain" && <BrainCoralMesh color={p.color} scale={1} />}
          {p.type === "fan" && <FanCoralMesh color={p.color} scale={1} />}
        </group>
      ))}
    </>
  );
}

export function CoralReef({ phases, reduced }: CoralReefProps) {
  const groupRef = useRef<THREE.Group>(null);
  const floorMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const pinkLightRef = useRef<THREE.PointLight>(null);
  const tealLightRef = useRef<THREE.PointLight>(null);
  const opacityRef = useRef(0);
  const placements = useMemo(() => buildPlacements(!!reduced), [reduced]);

  const floorGeo = useMemo(() => new THREE.PlaneGeometry(120, 120, 32, 32), []);
  useEffect(() => () => floorGeo.dispose(), [floorGeo]);

  useFrame(() => {
    const goal = phases.reefWeight * 0.92 + phases.reefT * 0.08;
    opacityRef.current = THREE.MathUtils.lerp(opacityRef.current, goal, 0.04);
    const o = opacityRef.current;
    if (groupRef.current) {
      groupRef.current.visible = o > 0.005;
    }
    if (floorMatRef.current) floorMatRef.current.opacity = o;
    if (pinkLightRef.current) pinkLightRef.current.intensity = o * 1.2;
    if (tealLightRef.current) tealLightRef.current.intensity = o * 0.85;
  });

  return (
    <group ref={groupRef} position={[0, -14, -35]}>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
        geometry={floorGeo}
        receiveShadow
      >
        <meshStandardMaterial
          ref={floorMatRef}
          color="#1a2830"
          roughness={0.95}
          metalness={0.02}
          transparent
          opacity={0}
        />
      </mesh>

      <ProceduralReef placements={placements} />

      <pointLight
        ref={pinkLightRef}
        position={[0, 4, 0]}
        color="#ff88aa"
        distance={40}
        intensity={0}
      />
      <pointLight
        ref={tealLightRef}
        position={[-12, 2, -8]}
        color="#5ee7d0"
        distance={35}
        intensity={0}
      />
    </group>
  );
}
