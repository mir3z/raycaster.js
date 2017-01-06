import { BLOCK_SIZE } from "../core/math";

export class Wall {
    constructor(renderer, renderingStrategy) {
        this.renderer = renderer;
        this.renderingStrategy = renderingStrategy;

        this.layer = this.renderer.createLayer();
    }
    
    setRenderingStrategy(strategy) {
        this.renderingStrategy = strategy;
        return this;
    }

    render(vscan, projection) {
        this.renderingStrategy.render(this.layer, vscan, projection);
        return this;
    }
    
    flush({ width, height }) {
        const dimension = { x: 0, y: 0, width, height };
        this.renderer.composeLayer(this.layer, dimension, dimension);

        this.layer.clear();
    }
}

export class WallRenderingStrategy {
    constructor(shader) {
        this.shader = shader;
    }

    render(layer, vscan, projection) {
        // empty
    }
}

export class TexturedWallRenderingStrategy extends WallRenderingStrategy {
    constructor(texture, shader) {
        super(shader);
        this.texture = texture;
    }

    render(layer, vscan, projection) {
        const { wall } = projection;
        const wallX = wall.horizontal
            ? wall.y * BLOCK_SIZE % BLOCK_SIZE
            : wall.x * BLOCK_SIZE % BLOCK_SIZE;
        const spacing = 1;

        let textureX = this.texture.width / BLOCK_SIZE * wallX;

        textureX = Math.min(textureX, this.texture.width - spacing);
        textureX = Math.max(textureX - spacing, 0);

        layer.drawImage(
            this.texture.image,
            { x: textureX, y: 0, width: spacing, height: this.texture.height },
            { x: vscan, y: wall.top, width: spacing, height: wall.height }
        );

        layer.perform(r => {
            r.color("#000");
            r.alpha(1 - this.shader({ projection }));
            r.rect({
                x: vscan,
                y: wall.top - 0.5,
                width: spacing,
                height: wall.height + 0.5
            });
        });
    }
}

export class SolidWallRenderingStrategy extends WallRenderingStrategy {
    constructor(color, shader) {
        super(shader);
        this.color = color;
    }

    render(layer, vscan, projection, spacing = 1) {
        const { wall } = projection;

        layer.perform(r => {
            r.color(this.color);
            r.rect({
                x: vscan,
                y: wall.top,
                width: spacing,
                height: wall.height
            });
        });

        layer.perform(r => {
            r.color("#000");
            r.alpha(1 - this.shader({ projection }));
            r.rect({
                x: vscan,
                y: wall.top - 0.5,
                width: spacing,
                height: wall.height + 0.5
            });
        });
    }
}
