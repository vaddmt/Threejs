
export const EventType = {
    undefined: 0,
    windowClose: 1
}

export const EventMetaData = {
    eventType: EventType.undefined,
    canvasId: ''
}

export function clear() {
    EventMetaData.eventType = EventType.undefined
    EventMetaData.canvasId = '';
}

