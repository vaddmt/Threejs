import { Canvas } from './canvas.js';
import * as Event from './events.js';

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
    const json = JSON.stringify(Event.EventMetaData);
    Event.clear();
    return json;
}

export { createCanvas, readCanvasEvent }