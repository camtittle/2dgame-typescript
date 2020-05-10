import {ImageProvider} from "../../engine/graphics/ImageProvider";
import {Hamster} from "../entity/Hamster";
import {Tile} from "../../engine/board/Tile";
import {Board} from "../../engine/board/Board";
import {EntityManager} from "../../engine/entity/EntityManager";

export class HamsterSpawner {

  public constructor(private entityManager: EntityManager, private imageProvider: ImageProvider) {
  }

  public spawnHamster(board: Board, startingTile: Tile): Hamster {
    const hamster = new Hamster(this.entityManager);
    hamster.setBoard(board);
    hamster.setTile(startingTile);
    hamster.setupImages(this.imageProvider);
    this.entityManager.register(hamster);
    return hamster;
  }

}
