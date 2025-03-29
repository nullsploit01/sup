import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

const CanvasWrapper: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDblClick = () => {
      const container = containerRef.current;
      if (!container) return;

      const fullscreenElement =
        document.fullscreenElement || (document as any).webkitFullscreenElement;

      if (!fullscreenElement) {
        container.requestFullscreen?.() ||
          (container as any).webkitRequestFullscreen?.();
      } else {
        document.exitFullscreen?.() ||
          (document as any).webkitExitFullscreen?.();
      }
    };

    const resizeCanvas = () => {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    };

    window.addEventListener("dblclick", handleDblClick);
    document.addEventListener("fullscreenchange", resizeCanvas);
    document.addEventListener("webkitfullscreenchange", resizeCanvas);

    return () => {
      window.removeEventListener("dblclick", handleDblClick);
      document.removeEventListener("fullscreenchange", resizeCanvas);
      document.removeEventListener("webkitfullscreenchange", resizeCanvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
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
          near: 1,
          far: 100,
          position: [0, 0, 6],
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default CanvasWrapper;
