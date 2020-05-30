import {BeanGameServer} from "./BeanGameServer";


console.log('Booting Bean Game server');
const game = new BeanGameServer();
game.boot().then(() => {
  console.log('Game server running...');
});
