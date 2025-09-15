import { useRef } from 'react';
import { Mesh } from 'three';
import * as THREE from 'three';

export const Terrain = () => {
  const meshRef = useRef<Mesh>(null);

  // Create grass texture pattern
  const grassMaterial = new THREE.MeshLambertMaterial({ 
    color: new THREE.Color('hsl(120, 50%, 45%)'),
    transparent: false
  });

  return (
    <group>
      {/* Main grass plane */}
      <mesh 
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[40, 40, 32, 32]} />
        <primitive object={grassMaterial} />
      </mesh>

      {/* Putting green area - slightly raised */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0.02, 0]}
        receiveShadow
      >
        <circleGeometry args={[3, 32]} />
        <meshLambertMaterial color="hsl(110, 55%, 55%)" />
      </mesh>

      {/* Course elements - small raised areas */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[-8, 0.01, -5]}
        receiveShadow
      >
        <circleGeometry args={[2, 16]} />
        <meshLambertMaterial color="hsl(100, 45%, 40%)" />
      </mesh>

      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[6, 0.01, 8]}
        receiveShadow
      >
        <circleGeometry args={[1.5, 16]} />
        <meshLambertMaterial color="hsl(100, 45%, 40%)" />
      </mesh>
    </group>
  );
};