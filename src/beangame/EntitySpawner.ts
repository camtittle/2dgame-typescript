import {EntityManager} from "../engine/entity/EntityManager";
import {HamsterFactory} from "./factory/HamsterFactory";
import {Tile} from "../engine/board/Tile";
import {Hamster} from "./entity/Hamster";
import {Board} from "../engine/board/Board";

export class EntitySpawner {

  public constructor(private readonly entityManager: EntityManager,
                     private readonly hamsterFactory: HamsterFactory) {
  }

  public spawnHamsterOntoTile(board: Board, startingTile: Tile): Hamster {
    const hamster = this.hamsterFactory.createHamster(board, startingTile);
    this.entityManager.register(hamster);
    return hamster;
  }

}
