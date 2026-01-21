//components/Scene3D.tsx: The 3D environment. It contains:
//GrowthGraph3D: A 3D neon "tube" graph visualizing market growth.
//EcosystemSpheres: A "nebula" of floating, distorted spheres representing market entities.
//Stars: An animated background particle system.


import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Stars, Text, MeshDistortMaterial, Scroll, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { MARKET_GROWTH_DATA, ECONOMY_NODES } from '../constants';

const GrowthGraph3D = () => {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  
  const points = useMemo(() => {
    return MARKET_GROWTH_DATA.map((d, i) => new THREE.Vector3(i * 2, d.marketSize / 20, 0));
  }, []);

  const lineCurve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const r1 = scroll.range(0, 0.33);
    groupRef.current.position.x = -10 + r1 * 5;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group ref={groupRef} position={[-10, -5, -5]}>
      <mesh>
        <tubeGeometry args={[lineCurve, 64, 0.15, 8, false]} />
        <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={2} />
      </mesh>
      {points.map((p, i) => (
        <group key={i} position={p}>
          <mesh>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="#7000ff" />
          </mesh>
          <Text
            position={[0, 0.6, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {MARKET_GROWTH_DATA[i].year}
          </Text>
        </group>
      ))}
    </group>
  );
};

const EcosystemSpheres = () => {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const r2 = scroll.range(0.33, 0.33);
    groupRef.current.position.y = (r2 * 10) - 5;
    groupRef.current.rotation.y += 0.002;
  });

  return (
    <group ref={groupRef} position={[15, -10, -10]}>
      {ECONOMY_NODES.map((node, i) => {
        const phi = Math.acos(-1 + (2 * i) / ECONOMY_NODES.length);
        const theta = Math.sqrt(ECONOMY_NODES.length * Math.PI) * phi;
        const pos: [number, number, number] = [
          8 * Math.cos(theta) * Math.sin(phi),
          8 * Math.sin(theta) * Math.sin(phi),
          8 * Math.cos(phi)
        ];
        
        return (
          <Float speed={2} rotationIntensity={1} floatIntensity={1} key={node.id}>
            <mesh position={pos}>
              <sphereGeometry args={[node.value / 25, 32, 32]} />
              <MeshDistortMaterial 
                color={node.group === 'Platform' ? '#00f2ff' : '#7000ff'} 
                speed={2} 
                distort={0.4}
              />
            </mesh>
            <Text
              position={[pos[0], pos[1] + 2, pos[2]]}
              fontSize={0.5}
              color="white"
              font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-EkQ.woff"
            >
              {node.label}
            </Text>
          </Float>
        );
      })}
    </group>
  );
};

export const Scene3D = () => {
  return (
    <>
      <color attach="background" args={['#000']} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#006aff" />
      
      <Scroll>
        <GrowthGraph3D />
        <EcosystemSpheres />
      </Scroll>
    </>
  );
};