import {resId} from "../ImageSources";
import {TileBoundEntity} from "../../engine/entity/TileBoundEntity";
import {Tile} from "../../engine/board/Tile";

export class Hamster extends TileBoundEntity {

  imageIds = [resId.Hamster];

  constructor(startingTile: Tile) {
    super();
    this.setTile(startingTile);
  }

  update(progress: number) {
    // this.x += this.velocity * progress;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
  }

}
