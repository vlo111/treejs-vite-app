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
                    const model = gltf.scene;
                    model.position.set(index * 5, 0, 0); // Position models differently
                    loadedModels.push(model);
                    if (loadedModels.length === 2) {
                        setModels(loadedModels);
                    }
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
                },
                (error) => {
                    console.error(`An error happened while loading ${path}`, error);
                }
            );
        });

        return () => {
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
