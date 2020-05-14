import {resId} from "../ImageSources";
import {TileBoundIsometricEntity} from "../../engine/entity/TileBoundIsometricEntity";

export class Hamster extends TileBoundIsometricEntity {

  imageIds = [resId.Hamster];

  protected init() {
    super.init();
    this.setZIndex(3);
    this.setTileFootprint(1, 1, 1);
  }

}
