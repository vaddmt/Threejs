import * as THREE from 'three';
import * as UTILS from '../utilities.js';

class Mesh {
    _indices;
    _vertices;

    _threejsGroup;
    _threejsGroupMesh;
    _threejsGroupVertices;
    constructor(mesh) {
        this._indices = mesh.indices;
        this._vertices = mesh.vertices;

        this._threejsGroup = new THREE.Group();
        this._threejsGroupMesh = new THREE.Group();
        this._threejsGroupVertices = new THREE.Group();

        // construction threejs mesh object
        const verticesFloatArray = new Float32Array(this._vertices);
        const indicesUintArray = new Uint32Array(this._indices);
        const geometryMesh = new THREE.BufferGeometry();
        geometryMesh.setAttribute('position', new THREE.BufferAttribute(verticesFloatArray, 3));
        geometryMesh.setIndex(new THREE.BufferAttribute(indicesUintArray, 1));
        const materialMesh = new THREE.MeshBasicMaterial({ color: UTILS.COLORS.mesh });
        const materialWire = new THREE.MeshBasicMaterial({ color: UTILS.COLORS.wireframe, wireframe: true });
        const threejsMesh = new THREE.Mesh(geometryMesh, materialMesh);
        const threejsWire = new THREE.Mesh(geometryMesh, materialWire);
        this._threejsGroupMesh.add(threejsMesh);
        this._threejsGroupMesh.add(threejsWire);

        // construction threejs vertices objects
        const geometryVertex = new THREE.SphereGeometry(10, 4, 4);
        const materialVertex = new THREE.MeshBasicMaterial({ color: UTILS.COLORS.vertex });
        for (let i = 0; i < this._vertices.length; i += 3) {
            const threejsVertex = new THREE.Mesh(geometryVertex, materialVertex);
            threejsVertex.position.set(
                this._vertices[i + 0],
                this._vertices[i + 1],
                this._vertices[i + 2]
            );
            this._threejsGroupVertices.add(threejsVertex);
        }

        this._threejsGroup.add(this._threejsGroupMesh);
        this._threejsGroup.add(this._threejsGroupVertices);
    }

    dispose() {
        this._threejsGroupMesh.children.forEach(mesh => {
            mesh.geometry.dispose();
            mesh.material.dispose();
        });

        this._threejsGroupVertices.children.forEach(mesh => {
            mesh.geometry.dispose();
            mesh.material.dispose();
        });

        this._threejsGroup.clear();
        this._threejsGroupMesh.clear();
        this._threejsGroupVertices.clear();
    }
}

export { Mesh }