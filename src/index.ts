import {BeanGame} from "./beangame/BeanGame";

const canvasElementId = 'gameCanvas';
const game = new BeanGame(canvasElementId);
game.boot();
