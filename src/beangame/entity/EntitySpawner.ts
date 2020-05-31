import {IsometricEntityManager} from "../../engine/entity/IsometricEntityManager";
import {HamsterFactory} from "../factory/HamsterFactory";
import {IsometricBoard} from "../../engine/board/IsometricBoard";
import {TileClickManager} from "../tile/TileClickManager";
import {ClientNetworkManager} from "../../engine/network/ClientNetworkManager";

export class EntitySpawner {

  constructor(private board: IsometricBoard,
              private entityManager: IsometricEntityManager,
              private tileClickManager: TileClickManager,
              private hamsterFactory: HamsterFactory) {}

  spawnHamsterPlayable(id: string, networkManager: ClientNetworkManager) {
    const startingTile = this.board.getTile({x: 0, y: 0});
    const spawnedHamster = this.hamsterFactory.buildHamsterPlayable(id, this.board, startingTile, networkManager);
    this.entityManager.register(spawnedHamster);
    this.tileClickManager.registerHamsterBehaviour(spawnedHamster);
  }

  spawnHamsterNonPlayable(id: string) {
    const startingTile = this.board.getTile({x: 0, y: 0});
    const spawnedHamster = this.hamsterFactory.buildHamsterNonPlayable(id, this.board, startingTile);
    this.entityManager.register(spawnedHamster);
  }

}
