import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const useDirectionalLight = (color: number, intensity: number, position: THREE.Vector3) => {
    const light = useRef<THREE.DirectionalLight>();

    useEffect(() => {
        light.current = new THREE.DirectionalLight(color, intensity);
        light.current.position.copy(position);
        return () => {
            if (light.current) {
                light.current.dispose();
            }
        };
    }, [color, intensity, position]);

    return light.current;
};

export default useDirectionalLight;
