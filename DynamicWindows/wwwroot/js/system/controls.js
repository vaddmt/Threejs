import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

class Controls {
    _controls;

    constructor(camera, renderer) {
        this._controls = new OrbitControls(camera._camera, renderer._renderer.domElement);
        this._controls.enablePan = true;
        this._controls.enableZoom = true;
    }

    dispose() {
        this._controls.dispose();
    }
}

export { Controls }