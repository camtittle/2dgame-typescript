import {IsometricEntityManager} from "../../engine/entity/IsometricEntityManager";
import {ImageProvider} from "../../engine/graphics/ImageProvider";
import {IsometricBoard} from "../../engine/board/IsometricBoard";
import {Tile} from "../../engine/board/Tile";
import {Wheel} from "../entity/Wheel";
import {PlainEntity} from "../entity/PlainEntity";
import {DrawableManager} from "../../engine/DrawableManager";

export class CageSpawner {

  constructor (private entityManager: IsometricEntityManager,
               private drawableManager: DrawableManager,
               private imageProvider: ImageProvider) {
  }

  spawnWheel(board: IsometricBoard, tile: Tile) {
    const wheel = new Wheel(board, this.entityManager, this.drawableManager);
    wheel.setOriginTile(tile);
    wheel.setupResources(this.imageProvider);
    return wheel;
  }

  spawnFoodBowl(board: IsometricBoard, tile: Tile) {
    const bowl = new PlainEntity(board, this.entityManager, this.drawableManager);
    bowl.setOriginTile(tile);
    bowl.setupResources(this.imageProvider);
    return bowl;
  }

}
