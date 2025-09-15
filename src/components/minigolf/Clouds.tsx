import { useRef } from 'react';
import { Group } from 'three';
import * as THREE from 'three';

const Cloud = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const groupRef = useRef<Group>(null);
  
  const cloudMaterial = new THREE.MeshLambertMaterial({ 
    color: new THREE.Color('hsl(0, 0%, 95%)'),
    transparent: true,
    opacity: 0.8
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* Main cloud body - multiple spheres for fluffy appearance */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 12, 8]} />
        <primitive object={cloudMaterial} />
      </mesh>
      
      <mesh position={[1.8, 0.2, 0.5]}>
        <sphereGeometry args={[1.5, 10, 6]} />
        <primitive object={cloudMaterial} />
      </mesh>
      
      <mesh position={[-1.6, 0.1, -0.3]}>
        <sphereGeometry args={[1.3, 10, 6]} />
        <primitive object={cloudMaterial} />
      </mesh>
      
      <mesh position={[0.5, 0.8, 0.2]}>
        <sphereGeometry args={[1.1, 8, 6]} />
        <primitive object={cloudMaterial} />
      </mesh>
      
      <mesh position={[-0.8, 0.6, 0.4]}>
        <sphereGeometry args={[0.9, 8, 6]} />
        <primitive object={cloudMaterial} />
      </mesh>
    </group>
  );
};

export const Clouds = () => {
  return (
    <group>
      <Cloud position={[-25, 15, -20]} scale={0.8} />
      <Cloud position={[30, 18, -15]} scale={1.2} />
      <Cloud position={[-35, 20, 10]} scale={0.9} />
      <Cloud position={[20, 16, 25]} scale={1.1} />
      <Cloud position={[0, 22, -30]} scale={0.7} />
      <Cloud position={[-20, 19, 30]} scale={1.0} />
      <Cloud position={[35, 17, 5]} scale={0.6} />
      <Cloud position={[-10, 21, -25]} scale={0.8} />
    </group>
  );
};