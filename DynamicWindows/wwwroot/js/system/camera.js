import * as THREE from 'three';

class Camera {
    _camera;
    _frustumSize;

    constructor(canvas) {
        this._near = 0.1;
        this._far = 10000;
        this._frustumSize = 1000;

        this._camera = new THREE.OrthographicCamera();
        this.onResize(canvas.width, canvas.height);

        this._camera.position.x = 0;
        this._camera.position.y = 0;
        this._camera.position.z = 0;
    }

    onResize(width, height) {
        const aspect = width / height;

        const left = -aspect * this._frustumSize / 2;
        const right = -left;
        const top = this._frustumSize / 2;
        const bottom = -top;

        this._camera.left = left;
        this._camera.right = right;
        this._camera.top = top;
        this._camera.bottom = bottom;

        this._camera.updateProjectionMatrix();
    }

    dispose() {
        // this._camera.dispose(); // not a function
    }
}

export { Camera }