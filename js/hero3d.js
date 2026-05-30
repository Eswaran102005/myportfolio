import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHero3D() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    // Scene & Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- MECHANICAL CORE SYSTEM ---
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Central Core
    const coreGeom = new THREE.IcosahedronGeometry(1.2, 2);
    const coreMat = new THREE.MeshStandardMaterial({
        color: 0x00d2ff,
        wireframe: true,
        emissive: 0x00d2ff,
        emissiveIntensity: 1,
        transparent: true,
        opacity: 0.8
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    coreGroup.add(coreMesh);

    // 2. Robotic Rings
    const rings = [];
    const ringConfig = [
        { radius: 1.8, tube: 0.04, color: 0x00f2fe, speed: 0.01, axis: 'x' },
        { radius: 2.2, tube: 0.04, color: 0x9d50bb, speed: -0.015, axis: 'y' },
        { radius: 2.6, tube: 0.04, color: 0x00d2ff, speed: 0.012, axis: 'z' }
    ];

    ringConfig.forEach(cfg => {
        const geom = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 100);
        const mat = new THREE.MeshStandardMaterial({
            color: cfg.color,
            emissive: cfg.color,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.6
        });
        const ring = new THREE.Mesh(geom, mat);
        ring.userData = cfg;
        coreGroup.add(ring);
        rings.push(ring);
    });

    // 3. Mechanical Bits (Small panels)
    const bitsGroup = new THREE.Group();
    coreGroup.add(bitsGroup);
    const bitCount = 20;
    const bits = [];

    for (let i = 0; i < bitCount; i++) {
        const geom = new THREE.BoxGeometry(0.1, 0.1, 0.3);
        const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x00d2ff, emissiveIntensity: 0.2 });
        const bit = new THREE.Mesh(geom, mat);
        
        const phi = Math.acos(-1 + (2 * i) / bitCount);
        const theta = Math.sqrt(bitCount * Math.PI) * phi;
        bit.position.setFromSphericalCoords(2.8, phi, theta);
        bit.lookAt(0, 0, 0);
        bitsGroup.add(bit);
        bits.push(bit);
    }

    // --- DEEP SPACE SYSTEM ---
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 5000;
    const posArray = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 50;
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starsMaterial = new THREE.PointsMaterial({ size: 0.005, color: 0xffffff, transparent: true, opacity: 0.5, sizeAttenuation: true });
    const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00d2ff, 3, 15);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // --- SCROLL DRIVEN TRANSITIONS ---
    const sections = ['#hero', '#about', '#skills', '#projects', '#contact'];
    
    // States: [radiusFactor, rotationSpeedFactor, glowIntensity]
    const states = [
        { scale: 1, intensity: 1, spread: 1 },    // Hero
        { scale: 1.5, intensity: 1.5, spread: 1.8 }, // About (Expand)
        { scale: 1.2, intensity: 3, spread: 1.4 },   // Skills (Concentrate Power)
        { scale: 1.8, intensity: 1, spread: 2.5 },   // Projects (Exploded view)
        { scale: 1, intensity: 4, spread: 1 }       // Contact (Stabilized Core)
    ];

    sections.forEach((id, index) => {
        ScrollTrigger.create({
            trigger: id,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => transitionCore(index),
            onEnterBack: () => transitionCore(index),
        });
    });

    function transitionCore(index) {
        const s = states[index];
        // Animate Core & Rings
        gsap.to(coreGroup.scale, { x: s.scale, y: s.scale, z: s.scale, duration: 1.2, ease: 'expo.out' });
        gsap.to(coreMat, { emissiveIntensity: s.intensity, duration: 1 });
        gsap.to(pointLight, { intensity: s.intensity * 2, duration: 1 });

        // Spread rings
        rings.forEach((ring, i) => {
            gsap.to(ring.scale, { x: 1 + index * 0.1, y: 1 + index * 0.1, duration: 1.2, ease: 'back.out(2)' });
        });

        // Bits dispersal
        bits.forEach((bit, i) => {
            const phi = Math.acos(-1 + (2 * i) / bitCount);
            const theta = Math.sqrt(bitCount * Math.PI) * phi;
            const dist = 2.8 * s.spread;
            gsap.to(bit.position, {
                x: dist * Math.sin(phi) * Math.cos(theta),
                y: dist * Math.sin(phi) * Math.sin(theta),
                z: dist * Math.cos(phi),
                duration: 1.5,
                ease: 'power3.out'
            });
        });
    }

    // Interactive Physics
    let targetX = 0, targetY = 0;
    window.addEventListener('mousemove', (e) => {
        targetX = (e.clientX - window.innerWidth / 2) * 0.0002;
        targetY = (e.clientY - window.innerHeight / 2) * 0.0002;
    });

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Manual rotations based on config
        rings.forEach(ring => {
            const cfg = ring.userData;
            ring.rotation[cfg.axis] += cfg.speed;
        });

        coreMesh.rotation.y += 0.005;
        coreMesh.rotation.z += 0.002;

        coreGroup.rotation.y += (targetX - coreGroup.rotation.y) * 0.05;
        coreGroup.rotation.x += (targetY - coreGroup.rotation.x) * 0.05;

        starsMesh.rotation.y += 0.0005;
        starsMesh.rotation.x += 0.0002;

        renderer.render(scene, camera);
    }
    animate();
}
