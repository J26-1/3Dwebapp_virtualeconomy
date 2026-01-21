//App.tsx: The main controller. It manages the 3D Canvas and the
//Overlay. It coordinates the ScrollControls, ensuring that when
//you scroll, the 3D objects move in sync with the text.

import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Scroll, Float, Stars, Text, MeshDistortMaterial, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import MarketAnalysis from './components/MarketAnalysis';
import { MARKET_GROWTH_DATA, ECONOMY_NODES } from './constants';

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
            >
              {node.label}
            </Text>
          </Float>
        );
      })}
    </group>
  );
};

const Scene3D = () => {
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

const Overlay = () => {
  return (
    <div className="w-full">
      {/* Section 1: Hero */}
      <section className="h-screen flex flex-col items-center justify-center px-8 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase">
          VIRTUAL ASSETS 2025
        </div>
        <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none tracking-tighter">
          THE VIRTUAL <br />
          <span className="gradient-text">ECONOMY</span>
        </h1>
        <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed">
          Scroll to explore the multi-billion dollar parallel universe of digital ownership and virtual status.
        </p>
        <div className="absolute bottom-10 animate-bounce text-white/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
        </div>
      </section>

      {/* Section 2: Growth */}
      <section className="h-screen flex items-center px-12 md:px-24">
        <div className="max-w-xl glass p-10 rounded-[2rem]">
          <h2 className="text-5xl font-black mb-6 uppercase leading-none">Exponential <br/>Velocity</h2>
          <p className="text-white/60 text-lg leading-relaxed mb-8">
            The market has expanded from $15B in 2015 to an estimated $310B today. 
            This growth is driven by the convergence of social identity and liquid digital markets.
          </p>
          <div className="flex gap-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex-1">
                <span className="block text-xs text-white/30 uppercase mb-1">CAGR</span>
                <span className="text-2xl font-black text-blue-400">+34.2%</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex-1">
                <span className="block text-xs text-white/30 uppercase mb-1">Vol</span>
                <span className="text-2xl font-black text-purple-400">High</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Ecosystem */}
      <section className="h-screen flex items-center justify-end px-12 md:px-24">
        <div className="max-w-xl glass p-10 rounded-[2rem] text-right">
          <h2 className="text-5xl font-black mb-6 uppercase leading-none">The Nebula <br/>of Platforms</h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Platforms like Roblox and Fortnite aren't just games; they are the new stock exchanges 
            for the next generation. Value is determined by scarcity, social proof, and utility.
          </p>
        </div>
      </section>

      {/* Section 4: Intelligence */}
      <section className="min-h-screen py-32 px-12 md:px-24">
        <div className="max-w-4xl mx-auto">
          <MarketAnalysis />
        </div>
      </section>
      
      <footer className="py-20 text-center border-t border-white/5">
        <div className="font-black text-2xl tracking-tighter uppercase mb-2">VIRTUAL ECONOMY</div>
        <p className="text-white/20 text-xs uppercase tracking-widest">Built with Three.js & Gemini Intelligence</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="h-full w-full bg-black">
      <nav className="fixed top-0 left-0 right-0 z-[100] py-6 px-10 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto cursor-pointer">
          <div className="w-6 h-6 bg-white text-black flex items-center justify-center font-black text-xs">V</div>
          <span className="font-black text-sm uppercase tracking-widest">Atelier / Lab</span>
        </div>
        <div className="hidden md:flex gap-10 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 pointer-events-auto">
          <a href="#" className="hover:text-white transition-colors">Vision</a>
          <a href="#" className="hover:text-white transition-colors">Markets</a>
          <a href="#" className="hover:text-white transition-colors">Intelligence</a>
        </div>
      </nav>

      <Canvas camera={{ position: [0, 0, 20], fov: 35 }}>
        <Suspense fallback={null}>
          <ScrollControls pages={4} damping={0.25}>
            <Scene3D />
            <Scroll html>
              <Overlay />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
