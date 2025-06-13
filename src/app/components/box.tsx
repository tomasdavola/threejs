'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';

export default function PlanksBlock() {
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

        const loader = new THREE.TextureLoader();
        const planksTexture = loader.load("/textures/wood_planks.jpg")
        const onTexture = loader.load("/textures/on_lamp.webp")
        const offTexture = loader.load("/textures/off_lamp.webp")
        planksTexture.magFilter = THREE.NearestFilter;
        onTexture.magFilter = THREE.NearestFilter;
        offTexture.magFilter = THREE.NearestFilter;

        const block = new THREE.BoxGeometry(2,2,2);

        const planksMaterial = new THREE.MeshBasicMaterial({ map: planksTexture });
        const onMaterial = new THREE.MeshBasicMaterial({ map: onTexture });
        const offMaterial = new THREE.MeshBasicMaterial({ map: offTexture });
        const plank = new THREE.Mesh(block, planksMaterial);
        const lantern = new THREE.Mesh(block, offMaterial);
        lantern.position.y = 2
        scene.add(plank, lantern);

        const lanternOptions = {
            isOn: false,

        };
        function turnOn() {
            lanternOptions.isOn = !lanternOptions.isOn;
            lantern.material = lanternOptions.isOn ? onMaterial : offMaterial;
            lanternController.name(lanternOptions.isOn ?'Turn Lantern Off' : 'Turn Lantern On')
        }

        const gui = new GUI();
        const lanternController = gui.add({ turnOn }, 'turnOn').name('Turn Lantern On');



            const animate = () => {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            };

            animate();
    }, []);




    return <canvas ref={canvasRef} className="webgl" />;
}
