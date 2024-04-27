import { EventMetaData, EventType } from './events.js';

class Canvas {
    _id;
    _window;
    _canvas;
    _topbar;
    _header;
    _resize;
    _buttonClose;
    _wrapper;

    _onTopbarMouseDownEvent;
    _onTopbarMouseMoveEvent;
    _onTopbarMouseUpEvent;
    _onResizeMouseDownEvent;
    _onResizeMouseMoveEvent;
    _onResizeMouseUpEvent;
    _onWrapperMouseLeaveEvent;
    _onCloseClickEvent;

    _isWindowDrag;
    _isWindowResize;
    _windowX;
    _windowY;

    constructor(id) {
        this._id = id;
        this.initCanvas();
        this.initEvents();

        this.listenersAdd();
    }

    initCanvas() {
        this._window = document.createElement('div');
        this._window.id = 'window_' + this._id;
        this._window.className = 'window'
        this._canvas = document.createElement('canvas');
        this._canvas.id = 'canvas_' + this._id;
        this._canvas.className = 'windowCanvas';
        this._topbar = document.createElement('div');
        this._topbar.id = 'topbar_' + this._id;
        this._topbar.className = 'windowTopbar';
        this._header = document.createElement('div');
        this._header.id = 'header_' + this._id;
        this._header.className = 'windowHeader';
        this._header.innerHTML = this._canvas.id;
        this._resize = document.createElement('div');
        this._resize.id = 'resize_' + this._id;
        this._resize.className = 'windowResize';
        this._buttonClose = document.createElement('button');
        this._buttonClose.id = 'button_close_' + this._id;
        this._buttonClose.className = 'windowButton';

        this._window.appendChild(this._topbar);
        this._window.appendChild(this._canvas);
        this._window.appendChild(this._header);
        this._window.appendChild(this._resize);
        this._window.appendChild(this._buttonClose);

        this._wrapper = document.getElementById('mainWrapper');
        this._wrapper.appendChild(this._window);
    }

    initEvents() {
        this._onTopbarMouseDownEvent = this.onTopbarMouseDown.bind(this);
        this._onTopbarMouseMoveEvent = this.onTopbarMouseMove.bind(this);
        this._onTopbarMouseUpEvent = this.onTopbarMouseUp.bind(this); 

        this._onResizeMouseDownEvent = this.onResizeMouseDown.bind(this);
        this._onResizeMouseMoveEvent = this.onResizeMouseMove.bind(this);
        this._onResizeMouseUpEvent = this.onResizeMouseUp.bind(this);

        this._onWrapperMouseLeaveEvent = this.onWrapperMouseLeave.bind(this);
        this._onCloseClickEvent = this.onCloseClick.bind(this);
    }

    listenersAdd() {
        this._topbar.addEventListener('mousedown', this._onTopbarMouseDownEvent);
        this._wrapper.addEventListener('mousemove', this._onTopbarMouseMoveEvent);
        this._wrapper.addEventListener('mouseup', this._onTopbarMouseUpEvent);

        this._resize.addEventListener('mousedown', this._onResizeMouseDownEvent);
        this._wrapper.addEventListener('mousemove', this._onResizeMouseMoveEvent);
        this._wrapper.addEventListener('mouseup', this._onResizeMouseUpEvent);

        this._wrapper.addEventListener('mouseleave', this._onWrapperMouseLeaveEvent);
        this._buttonClose.addEventListener('click', this._onCloseClickEvent);
    }

    listenersRemove() {
        this._topbar.removeEventListener('mousedown', this._onTopbarMouseDownEvent);
        this._wrapper.removeEventListener('mousemove', this._onTopbarMouseMoveEvent);
        this._wrapper.removeEventListener('mouseup', this._onTopbarMouseUpEvent);

        this._resize.removeEventListener('mousedown', this._onResizeMouseDownEvent);
        this._wrapper.removeEventListener('mousemove', this._onResizeMouseMoveEvent);
        this._wrapper.removeEventListener('mouseup', this._onResizeMouseUpEvent);

        this._wrapper.removeEventListener('mouseleave', this._onWrapperMouseLeaveEvent);
        this._buttonClose.removeEventListener('click', this._onCloseClickEvent);
    }

    onTopbarMouseDown(event) {
        this._isWindowDrag = true;
        this._windowX = event.offsetX;
        this._windowY = event.offsetY;
    }

    onTopbarMouseMove(event) {
        if (this._isWindowDrag) {
            const posX = event.clientX - this._windowX;
            const posY = event.clientY - this._windowY;
            this._window.style.left = posX + 'px';
            this._window.style.top = posY + 'px';
        }
    }

    onTopbarMouseUp(event) {
        this._isWindowDrag = false;
    }

    onResizeMouseDown(event) {
        this._isWindowResize = true;
        this._windowX = event.offsetX;
        this._windowY = event.offsetY;
    }

    onResizeMouseMove(event) {
        if (this._isWindowResize) {
            const boundingRect = this._window.getBoundingClientRect();
            const width = event.clientX - this._windowX - boundingRect.left;
            const height = event.clientY - this._windowY - boundingRect.top;
            this._window.style.width = width + 'px';
            this._window.style.height = height + 'px';
        }
    }

    onResizeMouseUp(event) {
        this._isWindowResize = false;
    }

    onWrapperMouseLeave(event) {
        this._isWindowDrag = false;
        this._isWindowResize = false;
    }

    onCloseClick(event) {
        this.dispose();

        EventMetaData.eventType = EventType.windowClose;
        EventMetaData.canvasId = this._id;
        this._wrapper.dispatchEvent(new Event('change'));
    }

    dispose() {
        this.listenersRemove();

        this._wrapper.removeChild(this._window);
    }
}

export { Canvas }