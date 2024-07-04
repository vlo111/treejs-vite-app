import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const useAmbientLight = (color: number, intensity: number) => {
    const light = useRef<THREE.AmbientLight>(new THREE.AmbientLight(color, intensity));

    useEffect(() => {
        return () => {
            light.current.dispose();
        };
    }, [color, intensity]);

    return light.current;
};

export default useAmbientLight;
