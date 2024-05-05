import * as THREE from 'three';
import * as UTILS from '../utilities.js';
import { population } from './population.js';

class Scene {
    _scene; // threejs scene
    _light;
    constructor() {
        
    }

    initialize() {
        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color(UTILS.COLORS.clear);
        this._scene.matrixWorldAutoUpdate = true;

        this._light = new THREE.AmbientLight(UTILS.COLORS.ambient);

        this.build();
    }

    build() {
        this._scene.children = [];

        this._scene.add(this._light);
        
        population._meshes.forEach(mesh => {
            this._scene.add(mesh._threejsGroup);
        });
    }
}

const scene = new Scene();

export { scene }