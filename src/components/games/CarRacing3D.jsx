import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

export default function CarRacing3D() {
  const mountRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const gameRef = useRef(null);

  const cleanupGame = useCallback(() => {
    const g = gameRef.current;
    if (!g) return;
    if (g.animId) cancelAnimationFrame(g.animId);
    if (g.renderer) {
      g.renderer.dispose();
      g.renderer.forceContextLoss();
    }
    if (g.scene) {
      g.scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
    }
    gameRef.current = null;
  }, []);

  const initGame = useCallback(() => {
    cleanupGame();
    const mount = mountRef.current;
    if (!mount) return;

    const width = Math.min(500, mount.clientWidth);
    const height = Math.min(600, width * 1.2);

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x1a1a2e, 30, 80);
    scene.background = new THREE.Color(0x1a1a2e);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 200);
    camera.position.set(0, 6, 12);
    camera.lookAt(0, 0, -5);

    // Renderer (uses GPU via WebGL)
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.borderRadius = '8px';
    renderer.domElement.style.maxWidth = '100%';

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404060, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(5, 15, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(1024, 1024);
    scene.add(dirLight);

    const headlight1 = new THREE.PointLight(0xffee88, 3, 15);
    headlight1.position.set(-0.3, 0.5, -2);
    scene.add(headlight1);
    const headlight2 = new THREE.PointLight(0xffee88, 3, 15);
    headlight2.position.set(0.3, 0.5, -2);
    scene.add(headlight2);

    // Road
    const roadGeo = new THREE.PlaneGeometry(10, 300);
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x333344, roughness: 0.8 });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.z = -130;
    road.receiveShadow = true;
    scene.add(road);

    // Road lines
    for (let i = 0; i < 50; i++) {
      const lineGeo = new THREE.PlaneGeometry(0.15, 2);
      const lineMat = new THREE.MeshStandardMaterial({ color: 0xffff88, emissive: 0x444400 });
      const line = new THREE.Mesh(lineGeo, lineMat);
      line.rotation.x = -Math.PI / 2;
      line.position.set(0, 0.01, -i * 6);
      scene.add(line);
    }

    // Lane markers
    for (let i = 0; i < 50; i++) {
      for (const lx of [-1.8, 1.8]) {
        const lineGeo = new THREE.PlaneGeometry(0.08, 2);
        const lineMat = new THREE.MeshStandardMaterial({ color: 0x666688 });
        const line = new THREE.Mesh(lineGeo, lineMat);
        line.rotation.x = -Math.PI / 2;
        line.position.set(lx, 0.01, -i * 6);
        scene.add(line);
      }
    }

    // Roadside barriers
    for (let side of [-4.5, 4.5]) {
      for (let i = 0; i < 100; i++) {
        const postGeo = new THREE.BoxGeometry(0.15, 0.6, 0.15);
        const postMat = new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0xff4444 : 0xffffff,
          emissive: i % 2 === 0 ? 0x440000 : 0x111111,
        });
        const post = new THREE.Mesh(postGeo, postMat);
        post.position.set(side, 0.3, -i * 3);
        post.castShadow = true;
        scene.add(post);
      }
    }

    // Player car
    const carGroup = new THREE.Group();
    // Body
    const bodyGeo = new THREE.BoxGeometry(1.4, 0.5, 2.8);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x3498db, metalness: 0.6, roughness: 0.3 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.4;
    body.castShadow = true;
    carGroup.add(body);
    // Cabin
    const cabinGeo = new THREE.BoxGeometry(1.1, 0.45, 1.4);
    const cabinMat = new THREE.MeshStandardMaterial({ color: 0x85c1e9, metalness: 0.8, roughness: 0.1, transparent: true, opacity: 0.7 });
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.y = 0.85;
    cabin.position.z = 0.1;
    carGroup.add(cabin);
    // Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.15, 12);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.9 });
    const wheelPositions = [[-0.7, 0.25, -0.9], [0.7, 0.25, -0.9], [-0.7, 0.25, 0.9], [0.7, 0.25, 0.9]];
    wheelPositions.forEach(([x, y, z]) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(x, y, z);
      carGroup.add(wheel);
    });
    // Headlights
    const hlGeo = new THREE.SphereGeometry(0.1, 8, 8);
    const hlMat = new THREE.MeshStandardMaterial({ color: 0xffff88, emissive: 0xffee44, emissiveIntensity: 2 });
    const hl1 = new THREE.Mesh(hlGeo, hlMat);
    hl1.position.set(-0.45, 0.4, -1.45);
    carGroup.add(hl1);
    const hl2 = new THREE.Mesh(hlGeo, hlMat);
    hl2.position.set(0.45, 0.4, -1.45);
    carGroup.add(hl2);
    // Tail lights
    const tlMat = new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 1 });
    const tl1 = new THREE.Mesh(hlGeo, tlMat);
    tl1.position.set(-0.5, 0.4, 1.4);
    carGroup.add(tl1);
    const tl2 = new THREE.Mesh(hlGeo, tlMat);
    tl2.position.set(0.5, 0.4, 1.4);
    carGroup.add(tl2);

    carGroup.position.set(0, 0, 5);
    scene.add(carGroup);

    // Obstacle cars
    const obstacles = [];
    const obstacleColors = [0xe74c3c, 0x2ecc71, 0xf39c12, 0x9b59b6, 0x1abc9c];
    const createObstacle = (z) => {
      const group = new THREE.Group();
      const color = obstacleColors[Math.floor(Math.random() * obstacleColors.length)];
      const lane = (Math.floor(Math.random() * 3) - 1) * 2.2;

      const oBody = new THREE.Mesh(
        new THREE.BoxGeometry(1.3, 0.5, 2.4),
        new THREE.MeshStandardMaterial({ color, metalness: 0.5, roughness: 0.4 })
      );
      oBody.position.y = 0.4;
      oBody.castShadow = true;
      group.add(oBody);

      const oCabin = new THREE.Mesh(
        new THREE.BoxGeometry(1.0, 0.4, 1.2),
        new THREE.MeshStandardMaterial({ color: 0x888899, metalness: 0.8, roughness: 0.2 })
      );
      oCabin.position.y = 0.8;
      group.add(oCabin);

      // Tail lights
      const otl1 = new THREE.Mesh(hlGeo, tlMat.clone());
      otl1.position.set(-0.45, 0.4, 1.25);
      group.add(otl1);
      const otl2 = new THREE.Mesh(hlGeo, tlMat.clone());
      otl2.position.set(0.45, 0.4, 1.25);
      group.add(otl2);

      group.position.set(lane, 0, z);
      scene.add(group);
      obstacles.push(group);
    };

    for (let i = 0; i < 5; i++) {
      createObstacle(-20 - i * 25);
    }

    // Game state
    const state = {
      running: true,
      speed: 0.3,
      carX: 0,
      targetX: 0,
      score: 0,
      keys: {},
      animId: null,
    };

    gameRef.current = { scene, camera, renderer, state, carGroup, obstacles, headlight1, headlight2 };

    // Game loop
    const animate = () => {
      const s = state;
      if (!s.running) return;

      // Input
      if (s.keys['ArrowLeft'] || s.keys['a']) s.targetX = Math.max(s.targetX - 0.15, -3.5);
      if (s.keys['ArrowRight'] || s.keys['d']) s.targetX = Math.min(s.targetX + 0.15, 3.5);

      // Smooth car movement
      s.carX += (s.targetX - s.carX) * 0.12;
      carGroup.position.x = s.carX;
      // Tilt car on turn
      carGroup.rotation.z = (s.targetX - s.carX) * -0.2;

      // Update headlights
      headlight1.position.set(s.carX - 0.3, 0.5, carGroup.position.z - 3);
      headlight2.position.set(s.carX + 0.3, 0.5, carGroup.position.z - 3);

      // Move obstacles toward player
      s.speed = Math.min(0.3 + s.score * 0.002, 0.8);
      for (const obs of obstacles) {
        obs.position.z += s.speed;
        if (obs.position.z > 15) {
          obs.position.z = -80 - Math.random() * 30;
          obs.position.x = (Math.floor(Math.random() * 3) - 1) * 2.2;
          s.score++;
          setScore(s.score);
        }

        // Collision detection
        const dx = Math.abs(carGroup.position.x - obs.position.x);
        const dz = Math.abs(carGroup.position.z - obs.position.z);
        if (dx < 1.2 && dz < 2.2) {
          s.running = false;
          setGameOver(true);
          return;
        }
      }

      // Camera follow
      camera.position.x = s.carX * 0.3;

      renderer.render(scene, camera);
      s.animId = requestAnimationFrame(animate);
    };

    const s = state;
    s.animId = requestAnimationFrame(animate);

    setScore(0);
    setGameOver(false);
    setStarted(true);

    return () => {
      if (s.animId) cancelAnimationFrame(s.animId);
    };
  }, [cleanupGame]);

  useEffect(() => {
    const cleanup = initGame();
    const keyDown = (e) => {
      if (gameRef.current?.state) gameRef.current.state.keys[e.key] = true;
    };
    const keyUp = (e) => {
      if (gameRef.current?.state) gameRef.current.state.keys[e.key] = false;
    };
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    return () => {
      if (cleanup) cleanup();
      cleanupGame();
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
    };
  }, [initGame, cleanupGame]);

  const restart = () => {
    initGame();
  };

  return (
    <div className="game-container" style={{ textAlign: 'center' }}>
      <div className="game-score-display">
        <span>Score: {score}</span>
        <span className="game-gpu-badge">🔥 WebGL GPU</span>
      </div>
      <div ref={mountRef} style={{ display: 'inline-block', borderRadius: '8px', overflow: 'hidden' }} />
      {gameOver && (
        <div className="game-overlay">
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>Crashed!</p>
          <p style={{ color: '#64ffda' }}>Score: {score}</p>
          <button onClick={restart} className="game-restart-btn">Race Again</button>
        </div>
      )}
      <p className="game-controls-hint">← → or A/D to steer</p>
    </div>
  );
}
