export default class Raf {
    constructor(fn) {
        this.register(fn);
    }

    register(fn) {
        this.frame = fn;
    }

    request() {
        this.frame && window.requestAnimationFrame(this.frame);
    }

    cancel() {
        this.frame && window.cancelAnimationFrame(this.frame)
    }
}
