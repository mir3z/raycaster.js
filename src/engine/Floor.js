import Color from "./Color";

export class Floor {
    constructor(renderer, renderingStrategy) {
        this.renderer = renderer;
        this.renderingStrategy = renderingStrategy;
        
        this.buffer = this.renderer.createBuffer();
    }

    setRenderingStrategy(strategy) {
        this.renderingStrategy = strategy;
        return this;
    }

    render(vscan, hscan, floorProjection) {
        this.renderingStrategy.render(this.buffer, vscan, hscan, floorProjection);
        return this;
    }

    flush() {
        this.renderer.flushBuffer(this.buffer);
        this.buffer = this.renderer.createBuffer();
    }
}

export class FloorRenderingStrategy {
    render(buffer, vscan, hscan, floorProjection) {
        // empty
    }
}

export class SolidFloorRenderingStrategy extends FloorRenderingStrategy {
    constructor(color, shader) {
        super();
        this.color = color;
        this.shader = shader;
    }

    render(buffer, vscan, hscan, floorProjection) {
        const shading = this.shader(floorProjection);
        putPixel(buffer, vscan, ~~hscan, applyShading(this.color, shading));
    }
}

export class TexturedFloorRenderingStrategy extends FloorRenderingStrategy {
    constructor(texture, shader) {
        super();
        this.texture = texture;
        this.shader = shader;
    }

    render(buffer, vscan, hscan, floorProjection) {
        const { floor: { x, y } } = floorProjection;
        const textureX = (x * this.texture.width) % this.texture.width;
        const textureY = (y * this.texture.height) % this.texture.height;

        const color = Color.fromRGB(this.texture.at(~~textureX, ~~textureY));
        const shading = this.shader(floorProjection);

        putPixel(buffer, vscan, ~~hscan, applyShading(color, shading));
    }
}

function applyShading(color, shadingValue) {
    return color.multiply(shadingValue);
}

function putPixel(buffer, x, y, color) {
    buffer.putPixel({ x, y }, color);
    return buffer;
}