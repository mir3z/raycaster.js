class Level {
    constructor(map, renderer, assetStore) {
        this.map = map;
        this.renderer = renderer;
        this.assetStore = assetStore;
        this.materials = {};

        this.wall = null;
        this.floor = null;
        this.sky = null;

        this.setup(this.assetStore, this.renderer);
    }

    setup() {
        // empty
    }
    
    setWall(wall) {
        this.wall = wall;
    }
    
    setFloor(floor) {
        this.floor = floor;
    }
    
    setSky(sky) {
        this.sky = sky;
    }

    getSky() {
        return this.sky;
    }

    getWall() {
        return this.wall;
    }

    getFloor() {
        return this.floor
    }
    
    registerMaterial(key, material) {
        this.materials[key] = material;
    }
    
    getMaterial(key) {
        return this.materials[key];
    }
    
    reconcileWall() {
        // empty
    }

    reconcileFloor() {
        // empty
    }
}

export default Level;