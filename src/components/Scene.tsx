import Donuts from './Donuts';
import FloatingCamera from './FloatingCamera';
import TitleText from './TitleText';
import { OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import GUI from 'lil-gui';
import { useEffect, useState } from 'react';
import { NearestFilter, TextureLoader } from 'three';

const getTextFromURL = () => {
  const url = new URL(window.location.href);
  return url.searchParams.get('text') || 'Sup';
};

const updateURLParam = (key: string, value: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.replaceState({}, '', url.toString());
};

const Scene = () => {
  const [text, setText] = useState(getTextFromURL());
  const [speed, setSpeed] = useState(0.5);
  const [textureIndex, setTextureIndex] = useState(1);
  const [zoomInDone, setZoomInDone] = useState(false);

  useEffect(() => {
    window.onclick = () => {
      setZoomInDone(true);
    };
  }, []);

  const matcapTexture = useLoader(TextureLoader, `/textures/matcaps/${textureIndex}.png`);

  matcapTexture.minFilter = NearestFilter;
  matcapTexture.magFilter = NearestFilter;
  matcapTexture.generateMipmaps = false;

  useEffect(() => {
    const gui = new GUI();

    const params = {
      text,
      speed,
      matcap: textureIndex,
    };

    gui
      .add(params, 'text')
      .name('Text')
      .onChange((value: string) => {
        setText(value);
        updateURLParam('text', value);
      });

    gui
      .add(params, 'speed', 0.05, 20, 0.01)
      .name('Camera Speed')
      .onChange((value: number) => {
        setSpeed(value);
      });

    gui
      .add(params, 'matcap', {
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
      })
      .name('Matcap Texture')
      .onChange((value: number) => {
        setTextureIndex(value);
      });

    return () => gui.destroy();
  }, []);

  return (
    <>
      <TitleText matcap={matcapTexture} text={text} />
      <Donuts matcap={matcapTexture} />
      {zoomInDone ? (
        <OrbitControls
          autoRotate
          autoRotateSpeed={5 * speed}
          reverseOrbit
          minDistance={2}
          maxDistance={10}
          makeDefault
        />
      ) : (
        <FloatingCamera speed={speed} onDone={() => setZoomInDone(true)} />
      )}
    </>
  );
};

export default Scene;
