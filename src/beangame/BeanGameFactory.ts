import {BeanGame} from "./BeanGame";
import {EntityManager} from "../engine/entity/EntityManager";
import {CanvasManager} from "../engine/CanvasManager";
import {ClickManager} from "../engine/mouse/ClickManager";
import {ImageProvider} from "../engine/graphics/ImageProvider";
import {DrawableManager} from "../engine/DrawableManager";
import {EntitySpawner} from "./EntitySpawner";
import {PersonFactory} from "./factory/PersonFactory";
import {BoardBuilder} from "../engine/board/BoardBuilder";

export class BeanGameFactory {

  // Responsible for newing up dependencies for the Game
  public create(canvasElementId: string, imageProvider: ImageProvider): BeanGame {

    const canvas = <HTMLCanvasElement>document.getElementById(canvasElementId);
    const canvasManager = new CanvasManager(canvas);

    const entityManager = new EntityManager();

    const personFactory = new PersonFactory(imageProvider, entityManager, canvasManager);
    const entitySpawner = new EntitySpawner(entityManager, personFactory);
    const drawableManager = new DrawableManager();
    const clickManager = new ClickManager(canvasManager, entityManager);
    const boardBuilder = new BoardBuilder(imageProvider);

    return new BeanGame(entityManager, drawableManager, canvasManager, clickManager,
                          entitySpawner, boardBuilder);
  }

}
