import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Volume2, RotateCw, Camera } from 'lucide-react';

// Procedural 3D Car Model with bodyType switching (sports, suv, luxury, electric)
function CarModel({
  bodyType = 'sports',
  carColor = '#00D4FF',
  lightsOn = true,
  underglow = true,
  autoRotate = true,
}) {
  const carGroup = useRef();

  // Subtle chassis idle rotation
  useFrame((state, delta) => {
    if (autoRotate && carGroup.current) {
      carGroup.current.rotation.y += delta * 0.4;
    }
  });

  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(carColor),
    metalness: 0.85,
    roughness: 0.18,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    reflectivity: 0.9,
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#0a192f'),
    transmission: 0.7,
    opacity: 0.85,
    transparent: true,
    roughness: 0.05,
    metalness: 0.2,
  });

  const carbonMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#141414'),
    roughness: 0.5,
    metalness: 0.4,
  });

  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#f0f0f0'),
    metalness: 0.95,
    roughness: 0.1,
  });

  const tireMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#18181b'),
    roughness: 0.85,
    metalness: 0.1,
  });

  const lightMaterial = new THREE.MeshBasicMaterial({
    color: lightsOn ? new THREE.Color('#99f6e4') : new THREE.Color('#2d3748'),
  });

  const tailLightMaterial = new THREE.MeshBasicMaterial({
    color: lightsOn ? new THREE.Color('#ef4444') : new THREE.Color('#450a0a'),
  });

  // Render SUV Architecture (Mahindra Thar, Tata Safari, Fortuner, G-Wagon)
  if (bodyType === 'suv') {
    return (
      <group ref={carGroup} position={[0, -0.05, 0]}>
        {/* Main High-Rider SUV Chassis */}
        <mesh position={[0, 0.65, 0]} material={bodyMaterial} castShadow receiveShadow>
          <boxGeometry args={[2.08, 0.52, 4.3]} />
        </mesh>

        {/* Front Muscular Bumper & Skid Plate */}
        <mesh position={[0, 0.45, 2.22]} material={carbonMaterial} castShadow>
          <boxGeometry args={[2.0, 0.42, 0.35]} />
        </mesh>
        <mesh position={[0, 0.25, 2.3]} material={chromeMaterial}>
          <boxGeometry args={[1.3, 0.1, 0.2]} />
        </mesh>

        {/* Muscular High Hood */}
        <mesh position={[0, 0.85, 1.45]} material={bodyMaterial} castShadow>
          <boxGeometry args={[1.96, 0.26, 1.4]} />
        </mesh>

        {/* Upright Rugged Cabin & Glasshouse */}
        <mesh position={[0, 1.25, -0.2]} material={glassMaterial} castShadow>
          <boxGeometry args={[1.8, 0.72, 2.4]} />
        </mesh>

        {/* Flat SUV Roof */}
        <mesh position={[0, 1.63, -0.2]} material={bodyMaterial} castShadow>
          <boxGeometry args={[1.72, 0.08, 2.25]} />
        </mesh>

        {/* Roof Rails / Heavy Duty Expedition Rack */}
        <group position={[0, 1.7, -0.2]}>
          <mesh position={[-0.78, 0.04, 0]} material={carbonMaterial}>
            <boxGeometry args={[0.06, 0.08, 2.1]} />
          </mesh>
          <mesh position={[0.78, 0.04, 0]} material={carbonMaterial}>
            <boxGeometry args={[0.06, 0.08, 2.1]} />
          </mesh>
          <mesh position={[0, 0.04, -0.7]} material={carbonMaterial}>
            <boxGeometry args={[1.5, 0.05, 0.06]} />
          </mesh>
          <mesh position={[0, 0.04, 0.7]} material={carbonMaterial}>
            <boxGeometry args={[1.5, 0.05, 0.06]} />
          </mesh>
        </group>

        {/* Rear Tailgate Mounted Full-Size Spare Wheel */}
        <group position={[0, 0.95, -2.26]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={tireMaterial} castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.26, 24]} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.1]} material={chromeMaterial}>
            <cylinderGeometry args={[0.26, 0.26, 0.08, 16]} />
          </mesh>
        </group>

        {/* SUV Headlights (High-set LED projector units) */}
        <mesh position={[-0.75, 0.72, 2.28]} material={lightMaterial}>
          <boxGeometry args={[0.36, 0.2, 0.1]} />
        </mesh>
        <mesh position={[0.75, 0.72, 2.28]} material={lightMaterial}>
          <boxGeometry args={[0.36, 0.2, 0.1]} />
        </mesh>

        {lightsOn && (
          <>
            <spotLight position={[-0.75, 0.75, 2.4]} target-position={[-0.75, 0, 8]} color="#a7f3d0" intensity={4.5} distance={12} angle={0.5} penumbra={0.6} />
            <spotLight position={[0.75, 0.75, 2.4]} target-position={[0.75, 0, 8]} color="#a7f3d0" intensity={4.5} distance={12} angle={0.5} penumbra={0.6} />
          </>
        )}

        {/* Vertical SUV Taillights */}
        <mesh position={[-0.95, 0.95, -2.18]} material={tailLightMaterial}>
          <boxGeometry args={[0.12, 0.45, 0.08]} />
        </mesh>
        <mesh position={[0.95, 0.95, -2.18]} material={tailLightMaterial}>
          <boxGeometry args={[0.12, 0.45, 0.08]} />
        </mesh>

        {/* 4 Chunky All-Terrain Wheels with High Ground Clearance */}
        <group position={[-1.02, 0.45, 1.3]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={tireMaterial} castShadow><cylinderGeometry args={[0.42, 0.42, 0.3, 24]} /></mesh>
          <mesh material={chromeMaterial}><cylinderGeometry args={[0.26, 0.26, 0.31, 12]} /></mesh>
        </group>
        <group position={[1.02, 0.45, 1.3]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={tireMaterial} castShadow><cylinderGeometry args={[0.42, 0.42, 0.3, 24]} /></mesh>
          <mesh material={chromeMaterial}><cylinderGeometry args={[0.26, 0.26, 0.31, 12]} /></mesh>
        </group>
        <group position={[-1.02, 0.45, -1.3]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={tireMaterial} castShadow><cylinderGeometry args={[0.42, 0.42, 0.3, 24]} /></mesh>
          <mesh material={chromeMaterial}><cylinderGeometry args={[0.26, 0.26, 0.31, 12]} /></mesh>
        </group>
        <group position={[1.02, 0.45, -1.3]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={tireMaterial} castShadow><cylinderGeometry args={[0.42, 0.42, 0.3, 24]} /></mesh>
          <mesh material={chromeMaterial}><cylinderGeometry args={[0.26, 0.26, 0.31, 12]} /></mesh>
        </group>

        {/* Underglow */}
        {underglow && <pointLight position={[0, 0.15, 0]} color={carColor} intensity={7} distance={4} />}
      </group>
    );
  }

  // Render Pure Electric Architecture (Tata Nexon EV)
  if (bodyType === 'electric') {
    return (
      <group ref={carGroup} position={[0, -0.2, 0]}>
        {/* Main Sleek EV Body */}
        <mesh position={[0, 0.48, 0]} material={bodyMaterial} castShadow receiveShadow>
          <boxGeometry args={[1.92, 0.42, 4.3]} />
        </mesh>

        {/* Aerodynamic Seamless Closed Front Mask (No Grille) */}
        <mesh position={[0, 0.42, 1.8]} rotation={[-0.1, 0, 0]} material={bodyMaterial} castShadow>
          <boxGeometry args={[1.84, 0.3, 1.2]} />
        </mesh>

        {/* Full-Width Front Cyber Lightbar */}
        <mesh position={[0, 0.48, 2.27]} material={lightMaterial}>
          <boxGeometry args={[1.82, 0.05, 0.1]} />
        </mesh>

        {/* Sweeping Panoramic Glass Canopy */}
        <mesh position={[0, 0.88, -0.1]} material={glassMaterial} castShadow>
          <boxGeometry args={[1.48, 0.54, 2.5]} />
        </mesh>
        <mesh position={[0, 1.16, -0.1]} material={bodyMaterial} castShadow>
          <boxGeometry args={[1.35, 0.05, 2.0]} />
        </mesh>

        {/* Aerodynamic Tail Spoiler & Undertray Diffuser (Zero Exhausts!) */}
        <mesh position={[0, 1.12, -1.38]} material={carbonMaterial}>
          <boxGeometry args={[1.4, 0.05, 0.35]} />
        </mesh>
        <mesh position={[0, 0.25, -2.15]} material={carbonMaterial}>
          <boxGeometry args={[1.75, 0.18, 0.25]} />
        </mesh>

        {/* Full-Width Rear LED Lightstrip */}
        <mesh position={[0, 0.55, -2.18]} material={tailLightMaterial}>
          <boxGeometry args={[1.78, 0.06, 0.08]} />
        </mesh>

        {lightsOn && (
          <>
            <spotLight position={[-0.7, 0.5, 2.4]} target-position={[-0.7, 0, 7]} color="#67e8f9" intensity={4} distance={10} angle={0.45} penumbra={0.6} />
            <spotLight position={[0.7, 0.5, 2.4]} target-position={[0.7, 0, 7]} color="#67e8f9" intensity={4} distance={10} angle={0.45} penumbra={0.6} />
          </>
        )}

        {/* Flush Aero-Disc Electric Wheels */}
        <group position={[-0.98, 0.36, 1.25]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={tireMaterial} castShadow><cylinderGeometry args={[0.37, 0.37, 0.26, 24]} /></mesh>
          <mesh material={bodyMaterial}><cylinderGeometry args={[0.27, 0.27, 0.27, 16]} /></mesh>
        </group>
        <group position={[0.98, 0.36, 1.25]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={tireMaterial} castShadow><cylinderGeometry args={[0.37, 0.37, 0.26, 24]} /></mesh>
          <mesh material={bodyMaterial}><cylinderGeometry args={[0.27, 0.27, 0.27, 16]} /></mesh>
        </group>
        <group position={[-0.98, 0.36, -1.25]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={tireMaterial} castShadow><cylinderGeometry args={[0.37, 0.37, 0.26, 24]} /></mesh>
          <mesh material={bodyMaterial}><cylinderGeometry args={[0.27, 0.27, 0.27, 16]} /></mesh>
        </group>
        <group position={[0.98, 0.36, -1.25]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={tireMaterial} castShadow><cylinderGeometry args={[0.37, 0.37, 0.26, 24]} /></mesh>
          <mesh material={bodyMaterial}><cylinderGeometry args={[0.27, 0.27, 0.27, 16]} /></mesh>
        </group>

        {/* Underglow (EV electric glow) */}
        {underglow && <pointLight position={[0, 0.05, 0]} color="#00D4FF" intensity={7} distance={3.5} />}
      </group>
    );
  }

  // Render Ultra-Luxury Saloon (Rolls-Royce Ghost Series II)
  if (bodyType === 'luxury') {
    return (
      <group ref={carGroup} position={[0, -0.2, 0]}>
        {/* Long Wheelbase Regal Chassis */}
        <mesh position={[0, 0.48, 0]} material={bodyMaterial} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.46, 4.8]} />
        </mesh>

        {/* Majestic Hood & Waterfall Chrome Grille */}
        <mesh position={[0, 0.58, 1.7]} material={bodyMaterial} castShadow>
          <boxGeometry args={[1.92, 0.36, 1.5]} />
        </mesh>
        <mesh position={[0, 0.62, 2.46]} material={chromeMaterial}>
          <boxGeometry args={[1.1, 0.52, 0.15]} />
        </mesh>
        {/* Spirit Mascot */}
        <mesh position={[0, 0.9, 2.42]} material={chromeMaterial}>
          <sphereGeometry args={[0.05, 12, 12]} />
        </mesh>

        {/* Executive Chauffeur Greenhouse */}
        <mesh position={[0, 0.9, -0.25]} material={glassMaterial} castShadow>
          <boxGeometry args={[1.56, 0.56, 2.7]} />
        </mesh>
        <mesh position={[0, 1.19, -0.25]} material={bodyMaterial} castShadow>
          <boxGeometry args={[1.44, 0.06, 2.4]} />
        </mesh>

        {/* Grand Rear Deck */}
        <mesh position={[0, 0.62, -1.7]} rotation={[0.15, 0, 0]} material={bodyMaterial} castShadow>
          <boxGeometry args={[1.86, 0.32, 1.2]} />
        </mesh>

        {/* Integrated Chrome Dual Exhaust Outlets */}
        <mesh position={[-0.6, 0.28, -2.42]} material={chromeMaterial}>
          <boxGeometry args={[0.22, 0.08, 0.08]} />
        </mesh>
        <mesh position={[0.6, 0.28, -2.42]} material={chromeMaterial}>
          <boxGeometry args={[0.22, 0.08, 0.08]} />
        </mesh>

        {/* Regal Projector Headlamps */}
        <mesh position={[-0.78, 0.58, 2.45]} material={lightMaterial}>
          <boxGeometry args={[0.32, 0.12, 0.1]} />
        </mesh>
        <mesh position={[0.78, 0.58, 2.45]} material={lightMaterial}>
          <boxGeometry args={[0.32, 0.12, 0.1]} />
        </mesh>

        {lightsOn && (
          <>
            <spotLight position={[-0.78, 0.6, 2.5]} target-position={[-0.78, 0, 7.5]} color="#fef08a" intensity={4} distance={11} angle={0.45} penumbra={0.6} />
            <spotLight position={[0.78, 0.6, 2.5]} target-position={[0.78, 0, 7.5]} color="#fef08a" intensity={4} distance={11} angle={0.45} penumbra={0.6} />
          </>
        )}

        {/* Luxury Taillights */}
        <mesh position={[-0.82, 0.58, -2.42]} material={tailLightMaterial}>
          <boxGeometry args={[0.16, 0.28, 0.06]} />
        </mesh>
        <mesh position={[0.82, 0.58, -2.42]} material={tailLightMaterial}>
          <boxGeometry args={[0.16, 0.28, 0.06]} />
        </mesh>

        {/* High-Polish Chrome Turbine Luxury Wheels */}
        <group position={[-1.02, 0.37, 1.45]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={tireMaterial} castShadow><cylinderGeometry args={[0.37, 0.37, 0.28, 24]} /></mesh>
          <mesh material={chromeMaterial}><cylinderGeometry args={[0.27, 0.27, 0.29, 16]} /></mesh>
        </group>
        <group position={[1.02, 0.37, 1.45]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={tireMaterial} castShadow><cylinderGeometry args={[0.37, 0.37, 0.28, 24]} /></mesh>
          <mesh material={chromeMaterial}><cylinderGeometry args={[0.27, 0.27, 0.29, 16]} /></mesh>
        </group>
        <group position={[-1.02, 0.37, -1.45]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={tireMaterial} castShadow><cylinderGeometry args={[0.37, 0.37, 0.28, 24]} /></mesh>
          <mesh material={chromeMaterial}><cylinderGeometry args={[0.27, 0.27, 0.29, 16]} /></mesh>
        </group>
        <group position={[1.02, 0.37, -1.45]} rotation={[0, 0, Math.PI / 2]}>
          <mesh material={tireMaterial} castShadow><cylinderGeometry args={[0.37, 0.37, 0.28, 24]} /></mesh>
          <mesh material={chromeMaterial}><cylinderGeometry args={[0.27, 0.27, 0.29, 16]} /></mesh>
        </group>

        {/* Underglow */}
        {underglow && <pointLight position={[0, 0.05, 0]} color={carColor} intensity={6} distance={3.5} />}
      </group>
    );
  }

  // Default: Sports / Supercar Architecture (Porsche 911 GT3 RS, Lamborghini Huracán EVO)
  return (
    <group ref={carGroup} position={[0, -0.2, 0]}>
      {/* Main Lower Chassis */}
      <mesh position={[0, 0.45, 0]} material={bodyMaterial} castShadow receiveShadow>
        <boxGeometry args={[1.9, 0.38, 4.4]} />
      </mesh>

      {/* Aerodynamic Front Nose / Hood Slope */}
      <mesh position={[0, 0.4, 1.8]} rotation={[-0.15, 0, 0]} material={bodyMaterial} castShadow>
        <boxGeometry args={[1.82, 0.28, 1.1]} />
      </mesh>

      {/* Front Splitter Carbon Fiber */}
      <mesh position={[0, 0.22, 2.25]} material={carbonMaterial}>
        <boxGeometry args={[1.95, 0.06, 0.4]} />
      </mesh>

      {/* Cabin / Roof / Cockpit */}
      <mesh position={[0, 0.82, -0.2]} material={glassMaterial} castShadow>
        <boxGeometry args={[1.45, 0.5, 2.2]} />
      </mesh>

      {/* Roof Top Panel */}
      <mesh position={[0, 1.08, -0.2]} material={bodyMaterial} castShadow>
        <boxGeometry args={[1.32, 0.06, 1.8]} />
      </mesh>

      {/* Rear Engine Cover / Fastback Deck */}
      <mesh position={[0, 0.65, -1.4]} rotation={[0.22, 0, 0]} material={bodyMaterial} castShadow>
        <boxGeometry args={[1.75, 0.3, 1.3]} />
      </mesh>

      {/* Rear GT Wing Spoiler */}
      <group position={[0, 0.95, -2.1]}>
        <mesh position={[0, 0.2, 0]} material={carbonMaterial}>
          <boxGeometry args={[1.9, 0.05, 0.35]} />
        </mesh>
        <mesh position={[-0.6, 0.05, 0]} material={carbonMaterial}>
          <boxGeometry args={[0.06, 0.35, 0.15]} />
        </mesh>
        <mesh position={[0.6, 0.05, 0]} material={carbonMaterial}>
          <boxGeometry args={[0.06, 0.35, 0.15]} />
        </mesh>
      </group>

      {/* Rear Diffuser & Dual Exhausts */}
      <mesh position={[0, 0.28, -2.2]} material={carbonMaterial}>
        <boxGeometry args={[1.8, 0.2, 0.2]} />
      </mesh>
      <mesh position={[-0.45, 0.26, -2.25]} rotation={[Math.PI / 2, 0, 0]} material={chromeMaterial}>
        <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
      </mesh>
      <mesh position={[0.45, 0.26, -2.25]} rotation={[Math.PI / 2, 0, 0]} material={chromeMaterial}>
        <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.7, 0.46, 2.28]} material={lightMaterial}>
        <boxGeometry args={[0.35, 0.08, 0.1]} />
      </mesh>
      <mesh position={[0.7, 0.46, 2.28]} material={lightMaterial}>
        <boxGeometry args={[0.35, 0.08, 0.1]} />
      </mesh>

      {lightsOn && (
        <>
          <spotLight position={[-0.7, 0.5, 2.4]} target-position={[-0.7, 0, 7]} color="#a7f3d0" intensity={4} distance={10} angle={0.45} penumbra={0.6} />
          <spotLight position={[0.7, 0.5, 2.4]} target-position={[0.7, 0, 7]} color="#a7f3d0" intensity={4} distance={10} angle={0.45} penumbra={0.6} />
        </>
      )}

      {/* OLED Taillight Strip */}
      <mesh position={[0, 0.52, -2.22]} material={tailLightMaterial}>
        <boxGeometry args={[1.7, 0.06, 0.08]} />
      </mesh>

      {/* Side Mirrors */}
      <mesh position={[-0.95, 0.72, 0.5]} material={carbonMaterial}>
        <boxGeometry args={[0.22, 0.1, 0.12]} />
      </mesh>
      <mesh position={[0.95, 0.72, 0.5]} material={carbonMaterial}>
        <boxGeometry args={[0.22, 0.1, 0.12]} />
      </mesh>

      {/* Wheels */}
      <group position={[-0.98, 0.35, 1.3]} rotation={[0, 0, Math.PI / 2]}>
        <mesh material={tireMaterial} castShadow><cylinderGeometry args={[0.36, 0.36, 0.26, 24]} /></mesh>
        <mesh material={chromeMaterial}><cylinderGeometry args={[0.24, 0.24, 0.27, 12]} /></mesh>
      </group>
      <group position={[0.98, 0.35, 1.3]} rotation={[0, 0, Math.PI / 2]}>
        <mesh material={tireMaterial} castShadow><cylinderGeometry args={[0.36, 0.36, 0.26, 24]} /></mesh>
        <mesh material={chromeMaterial}><cylinderGeometry args={[0.24, 0.24, 0.27, 12]} /></mesh>
      </group>
      <group position={[-1.0, 0.38, -1.3]} rotation={[0, 0, Math.PI / 2]}>
        <mesh material={tireMaterial} castShadow><cylinderGeometry args={[0.38, 0.38, 0.3, 24]} /></mesh>
        <mesh material={chromeMaterial}><cylinderGeometry args={[0.25, 0.25, 0.31, 12]} /></mesh>
      </group>
      <group position={[1.0, 0.38, -1.3]} rotation={[0, 0, Math.PI / 2]}>
        <mesh material={tireMaterial} castShadow><cylinderGeometry args={[0.38, 0.38, 0.3, 24]} /></mesh>
        <mesh material={chromeMaterial}><cylinderGeometry args={[0.25, 0.25, 0.31, 12]} /></mesh>
      </group>

      {/* Underglow */}
      {underglow && <pointLight position={[0, 0.05, 0]} color={carColor} intensity={6} distance={3.5} />}
    </group>
  );
}

// Synthesize engine sound tailored to vehicle type
function playEngineRevSound(soundType = 'v10') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (soundType === 'ev') {
      // Futuristic EV dual-tone warp whine
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(180, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 1.2);
      osc1.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 2.2);

      osc2.frequency.setValueAtTime(360, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 1.2);
      osc2.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 2.2);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.4);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 2.5);
      osc2.stop(ctx.currentTime + 2.5);
    } else if (soundType === 'diesel_turbo') {
      // Deep mHawk / Fortuner turbo-diesel rumble + turbo hiss
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(45, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.9);
      osc.frequency.exponentialRampToValueAtTime(65, ctx.currentTime + 2.1);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.9);
      filter.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 2.1);

      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.4);

      // Turbo blow-off hiss
      const bufferSize = ctx.sampleRate * 0.6;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(3200, ctx.currentTime);
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, ctx.currentTime + 0.9);
      noiseGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.1);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.6);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(ctx.currentTime + 0.9);
    } else if (soundType === 'v8') {
      // AMG throaty muscular crossplane V8 burble
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'square';
      osc1.frequency.setValueAtTime(55, ctx.currentTime);
      osc2.frequency.setValueAtTime(58, ctx.currentTime);

      osc1.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.8);
      osc2.frequency.exponentialRampToValueAtTime(295, ctx.currentTime + 0.8);
      osc1.frequency.exponentialRampToValueAtTime(65, ctx.currentTime + 2.2);
      osc2.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 2.2);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.8);
      filter.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 2.2);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.32, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.4);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 2.4);
      osc2.stop(ctx.currentTime + 2.4);
    } else if (soundType === 'v12') {
      // Rolls-Royce ultra-smooth aristocratic V12 purr
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(50, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.9);
      osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 2.2);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.9);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.3);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.4);
    } else {
      // Default: V10 screaming naturally aspirated supercar
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(60, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(340, ctx.currentTime + 0.8);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 1.6);
      osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 2.2);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2600, ctx.currentTime + 0.8);
      filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 2.2);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.5);
    }
  } catch (e) {
    console.warn('Audio not allowed or supported', e);
  }
}

const COLOR_PRESETS = [
  { name: 'Cyan Pulse', hex: '#00D4FF' },
  { name: 'Electric Cobalt', hex: '#2563EB' },
  { name: 'Stealth Onyx', hex: '#1E293B' },
  { name: 'Racing Crimson', hex: '#EF4444' },
  { name: 'Hyper Gold', hex: '#F59E0B' },
  { name: 'Liquid Silver', hex: '#CBD5E1' },
];

export default function Car3DViewer({ selectedCar = null, onSwitchToPhoto = null }) {
  const [carColor, setCarColor] = useState(selectedCar?.defaultColor || '#00D4FF');
  const [lightsOn, setLightsOn] = useState(true);
  const [underglow, setUnderglow] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isRevving, setIsRevving] = useState(false);

  const soundType = selectedCar?.soundType || 'v10';
  const soundLabel = selectedCar?.soundLabel || 'Rev Engine';
  const bodyType = selectedCar?.bodyType || 'sports';

  const handleRev = () => {
    setIsRevving(true);
    playEngineRevSound(soundType);
    setTimeout(() => setIsRevving(false), 2400);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden glass border border-white/10 bg-gradient-to-b from-[#0A1628]/90 via-[#050A14] to-[#0A1628]/90 shadow-2xl">
      {/* 3D Canvas Viewport */}
      <div className="relative h-[420px] sm:h-[480px] w-full">
        <Canvas
          shadows
          camera={{ position: [4.4, 2.6, 4.6], fov: 45 }}
          className="cursor-grab active:cursor-grabbing"
        >
          {/* Studio Lights */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.8}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-5, 4, -4]} intensity={0.9} color="#6B6FFF" />
          <spotLight position={[0, 10, 0]} intensity={1.2} angle={0.6} penumbra={1} />

          <Suspense fallback={null}>
            <CarModel
              bodyType={bodyType}
              carColor={carColor}
              lightsOn={lightsOn}
              underglow={underglow}
              autoRotate={autoRotate}
            />
            {/* Ground Contact Shadow */}
            <ContactShadows
              position={[0, -0.2, 0]}
              opacity={0.75}
              scale={10}
              blur={2}
              far={4}
            />
          </Suspense>

          <OrbitControls
            enablePan={false}
            minDistance={3.2}
            maxDistance={7.5}
            maxPolarAngle={Math.PI / 2 - 0.05}
          />
        </Canvas>

        {/* 360 Overlay Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white/80">
          <RotateCw className="w-3.5 h-3.5 text-[#00D4FF] animate-spin" style={{ animationDuration: '8s' }} />
          <span>Interactive 3D · Drag to Rotate 360°</span>
        </div>

        {/* Top Right Actions: Rev Button + Switch to Photo */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          {onSwitchToPhoto && (
            <button
              onClick={onSwitchToPhoto}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-black/60 text-white/80 border border-white/15 hover:bg-white/10 hover:text-white backdrop-blur-md transition-all duration-200"
              title="View Real-World Road Photography"
            >
              <Camera className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span className="hidden sm:inline">Real Photos</span>
            </button>
          )}

          <button
            onClick={handleRev}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold backdrop-blur-md transition-all duration-300 ${
              isRevving
                ? 'bg-red-500/30 text-red-300 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.5)] scale-105'
                : 'bg-black/60 text-white/90 border border-white/15 hover:bg-white/10 hover:border-[#00D4FF]/40'
            }`}
            title={`Play realistic ${soundLabel} sound`}
          >
            <Volume2 className={`w-4 h-4 ${isRevving ? 'text-red-400 animate-pulse' : 'text-[#00D4FF]'}`} />
            {isRevving ? 'Sound Active...' : soundLabel}
          </button>
        </div>

        {/* Bottom studio reflections / floor styling */}
        <div className="absolute bottom-3 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 bg-black/55 backdrop-blur-md p-3 rounded-xl border border-white/10">
          {/* Color Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-xs hidden sm:inline">Bespoke Finish:</span>
            <div className="flex items-center gap-1.5">
              {COLOR_PRESETS.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => setCarColor(color.hex)}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                    carColor === color.hex ? 'border-white scale-110 shadow-[0_0_12px_rgba(255,255,255,0.6)]' : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Quick Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLightsOn(!lightsOn)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border ${
                lightsOn
                  ? 'bg-[#00D4FF]/20 text-[#00D4FF] border-[#00D4FF]/40'
                  : 'bg-white/5 text-white/40 border-white/10'
              }`}
            >
              LED: {lightsOn ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => setUnderglow(!underglow)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border ${
                underglow
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                  : 'bg-white/5 text-white/40 border-white/10'
              }`}
            >
              Glow: {underglow ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border ${
                autoRotate
                  ? 'bg-white/15 text-white border-white/30'
                  : 'bg-white/5 text-white/40 border-white/10'
              }`}
            >
              Spin: {autoRotate ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

