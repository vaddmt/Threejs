import * as THREE from 'three';
import * as UTILS from '../utilities.js';

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
        this._scene.add(this._light);

        const geometry = new THREE.BoxGeometry(500, 500, 500);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const mesh = new THREE.Mesh(geometry, material);
        this._scene.add(mesh);
    }
}

const scene = new Scene();

export { scene }