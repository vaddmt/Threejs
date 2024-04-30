import { Canvas } from './canvas.js';
import * as EVENT from './events.js';
import { population } from './common/population.js';
import { scene } from './common/scene.js';

function load() {
    return new Promise((resolve, reject) => {
        try {
            population.initialize();
            scene.initialize();
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

function createCanvas(parameters) {
    return new Promise((resolve, reject) => {
        try {
            resolve(new Canvas(parameters));
        } catch (error) {
            reject(error);
        }
    });
}

function readCanvasEvent() {
    const json = JSON.stringify(EVENT.EventMetaData);
    EVENT.clear();
    return json;
}

export { load, createCanvas, readCanvasEvent }