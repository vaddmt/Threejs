import * as THREE from 'three';
import { scene } from '../common/scene.js';

class Renderer {
    _camera;
    _renderer;

    constructor(canvas, camera) {
        this._camera = camera._camera;
        this._renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true
        });
        this._renderer.shadowMap.enabled = true;
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.sortObjects = true;
        this.onResize(canvas.width, canvas.height);
    }

    render() {
        this._renderer.render(scene._scene, this._camera);
    }

    onResize(width, height) {
        this._renderer.setSize(width, height);
    }

    dispose() {
        this._renderer.dispose();
    }
}

export { Renderer }