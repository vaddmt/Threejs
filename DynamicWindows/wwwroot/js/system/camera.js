import * as THREE from 'three';

class Camera {
    _camera;

    constructor(canvas) {
        this._near = 0;
        this._far = 1000;

        this._camera = new THREE.OrthographicCamera();
        this.onResize();

        this._camera.position.x = 0;
        this._camera.position.y = 0;
        this._camera.position.z = 0;
    }

    onResize(width, height) {
        const left = -width / 2;
        const right = -left;
        const top = height / 2;
        const bottom = -top;

        this._camera.left = left;
        this._camera.right = right;
        this._camera.top = top;
        this._camera.bottom = bottom;
    }

    dispose() {
        // this._camera.dispose(); // not a function
    }
}

export { Camera }