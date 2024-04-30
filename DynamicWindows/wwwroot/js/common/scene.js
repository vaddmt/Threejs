import * as THREE from 'three';
import * as UTILS from '../utilities.js';

class Scene {
    _scene; // threejs scene
    constructor() {
        
    }

    initialize() {
        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color(UTILS.COLORS.clear);
        this._scene.matrixWorldAutoUpdate = true;
        this.build();
    }

    build() {
        const geometry = new THREE.BoxGeometry(100, 100, 100);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.z = -1000;
        this._scene.add(mesh);
    }
}

const scene = new Scene();

export { scene }