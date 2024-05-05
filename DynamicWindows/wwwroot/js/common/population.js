import * as THREE from 'three';
import { Mesh } from '../system/mesh.js';

class Population {
    _meshes;
    constructor() {
        this._meshes = [];
    }

    initialize() {
        this.add(new Mesh({
            triangles: [
                2, 1, 0,
                0, 3, 2,
                4, 5, 6,
                6, 7, 4,
                2, 6, 1,
                1, 6, 5,
                3, 0, 4,
                4, 7, 3,
                1, 5, 0,
                0, 5, 4,
                2, 3, 7,
                7, 6, 2
            ],
            vertices: [
                +250, +250, +250,
                -250, +250, +250,
                -250, +250, -250,
                +250, +250, -250,
                +250, -250, +250,
                -250, -250, +250,
                -250, -250, -250,
                +250, -250, -250,
            ]
        }));
    }

    add(mesh) {
        this._meshes.push(mesh);
    }

    remove(mesh) {
        const index = this._meshes.indexOf(mesh);
        this._meshes.splice(index, 1);
        mesh.dispose();
    }
}

const population = new Population();

export { population }