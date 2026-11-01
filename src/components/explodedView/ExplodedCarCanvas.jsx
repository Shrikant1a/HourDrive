import { useRef, useEffect, forwardRef, useImperativeHandle, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import CarAssembly from './CarAssembly';

/**
 * Camera Controller for handling programmatic rotates, zooms, and presets
 */
function CameraRig({ controlsRef, activePreset, autoRotate }) {
  const { camera } = useThree();

  useEffect(() => {
    if (activePreset && controlsRef.current) {
      const { position, target } = activePreset;
      // Smoothly animate or set camera to preset
      camera.position.set(...position);
      controlsRef.current.target.set(...target);
      controlsRef.current.update();
    }
  }, [activePreset, camera, controlsRef]);

  useFrame((state, delta) => {
    if (autoRotate && controlsRef.current) {
      controlsRef.current.autoRotate = true;
      controlsRef.current.autoRotateSpeed = 0.8;
    } else if (controlsRef.current) {
      controlsRef.current.autoRotate = false;
    }
  });

  return null;
}

/**
 * High-tech studio floor with glowing circular rings and grid
 */
function StudioFloor() {
  return (
    <group position={[0, -0.01, 0]}>
      {/* Contact Shadow directly beneath the vehicle */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.8}
        scale={10}
        blur={2}
        far={4}
        resolution={1024}
        color="#001830"
      />

      {/* Cybernetic Studio Circular Grid Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#050A14"
          roughness={0.7}
          metalness={0.8}
        />
      </mesh>

      {/* Subtle Glowing Center Halo */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.018, 0]}>
        <ringGeometry args={[2.8, 2.85, 64]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.018, 0]}>
        <ringGeometry args={[4.2, 4.24, 64]} />
        <meshBasicMaterial color="#6B6FFF" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

const ExplodedCarCanvas = forwardRef(function ExplodedCarCanvas(
  {
    carColor = '#00D4FF',
    explosionProgress = 0,
    selectedId = null,
    hoveredId = null,
    isolatedId = null,
    xrayMode = false,
    autoRotate = false,
    activePreset = null,
    onSelectComponent,
    onHoverComponent,
  },
  ref
) {
  const controlsRef = useRef();

  // Expose imperative camera manipulation methods to outside buttons
  useImperativeHandle(ref, () => ({
    rotateLeft: () => {
      if (!controlsRef.current) return;
      const angle = Math.PI / 8;
      const x = controlsRef.current.object.position.x;
      const z = controlsRef.current.object.position.z;
      controlsRef.current.object.position.x = x * Math.cos(angle) - z * Math.sin(angle);
      controlsRef.current.object.position.z = x * Math.sin(angle) + z * Math.cos(angle);
      controlsRef.current.update();
    },
    rotateRight: () => {
      if (!controlsRef.current) return;
      const angle = -Math.PI / 8;
      const x = controlsRef.current.object.position.x;
      const z = controlsRef.current.object.position.z;
      controlsRef.current.object.position.x = x * Math.cos(angle) - z * Math.sin(angle);
      controlsRef.current.object.position.z = x * Math.sin(angle) + z * Math.cos(angle);
      controlsRef.current.update();
    },
    zoomIn: () => {
      if (!controlsRef.current) return;
      controlsRef.current.dollyIn(1.2);
      controlsRef.current.update();
    },
    zoomOut: () => {
      if (!controlsRef.current) return;
      controlsRef.current.dollyOut(1.2);
      controlsRef.current.update();
    },
    resetCamera: () => {
      if (!controlsRef.current) return;
      controlsRef.current.reset();
      controlsRef.current.object.position.set(4.4, 2.6, 4.4);
      controlsRef.current.target.set(0, 0.5, 0);
      controlsRef.current.update();
    },
  }));

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [4.4, 2.6, 4.4], fov: 42 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      className="w-full h-full cursor-grab active:cursor-grabbing"
    >
      {/* Studio Lighting Rig */}
      <ambientLight intensity={0.55} color="#94A3B8" />

      {/* Main Overhead Soft Key Spotlight */}
      <spotLight
        position={[6, 9, 5]}
        intensity={2.8}
        angle={0.6}
        penumbra={0.7}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Electric Cyan Rim Spotlight (creates gorgeous edge reflections) */}
      <spotLight
        position={[-6, 4, -5]}
        intensity={3.8}
        angle={0.7}
        penumbra={0.8}
        color="#00D4FF"
      />

      {/* Deep Cobalt Indigo Fill Light */}
      <directionalLight
        position={[0, 5, -6]}
        intensity={1.2}
        color="#6366F1"
      />

      {/* Underfloor Neon Ground Glow */}
      <pointLight
        position={[0, 0.2, 0]}
        intensity={2.2}
        distance={4.5}
        color="#00D4FF"
      />

      {/* Controls & Rig */}
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.05}
        minDistance={2.4}
        maxDistance={11.0}
        maxPolarAngle={Math.PI / 2 + 0.05}
        target={[0, 0.5, 0]}
      />
      <CameraRig
        controlsRef={controlsRef}
        activePreset={activePreset}
        autoRotate={autoRotate}
      />

      {/* Studio Environment & Floor */}
      <StudioFloor />

      {/* The 3D Exploded Vehicle Assembly */}
      <Suspense fallback={null}>
        <CarAssembly
          carColor={carColor}
          explosionProgress={explosionProgress}
          selectedId={selectedId}
          hoveredId={hoveredId}
          isolatedId={isolatedId}
          xrayMode={xrayMode}
          onSelectComponent={onSelectComponent}
          onHoverComponent={onHoverComponent}
        />
      </Suspense>
    </Canvas>
  );
});

export default ExplodedCarCanvas;
