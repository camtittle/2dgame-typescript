import {IsometricEntityManager} from "../../engine/entity/IsometricEntityManager";
import {HamsterFactory} from "../factory/HamsterFactory";
import {IsometricBoard} from "../../engine/board/IsometricBoard";
import {TileClickManager} from "../tile/TileClickManager";
import {ClientNetworkManager} from "../../engine/network/ClientNetworkManager";
import {DrawableManager} from "../../engine/DrawableManager";
import {Position} from "../../engine/interface/Position";
import {Hamster} from "./Hamster";

export class EntitySpawner {

  constructor(private board: IsometricBoard,
              private entityManager: IsometricEntityManager,
              private drawableManager: DrawableManager,
              private tileClickManager: TileClickManager,
              private hamsterFactory: HamsterFactory) {}

  spawnHamsterPlayable(id: string, username: string, networkManager: ClientNetworkManager): Hamster {
    const startingTile = this.board.getTile({x: 1, y: 1});
    const spawnedHamster = this.hamsterFactory.buildHamsterPlayable(id, this.board, startingTile, networkManager);
    spawnedHamster.setUsername(username);
    this.entityManager.register(spawnedHamster);
    this.tileClickManager.registerHamsterBehaviour(spawnedHamster);
    return spawnedHamster;
  }

  spawnHamsterNonPlayable(id: string, username: string, coords: Position): Hamster {
    const startingTile = this.board.getTile(coords);
    const spawnedHamster = this.hamsterFactory.buildHamsterNonPlayable(id, this.board, startingTile);
    spawnedHamster.setUsername(username);
    this.entityManager.register(spawnedHamster);
    return spawnedHamster;
  }

  despawnEntity(id: string) {
    const entity = this.entityManager.getEntityWithId(id);
    if (!entity) throw new Error("Could not despawn entity. Entity not found with ID " + id);

    this.entityManager.deregister(id);
    this.drawableManager.deregisterDrawable(entity);
  }

}
