import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const useAmbientLight = (color: number, intensity: number) => {
    const light = useRef<THREE.AmbientLight>();

    useEffect(() => {
        light.current = new THREE.AmbientLight(color, intensity);
        return () => {
            if (light.current) {
                light.current.dispose();
            }
        };
    }, [color, intensity]);

    return light.current;
};

export default useAmbientLight;
