import {resId} from "../ImageSources";
import {TileBoundEntity} from "../../engine/entity/TileBoundEntity";
import {Tile} from "../../engine/board/Tile";
import {Board} from "../../engine/board/Board";

export class Hamster extends TileBoundEntity {

  imageIds = [resId.Hamster];

  constructor(board: Board, startingTile: Tile) {
    super();
    this.setBoard(board);
    this.setTile(startingTile);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
  }

}
