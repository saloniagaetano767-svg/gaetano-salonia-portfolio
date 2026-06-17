import { Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

interface OceanEnvironmentProps {
  intensity: number;
}

export function OceanEnvironment({ intensity }: OceanEnvironmentProps) {
  const strengthRef = useRef(intensity);

  useFrame(() => {
    strengthRef.current += (intensity - strengthRef.current) * 0.04;
  });

  return (
    <Environment
      preset="sunset"
      background={false}
      environmentIntensity={strengthRef.current}
    />
  );
}
