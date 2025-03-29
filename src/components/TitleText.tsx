import { Center, Text3D } from "@react-three/drei";
import { Texture } from "three";

const TitleText = ({ matcap }: { matcap: Texture }) => {
  return (
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
        <meshMatcapMaterial matcap={matcap} />
      </Text3D>
    </Center>
  );
};

export default TitleText;
