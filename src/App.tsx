import { Center, OrbitControls, Text3D } from "@react-three/drei";
import "./App.css";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const App = () => {
  const matcapTexture = useLoader(TextureLoader, "/textures/matcaps/1.png");

  return (
    <div>
      <Canvas
        className="webgl"
        style={{ width: "100vw", height: "100vh" }}
        camera={{
          fov: 75,
          aspect: window.innerWidth / window.innerHeight,
          near: 1,
          far: 100,
        }}
      >
        <mesh>
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 5]} />
          <Center>
            <Text3D
              font={"/fonts/helvetiker_regular.typeface.json"}
              size={1}
              height={0.3}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.03}
              bevelSize={0.02}
              bevelOffset={0}
              bevelSegments={5}
            >
              Sup
              <meshMatcapMaterial matcap={matcapTexture} />
            </Text3D>
          </Center>
        </mesh>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
};

export default App;
