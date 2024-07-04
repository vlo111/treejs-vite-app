import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const useThreeCamera = () => {
    const camera = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));

    useEffect(() => {
        return () => {
            // Clean up camera resources
        };
    }, []);

    return camera.current;
};

export default useThreeCamera;
