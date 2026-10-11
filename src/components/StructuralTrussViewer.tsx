import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Pause, Play, Layers } from 'lucide-react';

export const StructuralTrussViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [viewMode, setViewMode] = useState<'neutral' | 'stress'>('stress');
  const [activePreset, setActivePreset] = useState<'iso' | 'front' | 'top'>('iso');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameGroupRef = useRef<THREE.Group | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const isRotatingRef = useRef<boolean>(isRotating);

  // Sync ref safely inside effect
  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 420;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(12, 10, 14);
    camera.lookAt(0, 3, 0);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xf3f1eb, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xc49a62, 1.2);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa7acae, 0.6);
    dirLight2.position.set(-10, -5, -10);
    scene.add(dirLight2);

    // 5. Build Structural Steel Frame (Portal Frame with Cross Bracing and Purlins)
    const frameGroup = new THREE.Group();
    frameGroupRef.current = frameGroup;
    scene.add(frameGroup);

    // Colors
    const bronzeColor = new THREE.Color(0xc49a62);
    const graphiteColor = new THREE.Color(0x384148);
    const whiteColor = new THREE.Color(0xf3f1eb);
    const highlightTension = new THREE.Color(0x4aa3df);

    // Helper: create steel member mesh
    const createBeam = (p1: THREE.Vector3, p2: THREE.Vector3, radius: number, color: THREE.Color) => {
      const distance = p1.distanceTo(p2);
      const geom = new THREE.CylinderGeometry(radius, radius, distance, 8);
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.35,
        metalness: 0.8,
      });
      const mesh = new THREE.Mesh(geom, mat);

      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      mesh.position.copy(mid);

      const direction = new THREE.Vector3().subVectors(p2, p1).normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);
      mesh.setRotationFromQuaternion(quaternion);

      return mesh;
    };

    // Frame Dimensions
    const halfSpan = 5;
    const eaveHeight = 5;
    const ridgeHeight = 7.5;
    const bays = 3;
    const baySpacing = 3.5;

    // Build Multiple Bays
    for (let b = 0; b <= bays; b++) {
      const z = (b - bays / 2) * baySpacing;

      const pBaseL = new THREE.Vector3(-halfSpan, 0, z);
      const pEaveL = new THREE.Vector3(-halfSpan, eaveHeight, z);
      const pRidge = new THREE.Vector3(0, ridgeHeight, z);
      const pEaveR = new THREE.Vector3(halfSpan, eaveHeight, z);
      const pBaseR = new THREE.Vector3(halfSpan, 0, z);

      // Columns
      frameGroup.add(createBeam(pBaseL, pEaveL, 0.16, bronzeColor));
      frameGroup.add(createBeam(pBaseR, pEaveR, 0.16, bronzeColor));

      // Rafters
      frameGroup.add(createBeam(pEaveL, pRidge, 0.14, viewMode === 'stress' ? bronzeColor : graphiteColor));
      frameGroup.add(createBeam(pRidge, pEaveR, 0.14, viewMode === 'stress' ? bronzeColor : graphiteColor));

      // Base plates
      const baseGeom = new THREE.BoxGeometry(0.8, 0.1, 0.8);
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x22272b, metalness: 0.9, roughness: 0.4 });
      const baseL = new THREE.Mesh(baseGeom, baseMat);
      baseL.position.copy(pBaseL);
      frameGroup.add(baseL);

      const baseR = new THREE.Mesh(baseGeom, baseMat);
      baseR.position.copy(pBaseR);
      frameGroup.add(baseR);

      // Joint Node Spheres
      const nodeGeom = new THREE.SphereGeometry(0.2, 12, 12);
      const nodeMat = new THREE.MeshStandardMaterial({ color: whiteColor, emissive: 0xc49a62, emissiveIntensity: 0.3 });
      
      const nL = new THREE.Mesh(nodeGeom, nodeMat);
      nL.position.copy(pEaveL);
      frameGroup.add(nL);

      const nR = new THREE.Mesh(nodeGeom, nodeMat);
      nR.position.copy(pEaveR);
      frameGroup.add(nR);

      const nRidge = new THREE.Mesh(nodeGeom, nodeMat);
      nRidge.position.copy(pRidge);
      frameGroup.add(nRidge);

      // Longitudinal Purlins connecting frames
      if (b < bays) {
        const nextZ = (b + 1 - bays / 2) * baySpacing;

        // Ridge Purlin
        frameGroup.add(createBeam(new THREE.Vector3(0, ridgeHeight, z), new THREE.Vector3(0, ridgeHeight, nextZ), 0.08, graphiteColor));
        // Eave Struts
        frameGroup.add(createBeam(new THREE.Vector3(-halfSpan, eaveHeight, z), new THREE.Vector3(-halfSpan, eaveHeight, nextZ), 0.09, graphiteColor));
        frameGroup.add(createBeam(new THREE.Vector3(halfSpan, eaveHeight, z), new THREE.Vector3(halfSpan, eaveHeight, nextZ), 0.09, graphiteColor));

        // Intermediate Purlins
        for (let p = 1; p <= 3; p++) {
          const t = p / 4;
          const purlinLeft1 = new THREE.Vector3().lerpVectors(pEaveL, pRidge, t);
          const purlinLeft2 = new THREE.Vector3(purlinLeft1.x, purlinLeft1.y, nextZ);
          frameGroup.add(createBeam(purlinLeft1, purlinLeft2, 0.06, graphiteColor));

          const purlinRight1 = new THREE.Vector3().lerpVectors(pEaveR, pRidge, t);
          const purlinRight2 = new THREE.Vector3(purlinRight1.x, purlinRight1.y, nextZ);
          frameGroup.add(createBeam(purlinRight1, purlinRight2, 0.06, graphiteColor));
        }

        // Cross Bracing in Bay 0 & Bay 2
        if (b === 0 || b === bays - 1) {
          const braceColor = viewMode === 'stress' ? highlightTension : graphiteColor;
          frameGroup.add(createBeam(pEaveL, new THREE.Vector3(0, ridgeHeight, nextZ), 0.04, braceColor));
          frameGroup.add(createBeam(new THREE.Vector3(-halfSpan, eaveHeight, nextZ), pRidge, 0.04, braceColor));

          frameGroup.add(createBeam(pEaveR, new THREE.Vector3(0, ridgeHeight, nextZ), 0.04, braceColor));
          frameGroup.add(createBeam(new THREE.Vector3(halfSpan, eaveHeight, nextZ), pRidge, 0.04, braceColor));

          frameGroup.add(createBeam(pBaseL, new THREE.Vector3(-halfSpan, eaveHeight, nextZ), 0.05, braceColor));
          frameGroup.add(createBeam(new THREE.Vector3(-halfSpan, 0, nextZ), pEaveL, 0.05, braceColor));

          frameGroup.add(createBeam(pBaseR, new THREE.Vector3(halfSpan, eaveHeight, nextZ), 0.05, braceColor));
          frameGroup.add(createBeam(new THREE.Vector3(halfSpan, 0, nextZ), pEaveR, 0.05, braceColor));
        }
      }
    }

    // Foundation Grid Line Floor
    const gridHelper = new THREE.GridHelper(16, 16, 0xc49a62, 0x22272b);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);

    // Mouse and Touch Drag Rotation
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (clientX: number, clientY: number) => {
      isDragging = true;
      prevX = clientX;
      prevY = clientY;
    };

    const onPointerMove = (clientX: number, clientY: number) => {
      if (!isDragging || !frameGroupRef.current) return;
      const deltaX = clientX - prevX;
      const deltaY = clientY - prevY;
      prevX = clientX;
      prevY = clientY;

      frameGroupRef.current.rotation.y += deltaX * 0.008;
      frameGroupRef.current.rotation.x = Math.max(-0.4, Math.min(0.6, frameGroupRef.current.rotation.x + deltaY * 0.005));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onMouseDown = (e: MouseEvent) => {
      onPointerDown(e.clientX, e.clientY);
    };

    const onMouseMove = (e: MouseEvent) => {
      onPointerMove(e.clientX, e.clientY);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
    window.addEventListener('touchcancel', onPointerUp);

    // Viewport Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Animation Loop
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      if (isRotatingRef.current && frameGroupRef.current && !isDragging) {
        frameGroupRef.current.rotation.y += 0.004;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const onResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 420;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onPointerUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('touchcancel', onPointerUp);
      observer.disconnect();

      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, [viewMode]);

  // Handle Preset Views
  const setPreset = (preset: 'iso' | 'front' | 'top') => {
    setActivePreset(preset);
    if (!cameraRef.current || !frameGroupRef.current) return;

    if (preset === 'iso') {
      cameraRef.current.position.set(12, 10, 14);
      frameGroupRef.current.rotation.set(0, 0, 0);
    } else if (preset === 'front') {
      cameraRef.current.position.set(0, 5, 18);
      frameGroupRef.current.rotation.set(0, 0, 0);
    } else if (preset === 'top') {
      cameraRef.current.position.set(0, 18, 0.1);
      frameGroupRef.current.rotation.set(0, 0, 0);
    }
    cameraRef.current.lookAt(0, 3, 0);
  };

  return (
    <div className="relative w-full rounded-lg border border-[#2E373E] bg-[#14181B] overflow-hidden shadow-2xl">
      {/* Top Engineering Overlay Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-[#232A2F] bg-[#101315]/80 backdrop-blur-sm gap-2.5 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-2 h-2 rounded-full bg-[#C49A62] animate-pulse shrink-0" />
          <span className="font-technical text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] text-[#F3F1EB] font-semibold truncate">
            3D STRUCTURAL MODEL // PEB FRAME
          </span>
        </div>

        {/* View Controls Toolbar */}
        <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 flex-wrap">
          {/* Preset Angle Buttons */}
          <div className="flex rounded border border-[#232A2F] bg-[#161B1E] p-0.5">
            <button
              onClick={() => setPreset('iso')}
              className={`px-2 sm:px-2.5 py-1 text-[10px] font-technical uppercase rounded transition-colors ${
                activePreset === 'iso' ? 'bg-[#C49A62] text-[#101315] font-bold' : 'text-[#A7ACAE] hover:text-[#F3F1EB]'
              }`}
            >
              Iso
            </button>
            <button
              onClick={() => setPreset('front')}
              className={`px-2 sm:px-2.5 py-1 text-[10px] font-technical uppercase rounded transition-colors ${
                activePreset === 'front' ? 'bg-[#C49A62] text-[#101315] font-bold' : 'text-[#A7ACAE] hover:text-[#F3F1EB]'
              }`}
            >
              Elev
            </button>
            <button
              onClick={() => setPreset('top')}
              className={`px-2 sm:px-2.5 py-1 text-[10px] font-technical uppercase rounded transition-colors ${
                activePreset === 'top' ? 'bg-[#C49A62] text-[#101315] font-bold' : 'text-[#A7ACAE] hover:text-[#F3F1EB]'
              }`}
            >
              Plan
            </button>
          </div>

          {/* Stress / Neutral toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'stress' ? 'neutral' : 'stress')}
            title="Toggle Structural Stress View"
            className={`p-1 sm:p-1.5 rounded border border-[#232A2F] text-xs transition-colors flex items-center gap-1 px-2 sm:px-2.5 ${
              viewMode === 'stress' ? 'bg-[#1C2226] text-[#C49A62] border-[#C49A62]/40' : 'text-[#A7ACAE] hover:text-[#F3F1EB]'
            }`}
          >
            <Layers size={12} className="shrink-0" />
            <span className="font-technical text-[10px] uppercase">
              {viewMode === 'stress' ? 'Stress' : 'Standard'}
            </span>
          </button>

          {/* Play/Pause Rotation */}
          <button
            onClick={() => setIsRotating(!isRotating)}
            aria-label={isRotating ? 'Pause rotation' : 'Start rotation'}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded border border-[#232A2F] text-[#A7ACAE] hover:text-[#F3F1EB] transition-colors"
          >
            {isRotating ? <Pause size={13} /> : <Play size={13} />}
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        style={{ touchAction: 'pan-y' }}
        className="w-full h-[280px] xs:h-[320px] sm:h-[400px] md:h-[460px] cursor-grab active:cursor-grabbing bg-radial-gradient from-[#191D20]/60 via-[#101315] to-[#101315] relative select-none"
      />

      {/* Bottom Technical Coordinates Legend */}
      <div className="p-3 sm:p-4 border-t border-[#232A2F] bg-[#101315]/90 flex flex-col xs:flex-row xs:items-center justify-between gap-2.5 sm:gap-4 text-[10px] sm:text-[11px] font-technical text-[#A7ACAE]">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-sm bg-[#C49A62] shrink-0" />
            <span className="uppercase text-[9px] sm:text-[10px]">Rafters / Cols</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-sm bg-[#4aa3df] shrink-0" />
            <span className="uppercase text-[9px] sm:text-[10px]">Tension Bracing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-sm bg-[#384148] shrink-0" />
            <span className="uppercase text-[9px] sm:text-[10px]">Purlins</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-[#A7ACAE]/70">
          <RotateCw size={11} className="text-[#C49A62] shrink-0" />
          <span>DRAG TO ORBIT 360°</span>
        </div>
      </div>
    </div>
  );
};
