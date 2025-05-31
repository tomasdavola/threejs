// SpinningText.js

'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


export default function SpinningText() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        if (!canvasRef.current) return;
        const scene = new THREE.Scene();
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        const camera = new THREE.PerspectiveCamera(75,  sizes.width / sizes.height);
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current
        })
        renderer.setSize(sizes.width, sizes.height)

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.update();

        const loader = new FontLoader();

        loader.load( '/fonts/helvetiker_regular.typeface.json', function ( font ) {

            const geometry = new TextGeometry('Whatsup jaden', {
                font: font,
                size: 5,
                depth: 0.5,
            });
            const material = new THREE.MeshBasicMaterial({ color: 0xff0051 });
            geometry.center()
            const textMesh = new THREE.Mesh(geometry, material);
            scene.add(textMesh);

            const animate = () => {
                requestAnimationFrame(animate);
                textMesh.rotation.y += 0.01;
                textMesh.rotation.x += 0.15;

                controls.update();
                renderer.render(scene, camera);
            };

            animate();
        })
    }, []);




    return <canvas ref={canvasRef} className="webgl" />;
}
