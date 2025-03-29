import { Center, Text3D } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Texture } from "three";

const TitleText = ({ matcap, text }: { matcap: Texture; text: string }) => {
  const textRef = useRef<any>(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.geometry.center();
    }
  }, [text]);

  return (
    <Center>
      <Text3D
        ref={textRef}
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
        {text}
        <meshMatcapMaterial matcap={matcap} />
      </Text3D>
    </Center>
  );
};

export default TitleText;
