const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const KEY_DOWN = 40;

export default function createKeyListener(el) {
    const keyListeners = {};
    const keyState = {};

    const createKeyStateUpdater = state => event => {
        const keyCode = event.keyCode;

        if (keyCode in keyListeners) {
            event.preventDefault();
            event.stopPropagation();
            keyState[keyCode] = state;
        }
    };

    const createNotifier = (...params) => keyCode => {
        if (keyState[keyCode]) {
            keyListeners[keyCode].notify(...params);
        }
    };

    return {
        init() {
            el.addEventListener("keydown", createKeyStateUpdater(true), false);
            el.addEventListener("keyup", createKeyStateUpdater(false), false);

            return this;
        },

        notify(...params) {
            const notify = createNotifier(...params);
            Object.keys(keyState).forEach(notify);
        },

        register(keyCode, handler) {
            keyListeners[keyCode] = keyListeners[keyCode] || createObservable();
            keyListeners[keyCode].register(handler);
            return this;
        },

        onKeyLeft(handler) {
            return this.register(KEY_LEFT, handler);
        },

        onKeyRight(handler) {
            return this.register(KEY_RIGHT, handler);
        },

        onKeyUp(handler) {
            return this.register(KEY_UP, handler);
        },

        onKeyDown(handler) {
            return this.register(KEY_DOWN, handler);
        }
    };
}

function createObservable() {
    const handlers = [];

    return {
        register(fn) {
            handlers.push(fn);
        },

        notify(...args) {
            handlers.forEach(handler => handler(...args));
        }
    };
}
