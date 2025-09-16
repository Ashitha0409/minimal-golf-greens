import { useGLTF } from '@react-three/drei';
import { useRef, useEffect, useMemo } from 'react';
 
import { Group, Box3, Vector3, Mesh } from 'three';

export const GolfMap = () => {
  const { scene } = useGLTF('/golfmap.glb');
  const modelRef = useRef<Group>(null);

  // Debug: Log when model loads
  useEffect(() => {
    if (scene) {
      console.log('Golf map loaded:', scene);
      // Enable shadows on meshes
      scene.traverse((child) => {
        if (child instanceof Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  // Center the model and scale it to fit the 3 unit radius green circle
  const { centeredScene, recommendedScale } = useMemo(() => {
    const workingScene = scene.clone(true);
    const box = new Box3().setFromObject(workingScene);
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Recenter model so its bounding box center sits at origin XZ and on ground Y
    workingScene.position.x -= center.x;
    workingScene.position.z -= center.z;
    // Lower to touch ground: move down by minY of the box
    const minY = box.min.y;
    workingScene.position.y -= minY;

    // Fit into ~diameter 6 (radius 3) with a small margin
    const maxHorizontal = Math.max(size.x, size.z);
    const targetDiameter = 5.5; // keep small margin inside 6
    const scale = maxHorizontal > 0 ? targetDiameter / maxHorizontal : 1;

    return { centeredScene: workingScene, recommendedScale: scale };
  }, [scene]);

  // Rotation disabled per user request

  return (
    <group ref={modelRef} position={[0, 0.02, 0]}>
      <primitive 
        object={centeredScene} 
        scale={[recommendedScale * 3, recommendedScale * 3, recommendedScale * 3]}
        position={[0.5, 0.5, 3]}
        rotation={[0, 0, 0]} // No rotation initially
      />
    </group>
  );
};

// Preload the model for better performance
useGLTF.preload('/golfmap.glb');
