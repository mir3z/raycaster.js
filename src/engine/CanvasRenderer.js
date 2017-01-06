class CanvasRenderer {
    
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.msImageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
    }
    
    viewport() {
        const { width, height } = this.canvas;
        return { width, height };
    }
    
    color(color) {
        this.ctx.fillStyle = color;
    }

    text({ x, y, text, font }) {
        this.perform(() => {
            this.ctx.font = font;
            this.ctx.fillText(text, x, y);
        });
    }
    
    rect({ x, y, width, height}) {
        this.ctx.fillRect(x, y, width, height);
    }

    alpha(value) {
        this.ctx.globalAlpha = value;
    }
    
    drawImage(image, source, target) {
        this.ctx.drawImage(image, 
            source.x, source.y, source.width, source.height,
            target.x, target.y, target.width, target.height
        );
    }

    createBuffer() {
        const imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
        return new RenderingBuffer(imageData);
    }

    flushBuffer(buffer) {
        this.ctx.drawImage(buffer.flush(), 0, 0);
    }

    createLayer() {
        return new CanvasRenderer(createCanvas(this.canvas));
    }
    
    composeLayer(layer, source, target) {
        if (source && target) {
            this.ctx.drawImage(layer.canvas,
                source.x, source.y, source.width, source.height,
                target.x, target.y, target.width, target.height
            );
        } else if (source) {
            this.ctx.drawImage(layer.canvas,
                source.x, source.y, source.width, source.height,
            );
        } else {
            this.ctx.drawImage(layer.canvas, 0, 0);
        }
    }

    perform(fn) {
        this.ctx.save();
        fn(this);
        this.ctx.restore();
    }
    
    clear() {
        this.perform(() => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        });
    }
}

class RenderingBuffer {
    constructor(imageDate) {
        this.imageData = imageDate;
        const source = this.imageData.data.buffer;
        this.buffer8 = new Uint8ClampedArray(source, 0, source.byteLength);
        this.buffer32 = new Uint32Array(source);
    }

    putPixel({ x, y }, { r, g, b, a }) {
        this.buffer32[y * this.imageData.width + x] = (a << 24) | (b << 16) | (g << 8) | r;
    }

    flush() {
        this.imageData.data.set(this.buffer8);

        const bufferCanvas = createCanvas(this.imageData);
        bufferCanvas.getContext("2d").putImageData(this.imageData, 0, 0);

        return bufferCanvas;
    }
}

export const createCanvas = ({ width, height }) => {
    const newCanvas = document.createElement("canvas");

    newCanvas.width = width;
    newCanvas.height = height;

    return newCanvas;
};

export const readImageData = image => {
    const canvas = createCanvas(image);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(image, 0, 0);

    return ctx.getImageData(0, 0, image.width, image.height);
};

export default CanvasRenderer;