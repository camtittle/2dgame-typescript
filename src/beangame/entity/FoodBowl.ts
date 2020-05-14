import {TileBoundIsometricEntity} from "../../engine/entity/TileBoundIsometricEntity";
import {resId} from "../ImageSources";

export class FoodBowl extends TileBoundIsometricEntity {
  protected imageIds = [resId.FoodBowl];

  // private footprint: TileFootprint = {
  //   width: 2,
  //   height: 2,
  //   depth: 3
  // };

  protected init() {
    super.init();
    this.setTileFootprint(2, 2, 3);
  }

}
