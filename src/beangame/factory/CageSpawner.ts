import {IsometricEntityManager} from "../../engine/entity/IsometricEntityManager";
import {ImageProvider} from "../../engine/graphics/ImageProvider";
import {IsometricBoard} from "../../engine/board/IsometricBoard";
import {Tile} from "../../engine/board/Tile";
import {Wheel} from "../entity/Wheel";
import {PlainEntity} from "../entity/PlainEntity";

export class CageSpawner {

  constructor (private entityManager: IsometricEntityManager, private imageProvider: ImageProvider) {
  }

  spawnWheel(board: IsometricBoard, tile: Tile) {
    const wheel = new Wheel(board, this.entityManager);
    wheel.setOriginTile(tile);
    wheel.setupResources(this.imageProvider);
    this.entityManager.register(wheel);
    return wheel;
  }

  spawnFoodBowl(board: IsometricBoard, tile: Tile) {
    const bowl = new PlainEntity(board, this.entityManager);
    bowl.setOriginTile(tile);
    bowl.setupResources(this.imageProvider);
    this.entityManager.register(bowl);
    return bowl;
  }

}
