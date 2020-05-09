import {resId} from "../ImageSources";
import {Tile} from "../../engine/board/Tile";

export class GrassTile extends Tile {

  protected imageIds: number[] = [resId.Grass];

  onMouseDown(x: number, y: number): void {
    super.onMouseDown(x, y);
  }

}
