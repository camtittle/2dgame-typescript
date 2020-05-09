import {ImageProvider} from "../../engine/graphics/ImageProvider";
import {Hamster} from "../entity/Hamster";
import {Tile} from "../../engine/board/Tile";
import {Board} from "../../engine/board/Board";

export class HamsterFactory {

  public constructor(private readonly imageProvider: ImageProvider) {
  }

  public createHamster(board: Board, startingTile: Tile): Hamster {
    const hamster = new Hamster(board, startingTile);
    hamster.setupImages(this.imageProvider);
    return hamster;
  }

}
