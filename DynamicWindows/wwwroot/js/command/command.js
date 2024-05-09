import * as UTILS from '../utilities.js';
import { population } from '../common/population.js';
import { scene } from '../common/scene.js';
import { Mesh } from '../system/mesh.js';

class Load {
    _mesh;
    _populationIndex = undefined;
    constructor(mesh) {
        this._mesh = mesh; // indices, vertices
    }

    do() {
        const mesh = new Mesh(this._mesh);
        this._populationIndex = population.add(mesh);
        scene._scene.add(mesh._threejsGroup);
    }

    undo() {
        const mesh = population._meshes[this._populationIndex];
        scene._scene.remove(mesh._threejsGroup);
        population.removeAt(this._populationIndex);
    }
}

export {
    Load
}