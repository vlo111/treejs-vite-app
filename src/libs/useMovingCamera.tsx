import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const useMovingCamera = () => {
    const camera = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
    const controls = useRef<OrbitControls>();

    useEffect(() => {
        camera.current.position.set(0, 5, 10);
        controls.current = new OrbitControls(camera.current, document.body);
        controls.current.target.set(0, 0, 0);

        const animate = () => {
            controls.current?.update(); // Ensure controls exist before updating
        };

        const renderLoop = () => {
            requestAnimationFrame(renderLoop);
            animate();
        };

        renderLoop();

        return () => {
            controls.current?.dispose(); // Dispose controls on unmount
        };
    }, []);

    return camera.current;
};

export default useMovingCamera;
