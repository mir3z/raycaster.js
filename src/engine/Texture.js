import { readImageData } from "./CanvasRenderer";

class Texture {

    constructor({ width, height, path } = {}) {
        this.width = width;
        this.height = height;
        this.path = path;
        this.image = new Image();
        this.imageData = null;
    }

    load() {
        const executor = (resolve, reject) => {
            this.image.onload = () => resolve(this);
            this.image.onerror = error => reject(error);

            this.image.crossOrigin = "Anonymous";
            this.image.src = this.path;
        };

        const fetchImageData = tex => {
            tex.imageData = readImageData(tex.image);
            tex.data32 = new Uint32Array(tex.imageData.data.buffer);
            return tex;
        };

        return new Promise(executor).then(fetchImageData);
    }

    at(x, y) {
        const pixel32 = this.data32[y * this.imageData.width + x];

        return {
            r: (pixel32 >> 0) & 0xff,
            g: (pixel32 >> 8) & 0xff,
            b: (pixel32 >> 16) & 0xff,
            a: (pixel32 >> 24) & 0xff
        };
    }

    static load(path) {
        const texture = new Texture({ path });
        return texture
            .load()
            .then(tex => {
                tex.width = tex.image.naturalWidth;
                tex.height = tex.image.naturalHeight;

                return tex;
            });
    }
}

export default Texture;