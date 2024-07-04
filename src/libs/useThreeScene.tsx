import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const useThreeScene = () => {
    const scene = useRef<THREE.Scene>(new THREE.Scene());

    useEffect(() => {
        return () => {
            scene.current.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose();
                    object.material.dispose();
                }
            });
        };
    }, []);

    return scene.current;
};

export default useThreeScene;
