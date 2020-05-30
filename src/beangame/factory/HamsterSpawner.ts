import {ImageProvider} from "../../engine/graphics/ImageProvider";
import {Hamster} from "../entity/Hamster";
import {Tile} from "../../engine/board/Tile";
import {IsometricBoard} from "../../engine/board/IsometricBoard";
import {DrawableManager} from "../../engine/DrawableManager";
import {ClientNetworkManager} from "../../engine/network/ClientNetworkManager";

export class HamsterSpawner {

  public constructor(private drawableManager: DrawableManager, private imageProvider: ImageProvider) {
  }

  public spawnHamsterPlayable(id: string, board: IsometricBoard, startingTile: Tile, networkManager: ClientNetworkManager): Hamster {
    const hamster = new Hamster(board, this.drawableManager, id);
    hamster.setNetworkManager(networkManager);
    hamster.setOriginTile(startingTile);
    hamster.setupResources(this.imageProvider);
    return hamster;
  }

}
