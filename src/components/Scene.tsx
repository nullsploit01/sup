import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import TitleText from "./TitleText";
import Donuts from "./Donuts";

const Scene = () => {
  const matcapTexture = useLoader(TextureLoader, "/textures/matcaps/1.png");

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <TitleText matcap={matcapTexture} />
      <Donuts matcap={matcapTexture} />
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.05}
        minDistance={2}
        maxDistance={10}
        makeDefault
      />
    </>
  );
};

export default Scene;
