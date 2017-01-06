export default class FpsLabel {
    constructor(renderer) {
        this.renderer = renderer;
        this.layer = this.renderer.createLayer();
        this.fps = null;
    }

    update(fps) {
        this.fps = fps;
    }

    toString() {
        return `${ (this.fps || 0).toFixed(1) } FPS`;
    }

    render({ color = "white", font = "14px monospace", x = 5, y = 15 } = {}) {
        if (!this.fps) {
            return;
        }

        this.layer.perform(r => {
            r.clear();
            r.color(color);
            r.text({ x, y, text: this.toString(), font });
        });

        this.renderer.composeLayer(this.layer);
    }
}
