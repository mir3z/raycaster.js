import { Wall, TexturedWallRenderingStrategy } from "raycaster/engine/Wall";
import { Floor, TexturedFloorRenderingStrategy } from "raycaster/engine/Floor";
import { Sky, TexturedSkyRenderingStrategy } from "raycaster/engine/Sky";
import Level from "raycaster/engine/Level";

export default class SampleLevel extends Level {
    setup(assetStore, renderer) {
        const wallShader = ({ projection }) => {
            const sideShading = projection.wall.horizontal ? 1 : 0.6;
            return Math.min(sideShading / projection.wall.distance * 150, 1);
        };

        const floorShader = ({ floor: { distance } }) => {
            return 1 / distance;
        };

        const brickWall = new TexturedWallRenderingStrategy(assetStore.provide("BRICK"), wallShader);
        const metalWall = new TexturedWallRenderingStrategy(assetStore.provide("METAL"), wallShader);

        const stoneFloor = new TexturedFloorRenderingStrategy(assetStore.provide("STONE"), floorShader);
        const tileFloor = new TexturedFloorRenderingStrategy(assetStore.provide("TILE"), floorShader);

        const sunsetSky = new TexturedSkyRenderingStrategy(assetStore.provide("SKY"));

        this.registerMaterial(0, stoneFloor);
        this.registerMaterial(1, tileFloor);
        this.registerMaterial(2, metalWall);
        this.registerMaterial(3, brickWall);

        this.setSky(new Sky(renderer, sunsetSky));
        this.setWall(new Wall(renderer));
        this.setFloor(new Floor(renderer));
    }

    reconcileWall({ wall: { x, y } }) {
        return this.getMaterial(this.map.at(x, y));
    }

    reconcileFloor({ floor: { x, y } }) {
        return this.getMaterial(this.map.at(x, y));
    }
}