import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import { Terrain } from './Terrain';
import { Trees } from './Trees';
import { Hills } from './Hills';
import { Clouds } from './Clouds';
import { GolfMap } from './GolfMap';

export const MinigolfScene = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-sky-top to-sky-bottom">
      <Canvas
        camera={{ 
          position: [15, 10, 15], 
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        shadows
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />

        {/* Sky */}
        <Sky 
          distance={450000}
          sunPosition={[10, 10, 0]}
          inclination={0}
          azimuth={0.25}
          turbidity={2}
          rayleigh={0.5}
        />

        {/* Scene Components */}
        <GolfMap />
        <Terrain />
        <Hills />
        <Trees />
        <Clouds />

        {/* Camera Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};