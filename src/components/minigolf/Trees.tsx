import { useRef } from 'react';
import { Group } from 'three';
import * as THREE from 'three';

const SimpleTree = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<Group>(null);

  const trunkMaterial = new THREE.MeshLambertMaterial({ 
    color: new THREE.Color('hsl(25, 45%, 25%)') 
  });

  const foliageMaterial = new THREE.MeshLambertMaterial({ 
    color: new THREE.Color('hsl(130, 60%, 35%)') 
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Enhanced tree trunk - taller and more visible */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.25, 2.4, 8]} />
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
      {/* Original trees */}
      <SimpleTree position={[-12, 0, -8]} />
      <SimpleTree position={[10, 0, -12]} />
      <SimpleTree position={[-15, 0, 6]} />
      <SimpleTree position={[8, 0, 12]} />
      <SimpleTree position={[0, 0, 15]} />
      <SimpleTree position={[-8, 0, 14]} />
      <SimpleTree position={[14, 0, -2]} />
      <SimpleTree position={[-6, 0, -14]} />
      
      {/* Additional trees for denser forest */}
      <SimpleTree position={[12, 0, 8]} />
      <SimpleTree position={[-10, 0, -12]} />
      <SimpleTree position={[16, 0, 4]} />
      <SimpleTree position={[-18, 0, -2]} />
      <SimpleTree position={[5, 0, -16]} />
      <SimpleTree position={[-4, 0, 18]} />
      <SimpleTree position={[18, 0, -8]} />
      <SimpleTree position={[-14, 0, 12]} />
      <SimpleTree position={[2, 0, -18]} />
      <SimpleTree position={[-20, 0, 0]} />
      <SimpleTree position={[20, 0, -6]} />
      <SimpleTree position={[-2, 0, -20]} />
    </group>
  );
};