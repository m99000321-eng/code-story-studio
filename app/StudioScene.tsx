"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function StudioScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 6;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const coreGeometry = new THREE.IcosahedronGeometry(1.12, 2);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xb7a2ff,
      metalness: 0.22,
      roughness: 0.24,
      transparent: true,
      opacity: 0.88,
      clearcoat: 0.8,
      clearcoatRoughness: 0.18,
      wireframe: false
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 1),
      new THREE.MeshBasicMaterial({ color: 0x8c73ef, wireframe: true, transparent: true, opacity: 0.25 })
    );
    group.add(wire);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xd3a5e7, transparent: true, opacity: 0.78 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.012, 8, 120), ringMaterial);
    ring.rotation.set(0.9, 0.3, -0.5);
    group.add(ring);

    const ringTwo = new THREE.Mesh(
      new THREE.TorusGeometry(1.75, 0.008, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0x9b85f4, transparent: true, opacity: 0.48 })
    );
    ringTwo.rotation.set(1.2, -0.6, 0.4);
    group.add(ringTwo);

    const count = window.matchMedia("(max-width: 680px)").matches ? 110 : 260;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.0 + Math.random() * 1.25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi) * 0.65;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0x9d88f1, size: 0.025, transparent: true, opacity: 0.8, sizeAttenuation: true })
    );
    scene.add(particles);

    scene.add(new THREE.AmbientLight(0xffffff, 2.1));
    const keyLight = new THREE.PointLight(0xffffff, 22);
    keyLight.position.set(2.5, 3, 4);
    scene.add(keyLight);
    const lilacLight = new THREE.PointLight(0xb6a1ff, 12);
    lilacLight.position.set(-3, -1, 2);
    scene.add(lilacLight);

    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2;
    };
    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", () => { pointer.x = 0; pointer.y = 0; }, { passive: true });

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!reduceMotion) {
        group.rotation.y += 0.0025;
        group.rotation.x = Math.sin(performance.now() * 0.00035) * 0.1;
        wire.rotation.y -= 0.0013;
        ring.rotation.z += 0.0015;
        ringTwo.rotation.x += 0.0008;
        particles.rotation.y -= 0.00035;
        group.rotation.y += pointer.x * 0.0008;
        group.rotation.x += pointer.y * 0.00035;
        camera.position.x += (pointer.x * 0.18 - camera.position.x) * 0.025;
        camera.position.y += (-pointer.y * 0.12 - camera.position.y) * 0.025;
        camera.lookAt(0, 0, 0);
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      coreGeometry.dispose();
      coreMaterial.dispose();
      wire.geometry.dispose();
      (wire.material as THREE.Material).dispose();
      ring.geometry.dispose();
      ringMaterial.dispose();
      ringTwo.geometry.dispose();
      (ringTwo.material as THREE.Material).dispose();
      particleGeometry.dispose();
      (particles.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="three-scene" aria-hidden="true" />;
}
