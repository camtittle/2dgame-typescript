import {resId} from "../ImageSources";
import {Tile} from "../../engine/board/Tile";
import {Position} from "../../engine/interface/Position";

export class GrassTile extends Tile {

  protected imageIds: number[] = [resId.Grass];

  constructor(coords: Position) {
    super(coords);
  }

}
