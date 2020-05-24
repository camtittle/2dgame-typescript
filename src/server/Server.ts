import {Websocket} from "./websocket/Websocket";
import {BeanGame} from "../beangame/BeanGame";

const ws = new Websocket();
console.log(ws);

console.log('Booting Bean Game server');
const game = new BeanGame(true);
game.boot().then(() => {
  console.log('Game server running...');
});
