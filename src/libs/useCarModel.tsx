// useCarModel.tsx
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const useCarModels = () => {
    const [models, setModels] = useState<THREE.Group[]>([]);

    useEffect(() => {
        const loader = new GLTFLoader();
        const loadedModels: THREE.Group[] = [];

        ['/models/gltf/scene.gltf', '/models/gltf/scene1.glb'].forEach((path, index) => {
            loader.load(
                path,
                (gltf) => {
                    console.log('GLTF loaded:', gltf);
                    const model = gltf.scene as THREE.Group;
                    model.position.set(index * 5, 0, 0); // Position the models differently
                    loadedModels.push(model);
                    if (loadedModels.length === 2) {
                        setModels(loadedModels);
                    }
                },
                undefined,
                (error) => {
                    console.error(`An error happened while loading ${path}`, error);
                }
            );
        });

        return () => {
            // Clean up models if needed
            loadedModels.forEach((model) => {
                model.traverse((object) => {
                    if (object instanceof THREE.Mesh) {
                        object.geometry.dispose();
                        object.material.dispose();
                    }
                });
            });
        };
    }, []);

    return models;
};

export default useCarModels;
