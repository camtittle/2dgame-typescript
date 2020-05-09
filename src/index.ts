import {BeanGameFactory} from "./beangame/BeanGameFactory";
import {ImageLoader} from "./engine/graphics/ImageLoader";
import {ImageProvider} from "./engine/graphics/ImageProvider";

// Create a game and start it
const canvasElementId = 'gameCanvas';

const imageProvider = new ImageProvider();
const imageLoader = new ImageLoader(imageProvider);
const game = new BeanGameFactory().create(canvasElementId, imageProvider);

game.boot(imageLoader);
