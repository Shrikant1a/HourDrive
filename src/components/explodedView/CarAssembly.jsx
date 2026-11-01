import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CAR_COMPONENTS } from './explodedData';

/**
 * Creates dynamic automotive materials responding to carColor, selection, hover, and xray mode
 */
function useCarMaterials(carColor, xrayMode) {
  return useMemo(() => {
    const baseColor = new THREE.Color(carColor);
    const cyanAccent = new THREE.Color('#00D4FF');
    const darkCarbon = new THREE.Color('#141824');
    const titaniumColor = new THREE.Color('#94A3B8');
    const goldColor = new THREE.Color('#D97706');
    const engineRed = new THREE.Color('#DC2626');

    // Automotive high-gloss clearcoat paint
    const paint = new THREE.MeshPhysicalMaterial({
      color: baseColor,
      metalness: 0.88,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      wireframe: xrayMode,
      transparent: xrayMode,
      opacity: xrayMode ? 0.35 : 1.0,
    });

    // Dry matte carbon fiber
    const carbon = new THREE.MeshStandardMaterial({
      color: darkCarbon,
      roughness: 0.45,
      metalness: 0.5,
      wireframe: xrayMode,
      transparent: xrayMode,
      opacity: xrayMode ? 0.25 : 1.0,
    });

    // Glass & greenhouse canopy
    const glass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0F172A'),
      transmission: 0.75,
      opacity: xrayMode ? 0.2 : 0.82,
      transparent: true,
      roughness: 0.05,
      metalness: 0.15,
      ior: 1.52,
      wireframe: xrayMode,
    });

    // Polished chrome & titanium
    const metal = new THREE.MeshStandardMaterial({
      color: titaniumColor,
      metalness: 0.95,
      roughness: 0.12,
      wireframe: xrayMode,
    });

    // Exhaust heat-treated titanium
    const exhaust = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#38BDF8'),
      metalness: 0.92,
      roughness: 0.2,
      wireframe: xrayMode,
    });

    // Engine block metal
    const engineMetal = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#334155'),
      metalness: 0.85,
      roughness: 0.35,
      wireframe: xrayMode,
    });

    // Engine performance red valve covers
    const engineCover = new THREE.MeshStandardMaterial({
      color: engineRed,
      metalness: 0.6,
      roughness: 0.25,
      wireframe: xrayMode,
    });

    // Gold turbo heat-shield
    const turboGold = new THREE.MeshStandardMaterial({
      color: goldColor,
      metalness: 0.9,
      roughness: 0.15,
      wireframe: xrayMode,
    });

    // High performance rubber tyres
    const rubber = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0F172A'),
      roughness: 0.9,
      metalness: 0.05,
      wireframe: xrayMode,
    });

    // Brake discs (slotted carbon-ceramic)
    const brakeDisc = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#475569'),
      metalness: 0.7,
      roughness: 0.3,
      wireframe: xrayMode,
    });

    // Electric-cyan brake calipers
    const caliper = new THREE.MeshStandardMaterial({
      color: cyanAccent,
      emissive: cyanAccent,
      emissiveIntensity: 0.35,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: xrayMode,
    });

    // Matrix LED headlights
    const headlights = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E0F2FE'),
      emissive: new THREE.Color('#00D4FF'),
      emissiveIntensity: 1.8,
      wireframe: xrayMode,
    });

    // OLED rear light strip
    const taillights = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#EF4444'),
      emissive: new THREE.Color('#DC2626'),
      emissiveIntensity: 2.2,
      wireframe: xrayMode,
    });

    // Cockpit interior Alcantara
    const interior = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1E293B'),
      roughness: 0.85,
      metalness: 0.1,
      wireframe: xrayMode,
    });

    // Cockpit screens
    const screen = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0284C7'),
      emissive: new THREE.Color('#00D4FF'),
      emissiveIntensity: 0.8,
      wireframe: xrayMode,
    });

    return {
      paint,
      carbon,
      glass,
      metal,
      exhaust,
      engineMetal,
      engineCover,
      turboGold,
      rubber,
      brakeDisc,
      caliper,
      headlights,
      taillights,
      interior,
      screen,
    };
  }, [carColor, xrayMode]);
}

/**
 * Animated individual component wrapper with smooth position/rotation lerping and selection highlights
 */
function ExplodedPart({
  id,
  targetPos,
  targetRot,
  isSelected,
  isHovered,
  isIsolated,
  hasIsolation,
  onSelect,
  onHover,
  children,
}) {
  const groupRef = useRef();

  // Smooth lerp on every animation frame for physics-like fluid motion
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const lerpSpeed = 10 * delta;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPos[0], lerpSpeed);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPos[1], lerpSpeed);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPos[2], lerpSpeed);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRot[0], lerpSpeed);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot[1], lerpSpeed);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRot[2], lerpSpeed);

    // Subtle breathing pulse if selected or hover feedback
    if (isSelected) {
      const pulse = 1.0 + Math.sin(state.clock.elapsedTime * 4.5) * 0.015;
      groupRef.current.scale.set(pulse, pulse, pulse);
    } else if (isHovered) {
      groupRef.current.scale.set(1.025, 1.025, 1.025);
    } else {
      groupRef.current.scale.set(1, 1, 1);
    }
  });

  const dimAlpha = hasIsolation && !isIsolated ? 0.25 : 1.0;

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(id);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(null);
      }}
    >
      {/* Component geometry */}
      <group opacity={dimAlpha}>{children}</group>

      {/* Floating Blueprint Halo when selected */}
      {isSelected && (
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[0.9, 0.95, 32]} />
          <meshBasicMaterial
            color="#00D4FF"
            side={THREE.DoubleSide}
            transparent
            opacity={0.65}
          />
        </mesh>
      )}
    </group>
  );
}

export default function CarAssembly({
  carColor = '#00D4FF',
  explosionProgress = 0,
  selectedId = null,
  hoveredId = null,
  isolatedId = null,
  xrayMode = false,
  onSelectComponent,
  onHoverComponent,
}) {
  const materials = useCarMaterials(carColor, xrayMode);

  // Pre-calculate positions and rotations for each part based on explosionProgress
  const partTransforms = useMemo(() => {
    const p = {};
    CAR_COMPONENTS.forEach((c) => {
      const exPos = c.explosion.position;
      const exRot = c.explosion.rotation;
      p[c.id] = {
        pos: [
          exPos[0] * explosionProgress,
          exPos[1] * explosionProgress,
          exPos[2] * explosionProgress,
        ],
        rot: [
          exRot[0] * explosionProgress,
          exRot[1] * explosionProgress,
          exRot[2] * explosionProgress,
        ],
      };
    });
    return p;
  }, [explosionProgress]);

  const hasIsolation = Boolean(isolatedId);

  return (
    <group position={[0, 0.1, 0]}>
      {/* ========================================================
          1. FRONT BUMPER & CARBON SPLITTER ASSEMBLY
         ======================================================== */}
      <ExplodedPart
        id="front_bumper"
        targetPos={partTransforms.front_bumper.pos}
        targetRot={partTransforms.front_bumper.rot}
        isSelected={selectedId === 'front_bumper'}
        isHovered={hoveredId === 'front_bumper'}
        isIsolated={isolatedId === 'front_bumper'}
        hasIsolation={hasIsolation}
        onSelect={onSelectComponent}
        onHover={onHoverComponent}
      >
        {/* Main bumper nose fascia */}
        <mesh position={[0, 0.38, 2.16]} material={materials.paint} castShadow receiveShadow>
          <boxGeometry args={[1.86, 0.32, 0.45]} />
        </mesh>
        {/* Lower Carbon Splitter Tray */}
        <mesh position={[0, 0.18, 2.3]} material={materials.carbon} castShadow>
          <boxGeometry args={[1.96, 0.05, 0.55]} />
        </mesh>
        {/* Splitter Left Winglet */}
        <mesh position={[-0.96, 0.28, 2.3]} material={materials.carbon}>
          <boxGeometry args={[0.06, 0.22, 0.3]} />
        </mesh>
        {/* Splitter Right Winglet */}
        <mesh position={[0.96, 0.28, 2.3]} material={materials.carbon}>
          <boxGeometry args={[0.06, 0.22, 0.3]} />
        </mesh>
        {/* Center Lower Radiator Grille */}
        <mesh position={[0, 0.32, 2.36]} material={materials.carbon}>
          <boxGeometry args={[1.0, 0.16, 0.08]} />
        </mesh>
        {/* Left Brake Cooling Duct */}
        <mesh position={[-0.68, 0.3, 2.35]} material={materials.carbon}>
          <boxGeometry args={[0.32, 0.14, 0.08]} />
        </mesh>
        {/* Right Brake Cooling Duct */}
        <mesh position={[0.68, 0.3, 2.35]} material={materials.carbon}>
          <boxGeometry args={[0.32, 0.14, 0.08]} />
        </mesh>
      </ExplodedPart>

      {/* ========================================================
          2. BONNET / HOOD ASSEMBLY
         ======================================================== */}
      <ExplodedPart
        id="bonnet"
        targetPos={partTransforms.bonnet.pos}
        targetRot={partTransforms.bonnet.rot}
        isSelected={selectedId === 'bonnet'}
        isHovered={hoveredId === 'bonnet'}
        isIsolated={isolatedId === 'bonnet'}
        hasIsolation={hasIsolation}
        onSelect={onSelectComponent}
        onHover={onHoverComponent}
      >
        {/* Main sculptured hood panel */}
        <mesh position={[0, 0.56, 1.4]} rotation={[-0.14, 0, 0]} material={materials.paint} castShadow receiveShadow>
          <boxGeometry args={[1.78, 0.05, 1.35]} />
        </mesh>
        {/* Central Power Bulge */}
        <mesh position={[0, 0.6, 1.4]} rotation={[-0.14, 0, 0]} material={materials.carbon}>
          <boxGeometry args={[0.65, 0.04, 1.2]} />
        </mesh>
        {/* Dual NACA Extractor Vents */}
        <mesh position={[-0.45, 0.59, 1.3]} rotation={[-0.14, 0, 0]} material={materials.carbon}>
          <boxGeometry args={[0.18, 0.03, 0.35]} />
        </mesh>
        <mesh position={[0.45, 0.59, 1.3]} rotation={[-0.14, 0, 0]} material={materials.carbon}>
          <boxGeometry args={[0.18, 0.03, 0.35]} />
        </mesh>
        {/* Titanium Hood Pins */}
        <mesh position={[-0.7, 0.53, 1.95]} material={materials.metal}>
          <cylinderGeometry args={[0.02, 0.02, 0.06, 12]} />
        </mesh>
        <mesh position={[0.7, 0.53, 1.95]} material={materials.metal}>
          <cylinderGeometry args={[0.02, 0.02, 0.06, 12]} />
        </mesh>
      </ExplodedPart>

      {/* ========================================================
          3. ENGINE & HYBRID POWERTRAIN
         ======================================================== */}
      <ExplodedPart
        id="engine"
        targetPos={partTransforms.engine.pos}
        targetRot={partTransforms.engine.rot}
        isSelected={selectedId === 'engine'}
        isHovered={hoveredId === 'engine'}
        isIsolated={isolatedId === 'engine'}
        hasIsolation={hasIsolation}
        onSelect={onSelectComponent}
        onHover={onHoverComponent}
      >
        {/* V10 Crankcase & Main Engine Block */}
        <mesh position={[0, 0.42, -0.6]} material={materials.engineMetal} castShadow>
          <boxGeometry args={[0.85, 0.45, 0.95]} />
        </mesh>
        {/* Left Cylinder Head Valve Cover (Red) */}
        <mesh position={[-0.32, 0.64, -0.6]} rotation={[0, 0, 0.35]} material={materials.engineCover}>
          <boxGeometry args={[0.28, 0.14, 0.9]} />
        </mesh>
        {/* Right Cylinder Head Valve Cover (Red) */}
        <mesh position={[0.32, 0.64, -0.6]} rotation={[0, 0, -0.35]} material={materials.engineCover}>
          <boxGeometry args={[0.28, 0.14, 0.9]} />
        </mesh>
        {/* Center Intake Manifold Plenum */}
        <mesh position={[0, 0.72, -0.6]} material={materials.carbon}>
          <boxGeometry args={[0.4, 0.12, 0.85]} />
        </mesh>
        {/* Left Twin-Turbo Compressor Housing */}
        <mesh position={[-0.52, 0.38, -0.9]} rotation={[0, Math.PI / 2, 0]} material={materials.metal}>
          <cylinderGeometry args={[0.12, 0.12, 0.16, 16]} />
        </mesh>
        {/* Right Twin-Turbo Compressor Housing */}
        <mesh position={[0.52, 0.38, -0.9]} rotation={[0, Math.PI / 2, 0]} material={materials.metal}>
          <cylinderGeometry args={[0.12, 0.12, 0.16, 16]} />
        </mesh>
        {/* Gold Heat-Shield Pipes */}
        <mesh position={[-0.52, 0.44, -0.7]} rotation={[Math.PI / 4, 0, 0]} material={materials.turboGold}>
          <cylinderGeometry args={[0.04, 0.04, 0.35, 12]} />
        </mesh>
        <mesh position={[0.52, 0.44, -0.7]} rotation={[Math.PI / 4, 0, 0]} material={materials.turboGold}>
          <cylinderGeometry args={[0.04, 0.04, 0.35, 12]} />
        </mesh>
        {/* Dual-Clutch Transmission Casing */}
        <mesh position={[0, 0.35, -1.2]} material={materials.engineMetal}>
          <boxGeometry args={[0.55, 0.36, 0.55]} />
        </mesh>
      </ExplodedPart>

      {/* ========================================================
          4. CHASSIS & MONOCOQUE TUB ASSEMBLY
         ======================================================== */}
      <ExplodedPart
        id="chassis"
        targetPos={partTransforms.chassis.pos}
        targetRot={partTransforms.chassis.rot}
        isSelected={selectedId === 'chassis'}
        isHovered={hoveredId === 'chassis'}
        isIsolated={isolatedId === 'chassis'}
        hasIsolation={hasIsolation}
        onSelect={onSelectComponent}
        onHover={onHoverComponent}
      >
        {/* Main Bottom Undertray / Floorpan */}
        <mesh position={[0, 0.14, 0]} material={materials.carbon} receiveShadow>
          <boxGeometry args={[1.72, 0.08, 4.3]} />
        </mesh>
        {/* Central Monocoque Passenger Tub Side Sills */}
        <mesh position={[-0.82, 0.34, 0.1]} material={materials.carbon} castShadow>
          <boxGeometry args={[0.16, 0.32, 2.1]} />
        </mesh>
        <mesh position={[0.82, 0.34, 0.1]} material={materials.carbon} castShadow>
          <boxGeometry args={[0.16, 0.32, 2.1]} />
        </mesh>
        {/* Front Crash Box Aluminum Honeycomb */}
        <mesh position={[0, 0.28, 1.8]} material={materials.metal}>
          <boxGeometry args={[1.1, 0.24, 0.55]} />
        </mesh>
        {/* Rear Subframe Structure */}
        <mesh position={[0, 0.3, -1.6]} material={materials.metal}>
          <boxGeometry args={[1.2, 0.26, 0.7]} />
        </mesh>
        {/* Front Suspension A-Arms (Left & Right) */}
        <mesh position={[-0.65, 0.28, 1.35]} rotation={[0, 0, 0.2]} material={materials.metal}>
          <cylinderGeometry args={[0.02, 0.02, 0.55, 8]} />
        </mesh>
        <mesh position={[0.65, 0.28, 1.35]} rotation={[0, 0, -0.2]} material={materials.metal}>
          <cylinderGeometry args={[0.02, 0.02, 0.55, 8]} />
        </mesh>
      </ExplodedPart>

      {/* ========================================================
          5. DOORS ASSEMBLY (LEFT & RIGHT)
         ======================================================== */}
      <ExplodedPart
        id="doors"
        targetPos={partTransforms.doors.pos}
        targetRot={partTransforms.doors.rot}
        isSelected={selectedId === 'doors'}
        isHovered={hoveredId === 'doors'}
        isIsolated={isolatedId === 'doors'}
        hasIsolation={hasIsolation}
        onSelect={onSelectComponent}
        onHover={onHoverComponent}
      >
        {/* Left Butterfly Door Outer Skin */}
        <group position={[-0.94, 0.52, 0.15]}>
          <mesh material={materials.paint} castShadow receiveShadow>
            <boxGeometry args={[0.08, 0.44, 1.6]} />
          </mesh>
          {/* Left Door Window Glass */}
          <mesh position={[0, 0.34, -0.05]} material={materials.glass}>
            <boxGeometry args={[0.04, 0.3, 1.25]} />
          </mesh>
          {/* Left Carbon Wing Mirror */}
          <mesh position={[-0.12, 0.24, 0.5]} material={materials.carbon}>
            <boxGeometry args={[0.24, 0.08, 0.14]} />
          </mesh>
        </group>

        {/* Right Butterfly Door Outer Skin */}
        <group position={[0.94, 0.52, 0.15]}>
          <mesh material={materials.paint} castShadow receiveShadow>
            <boxGeometry args={[0.08, 0.44, 1.6]} />
          </mesh>
          {/* Right Door Window Glass */}
          <mesh position={[0, 0.34, -0.05]} material={materials.glass}>
            <boxGeometry args={[0.04, 0.3, 1.25]} />
          </mesh>
          {/* Right Carbon Wing Mirror */}
          <mesh position={[0.12, 0.24, 0.5]} material={materials.carbon}>
            <boxGeometry args={[0.24, 0.08, 0.14]} />
          </mesh>
        </group>
      </ExplodedPart>

      {/* ========================================================
          6. WHEELS & CARBON BRAKES (4 CORNERS)
         ======================================================== */}
      <ExplodedPart
        id="wheels"
        targetPos={partTransforms.wheels.pos}
        targetRot={partTransforms.wheels.rot}
        isSelected={selectedId === 'wheels'}
        isHovered={hoveredId === 'wheels'}
        isIsolated={isolatedId === 'wheels'}
        hasIsolation={hasIsolation}
        onSelect={onSelectComponent}
        onHover={onHoverComponent}
      >
        {/* Front Left Corner */}
        <group position={[-0.98, 0.34, 1.35]}>
          {/* Tyre */}
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.rubber} castShadow>
            <cylinderGeometry args={[0.35, 0.35, 0.26, 24]} />
          </mesh>
          {/* Forged Magnesium Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.metal}>
            <cylinderGeometry args={[0.25, 0.25, 0.27, 16]} />
          </mesh>
          {/* Carbon-Ceramic Rotor */}
          <mesh position={[0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.brakeDisc}>
            <cylinderGeometry args={[0.2, 0.2, 0.02, 20]} />
          </mesh>
          {/* Cyan 6-Piston Caliper */}
          <mesh position={[0.08, 0.12, 0.08]} material={materials.caliper}>
            <boxGeometry args={[0.06, 0.1, 0.14]} />
          </mesh>
        </group>

        {/* Front Right Corner */}
        <group position={[0.98, 0.34, 1.35]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.rubber} castShadow>
            <cylinderGeometry args={[0.35, 0.35, 0.26, 24]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.metal}>
            <cylinderGeometry args={[0.25, 0.25, 0.27, 16]} />
          </mesh>
          <mesh position={[-0.08, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.brakeDisc}>
            <cylinderGeometry args={[0.2, 0.2, 0.02, 20]} />
          </mesh>
          <mesh position={[-0.08, 0.12, 0.08]} material={materials.caliper}>
            <boxGeometry args={[0.06, 0.1, 0.14]} />
          </mesh>
        </group>

        {/* Rear Left Corner (Staggered Wide 325 Tyre) */}
        <group position={[-1.02, 0.36, -1.35]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.rubber} castShadow>
            <cylinderGeometry args={[0.37, 0.37, 0.32, 24]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.metal}>
            <cylinderGeometry args={[0.26, 0.26, 0.33, 16]} />
          </mesh>
          <mesh position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.brakeDisc}>
            <cylinderGeometry args={[0.19, 0.19, 0.02, 20]} />
          </mesh>
          <mesh position={[0.1, 0.12, 0.08]} material={materials.caliper}>
            <boxGeometry args={[0.06, 0.09, 0.12]} />
          </mesh>
        </group>

        {/* Rear Right Corner (Staggered Wide 325 Tyre) */}
        <group position={[1.02, 0.36, -1.35]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.rubber} castShadow>
            <cylinderGeometry args={[0.37, 0.37, 0.32, 24]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.metal}>
            <cylinderGeometry args={[0.26, 0.26, 0.33, 16]} />
          </mesh>
          <mesh position={[-0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.brakeDisc}>
            <cylinderGeometry args={[0.19, 0.19, 0.02, 20]} />
          </mesh>
          <mesh position={[-0.1, 0.12, 0.08]} material={materials.caliper}>
            <boxGeometry args={[0.06, 0.09, 0.12]} />
          </mesh>
        </group>
      </ExplodedPart>

      {/* ========================================================
          7. COCKPIT & INTERIOR COMPONENTS
         ======================================================== */}
      <ExplodedPart
        id="interior"
        targetPos={partTransforms.interior.pos}
        targetRot={partTransforms.interior.rot}
        isSelected={selectedId === 'interior'}
        isHovered={hoveredId === 'interior'}
        isIsolated={isolatedId === 'interior'}
        hasIsolation={hasIsolation}
        onSelect={onSelectComponent}
        onHover={onHoverComponent}
      >
        {/* Driver Racing Bucket Seat (Left) */}
        <group position={[-0.35, 0.5, 0.1]}>
          <mesh position={[0, 0.1, 0]} material={materials.interior} castShadow>
            <boxGeometry args={[0.45, 0.15, 0.45]} />
          </mesh>
          <mesh position={[0, 0.38, -0.2]} rotation={[-0.2, 0, 0]} material={materials.interior}>
            <boxGeometry args={[0.42, 0.55, 0.12]} />
          </mesh>
          <mesh position={[0, 0.68, -0.28]} material={materials.interior}>
            <boxGeometry args={[0.28, 0.18, 0.1]} />
          </mesh>
        </group>

        {/* Passenger Racing Bucket Seat (Right) */}
        <group position={[0.35, 0.5, 0.1]}>
          <mesh position={[0, 0.1, 0]} material={materials.interior} castShadow>
            <boxGeometry args={[0.45, 0.15, 0.45]} />
          </mesh>
          <mesh position={[0, 0.38, -0.2]} rotation={[-0.2, 0, 0]} material={materials.interior}>
            <boxGeometry args={[0.42, 0.55, 0.12]} />
          </mesh>
          <mesh position={[0, 0.68, -0.28]} material={materials.interior}>
            <boxGeometry args={[0.28, 0.18, 0.1]} />
          </mesh>
        </group>

        {/* Center Tunnel Console */}
        <mesh position={[0, 0.45, 0.2]} material={materials.carbon}>
          <boxGeometry args={[0.22, 0.28, 1.2]} />
        </mesh>

        {/* Dashboard Fascia */}
        <mesh position={[0, 0.68, 0.72]} rotation={[-0.25, 0, 0]} material={materials.interior}>
          <boxGeometry args={[1.4, 0.22, 0.45]} />
        </mesh>

        {/* Curved 14.9" OLED Gauge Display */}
        <mesh position={[-0.35, 0.75, 0.68]} rotation={[-0.25, 0, 0]} material={materials.screen}>
          <boxGeometry args={[0.46, 0.12, 0.02]} />
        </mesh>

        {/* Central Infotainment OLED */}
        <mesh position={[0.1, 0.68, 0.65]} rotation={[-0.25, 0, 0]} material={materials.screen}>
          <boxGeometry args={[0.38, 0.15, 0.02]} />
        </mesh>

        {/* F1-Style Flat-Bottom Steering Wheel */}
        <mesh position={[-0.35, 0.68, 0.48]} rotation={[0.4, 0, 0]} material={materials.carbon}>
          <torusGeometry args={[0.14, 0.022, 12, 24]} />
        </mesh>
      </ExplodedPart>

      {/* ========================================================
          8. ROOF & GREENHOUSE CANOPY
         ======================================================== */}
      <ExplodedPart
        id="roof_glass"
        targetPos={partTransforms.roof_glass.pos}
        targetRot={partTransforms.roof_glass.rot}
        isSelected={selectedId === 'roof_glass'}
        isHovered={hoveredId === 'roof_glass'}
        isIsolated={isolatedId === 'roof_glass'}
        hasIsolation={hasIsolation}
        onSelect={onSelectComponent}
        onHover={onHoverComponent}
      >
        {/* Aerodynamic Windshield Glass */}
        <mesh position={[0, 0.82, 0.65]} rotation={[0.62, 0, 0]} material={materials.glass} castShadow>
          <boxGeometry args={[1.35, 0.03, 0.95]} />
        </mesh>
        {/* Main Carbon Roof Arch Panel */}
        <mesh position={[0, 1.08, -0.1]} material={materials.paint} castShadow>
          <boxGeometry args={[1.28, 0.04, 1.15]} />
        </mesh>
        {/* Rear Engine Window Viewing Glass */}
        <mesh position={[0, 0.88, -0.95]} rotation={[-0.45, 0, 0]} material={materials.glass}>
          <boxGeometry args={[1.2, 0.03, 0.85]} />
        </mesh>
        {/* Carbon A-Pillars (Left & Right) */}
        <mesh position={[-0.64, 0.84, 0.58]} rotation={[0.6, 0, 0.1]} material={materials.carbon}>
          <boxGeometry args={[0.06, 0.04, 0.95]} />
        </mesh>
        <mesh position={[0.64, 0.84, 0.58]} rotation={[0.6, 0, -0.1]} material={materials.carbon}>
          <boxGeometry args={[0.06, 0.04, 0.95]} />
        </mesh>
      </ExplodedPart>

      {/* ========================================================
          9. DIGITAL MATRIX-LED HEADLIGHTS
         ======================================================== */}
      <ExplodedPart
        id="headlights"
        targetPos={partTransforms.headlights.pos}
        targetRot={partTransforms.headlights.rot}
        isSelected={selectedId === 'headlights'}
        isHovered={hoveredId === 'headlights'}
        isIsolated={isolatedId === 'headlights'}
        hasIsolation={hasIsolation}
        onSelect={onSelectComponent}
        onHover={onHoverComponent}
      >
        {/* Left Matrix Headlight Cluster */}
        <group position={[-0.68, 0.48, 2.12]}>
          <mesh material={materials.headlights}>
            <boxGeometry args={[0.34, 0.08, 0.12]} />
          </mesh>
          <mesh position={[-0.06, 0, 0.06]} material={materials.metal}>
            <cylinderGeometry args={[0.03, 0.03, 0.08, 12]} rotation={[Math.PI / 2, 0, 0]} />
          </mesh>
          <mesh position={[0.06, 0, 0.06]} material={materials.metal}>
            <cylinderGeometry args={[0.03, 0.03, 0.08, 12]} rotation={[Math.PI / 2, 0, 0]} />
          </mesh>
        </group>

        {/* Right Matrix Headlight Cluster */}
        <group position={[0.68, 0.48, 2.12]}>
          <mesh material={materials.headlights}>
            <boxGeometry args={[0.34, 0.08, 0.12]} />
          </mesh>
          <mesh position={[-0.06, 0, 0.06]} material={materials.metal}>
            <cylinderGeometry args={[0.03, 0.03, 0.08, 12]} rotation={[Math.PI / 2, 0, 0]} />
          </mesh>
          <mesh position={[0.06, 0, 0.06]} material={materials.metal}>
            <cylinderGeometry args={[0.03, 0.03, 0.08, 12]} rotation={[Math.PI / 2, 0, 0]} />
          </mesh>
        </group>
      </ExplodedPart>

      {/* ========================================================
          10. REAR BUMPER, VENTURI DIFFUSER & ACTIVE WING
         ======================================================== */}
      <ExplodedPart
        id="rear_bumper"
        targetPos={partTransforms.rear_bumper.pos}
        targetRot={partTransforms.rear_bumper.rot}
        isSelected={selectedId === 'rear_bumper'}
        isHovered={hoveredId === 'rear_bumper'}
        isIsolated={isolatedId === 'rear_bumper'}
        hasIsolation={hasIsolation}
        onSelect={onSelectComponent}
        onHover={onHoverComponent}
      >
        {/* Rear Bumper Main Apron */}
        <mesh position={[0, 0.52, -2.14]} material={materials.paint} castShadow receiveShadow>
          <boxGeometry args={[1.82, 0.38, 0.28]} />
        </mesh>

        {/* Deep Carbon Venturi Underfloor Diffuser */}
        <mesh position={[0, 0.22, -2.05]} material={materials.carbon}>
          <boxGeometry args={[1.74, 0.16, 0.55]} />
        </mesh>
        {/* Diffuser Aerodynamic Vertical Fins */}
        {[-0.6, -0.2, 0.2, 0.6].map((xOffset) => (
          <mesh key={xOffset} position={[xOffset, 0.18, -2.12]} material={materials.carbon}>
            <boxGeometry args={[0.03, 0.18, 0.45]} />
          </mesh>
        ))}

        {/* Dual Titanium Exhaust Tailpipes (Blue Tinted) */}
        <mesh position={[-0.38, 0.28, -2.25]} rotation={[Math.PI / 2, 0, 0]} material={materials.exhaust}>
          <cylinderGeometry args={[0.085, 0.085, 0.24, 16]} />
        </mesh>
        <mesh position={[0.38, 0.28, -2.25]} rotation={[Math.PI / 2, 0, 0]} material={materials.exhaust}>
          <cylinderGeometry args={[0.085, 0.085, 0.24, 16]} />
        </mesh>

        {/* Active GT Rear Wing Spoiler Assembly */}
        <group position={[0, 0.98, -2.08]}>
          {/* Main Airfoil Blade */}
          <mesh material={materials.carbon} castShadow>
            <boxGeometry args={[1.92, 0.04, 0.38]} />
          </mesh>
          {/* Left Wing Support Strut */}
          <mesh position={[-0.55, -0.15, 0]} rotation={[0.2, 0, 0]} material={materials.carbon}>
            <boxGeometry args={[0.05, 0.32, 0.12]} />
          </mesh>
          {/* Right Wing Support Strut */}
          <mesh position={[0.55, -0.15, 0]} rotation={[0.2, 0, 0]} material={materials.carbon}>
            <boxGeometry args={[0.05, 0.32, 0.12]} />
          </mesh>
        </group>
      </ExplodedPart>

      {/* ========================================================
          11. 3D OLED FULL-WIDTH TAILLIGHT BLADE
         ======================================================== */}
      <ExplodedPart
        id="taillights"
        targetPos={partTransforms.taillights.pos}
        targetRot={partTransforms.taillights.rot}
        isSelected={selectedId === 'taillights'}
        isHovered={hoveredId === 'taillights'}
        isIsolated={isolatedId === 'taillights'}
        hasIsolation={hasIsolation}
        onSelect={onSelectComponent}
        onHover={onHoverComponent}
      >
        {/* Full-width continuous glowing OLED lightbar */}
        <mesh position={[0, 0.62, -2.24]} material={materials.taillights}>
          <boxGeometry args={[1.72, 0.05, 0.06]} />
        </mesh>
        {/* Left taillight corner hook */}
        <mesh position={[-0.82, 0.58, -2.22]} rotation={[0, 0.4, 0]} material={materials.taillights}>
          <boxGeometry args={[0.12, 0.05, 0.1]} />
        </mesh>
        {/* Right taillight corner hook */}
        <mesh position={[0.82, 0.58, -2.22]} rotation={[0, -0.4, 0]} material={materials.taillights}>
          <boxGeometry args={[0.12, 0.05, 0.1]} />
        </mesh>
      </ExplodedPart>
    </group>
  );
}
