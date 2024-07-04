// App.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import useThreeScene from './libs/useThreeScene';
import useAmbientLight from './libs/useAmbientLight';
import useDirectionalLight from './libs/useDirectionalLight';
import useMovingCamera from './libs/useMovingCamera';
import useCarModels from "./libs/useCarModel.tsx";

const App: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const models = useCarModels();
    const scene = useThreeScene();
    const camera = useMovingCamera();
    const ambientLight = useAmbientLight(0xffffff, 0.5); // White ambient light
    const directionalLight = useDirectionalLight(0xffffff, 0.5, new THREE.Vector3(0, 10, 10)); // White directional light

    useEffect(() => {
        if (!containerRef.current || models.length === 0 || !ambientLight || !directionalLight || !camera) return;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xffffff); // Set background color to white
        containerRef.current.appendChild(renderer.domElement);

        scene.add(ambientLight);
        scene.add(directionalLight);
        models.forEach(model => scene.add(model));

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            // Clean up Three.js resources
            renderer.dispose();
            scene.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose();
                    object.material.dispose();
                }
            });
            // Clean up camera resources if needed
            // Example: camera.dispose();
        };
    }, [models, ambientLight, directionalLight, camera]); // Include camera in the dependency array

    return <div ref={containerRef} />;
};

export default App;
