import CanvasRenderer from "raycaster/engine/CanvasRenderer";
import createKeyListener from "raycaster/helpers/browserKeyListener";
import Raf from "raycaster/helpers/Raf";
import main from "./main";

const canvas = document.querySelector("#screen");
const renderer = new CanvasRenderer(canvas);
const keyListener = createKeyListener(window).init();
const raf = new Raf();

main(renderer, raf, keyListener);
