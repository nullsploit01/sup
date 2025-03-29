import { useMemo } from "react";
import { MeshMatcapMaterial, Texture, TorusGeometry } from "three";

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

export default Donuts;
