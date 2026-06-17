import { Bloom, HueSaturation, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import type { OceanPhases } from "./oceanPhases";

export function OceanPostFX({ phases }: { phases: OceanPhases }) {
  const bloom = 0.28 + phases.sunsetT * 0.38 + phases.sunsetWeight * 0.1;
  const saturation =
    0.08 + phases.sunsetT * 0.06 - phases.underwaterT * 0.08 - phases.reefWeight * 0.04;
  const vignette = 0.3 + phases.underwaterT * 0.22 + phases.reefWeight * 0.18;

  return (
    <>
      <Bloom
        intensity={bloom}
        luminanceThreshold={0.72}
        luminanceSmoothing={0.35}
        mipmapBlur
      />
      <HueSaturation saturation={saturation} hue={phases.sunsetT * 0.04} />
      <Vignette
        eskil={false}
        offset={0.22}
        darkness={vignette}
        blendFunction={BlendFunction.NORMAL}
      />
    </>
  );
}
