import {ImageProvider} from "../../engine/graphics/ImageProvider";
import {Hamster} from "../entity/Hamster";
import {Tile} from "../../engine/board/Tile";
import {IsometricBoard} from "../../engine/board/IsometricBoard";
import {DrawableManager} from "../../engine/DrawableManager";
import {ClientNetworkManager} from "../../engine/network/ClientNetworkManager";
import {Orientation} from "../../engine/entity/Orientation";

export class HamsterFactory {

  public constructor(private drawableManager: DrawableManager, private imageProvider: ImageProvider) {
  }

  public buildHamsterPlayable(id: string, board: IsometricBoard, startingTile: Tile, networkManager: ClientNetworkManager): Hamster {
    const hamster = this.buildHamster(id, board, startingTile);
    hamster.setPlayable(true);
    hamster.setNetworkManager(networkManager);
    return hamster;
  }

  public buildHamsterNonPlayable(id: string, board: IsometricBoard, startingTile: Tile): Hamster {
    return this.buildHamster(id, board, startingTile);
  }

  private buildHamster(id: string, board: IsometricBoard, startingTile: Tile): Hamster {
    const hamster = new Hamster(board, this.drawableManager, id);
    hamster.setOriginTile(startingTile);
    hamster.setupResources(this.imageProvider);
    hamster.setOrientation(Orientation.WEST);
    return hamster;
  }

}
