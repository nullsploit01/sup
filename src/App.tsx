import { Center, OrbitControls, Text3D } from "@react-three/drei";
import "./App.css";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  MeshMatcapMaterial,
  Texture,
  TextureLoader,
  TorusGeometry,
} from "three";
import { useEffect, useMemo, useRef } from "react";

const Donuts = ({ matcap }: { matcap: Texture }) => {
  const geometry = useMemo(() => new TorusGeometry(0.3, 0.2, 20, 45), []);
  const material = useMemo(() => new MeshMatcapMaterial({ matcap }), [matcap]);

  const donuts = useMemo(() => {
    const list = [];
    for (let i = 0; i < 100; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;

      const rotX = Math.random() * Math.PI;
      const rotY = Math.random() * Math.PI;

      const scale = Math.random();

      list.push(
        <mesh
          key={i}
          geometry={geometry}
          material={material}
          position={[x, y, z]}
          rotation={[rotX, rotY, 0]}
          scale={[scale, scale, scale]}
        />
      );
    }
    return list;
  }, [geometry, material]);

  return <>{donuts}</>;
};

const App = () => {
  const matcapTexture = useLoader(TextureLoader, "/textures/matcaps/1.png");
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDblClick = () => {
      const canvas = canvasRef.current?.querySelector("canvas");

      if (!canvas) return;

      const fullscreenElement =
        document.fullscreenElement || (document as any).webkitFullscreenElement;

      if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
          canvas.requestFullscreen();
        } else if ((canvas as any).webkitRequestFullscreen) {
          (canvas as any).webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        }
      }
    };

    const triggerResizeOnFullscreenChange = () => {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    };

    window.addEventListener("dblclick", handleDblClick);
    document.addEventListener(
      "fullscreenchange",
      triggerResizeOnFullscreenChange
    );
    document.addEventListener(
      "webkitfullscreenchange",
      triggerResizeOnFullscreenChange
    );
    return () => {
      window.removeEventListener("dblclick", handleDblClick);
      document.removeEventListener(
        "fullscreenchange",
        triggerResizeOnFullscreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        triggerResizeOnFullscreenChange
      );
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Canvas
        style={{ width: "100%", height: "100%" }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        className="webgl"
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
              curveSegments={7}
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
          <Donuts matcap={matcapTexture} />
        </mesh>
        <OrbitControls minDistance={2} maxDistance={10} makeDefault />
      </Canvas>
    </div>
  );
};

export default App;
