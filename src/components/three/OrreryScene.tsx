'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Environment } from '@react-three/drei';
import { PlanetSphere, PlanetConfig } from './PlanetSphere';
import { StarField } from './StarField';

export const PLANETS: PlanetConfig[] = [
  { id: 'moon',    name: 'Moon',    glyph: '☽', color: '#C2D3E2', orbitRadius: 4,  orbitSpeed: 0.6,  size: 0.28, phaseOffset: 0 },
  { id: 'mercury', name: 'Mercury', glyph: '☿', color: '#C9D2BE', orbitRadius: 6,  orbitSpeed: 0.42, size: 0.25, phaseOffset: 1.1 },
  { id: 'venus',   name: 'Venus',   glyph: '♀', color: '#F8D6BE', orbitRadius: 8,  orbitSpeed: 0.28, size: 0.32, phaseOffset: 2.2 },
  { id: 'sun',     name: 'Sun',     glyph: '☉', color: '#FFC78A', orbitRadius: 0,  orbitSpeed: 0,    size: 0.9,  phaseOffset: 0 },
  { id: 'mars',    name: 'Mars',    glyph: '♂', color: '#E9785E', orbitRadius: 11, orbitSpeed: 0.18, size: 0.3,  phaseOffset: 3.3 },
  { id: 'jupiter', name: 'Jupiter', glyph: '♃', color: '#9C8AB8', orbitRadius: 15, orbitSpeed: 0.1,  size: 0.55, phaseOffset: 4.4 },
  { id: 'saturn',  name: 'Saturn',  glyph: '♄', color: '#5A3E7A', orbitRadius: 20, orbitSpeed: 0.06, size: 0.48, phaseOffset: 5.5 },
];

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function SunCore() {
  return (
    <Sphere args={[0.9, 32, 32]}>
      <meshStandardMaterial
        color="#FFC78A"
        emissive="#FF8C00"
        emissiveIntensity={1.5}
        roughness={0.3}
      />
    </Sphere>
  );
}

export function OrreryScene({ selectedId, onSelect }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 22, 28], fov: 55 }}
      style={{ width: '100%', height: '100%', background: '#0F1228' }}
      gl={{ antialias: true, alpha: false }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 0]} intensity={4} color="#FFC78A" distance={60} decay={1.5} />
      <directionalLight position={[10, 20, 10]} intensity={0.4} />

      <Suspense fallback={null}>
        <StarField count={2000} />
        <SunCore />
        {PLANETS.filter(p => p.id !== 'sun').map((planet) => (
          <PlanetSphere
            key={planet.id}
            planet={planet}
            isSelected={selectedId === planet.id}
            onClick={() => onSelect(planet.id)}
          />
        ))}
        <OrbitControls
          enablePan={false}
          minDistance={8}
          maxDistance={60}
          autoRotate
          autoRotateSpeed={0.3}
          enableDamping
          dampingFactor={0.05}
        />
      </Suspense>
    </Canvas>
  );
}
