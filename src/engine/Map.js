import { trunc } from "../core/math";

class Map {
    constructor({ width, height }) {
        this.width = width;
        this.height = height;
        this.grid = new Uint8Array(this.width * this.height);
    }

    at(x, y) {
        return this.grid[trunc(x) + this.width * trunc(y)];
    }
    
    static fromGrid(width, height, grid) {
        if (width * height !== grid.length) {
            throw "Invalid map";
        }

        const map = new Map({ width, height });
        map.grid = Uint8Array.from(grid);

        return map;
    }
}

export default Map;