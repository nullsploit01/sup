import "./App.css";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const App = () => {
  const matcapTexture = useLoader(
    TextureLoader,
    "./src/assets/textures/matcaps/1.png"
  );

  return (
    <div>
      <Canvas className="webgl">
        <mesh>
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 5]} />
          <boxGeometry args={[2, 2, 2]} />
          <meshMatcapMaterial matcap={matcapTexture} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default App;
