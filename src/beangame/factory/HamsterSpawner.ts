import {ImageProvider} from "../../engine/graphics/ImageProvider";
import {Hamster} from "../entity/Hamster";
import {Tile} from "../../engine/board/Tile";
import {IsometricBoard} from "../../engine/board/IsometricBoard";
import {IsometricEntityManager} from "../../engine/entity/IsometricEntityManager";

export class HamsterSpawner {

  public constructor(private entityManager: IsometricEntityManager, private imageProvider: ImageProvider) {
  }

  public spawnHamster(board: IsometricBoard, startingTile: Tile): Hamster {
    const hamster = new Hamster(board, this.entityManager);
    hamster.setOriginTile(startingTile);
    hamster.setupResources(this.imageProvider);
    this.entityManager.register(hamster);
    return hamster;
  }

}
