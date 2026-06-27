'use client';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Ring } from '@react-three/drei';
import * as THREE from 'three';

export interface PlanetConfig {
  id: string;
  name: string;
  glyph: string;
  color: string;       // hex
  orbitRadius: number; // AU-ish units
  orbitSpeed: number;  // radians/sec
  size: number;
  phaseOffset: number;
}

interface Props {
  planet: PlanetConfig;
  isSelected: boolean;
  onClick: () => void;
}

export function PlanetSphere({ planet, isSelected, onClick }: Props) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const color = new THREE.Color(planet.color);
  const emissiveColor = color.clone().multiplyScalar(0.4);

  useFrame((state) => {
    const t = state.clock.elapsedTime * planet.orbitSpeed + planet.phaseOffset;
    groupRef.current.position.x = Math.cos(t) * planet.orbitRadius;
    groupRef.current.position.z = Math.sin(t) * planet.orbitRadius;
    meshRef.current.rotation.y += 0.008;
  });

  const scale = isSelected ? 1.5 : hovered ? 1.2 : 1;

  return (
    <>
      {/* Orbit ring */}
      <Ring
        args={[planet.orbitRadius - 0.03, planet.orbitRadius + 0.03, 96]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial color={planet.color} transparent opacity={0.12} />
      </Ring>

      {/* Planet */}
      <group ref={groupRef}>
        <Sphere
          ref={meshRef}
          args={[planet.size, 32, 32]}
          scale={[scale, scale, scale]}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial
            color={planet.color}
            emissive={emissiveColor}
            emissiveIntensity={isSelected ? 1.2 : hovered ? 0.8 : 0.4}
            roughness={0.6}
            metalness={0.2}
          />
        </Sphere>

        {/* Glow halo when selected */}
        {(isSelected || hovered) && (
          <Sphere args={[planet.size * 1.6, 16, 16]}>
            <meshBasicMaterial color={planet.color} transparent opacity={0.08} side={THREE.BackSide} />
          </Sphere>
        )}
      </group>
    </>
  );
}
