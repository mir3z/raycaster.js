import { CIRCLE } from "../core/math";

export class Sky {
    constructor(renderer, renderingStrategy) {
        this.renderer = renderer;
        this.renderingStrategy = renderingStrategy;
        this.layer = this.renderer.createLayer();
    }

    setRenderingStrategy(strategy) {
        this.renderingStrategy = strategy;
        return this;
    }
    
    render(params) {
        const { viewport } = params;
        this.viewport = viewport;
        this.renderingStrategy.render(this.layer, params);
        return this;
    }
    
    flush({ width, height }) {
        const dimension = { x: 0, y: 0, width, height };
        this.renderer.composeLayer(this.layer, dimension, dimension);
        this.layer.clear();
    }
}

export class SkyRenderingStrategy {
    render(layer, params) { 
        // empty
    }
}

export class SolidSkyRenderingStrategy extends SkyRenderingStrategy {
    constructor(color) {
        super();
        this.color = color;
    }

    render(layer, { viewport: { width, height } }) {
        layer.color(this.color);
        layer.rect({ x: 0, y: 0, width, height });
    }
}

export class TexturedSkyRenderingStrategy extends SkyRenderingStrategy {
    constructor(texture) {
        super();
        this.texture = texture;
    }

    drawTextureTo(layer, target) {
        layer.drawImage(
            this.texture.image,
            { x: 0, y: 0, width: this.texture.width, height: this.texture.height },
            target
        );
    }
    
    render(layer, { direction, viewport }) {
        const ratio = viewport.height / this.texture.height;
        const width = this.texture.width * ratio;
        const height = this.texture.height * ratio;
        const left = width * direction / CIRCLE;

        this.drawTextureTo(layer, { x: left, y: 0, width, height });

        if (left > 0) {
            this.drawTextureTo(layer, { x: left - width, y: 0, width, height });
        }

        if (left + viewport.width < width) {
            this.drawTextureTo(layer, { x: left + width, y: 0, width, height });
        }
    }
}