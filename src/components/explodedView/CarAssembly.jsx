import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Map GLTF node and mesh names to the logical automotive component IDs defined in explodedData.js
function getComponentId(nodeName) {
  if (!nodeName) return null;
  const name = nodeName.toLowerCase();
  if (name.includes('engine')) return 'engine';
  if (name.includes('headlight')) return 'headlights';
  if (name.includes('hood') || name.includes('bonnet') || name.includes('grill')) return 'bonnet';
  if (name.includes('door')) return 'doors';
  if (name.includes('wheel') || name.includes('rim') || name.includes('brake') || name.includes('tire') || name.includes('disc')) return 'wheels';
  if (name.includes('roof')) return 'roof_glass';
  if (name.includes('windshield')) return 'roof_glass';
  if (name.includes('taillight') || name.includes('turnsignal')) return 'taillights';
  if (name.includes('rearpanel') || name.includes('hatch') || name.includes('rearwindow')) return 'rear_bumper';
  if (name.includes('seat') || name.includes('dash') || name.includes('steering') || name.includes('pedal')) return 'interior';
  if (name.includes('underside') || name.includes('axle') || name.includes('floor') || name.includes('pillar') || name.includes('cage') || name.includes('license')) return 'chassis';
  return null;
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
  const rootRef = useRef();
  const currentProgressRef = useRef(explosionProgress);
  const originalTransformsRef = useRef(new Map());

  // Load the authentic luxury sports car GLTF/GLB model
  const { scene: gltfScene } = useGLTF('/models/car_concept.glb');

  // Clone scene so materials and nodes are distinct per instance
  const scene = useMemo(() => {
    const cloned = gltfScene.clone(true);

    // Deep clone materials so runtime color tweaks and highlights don't affect cached assets
    cloned.traverse((node) => {
      if (node.isMesh && node.material) {
        if (Array.isArray(node.material)) {
          node.material = node.material.map((m) => m.clone());
        } else {
          node.material = node.material.clone();
        }
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });

    return cloned;
  }, [gltfScene]);

  const partsRef = useRef(null);

  // Index key automotive nodes by their exact names
  useEffect(() => {
    const find = (name) => {
      let found = null;
      scene.traverse((node) => {
        if (node.name === name) found = node;
      });
      return found;
    };

    const findMultiple = (names) => {
      const results = [];
      scene.traverse((node) => {
        if (names.some((n) => node.name.includes(n))) {
          results.push(node);
        }
      });
      return results;
    };

    const indexedParts = {
      hood: find('BodyHood'),
      doorLeft: find('BodyDoorLColor1'),
      doorRight: find('BodyDoorRColor1'),
      engine: find('Engine'),
      roof: find('BodyRoofPanel'),
      windshield: find('BodyWindshield'),
      rearPanels: find('BodyRearPanelsColor1'),
      wheelFL: find('WheelFrontL'),
      wheelFR: find('WheelFrontR'),
      wheelRL: find('WheelRearL'),
      wheelRR: find('WheelRearR'),
      axles: find('Axles'),
      headlights: find('BodyHeadlights'),
      taillights: find('BodyTaillights'),
      seats: findMultiple(['InteriorSeatsColor1', 'InteriorSeatsColor2', 'InteriorSeatsFrame1', 'InteriorSeatsFrame2']),
      dash: findMultiple(['InteriorDashMid', 'InteriorDashSides', 'InteriorSteeringBase', 'InteriorSteeringCylinder', 'InteriorSteeringDash']),
      interiorFloor: find('InteriorFloor'),
      underside: find('BodyUnderside'),
      bodyPanels: findMultiple(['BodyPanelsColor2', 'BodyPillars']),
    };

    partsRef.current = indexedParts;

    const storeOriginal = (node) => {
      if (!node) return;
      if (!originalTransformsRef.current.has(node.uuid)) {
        originalTransformsRef.current.set(node.uuid, {
          pos: node.position.clone(),
          rot: node.rotation.clone(),
          scale: node.scale.clone(),
        });
      }
    };

    // Store transforms for all articulated components
    storeOriginal(indexedParts.hood);
    storeOriginal(indexedParts.doorLeft);
    storeOriginal(indexedParts.doorRight);
    storeOriginal(indexedParts.engine);
    storeOriginal(indexedParts.roof);
    storeOriginal(indexedParts.windshield);
    storeOriginal(indexedParts.rearPanels);
    storeOriginal(indexedParts.wheelFL);
    storeOriginal(indexedParts.wheelFR);
    storeOriginal(indexedParts.wheelRL);
    storeOriginal(indexedParts.wheelRR);
    storeOriginal(indexedParts.axles);
    storeOriginal(indexedParts.headlights);
    storeOriginal(indexedParts.taillights);
    indexedParts.seats.forEach(storeOriginal);
    indexedParts.dash.forEach(storeOriginal);
  }, [scene]);

  // Handle paint color switching and X-Ray / Wireframe updates
  useEffect(() => {
    scene.traverse((node) => {
      if (node.isMesh && node.material) {
        const materials = Array.isArray(node.material) ? node.material : [node.material];
        const nodeName = (node.name || '').toLowerCase();
        const matName = (materials[0]?.name || '').toLowerCase();

        materials.forEach((mat) => {
          // Wireframe / X-Ray mode
          if (xrayMode) {
            mat.wireframe = true;
            mat.transparent = true;
            mat.opacity = 0.45;
          } else {
            mat.wireframe = false;
            mat.transparent = mat.transmission ? true : false;
            mat.opacity = mat.transmission ? 0.85 : 1.0;
          }

          // Automotive exterior paint tinting
          const isPaintMesh =
            matName.includes('paint') ||
            matName.includes('color1') ||
            matName.includes('panel') ||
            nodeName.includes('door') ||
            nodeName.includes('hood') ||
            nodeName.includes('roof') ||
            nodeName.includes('rearpanels');

          if (isPaintMesh && !xrayMode && mat.color) {
            mat.color.set(carColor);
            mat.metalness = 0.85;
            mat.roughness = 0.18;
            mat.clearcoat = 1.0;
            mat.clearcoatRoughness = 0.08;
            mat.needsUpdate = true;
          }
        });
      }
    });
  }, [scene, carColor, xrayMode]);

  // Handle component selection & isolation highlights
  useEffect(() => {
    scene.traverse((node) => {
      if (node.isMesh && node.material) {
        const materials = Array.isArray(node.material) ? node.material : [node.material];
        const compId = getComponentId(node.name) || getComponentId(node.parent?.name);

        const isSelected = selectedId && compId === selectedId;
        const isHovered = hoveredId && compId === hoveredId;
        const isIsolatedMatch = !isolatedId || compId === isolatedId;

        materials.forEach((mat) => {
          // If isolation mode active and component does not match, ghost/fade it
          if (isolatedId && !isIsolatedMatch) {
            mat.transparent = true;
            mat.opacity = 0.06;
          } else if (!xrayMode) {
            mat.transparent = mat.transmission ? true : false;
            mat.opacity = mat.transmission ? 0.85 : 1.0;
          }

          // Emissive glow highlight for selected / hovered part
          if (isSelected) {
            mat.emissive = new THREE.Color('#00D4FF');
            mat.emissiveIntensity = 0.35;
          } else if (isHovered) {
            mat.emissive = new THREE.Color('#38BDF8');
            mat.emissiveIntensity = 0.2;
          } else {
            mat.emissive = new THREE.Color('#000000');
            mat.emissiveIntensity = 0;
          }
        });
      }
    });
  }, [scene, selectedId, hoveredId, isolatedId, xrayMode]);

  // Smooth frame-by-frame interpolation of component explosion transforms
  useFrame((state, delta) => {
    const parts = partsRef.current;
    if (!parts) return;

    // Smoothly lerp towards target progress
    const target = explosionProgress;
    const lerpSpeed = Math.min(delta * 7.5, 1.0);
    currentProgressRef.current += (target - currentProgressRef.current) * lerpSpeed;
    const p = currentProgressRef.current;

    const getOrig = (node) => {
      if (!node) return null;
      return originalTransformsRef.current.get(node.uuid);
    };

    // 1. Bonnet / Hood (moves upward & forward, and rotates open)
    if (parts.hood) {
      const orig = getOrig(parts.hood);
      if (orig) {
        // In local node space: front is -Y, up is +Z
        parts.hood.position.y = orig.pos.y - p * 0.95;
        parts.hood.position.z = orig.pos.z + p * 1.35;
        parts.hood.rotation.x = orig.rot.x - p * 0.42;
      }
    }

    // 2. Front Left Door (moves outward left & swings open)
    if (parts.doorLeft) {
      const orig = getOrig(parts.doorLeft);
      if (orig) {
        parts.doorLeft.position.x = orig.pos.x + p * 1.6;
        parts.doorLeft.position.z = orig.pos.z + p * 0.35;
        parts.doorLeft.rotation.z = orig.rot.z + p * 0.45;
      }
    }

    // 3. Front Right Door (moves outward right & swings open)
    if (parts.doorRight) {
      const orig = getOrig(parts.doorRight);
      if (orig) {
        parts.doorRight.position.x = orig.pos.x - p * 1.6;
        parts.doorRight.position.z = orig.pos.z + p * 0.35;
        parts.doorRight.rotation.z = orig.rot.z - p * 0.45;
      }
    }

    // 4. Powertrain V-Engine Block (elevates vertically out of the engine compartment)
    if (parts.engine) {
      const orig = getOrig(parts.engine);
      if (orig) {
        parts.engine.position.z = orig.pos.z + p * 1.6;
        parts.engine.position.y = orig.pos.y - p * 0.2;
      }
    }

    // 5. Roof Panel (lifts vertically upward)
    if (parts.roof) {
      const orig = getOrig(parts.roof);
      if (orig) {
        parts.roof.position.z = orig.pos.z + p * 1.85;
      }
    }

    // 6. Windshield & Wipers (lifts upward & slightly forward)
    if (parts.windshield) {
      const orig = getOrig(parts.windshield);
      if (orig) {
        parts.windshield.position.z = orig.pos.z + p * 1.15;
        parts.windshield.position.y = orig.pos.y - p * 0.55;
      }
    }

    // 7. Rear Bumper, Diffuser, Hatch & Taillights (moves backward & upward)
    if (parts.rearPanels) {
      const orig = getOrig(parts.rearPanels);
      if (orig) {
        parts.rearPanels.position.y = orig.pos.y + p * 1.3;
        parts.rearPanels.position.z = orig.pos.z + p * 0.65;
        parts.rearPanels.rotation.x = orig.rot.x + p * 0.25;
      }
    }

    // 8. Front Left Wheel & Carbon Brakes (moves outward left & slightly forward)
    if (parts.wheelFL) {
      const orig = getOrig(parts.wheelFL);
      if (orig) {
        parts.wheelFL.position.x = orig.pos.x + p * 1.35;
        parts.wheelFL.position.y = orig.pos.y - p * 0.35;
      }
    }

    // 9. Front Right Wheel & Carbon Brakes (moves outward right & slightly forward)
    if (parts.wheelFR) {
      const orig = getOrig(parts.wheelFR);
      if (orig) {
        parts.wheelFR.position.x = orig.pos.x - p * 1.35;
        parts.wheelFR.position.y = orig.pos.y - p * 0.35;
      }
    }

    // 10. Rear Left Wheel & Carbon Brakes (moves outward left & slightly backward)
    if (parts.wheelRL) {
      const orig = getOrig(parts.wheelRL);
      if (orig) {
        parts.wheelRL.position.x = orig.pos.x + p * 1.35;
        parts.wheelRL.position.y = orig.pos.y + p * 0.35;
      }
    }

    // 11. Rear Right Wheel & Carbon Brakes (moves outward right & slightly backward)
    if (parts.wheelRR) {
      const orig = getOrig(parts.wheelRR);
      if (orig) {
        parts.wheelRR.position.x = orig.pos.x - p * 1.35;
        parts.wheelRR.position.y = orig.pos.y + p * 0.35;
      }
    }

    // 12. Axles & Suspension Subframe (lowers slightly to reveal lower chassis geometry)
    if (parts.axles) {
      const orig = getOrig(parts.axles);
      if (orig) {
        parts.axles.position.z = orig.pos.z - p * 0.38;
      }
    }

    // 13. Racing Bucket Seats (separate upward from interior tub)
    parts.seats.forEach((seatNode) => {
      const orig = getOrig(seatNode);
      if (orig) {
        seatNode.position.z = orig.pos.z + p * 0.85;
      }
    });

    // 14. Dashboard & Steering Column (separate upward & forward)
    parts.dash.forEach((dashNode) => {
      const orig = getOrig(dashNode);
      if (orig) {
        dashNode.position.z = orig.pos.z + p * 0.95;
        dashNode.position.y = orig.pos.y - p * 0.4;
      }
    });
  });

  // Pointer event handlers for interactive component selection and inspection
  const handlePointerOver = (e) => {
    e.stopPropagation();
    let current = e.object;
    let compId = null;
    while (current && current !== scene) {
      compId = getComponentId(current.name);
      if (compId) break;
      current = current.parent;
    }
    if (compId && onHoverComponent) {
      onHoverComponent(compId);
      document.body.style.cursor = 'pointer';
    }
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    if (onHoverComponent) {
      onHoverComponent(null);
      document.body.style.cursor = 'auto';
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    let current = e.object;
    let compId = null;
    while (current && current !== scene) {
      compId = getComponentId(current.name);
      if (compId) break;
      current = current.parent;
    }
    if (compId && onSelectComponent) {
      onSelectComponent(compId);
    }
  };

  return (
    <group
      ref={rootRef}
      position={[0, 0.25, -0.24]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <primitive object={scene} />
    </group>
  );
}

// Preload the real car GLB model so it loads instantly into memory
useGLTF.preload('/models/car_concept.glb');
