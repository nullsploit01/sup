import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

const FloatingCamera = ({
  initialRadius = 50,
  finalRadius = 10,
  speed = 0.2,
  onDone = () => {},
}: {
  initialRadius?: number;
  finalRadius?: number;
  speed?: number;
  onDone?: () => void;
}) => {
  const { camera } = useThree();
  const timeRef = useRef(0);
  const radiusRef = useRef(initialRadius);
  const [done, setDone] = useState(false);

  useFrame((_, delta) => {
    if (done) return;
    timeRef.current += delta * speed;

    radiusRef.current = THREE.MathUtils.lerp(
      radiusRef.current,
      finalRadius,
      delta * 0.5, // shrink speed
    );

    const x = Math.sin(timeRef.current) * radiusRef.current;
    const z = Math.cos(timeRef.current) * radiusRef.current;
    const y = Math.sin(timeRef.current * 0.5) * 1.5; // optional float up/down

    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);

    if (!done && Math.abs(radiusRef.current - finalRadius) < 0.05) {
      setDone(true);
      onDone?.();
    }
  });

  return null;
};

export default FloatingCamera;
