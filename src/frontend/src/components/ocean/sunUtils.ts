import * as THREE from "three";
import type { OceanPhases } from "./oceanPhases";

const SUN_DISTANCE = 400_000;

export function sunPositionFromPhases(
  phases: OceanPhases,
  target: THREE.Vector3,
): THREE.Vector3 {
  const elevation = THREE.MathUtils.lerp(28, 0.8, phases.sunsetT);
  const azimuth = THREE.MathUtils.lerp(215, 268, phases.sunsetT);
  const phi = THREE.MathUtils.degToRad(90 - elevation);
  const theta = THREE.MathUtils.degToRad(azimuth);
  return target.setFromSphericalCoords(SUN_DISTANCE, phi, theta);
}

export { SUN_DISTANCE };
