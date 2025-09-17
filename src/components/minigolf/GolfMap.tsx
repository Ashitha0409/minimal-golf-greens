import { useGLTF } from '@react-three/drei';
import { useRef, useEffect, useMemo } from 'react';
 
import { Group, Box3, Vector3, Mesh } from 'three';

export const START_BALL_POSITION: [number, number, number] = [3, 0.8, 3];

export const GolfMap = () => {
  const { scene } = useGLTF('/golfmap.glb');
  const { scene: ballScene } = useGLTF('/golfball.glb');
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

  useEffect(() => {
    if (ballScene) {
      console.log('Golf ball loaded:', ballScene);
      ballScene.traverse((child) => {
        if (child instanceof Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [ballScene]);

  // Compute course world bounds once it's mounted
  // (moved below to avoid using centeredScene before declaration)

  

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

  // Prepare the golf ball: center it and scale to a small, realistic size
  const { centeredBallScene, ballScale } = useMemo(() => {
    if (!ballScene) {
      return { centeredBallScene: null as unknown as Group, ballScale: 1 };
    }
    const workingScene = ballScene.clone(true);
    const box = new Box3().setFromObject(workingScene);
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Recenter to origin and place on ground
    workingScene.position.x -= center.x;
    workingScene.position.z -= center.z;
    const minY = box.min.y;
    workingScene.position.y -= minY;

    // Make the ball small; pick a target diameter in world units
    const maxHorizontal = Math.max(size.x, size.z);
    const targetDiameter = 0.15;
    const scale = maxHorizontal > 0 ? targetDiameter / maxHorizontal : 1;

    return { centeredBallScene: workingScene, ballScale: scale };
  }, [ballScene]);

  // No physics/bounds; static rendering only

  // Rotation disabled per user request

  return (
    <group ref={modelRef} position={[0, 0.02, 0]}>
      <primitive 
        object={centeredScene} 
        scale={[recommendedScale * 3, recommendedScale * 3, recommendedScale * 3]}
        position={[0.5, 0.5, 3]}
        rotation={[0, 0, 0]} // No rotation initially
      />
      {centeredBallScene ? (
        <primitive
          object={centeredBallScene}
          scale={[ballScale, ballScale, ballScale]}
          position={START_BALL_POSITION}
          rotation={[0, 0, 0]}
        />
      ) : (
        <mesh position={START_BALL_POSITION}>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      )}
    </group>
  );
};

// Preload the model for better performance
useGLTF.preload('/golfmap.glb');
useGLTF.preload('/golfball.glb');
