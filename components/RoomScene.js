'use client';
import { useEffect, useRef } from 'react';

export default function RoomScene({ scrollRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer, scene, camera, animId, roomGroup, doorGlow;
    let cleanupResize;
    let dead = false;

    async function init() {
      // ── Import Three.js named exports ─────────────────────────
      const THREE = await import('three');

      if (dead) return; // component unmounted before async resolved

      const w = canvas.offsetWidth || window.innerWidth;
      const h = canvas.offsetHeight || window.innerHeight;

      // ── Renderer ──────────────────────────────────────────────
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h, false);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.9;

      // ── Scene ─────────────────────────────────────────────────
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x080808, 0.045);

      // ── Camera ────────────────────────────────────────────────
      camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
      camera.position.set(0, 1.5, 5.5);

      // ── Lights ────────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0x111111, 3));

      const doorLight = new THREE.PointLight(0xc9a96e, 6, 12);
      doorLight.position.set(0, 1.5, -2.5);
      scene.add(doorLight);

      const fillLight = new THREE.DirectionalLight(0x8899cc, 0.5);
      fillLight.position.set(3, 4, 5);
      scene.add(fillLight);

      // ── Room walls ────────────────────────────────────────────
      roomGroup = new THREE.Group();
      scene.add(roomGroup);

      const matWall  = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.95 });
      const matFloor = new THREE.MeshStandardMaterial({ color: 0x0d0d0d, roughness: 0.8, metalness: 0.1 });
      const matCeil  = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 1.0 });

      const backWall = new THREE.Mesh(new THREE.PlaneGeometry(14, 8), matWall);
      backWall.position.set(0, 1, -4);
      roomGroup.add(backWall);

      const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 10), matFloor);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -2;
      roomGroup.add(floor);

      const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(14, 10), matCeil);
      ceiling.rotation.x = Math.PI / 2;
      ceiling.position.y = 4;
      roomGroup.add(ceiling);

      const lWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 8), matWall);
      lWall.rotation.y = Math.PI / 2;
      lWall.position.set(-7, 1, -1);
      roomGroup.add(lWall);

      const rWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 8), matWall);
      rWall.rotation.y = -Math.PI / 2;
      rWall.position.set(7, 1, -1);
      roomGroup.add(rWall);

      // ── Door frame ────────────────────────────────────────────
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0xc9a96e, roughness: 0.3, metalness: 0.7,
        emissive: new THREE.Color(0xc9a96e), emissiveIntensity: 0.25,
      });

      // Dark door void
      const doorPanel = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 3.4),
        new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 1 })
      );
      doorPanel.position.set(0, 0.2, -3.98);
      scene.add(doorPanel);

      // Frame bars
      [[2.24, 0.08, 0, 1.94], [0.08, 3.56, -1.12, 0.22], [0.08, 3.56, 1.12, 0.22]]
        .forEach(([fw, fh, fx, fy]) => {
          const bar = new THREE.Mesh(new THREE.BoxGeometry(fw, fh, 0.06), frameMat);
          bar.position.set(fx, fy, -3.95);
          scene.add(bar);
        });

      // Glow plane inside door
      doorGlow = new THREE.Mesh(
        new THREE.PlaneGeometry(1.9, 3.3),
        new THREE.MeshBasicMaterial({ color: 0xc9a96e, transparent: true, opacity: 0.04 })
      );
      doorGlow.position.set(0, 0.22, -3.96);
      scene.add(doorGlow);

      // Floor spotlight from door
      const spot = new THREE.SpotLight(0xc9a96e, 4, 10, Math.PI / 7, 0.5);
      spot.position.set(0, 1.8, -3.5);
      spot.target.position.set(0, -2, 0);
      scene.add(spot);
      scene.add(spot.target);

      // ── Floating dust particles ────────────────────────────────
      const geo = new THREE.BufferGeometry();
      const count = 200;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 14;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
        pos[i * 3 + 2] = Math.random() * -8 - 0.5;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      scene.add(new THREE.Points(geo,
        new THREE.PointsMaterial({ color: 0xc9a96e, size: 0.025, transparent: true, opacity: 0.5 })
      ));

      // ── Resize ────────────────────────────────────────────────
      function onResize() {
        if (!canvas || !renderer) return;
        const nw = canvas.offsetWidth;
        const nh = canvas.offsetHeight;
        renderer.setSize(nw, nh, false);
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
      }
      window.addEventListener('resize', onResize);
      cleanupResize = () => window.removeEventListener('resize', onResize);

      // ── Render loop ───────────────────────────────────────────
      function getScrollP() {
        const el = scrollRef?.current;
        if (!el) return 0;
        const total = el.offsetHeight - window.innerHeight;
        return total > 0 ? Math.max(0, Math.min(1, -el.getBoundingClientRect().top / total)) : 0;
      }

      function tick(t) {
        if (dead) return;
        animId = requestAnimationFrame(tick);
        const p = getScrollP();

        camera.position.z = 5.5 - p * 3.8;
        camera.position.y = 1.5 - p * 0.3;

        if (doorGlow) {
          doorGlow.material.opacity = 0.04 + Math.sin(t * 0.001) * 0.015 + p * 0.12;
        }
        if (roomGroup) {
          roomGroup.rotation.y = Math.sin(t * 0.0003) * 0.012;
        }
        renderer.render(scene, camera);
      }
      tick(0);
    }

    init().catch(console.error);

    return () => {
      dead = true;
      cancelAnimationFrame(animId);
      cleanupResize?.();
      renderer?.dispose();
    };
  }, [scrollRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
