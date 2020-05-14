import {IsometricEntityManager} from "../../engine/entity/IsometricEntityManager";
import {ImageProvider} from "../../engine/graphics/ImageProvider";
import {IsometricBoard} from "../../engine/board/IsometricBoard";
import {Tile} from "../../engine/board/Tile";
import {Wheel} from "../entity/Wheel";
import {FoodBowl} from "../entity/FoodBowl";

export class CageSpawner {

  constructor (private entityManager: IsometricEntityManager, private imageProvider: ImageProvider) {
  }

  spawnWheel(board: IsometricBoard, tile: Tile) {
    const wheel = new Wheel(board, this.entityManager);
    wheel.setTile(tile);
    wheel.setupImages(this.imageProvider);
    this.entityManager.register(wheel);
    return wheel;
  }

  spawnFoodBowl(board: IsometricBoard, tile: Tile) {
    const bowl = new FoodBowl(board, this.entityManager);
    bowl.setTile(tile);
    bowl.setupImages(this.imageProvider);
    this.entityManager.register(bowl);
    return bowl;
  }

}
