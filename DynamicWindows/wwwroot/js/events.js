export const Stack = [];

export const EventType = {
    undefined: 0,
    windowClose: 1
}

class EventMetaData {
    _type;
    _canvasId; // who send event

    constructor(type, canvasId) {
        this._type = type;
        this._canvasId = canvasId;
    }
}

