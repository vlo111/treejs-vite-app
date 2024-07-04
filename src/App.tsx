import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import useThreeScene from './libs/useThreeScene';
import useAmbientLight from './libs/useAmbientLight';
import useDirectionalLight from './libs/useDirectionalLight';
import useMovingCamera from './libs/useMovingCamera';
import useCarModels from './libs/useCarModels';

const App: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scene = useThreeScene();
    const ambientLight = useAmbientLight(0xffffff, 0.5);
    const directionalLight = useDirectionalLight(0xffffff, 0.5, new THREE.Vector3(0, 10, 10));
    const camera = useMovingCamera();
    const models = useCarModels();

    useEffect(() => {
        if (!containerRef.current || models.length === 0 || !ambientLight || !directionalLight || !camera) return;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xffffff); // Set background color to white
        containerRef.current.appendChild(renderer.domElement);

        const gridHelper = new THREE.GridHelper(100, 100);
        scene.add(gridHelper);

        scene.add(ambientLight);
        scene.add(directionalLight);
        models.forEach(model => scene.add(model));

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            renderer.dispose();
            scene.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose();
                    object.material.dispose();
                }
            });
            // Optionally clean up camera resources if needed
            // Example: camera.dispose();
        };
    }, [models, ambientLight, directionalLight, camera]);

    return <div ref={containerRef} />;
};

export default App;
