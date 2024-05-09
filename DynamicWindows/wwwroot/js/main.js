import { Canvas } from './canvas.js';
import * as EVENT from './events.js';
import { commandManager } from './command/command_manager.js';
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

function create(parameters) {
    return new Promise((resolve, reject) => {
        try {
            resolve(new Canvas(parameters));
        } catch (error) {
            reject(error);
        }
    });
}

function command(parameters) {
    commandManager.execute(parameters);
}

function readEvent() {
    const json = JSON.stringify(EVENT.Stack.pop());
    return json;
}

export { load, create, command, readEvent }