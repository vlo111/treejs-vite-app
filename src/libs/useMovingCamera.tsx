import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Import OrbitControls from correct path

const useMovingCamera = () => {
    const camera = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
    const controls = useRef<OrbitControls>();

    useEffect(() => {
        camera.current.position.set(0, 5, 10); // Initial position
        controls.current = new OrbitControls(camera.current, document.body);
        controls.current.target.set(0, 0, 0); // Set camera target

        const animate = () => {
            if (controls.current) {
                controls.current.update(); // Update controls if defined
            }
        };

        // Add animate function to the render loop
        const renderLoop = () => {
            requestAnimationFrame(renderLoop);
            animate();
        };

        renderLoop();

        return () => {
            // Clean up resources
            if (controls.current) {
                controls.current.dispose();
            }
        };
    }, []);

    return camera.current;
};

export default useMovingCamera;
