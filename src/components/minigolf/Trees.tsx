import { useRef } from 'react';
import { Group } from 'three';
import * as THREE from 'three';

const SimpleTree = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<Group>(null);

  const trunkMaterial = new THREE.MeshLambertMaterial({ 
    color: new THREE.Color('hsl(25, 40%, 30%)') 
  });

  const foliageMaterial = new THREE.MeshLambertMaterial({ 
    color: new THREE.Color('hsl(130, 60%, 35%)') 
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Tree trunk */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 1.6, 8]} />
        <primitive object={trunkMaterial} />
      </mesh>

      {/* Tree foliage - multiple spheres for natural look */}
      <mesh position={[0, 2, 0]} castShadow>
        <sphereGeometry args={[1.2, 12, 8]} />
        <primitive object={foliageMaterial} />
      </mesh>
      
      <mesh position={[0.3, 1.8, 0.2]} castShadow>
        <sphereGeometry args={[0.8, 10, 6]} />
        <primitive object={foliageMaterial} />
      </mesh>

      <mesh position={[-0.4, 2.2, -0.3]} castShadow>
        <sphereGeometry args={[0.9, 10, 6]} />
        <primitive object={foliageMaterial} />
      </mesh>
    </group>
  );
};

export const Trees = () => {
  return (
    <group>
      <SimpleTree position={[-12, 0, -8]} />
      <SimpleTree position={[10, 0, -12]} />
      <SimpleTree position={[-15, 0, 6]} />
      <SimpleTree position={[8, 0, 12]} />
      <SimpleTree position={[0, 0, 15]} />
      <SimpleTree position={[-8, 0, 14]} />
      <SimpleTree position={[14, 0, -2]} />
      <SimpleTree position={[-6, 0, -14]} />
    </group>
  );
};