import { Canvas } from './canvas.js';
import * as Event from './events.js';

function createCanvas(id) {
    return new Promise((resolve, reject) => {
        try {
            resolve(new Canvas(id));
        } catch (error) {
            reject(error);
        }
    });
}

function readCanvasEvent() {
    const json = JSON.stringify(Event.EventMetaData);
    Event.clear();
    return json;
}

export { createCanvas, readCanvasEvent }