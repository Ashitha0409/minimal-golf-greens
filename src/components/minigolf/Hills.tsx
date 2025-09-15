import { useRef } from 'react';
import { Mesh } from 'three';
import * as THREE from 'three';

export const Hills = () => {
  const hill1Ref = useRef<Mesh>(null);
  const hill2Ref = useRef<Mesh>(null);
  const hill3Ref = useRef<Mesh>(null);

  const hillMaterial = new THREE.MeshLambertMaterial({ 
    color: new THREE.Color('hsl(90, 35%, 50%)') 
  });

  return (
    <group>
      {/* Background hills */}
      <mesh 
        ref={hill1Ref}
        position={[-15, 1, -15]}
        receiveShadow
        castShadow
      >
        <sphereGeometry args={[3, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <primitive object={hillMaterial} />
      </mesh>

      <mesh 
        ref={hill2Ref}
        position={[12, 1.5, -18]}
        receiveShadow
        castShadow
      >
        <sphereGeometry args={[4, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <primitive object={hillMaterial} />
      </mesh>

      <mesh 
        ref={hill3Ref}
        position={[0, 0.8, -20]}
        receiveShadow
        castShadow
      >
        <sphereGeometry args={[2.5, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <primitive object={hillMaterial} />
      </mesh>

      {/* Side hills */}
      <mesh 
        position={[-20, 1.2, 5]}
        receiveShadow
        castShadow
      >
        <sphereGeometry args={[3.5, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <primitive object={hillMaterial} />
      </mesh>

      <mesh 
        position={[18, 0.9, 10]}
        receiveShadow
        castShadow
      >
        <sphereGeometry args={[2.8, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <primitive object={hillMaterial} />
      </mesh>
    </group>
  );
};