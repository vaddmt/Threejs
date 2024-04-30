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
    }
}

const scene = new Scene();

export { scene }