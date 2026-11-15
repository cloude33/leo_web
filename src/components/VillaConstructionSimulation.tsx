'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Play,
  Pause,
  RotateCcw,
  Video,
  Eye,
  Scissors,
  Layers,
  Compass,
  Maximize2,
  Download,
  CheckCircle2,
} from 'lucide-react';

interface StageInfo {
  id: number;
  label: string;
  range: [number, number];
  title: string;
  desc: string;
  code: string;
}

const STAGES: StageInfo[] = [
  {
    id: 1,
    label: '01. Zemin & Temel',
    range: [0, 0.22],
    title: 'Topografik Kazı & Radye Temel Donatısı',
    desc: 'Urla Kuşçular arazisi kademelenerek 40 cm C35/45 radye temel betonu ve çift sıra çelik hasır donatı işlenir.',
    code: 'KOT: -0.80 m / +0.00 m • C35/45 RADYE',
  },
  {
    id: 2,
    label: '02. Masif Taş Duvar',
    range: [0.22, 0.48],
    title: 'Urla Yerel Taş Duvar Örümü',
    desc: 'Ocak taşları yerel taş ustaları tarafından milimetrik harç derzleriyle örülür; 25 cm doğal taş dış kabuk yükselir.',
    code: 'URLA LİMESTONE • 25 CM TAŞ DUVAR',
  },
  {
    id: 3,
    label: '03. Ahşap & Çelik Strüktür',
    range: [0.48, 0.70],
    title: 'Lamine Meşe Kirişler & Çelik İskelet',
    desc: '30x40 cm masif lamine meşe ana taşıyıcılar ve çelik ankrajlar geniş saçaklı çatı yükünü taşımak üzere bağlanır.',
    code: '30x40 CM LAMİNE MEŞE • ÇELİK ANKRAJ',
  },
  {
    id: 4,
    label: '04. Cam & Gizli Tesisat',
    range: [0.70, 0.88],
    title: 'Minimalist Sürme Camlar & Yerden Isıtma',
    desc: 'Ege rüzgarı ve ışığına göre yönlenen 3.20 m yüksekliğinde ısıcam sürme paneller ve zemin içi serpantin tesisat döşenir.',
    code: '3.20 M SÜRME CEPHE • YERDEN ISITMA',
  },
  {
    id: 5,
    label: '05. Kesit & Tamamlanma',
    range: [0.88, 1.0],
    title: 'Line-Art Kesit & Bitmiş Yaşam Alanı',
    desc: '45° teknik tarama ile bina kesiti açılır; iç mekan galeri boşluğu, şömine ve havuz terası bir bütün olarak görünür.',
    code: 'KESİT A-A • 650 M² BRÜT • KÜNYE NO: A-04',
  },
];

export default function VillaConstructionSimulation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation State
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 1
  const [isCutaway, setIsCutaway] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const progressRef = useRef(0);
  const isPlayingRef = useRef(true);
  const isCutawayRef = useRef(false);
  const autoRotateRef = useRef(true);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  // 3D Model object groups
  const groupsRef = useRef<{
    terrain?: THREE.Group;
    foundation?: THREE.Group;
    stoneWalls?: THREE.Group;
    timberBeams?: THREE.Group;
    roof?: THREE.Group;
    glazing?: THREE.Group;
    interiorCoils?: THREE.Group;
    dimensionLines?: THREE.Group;
    cutawayGroup?: THREE.Group;
  }>({});

  progressRef.current = progress;
  isPlayingRef.current = isPlaying;
  isCutawayRef.current = isCutaway;
  autoRotateRef.current = autoRotate;

  // Active stage
  const currentStage = STAGES.find(
    (s) => progress >= s.range[0] && progress <= s.range[1]
  ) || STAGES[STAGES.length - 1];

  // Helper function to create line-art edges on mesh
  const createLineArtMesh = (
    geometry: THREE.BufferGeometry,
    fillColor = 0xf5f4ee,
    lineColor = 0x141414,
    lineWidth = 1.5,
    opacity = 1
  ) => {
    const group = new THREE.Group();

    // Fill surface (light gray / cream value for volume)
    const fillMat = new THREE.MeshBasicMaterial({
      color: fillColor,
      transparent: opacity < 1,
      opacity: opacity,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
    const fillMesh = new THREE.Mesh(geometry, fillMat);
    group.add(fillMesh);

    // Ink Line Art Outlines
    const edges = new THREE.EdgesGeometry(geometry, 25);
    const lineMat = new THREE.LineBasicMaterial({
      color: lineColor,
      linewidth: lineWidth,
    });
    const lineMesh = new THREE.LineSegments(edges, lineMat);
    group.add(lineMesh);

    return group;
  };

  // Helper for technical 3D dimension line
  const create3DDimensionLine = (
    start: THREE.Vector3,
    end: THREE.Vector3,
    color = 0x5a5955
  ) => {
    const group = new THREE.Group();
    const geom = new THREE.BufferGeometry().setFromPoints([start, end]);
    const mat = new THREE.LineDashedMaterial({
      color: color,
      dashSize: 0.3,
      gapSize: 0.15,
      linewidth: 1,
    });
    const line = new THREE.Line(geom, mat);
    line.computeLineDistances();
    group.add(line);

    // End ticks
    const tickGeom1 = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(start.x, start.y - 0.2, start.z),
      new THREE.Vector3(start.x, start.y + 0.2, start.z),
    ]);
    const tickGeom2 = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(end.x, end.y - 0.2, end.z),
      new THREE.Vector3(end.y - 0.2 ? end.x : end.x, end.y + 0.2, end.z),
    ]);
    const tickMat = new THREE.LineBasicMaterial({ color });
    group.add(new THREE.Line(tickGeom1, tickMat));
    group.add(new THREE.Line(tickGeom2, tickMat));

    return group;
  };

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6f5f0); // Warm technical paper
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(24, 18, 30);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.localClippingEnabled = true;
    rendererRef.current = renderer;

    // 4. OrbitControls
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Don't go below ground
    controls.minDistance = 10;
    controls.maxDistance = 70;
    controls.target.set(0, 2, 0);
    controlsRef.current = controls;

    // 5. Grid on Ground (40px grid equivalent in 3D)
    const gridHelper = new THREE.GridHelper(50, 50, 0x141414, 0xd0ceca);
    gridHelper.position.y = -0.01;
    (gridHelper.material as THREE.Material).opacity = 0.4;
    (gridHelper.material as THREE.Material).transparent = true;
    scene.add(gridHelper);

    // Sub-crosses every 10 units (engineering paper aesthetic)
    const crossesGroup = new THREE.Group();
    for (let x = -20; x <= 20; x += 10) {
      for (let z = -20; z <= 20; z += 10) {
        const cGeom = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(x - 0.3, 0.01, z),
          new THREE.Vector3(x + 0.3, 0.01, z),
          new THREE.Vector3(x, 0.01, z - 0.3),
          new THREE.Vector3(x, 0.01, z + 0.3),
        ]);
        const cMat = new THREE.LineBasicMaterial({ color: 0x908d87 });
        crossesGroup.add(new THREE.LineSegments(cGeom, cMat));
      }
    }
    scene.add(crossesGroup);

    // ==========================================
    // BUILD THE REAL-SIZED URLA GAIA VILLA MODEL
    // ==========================================

    // 1. Terrain & Sub-grade
    const terrainGroup = new THREE.Group();
    const terrainBox = createLineArtMesh(
      new THREE.BoxGeometry(32, 0.6, 26),
      0xededeb,
      0x303030,
      1
    );
    terrainBox.position.set(0, -0.3, 0);
    terrainGroup.add(terrainBox);

    // Terraced earth levels
    const terr2 = createLineArtMesh(
      new THREE.BoxGeometry(28, 0.4, 22),
      0xe8e6e2,
      0x505050,
      1
    );
    terr2.position.set(0, 0.1, 0);
    terrainGroup.add(terr2);
    scene.add(terrainGroup);
    groupsRef.current.terrain = terrainGroup;

    // 2. Foundation (Radye Temel & Subasman Kotu)
    const foundationGroup = new THREE.Group();
    const fSlab = createLineArtMesh(
      new THREE.BoxGeometry(20, 0.5, 14),
      0xdcdcd8,
      0x141414,
      2
    );
    fSlab.position.set(0, 0.55, 0);
    foundationGroup.add(fSlab);

    // Foundation Pool Basin (Sonsuzluk Havuzu Tabanı)
    const poolSlab = createLineArtMesh(
      new THREE.BoxGeometry(10, 0.4, 4.5),
      0xd0d4d8,
      0x141414,
      1.5
    );
    poolSlab.position.set(0, 0.4, 10);
    foundationGroup.add(poolSlab);

    // Rebar grid lines on top of foundation
    const rebarGroup = new THREE.Group();
    for (let rx = -9; rx <= 9; rx += 1.5) {
      const rGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(rx, 0.82, -6.5),
        new THREE.Vector3(rx, 0.82, 6.5),
      ]);
      const rMat = new THREE.LineBasicMaterial({ color: 0xff5722 }); // Accent orange
      rebarGroup.add(new THREE.Line(rGeom, rMat));
    }
    foundationGroup.add(rebarGroup);
    scene.add(foundationGroup);
    groupsRef.current.foundation = foundationGroup;

    // 3. Urla Stone Masonry Walls (Masif Taş Duvar Blokları)
    const stoneWallsGroup = new THREE.Group();

    // Main rear stone wall (Urla limestone block)
    const rearWall = createLineArtMesh(
      new THREE.BoxGeometry(19.6, 3.8, 0.8),
      0xf0ede6,
      0x141414,
      2
    );
    rearWall.position.set(0, 2.7, -6.4);
    stoneWallsGroup.add(rearWall);

    // Lateral stone wing walls (West & East)
    const westWall = createLineArtMesh(
      new THREE.BoxGeometry(0.8, 3.8, 12),
      0xf0ede6,
      0x141414,
      2
    );
    westWall.position.set(-9.4, 2.7, 0);
    stoneWallsGroup.add(westWall);

    const eastWall = createLineArtMesh(
      new THREE.BoxGeometry(0.8, 3.8, 8),
      0xf0ede6,
      0x141414,
      2
    );
    eastWall.position.set(9.4, 2.7, -2);
    stoneWallsGroup.add(eastWall);

    // Interior fireplace stone core (Şömine taş kütlesi)
    const fireStone = createLineArtMesh(
      new THREE.BoxGeometry(2.4, 4.6, 2.4),
      0xdedad2,
      0x141414,
      2
    );
    fireStone.position.set(2, 3.1, -1);
    stoneWallsGroup.add(fireStone);

    // Stone horizontal course hatch lines
    const courseGroup = new THREE.Group();
    for (let h = 1.4; h <= 4.2; h += 0.5) {
      const c1 = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-9.4, h, -6.81),
        new THREE.Vector3(9.4, h, -6.81),
      ]);
      courseGroup.add(
        new THREE.Line(c1, new THREE.LineBasicMaterial({ color: 0x7a7873 }))
      );
    }
    stoneWallsGroup.add(courseGroup);
    scene.add(stoneWallsGroup);
    groupsRef.current.stoneWalls = stoneWallsGroup;

    // 4. Timber Beams & Structural Frame (Masif Meşe Taşıyıcılar)
    const timberGroup = new THREE.Group();

    // Massive longitudinal oak beams (30x40 cm)
    const beam1 = createLineArtMesh(
      new THREE.BoxGeometry(21, 0.45, 0.35),
      0xd5cebe,
      0x141414,
      1.8
    );
    beam1.position.set(0, 4.7, 4);
    timberGroup.add(beam1);

    const beam2 = createLineArtMesh(
      new THREE.BoxGeometry(21, 0.45, 0.35),
      0xd5cebe,
      0x141414,
      1.8
    );
    beam2.position.set(0, 4.7, -1);
    timberGroup.add(beam2);

    // Transverse ceiling joists
    for (let jx = -9.5; jx <= 9.5; jx += 1.6) {
      const joist = createLineArtMesh(
        new THREE.BoxGeometry(0.18, 0.35, 11),
        0xcbc3b2,
        0x333333,
        1
      );
      joist.position.set(jx, 4.9, 1.5);
      timberGroup.add(joist);
    }

    // Steel support slender columns at front terrace
    for (let cx of [-8, -2, 4, 9]) {
      const col = createLineArtMesh(
        new THREE.CylinderGeometry(0.1, 0.1, 3.8, 16),
        0x4a4a48,
        0x141414,
        1.5
      );
      col.position.set(cx, 2.7, 4.5);
      timberGroup.add(col);
    }
    scene.add(timberGroup);
    groupsRef.current.timberBeams = timberGroup;

    // 5. Roof with Deep Cantilever Overhangs (Geniş Saçaklı Çatı)
    const roofGroup = new THREE.Group();
    const roofSlab = createLineArtMesh(
      new THREE.BoxGeometry(23, 0.35, 16),
      0xfafaf8,
      0x141414,
      2.5
    );
    roofSlab.position.set(0, 5.25, 1);
    roofGroup.add(roofSlab);

    // Concealed zinc fascia edge
    const fascia = createLineArtMesh(
      new THREE.BoxGeometry(23.2, 0.15, 16.2),
      0x606060,
      0x141414,
      1.5
    );
    fascia.position.set(0, 5.4, 1);
    roofGroup.add(fascia);
    scene.add(roofGroup);
    groupsRef.current.roof = roofGroup;

    // 6. Minimalist Glazing & Pool (Cam Cephe & Su)
    const glazingGroup = new THREE.Group();

    // Panoramic glass sliding walls
    const glassSlab = createLineArtMesh(
      new THREE.BoxGeometry(16, 3.7, 0.08),
      0xe6f0f5,
      0x4a6d85,
      1.5,
      0.35
    );
    glassSlab.position.set(0.5, 2.7, 3.8);
    glazingGroup.add(glassSlab);

    // Slim black mullions
    for (let mx of [-7, -3, 1, 5, 8]) {
      const mullion = createLineArtMesh(
        new THREE.BoxGeometry(0.08, 3.75, 0.15),
        0x141414,
        0x141414,
        1.5
      );
      mullion.position.set(mx, 2.7, 3.8);
      glazingGroup.add(mullion);
    }

    // Pool water surface
    const water = createLineArtMesh(
      new THREE.BoxGeometry(9.6, 0.1, 4.1),
      0xd9ecf2,
      0x388299,
      1.5,
      0.65
    );
    water.position.set(0, 0.55, 10);
    glazingGroup.add(water);
    scene.add(glazingGroup);
    groupsRef.current.glazing = glazingGroup;

    // 7. Interior Radiant Heating Coils (Yerden Isıtma Vurgu Hattı)
    const coilsGroup = new THREE.Group();
    const coilPoints: THREE.Vector3[] = [];
    for (let cz = -5; cz <= 3; cz += 0.8) {
      coilPoints.push(new THREE.Vector3(-8, 0.85, cz));
      coilPoints.push(new THREE.Vector3(7, 0.85, cz));
      coilPoints.push(new THREE.Vector3(7, 0.85, cz + 0.4));
      coilPoints.push(new THREE.Vector3(-8, 0.85, cz + 0.4));
    }
    const coilGeom = new THREE.BufferGeometry().setFromPoints(coilPoints);
    const coilMat = new THREE.LineBasicMaterial({
      color: 0xff5722, // Glowing construction orange
      linewidth: 2,
    });
    const coilLine = new THREE.Line(coilGeom, coilMat);
    coilsGroup.add(coilLine);
    scene.add(coilsGroup);
    groupsRef.current.interiorCoils = coilsGroup;

    // 8. 3D Architectural Dimensions
    const dimsGroup = new THREE.Group();
    dimsGroup.add(
      create3DDimensionLine(
        new THREE.Vector3(-10, 0.8, 8),
        new THREE.Vector3(10, 0.8, 8)
      )
    );
    dimsGroup.add(
      create3DDimensionLine(
        new THREE.Vector3(12, 0.8, -6),
        new THREE.Vector3(12, 0.8, 6)
      )
    );
    dimsGroup.add(
      create3DDimensionLine(
        new THREE.Vector3(-11, 0.8, -6),
        new THREE.Vector3(-11, 5.4, -6)
      )
    );
    scene.add(dimsGroup);
    groupsRef.current.dimensionLines = dimsGroup;

    // ==========================================
    // RENDER & ANIMATION LOOP
    // ==========================================
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Advance construction progress if playing
      if (isPlayingRef.current) {
        setProgress((prev) => {
          const next = prev + delta * 0.035; // ~28 second full cycle
          return next > 1 ? 0 : next;
        });
      }

      const p = progressRef.current;

      // 1. Terrain & Subgrade (0 - 100%)
      if (groupsRef.current.terrain) {
        groupsRef.current.terrain.visible = true;
      }

      // 2. Foundation (Appears 0% -> 22%)
      if (groupsRef.current.foundation) {
        const fProg = Math.min(Math.max((p - 0.0) / 0.18, 0), 1);
        groupsRef.current.foundation.position.y = (fProg - 1) * 3;
        groupsRef.current.foundation.visible = fProg > 0.05;
      }

      // 3. Stone Walls (Appears 18% -> 48%)
      if (groupsRef.current.stoneWalls) {
        const sProg = Math.min(Math.max((p - 0.18) / 0.28, 0), 1);
        groupsRef.current.stoneWalls.position.y = (sProg - 1) * 4;
        groupsRef.current.stoneWalls.visible = sProg > 0.05;
      }

      // 4. Timber Beams (Appears 45% -> 70%)
      if (groupsRef.current.timberBeams) {
        const tProg = Math.min(Math.max((p - 0.45) / 0.22, 0), 1);
        groupsRef.current.timberBeams.position.y = (tProg - 1) * 5;
        groupsRef.current.timberBeams.visible = tProg > 0.05;
      }

      // 5. Roof (Appears 65% -> 85%)
      if (groupsRef.current.roof) {
        const rProg = Math.min(Math.max((p - 0.65) / 0.18, 0), 1);
        groupsRef.current.roof.position.y = (rProg - 1) * 6;
        groupsRef.current.roof.visible = rProg > 0.05;
      }

      // 6. Glazing (Appears 70% -> 90%)
      if (groupsRef.current.glazing) {
        const gProg = Math.min(Math.max((p - 0.7) / 0.18, 0), 1);
        groupsRef.current.glazing.position.y = (gProg - 1) * 4;
        groupsRef.current.glazing.visible = gProg > 0.05;
      }

      // 7. Interior Heating Coils (Active during stage 4 and 5)
      if (groupsRef.current.interiorCoils) {
        groupsRef.current.interiorCoils.visible = p > 0.68;
      }

      // 8. Cutaway Section Bıçağı (Stage 5 or toggle)
      const shouldCut = isCutawayRef.current || p >= 0.88;
      if (renderer.clippingPlanes.length === 0 && shouldCut) {
        // Cut through the villa at Z = 1
        const clipPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 1.5);
        renderer.clippingPlanes = [clipPlane];
      } else if (renderer.clippingPlanes.length > 0 && !shouldCut) {
        renderer.clippingPlanes = [];
      }

      // Auto-Orbit camera gently around model
      if (autoRotateRef.current) {
        const radius = 38;
        const angle = currentTime * 0.00015;
        camera.position.x = Math.sin(angle) * radius;
        camera.position.z = Math.cos(angle) * radius;
        camera.position.y = 16 + Math.sin(currentTime * 0.0002) * 3;
        camera.lookAt(0, 2, 0);
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

  // Jump to specific stage
  const jumpToStage = (stage: StageInfo) => {
    setProgress(stage.range[0] + 0.02);
  };

  // Video recording logic via browser canvas captureStream
  const startRecording = useCallback(() => {
    if (!canvasRef.current) return;
    try {
      const stream = canvasRef.current.captureStream(60);
      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
          ? 'video/webm;codecs=vp9'
          : 'video/webm',
        videoBitsPerSecond: 8000000, // 8 Mbps high quality
      });

      recordedChunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedBlobUrl(url);
        setIsRecording(false);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordedBlobUrl(null);
      setProgress(0); // Start from beginning of construction
      setIsPlaying(true);

      // Auto stop after 28 seconds (1 full cycle)
      setTimeout(() => {
        if (recorder.state === 'recording') {
          recorder.stop();
        }
      }, 28500);
    } catch (err) {
      console.error('Video recording failed:', err);
      alert('Tarayıcınız Canvas video kaydını desteklemiyor olabilir.');
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  return (
    <div className="relative w-full h-[700px] md:h-[820px] bg-[#F6F5F0] rounded-2xl overflow-hidden border border-[#D5D2CA] shadow-2xl select-none flex flex-col font-mono text-[#141414]">
      {/* 1. TOP ARCHITECTURAL HEADER & CAD TITLE BLOCK */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pointer-events-none">
        {/* Project Specification Header */}
        <div className="bg-[#F6F5F0]/90 backdrop-blur-md px-4 py-2.5 rounded-lg border border-[#D5D2CA] shadow-sm pointer-events-auto">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#9C7D54] uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-ping" />
            <span>LEO MİMARLIK & YAPI • LIVE CONSTRUCTION FILM</span>
          </div>
          <h2 className="font-serif-luxury text-lg md:text-xl text-[#141414] font-normal tracking-tight mt-0.5">
            Urla Gaia Çiftlik Evleri 4 — Line-Art Cutaway
          </h2>
        </div>

        {/* Technical Title Block (Engineering Cell) */}
        <div className="bg-[#F6F5F0]/90 backdrop-blur-md p-2.5 rounded-lg border border-[#D5D2CA] text-[10px] leading-tight space-y-1 shadow-sm hidden md:block pointer-events-auto">
          <div className="flex justify-between gap-4 border-b border-[#D5D2CA] pb-1">
            <span className="text-[#666460]">PROJE KODU:</span>
            <span className="font-bold">LEO-URLA-GAIA-04</span>
          </div>
          <div className="flex justify-between gap-4 border-b border-[#D5D2CA] pb-1">
            <span className="text-[#666460]">ÖLÇEK:</span>
            <span>1:50 METRİK</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-[#666460]">LOKASYON:</span>
            <span>KUŞÇULAR / URLA (38.32° N, 26.76° E)</span>
          </div>
        </div>
      </div>

      {/* 2. THREE.JS 3D WEBGL CANVAS */}
      <div ref={containerRef} className="relative w-full flex-1">
        <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />

        {/* 3D-Anchored On-Screen Dimension Callouts (Responsive Floating Markers) */}
        <div className="absolute top-1/3 left-6 md:left-12 pointer-events-none transition-all duration-300">
          <div className="bg-white/95 border-l-2 border-[#FF5722] px-3 py-2 rounded shadow-md text-xs space-y-0.5 max-w-xs">
            <div className="text-[10px] text-[#FF5722] font-bold tracking-widest uppercase">
              FAZ {currentStage.id} / 05
            </div>
            <div className="font-bold text-[#141414] text-xs">{currentStage.title}</div>
            <p className="text-[11px] text-[#666460] font-sans leading-snug">{currentStage.desc}</p>
            <div className="text-[10px] text-[#9C7D54] font-mono pt-1">{currentStage.code}</div>
          </div>
        </div>
      </div>

      {/* 3. TIMELINE & STAGE SELECTOR BAR */}
      <div className="bg-[#ECE9E0] border-t border-[#D5D2CA] px-4 md:px-8 py-3.5 z-20 flex flex-col gap-3">
        {/* Stage Pills Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {STAGES.map((stage) => {
            const isActive = currentStage.id === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => jumpToStage(stage)}
                className={`text-[11px] px-3 py-1.5 rounded transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#141414] text-[#F6F5F0] font-semibold shadow-sm'
                    : 'bg-white/70 hover:bg-white text-[#666460] hover:text-[#141414] border border-[#D5D2CA]'
                }`}
              >
                <span>{stage.label}</span>
                {progress >= stage.range[1] && (
                  <CheckCircle2 size={12} className="text-[#27a644]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Scrubber & Video Controls */}
        <div className="flex items-center justify-between gap-4">
          {/* Left: Playback controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-9 h-9 rounded-full bg-[#141414] text-white hover:bg-[#333333] active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow"
              title={isPlaying ? 'Durdur' : 'Oynat'}
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
            </button>

            <button
              onClick={() => setProgress(0)}
              className="w-9 h-9 rounded-full bg-white hover:bg-[#FAF8F5] border border-[#D5D2CA] text-[#141414] active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-sm"
              title="Başa Sar"
            >
              <RotateCcw size={14} />
            </button>

            {/* Timecode indicator */}
            <div className="text-xs font-mono text-[#666460] pl-2 hidden sm:block">
              <span className="text-[#141414] font-bold">
                {String(Math.floor(progress * 28)).padStart(2, '0')}:
                {String(Math.floor((progress * 28 * 60) % 60)).padStart(2, '0')}
              </span>{' '}
              / 00:28
            </div>
          </div>

          {/* Center: Interactive Scrubber Slider */}
          <div className="flex-1 mx-2 flex items-center">
            <input
              type="range"
              min="0"
              max="1"
              step="0.001"
              value={progress}
              onChange={(e) => {
                setProgress(parseFloat(e.target.value));
                setIsPlaying(false);
              }}
              className="w-full h-1.5 bg-[#D5D2CA] rounded-lg appearance-none cursor-pointer accent-[#FF5722]"
            />
          </div>

          {/* Right: Camera, Cutaway & Video Record Tools */}
          <div className="flex items-center gap-2">
            {/* Auto Orbit Toggle */}
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`text-xs px-2.5 py-1.5 rounded border transition-all cursor-pointer flex items-center gap-1.5 ${
                autoRotate
                  ? 'bg-[#141414] text-white border-[#141414]'
                  : 'bg-white hover:bg-[#FAF8F5] text-[#666460] border-[#D5D2CA]'
              }`}
              title="Kamera Otomatik Dönsün"
            >
              <Compass size={13} />
              <span className="hidden md:inline">Kamera</span>
            </button>

            {/* Cutaway Slice Toggle */}
            <button
              onClick={() => setIsCutaway(!isCutaway)}
              className={`text-xs px-2.5 py-1.5 rounded border transition-all cursor-pointer flex items-center gap-1.5 ${
                isCutaway
                  ? 'bg-[#FF5722] text-white border-[#FF5722]'
                  : 'bg-white hover:bg-[#FAF8F5] text-[#666460] border-[#D5D2CA]'
              }`}
              title="45° Kesit Bıçağını Aç/Kapat"
            >
              <Scissors size={13} />
              <span className="hidden md:inline">Kesit</span>
            </button>

            {/* Video Record / Download Button */}
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="text-xs px-3 py-1.5 rounded bg-[#9C7D54] hover:bg-[#866842] text-white font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow"
                title="Canvas animasyonunu gerçek video (WebM/MP4) olarak kaydet"
              >
                <Video size={13} />
                <span>Video Kaydet</span>
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="text-xs px-3 py-1.5 rounded bg-red-600 text-white font-semibold animate-pulse transition-all cursor-pointer flex items-center gap-1.5 shadow"
                title="Kaydı Sonlandır"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Kaydı Bitir</span>
              </button>
            )}

            {/* Download Link if recorded */}
            {recordedBlobUrl && (
              <a
                href={recordedBlobUrl}
                download="leo-urla-gaia-insaat-yapim-videosu.webm"
                className="text-xs px-3 py-1.5 rounded bg-[#27a644] text-white font-semibold transition-all flex items-center gap-1.5 shadow"
              >
                <Download size={13} />
                <span>İndir</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
