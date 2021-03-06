import { createRaycaster } from "raycaster/core/raycaster";
import { createAssetStore } from "raycaster/helpers/assetStore";
import Map from "raycaster/engine/Map";
import Player from "raycaster/engine/Player";
import Camera from "raycaster/engine/Camera";
import Game from "raycaster/engine/Game";
import Texture from "raycaster/engine/Texture"

import createFpsMeter from "raycaster/helpers/fpsMeter";
import FpsLabel from "raycaster/helpers/FpsLabel";

import SampleLevel from "./level";
import mapGrid from "./map";

export default function main(renderer, raf, keyListener) {

    function setup() {
        const createCollisionDetector = map => (x, y) => map.at(x, y) > 0;

        const map = Map.fromGrid(10, 10, mapGrid);
        const collisionDetector = createCollisionDetector(map);
        const level = new SampleLevel(map, renderer, assetStore);
        const player = new Player({ x: 4.5, y: 4.5 }, collisionDetector);
        const raycaster = createRaycaster(collisionDetector);
        const fpsMeter = createFpsMeter();
        const fpsLabel = new FpsLabel(renderer);
        const camera = new Camera({ width: 400, height: 250 });

        setInterval(() => fpsLabel.update(fpsMeter.fps), 500);

        attachKeyHandler(player);

        return function gameLoop(frameTime) {
            keyListener.notify(frameTime);
            camera.setOrientation(player.position);
            renderer.clear();
            camera.render(raycaster, level);
            fpsMeter.update(frameTime);
            fpsLabel.render();
        };
    }

    function attachKeyHandler(player) {
        const createPositionUpdater = (speed, update) => frameTime => update(speed * frameTime / 1000);

        keyListener
            .onKeyLeft(createPositionUpdater(150, speed => player.rotateLeft(speed)))
            .onKeyRight(createPositionUpdater(150, speed => player.rotateRight(speed)))
            .onKeyUp(createPositionUpdater(4, speed => player.moveForward(speed)))
            .onKeyDown(createPositionUpdater(4, speed => player.moveBackward(speed)));
    }

    const assetStore = createAssetStore();
    const assetLoader = file => () => Texture.load(`../assets/${file}`);
    const assets = [
        { key: "GRASS", loader: assetLoader("grass.jpg") },
        { key: "STONE", loader: assetLoader("stone.jpg") },
        { key: "SKY",   loader: assetLoader("red-sky.jpg") }
    ];

    assetStore
        .load(assets)
        .then(() => {
            const game = new Game(raf);
            game.loop(setup());
            game.start();
        });
}


