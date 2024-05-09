import * as THREE from 'three';
import { Mesh } from '../system/mesh.js';

class Population {
    _meshes;
    constructor() {
        this._meshes = [];
    }

    initialize() {

    }

    add(mesh) {
        const index = this._meshes.length;
        this._meshes.push(mesh);
        return index;
    }

    remove(mesh) {
        mesh.dispose();
        const index = this._meshes.indexOf(mesh);
        this._meshes.splice(index, 1);
    }

    removeAt(index) {
        if (index > 0 && index < this._meshes.length) {
            this._meshes[index].dispose();
            this._meshes.splice(index, 1);
        }
    }
}

const population = new Population();

export { population }