import {resourceId} from "../ImageSources";
import {TileBoundIsometricEntity} from "../../engine/entity/TileBoundIsometricEntity";

export class Hamster extends TileBoundIsometricEntity {

  resourceIds = [resourceId.Hamster];

  protected init() {
    super.init();
    this.setZIndex(3);
    this.setTileFootprint(1, 1, 1);
  }

}
