import {BeanGameClient} from "./BeanGameClient";

const canvasElementId = 'gameCanvas';
const game = new BeanGameClient(canvasElementId);
game.boot();
