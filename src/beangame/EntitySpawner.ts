import {EntityManager} from "../engine/entity/EntityManager";
import {HamsterFactory} from "./factory/HamsterFactory";
import {Tile} from "../engine/board/Tile";
import {Hamster} from "./entity/Hamster";

export class EntitySpawner {

  public constructor(private readonly entityManager: EntityManager,
                     private readonly hamsterFactory: HamsterFactory) {
  }

  public spawnHamsterOntoTile(startingTile: Tile): Hamster {
    const hamster = this.hamsterFactory.createHamster(startingTile);
    this.entityManager.register(hamster);
    return hamster;
  }

}
