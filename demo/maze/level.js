import { Wall, TexturedWallRenderingStrategy } from "raycaster/engine/Wall";
import { Floor, TexturedFloorRenderingStrategy } from "raycaster/engine/Floor";
import { Sky, TexturedSkyRenderingStrategy } from "raycaster/engine/Sky";
import Level from "raycaster/engine/Level";

export default class SampleLevel extends Level {
    setup(assetStore, renderer) {
        const wallShader = ({ projection }) => {
            const sideShading = projection.wall.horizontal ? 1 : 0.6;
            return Math.min(1 / projection.wall.distance * 70, 1) * sideShading;
        };

        const floorShader = ({ floor: { distance } }) => {
            return 1 / distance * 0.7;
        };

        this.stoneWall = new TexturedWallRenderingStrategy(assetStore.provide("STONE"), wallShader);
        this.grassFloor = new TexturedFloorRenderingStrategy(assetStore.provide("GRASS"), floorShader);

        this.setSky(new Sky(renderer, new TexturedSkyRenderingStrategy(assetStore.provide("SKY"))));
        this.setWall(new Wall(renderer));
        this.setFloor(new Floor(renderer));
    }

    reconcileWall({ wall: { x, y } }) {
        return this.stoneWall;
    }

    reconcileFloor({ floor: { x, y } }) {
        return this.grassFloor;
    }
}