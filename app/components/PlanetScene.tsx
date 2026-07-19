import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PlanetScene() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!host.current) return;
    const container = host.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.92;
    container.appendChild(renderer.domElement);

    const texture = new THREE.TextureLoader().load("/backgrounds/nasa-moon-color-4k.webp");
    const heightTexture = new THREE.TextureLoader().load("/backgrounds/nasa-moon-height.webp");
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    heightTexture.wrapS = THREE.RepeatWrapping;
    heightTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    heightTexture.minFilter = THREE.LinearMipmapLinearFilter;
    const group = new THREE.Group();
    group.position.set(5.0, -4.9, 0);
    group.rotation.z = -0.06;
    scene.add(group);

    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(6.4, 128, 96),
      new THREE.MeshStandardMaterial({
        map: texture,
        bumpMap: texture,
        bumpScale: 0.032,
        displacementMap: heightTexture,
        displacementScale: 0.065,
        displacementBias: -0.0325,
        color: 0xa8aaa9,
        roughness: 0.92,
        metalness: 0,
      }),
    );
    group.add(planet);

    const makeStars = (count: number, size: number, opacity: number, seedStart: number) => {
      let seed = seedStart;
      const random = () => {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        return seed / 4294967296;
      };
      const positions = new Float32Array(count * 3);
      for (let index = 0; index < count; index++) {
        positions[index * 3] = (random() - 0.5) * 30;
        positions[index * 3 + 1] = (random() - 0.5) * 17;
        positions[index * 3 + 2] = -4 - random() * 10;
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
        color: 0xdce9f2,
        size,
        transparent: true,
        opacity,
        depthWrite: false,
        sizeAttenuation: true,
      });
      const stars = new THREE.Points(geometry, material);
      scene.add(stars);
      return stars;
    };
    const fineStars = makeStars(760, 0.019, 0.52, 4720);
    const brightStars = makeStars(115, 0.038, 0.78, 2019);

    scene.add(new THREE.HemisphereLight(0x7f8c94, 0x020202, 0.035));
    const key = new THREE.DirectionalLight(0xf2f6ff, 2.1);
    key.position.set(-6, 6, -3);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x9db4c4, 0.2);
    fill.position.set(-4, 1, 7);
    scene.add(fill);

    const resize = () => {
      const { clientWidth: width, clientHeight: height } = container;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    let frame = 0;
    let previous = performance.now();
    const draw = (now: number) => {
      const delta = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      planet.rotation.y += delta * 0.032;
      planet.rotation.x = -0.08;
      frame = requestAnimationFrame(draw);
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      texture.dispose();
      heightTexture.dispose();
      planet.geometry.dispose();
      (planet.material as THREE.Material).dispose();
      fineStars.geometry.dispose();
      (fineStars.material as THREE.Material).dispose();
      brightStars.geometry.dispose();
      (brightStars.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="planet-scene" aria-hidden="true" ref={host}>
      <span className="meteor meteor-one" />
      <span className="meteor meteor-two" />
      <span className="meteor meteor-three" />
    </div>
  );
}
