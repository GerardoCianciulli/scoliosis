import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface Props {
  id: number;
  pointCloudData: number[];
}

const Canvas = ({ id, pointCloudData }: Props) => {
  // 1. Create a mutable ref to track the changing frame ID
  // 1. Create a mutable ref to track the changing frame ID
  const frameRef = useRef<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;

    const initCanvas = (width: number, height: number) => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
      });
      new OrbitControls(camera, renderer.domElement);

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.position.z = 5;
    };

    const populateCanvas = (pointCloud: number[]) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(pointCloud, 3),
      );
      const material = new THREE.PointsMaterial({ color: 0x888888 });
      const points = new THREE.Points(geometry, material);
      scene.add(points);
    };

    const renderLoop = () => {
      frameRef.current = requestAnimationFrame(renderLoop);
      renderer.render(scene, camera);
    };

    initCanvas(500, 320);
    populateCanvas(pointCloudData);
    renderLoop();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div className="threejs-container">
      {!pointCloudData && <p className="canvas-warning">No cloud data found</p>}
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;
