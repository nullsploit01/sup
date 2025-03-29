import { useMemo } from "react";
import { MeshMatcapMaterial, Texture, TorusGeometry } from "three";

const spawnRadius = 50;

const Donuts = ({ matcap }: { matcap: Texture }) => {
  const geometry = useMemo(() => new TorusGeometry(0.3, 0.2, 20, 45), []);
  const material = useMemo(() => new MeshMatcapMaterial({ matcap }), [matcap]);

  const donuts = useMemo(() => {
    const list = [];
    for (let i = 0; i < 600; i++) {
      let x, y, z;
      let dist = 0;

      do {
        x = (Math.random() - 0.5) * spawnRadius * 2;
        y = (Math.random() - 0.5) * spawnRadius * 2;
        z = (Math.random() - 0.5) * spawnRadius * 2;
        dist = Math.sqrt(x * x + y * y + z * z);
      } while (dist < 3.0);

      const rotX = Math.random() * Math.PI;
      const rotY = Math.random() * Math.PI;
      const scale = Math.random() * 5 + 0.2;

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
