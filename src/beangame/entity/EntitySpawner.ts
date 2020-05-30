import {IsometricEntityManager} from "../../engine/entity/IsometricEntityManager";
import {HamsterSpawner} from "../factory/HamsterSpawner";
import {IsometricBoard} from "../../engine/board/IsometricBoard";
import {TileClickManager} from "../tile/TileClickManager";
import {Orientation} from "../../engine/entity/Orientation";

export class EntitySpawner {

  constructor(private board: IsometricBoard,
              private entityManager: IsometricEntityManager,
              private tileClickManager: TileClickManager,
              private hamsterSpawner: HamsterSpawner) {}

  spawnHamsterPlayable(id: string) {
    const startingTile = this.board.getTile({x: 0, y: 0});
    const spawnedHamster = this.hamsterSpawner.spawnHamster(id, this.board, startingTile);
    spawnedHamster.setOrientation(Orientation.WEST);
    this.entityManager.register(spawnedHamster);
    this.tileClickManager.registerHamsterBehaviour(spawnedHamster);
  }

}
