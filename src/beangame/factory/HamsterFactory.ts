import {ImageProvider} from "../../engine/graphics/ImageProvider";
import {Hamster} from "../entity/Hamster";
import {Tile} from "../../engine/board/Tile";

export class HamsterFactory {

  public constructor(private readonly imageProvider: ImageProvider) {
  }

  public createHamster(startingTile: Tile): Hamster {
    const hamster = new Hamster(startingTile);
    hamster.setupImages(this.imageProvider);
    return hamster;
  }

}
