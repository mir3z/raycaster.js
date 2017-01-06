import { Wall, SolidWallRenderingStrategy } from "raycaster/engine/Wall";
import { Floor, SolidFloorRenderingStrategy } from "raycaster/engine/Floor";
import { Sky, SolidSkyRenderingStrategy } from "raycaster/engine/Sky";
import Level from "raycaster/engine/Level";
import Color from "raycaster/engine/Color";

export default class SampleLevel extends Level {
    setup(assetStore, renderer) {
        const wallShader = ({ projection }) => projection.wall.horizontal ? 1 : 0.6;
        const floorShader = () => 1;

        this.floorDark = new SolidFloorRenderingStrategy(Color.fromHex("#51514f"), floorShader);
        this.floorLight = new SolidFloorRenderingStrategy(Color.fromHex("#595956"), floorShader);

        const redWall = new SolidWallRenderingStrategy(Color.fromHex("#ce1c16"), wallShader);
        const greenWall = new SolidWallRenderingStrategy(Color.fromHex("#2c7c21"), wallShader);
        const blueWall = new SolidWallRenderingStrategy(Color.fromHex("#264ca5"), wallShader);
        const yellowWall = new SolidWallRenderingStrategy(Color.fromHex("#e2dd31"), wallShader);
        const grayWall = new SolidWallRenderingStrategy(Color.fromHex("#d3d3c6"), wallShader);
        const sky = new SolidSkyRenderingStrategy(Color.fromHex("#add9f7"));

        this.registerMaterial(1, grayWall);
        this.registerMaterial(2, redWall);
        this.registerMaterial(3, greenWall);
        this.registerMaterial(4, blueWall);
        this.registerMaterial(5, yellowWall);

        this.setSky(new Sky(renderer, sky));
        this.setWall(new Wall(renderer));
        this.setFloor(new Floor(renderer));
    }

    reconcileWall({ wall: { x, y } }) {
        return this.getMaterial(this.map.at(x, y));
    }

    reconcileFloor({ floor: { x, y } }) {
        const _x = ~~x;
        const _y = ~~y;

        return _x % 2 === 0
            ? _y % 2 === 0 ? this.floorDark : this.floorLight
            : _y % 2 === 0 ? this.floorLight : this.floorDark;
    }
}