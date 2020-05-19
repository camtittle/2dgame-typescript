import {resourceId} from "../ImageSources";
import {TileBoundIsometricEntity} from "../../engine/entity/TileBoundIsometricEntity";
import {OrientationSupport} from "../../engine/entity/Orientation";

export class Hamster extends TileBoundIsometricEntity {

  resourceId = resourceId.Hamster;

  protected init() {
    super.init();
    this.setZIndex(3);
    this.setTileFootprint(1, 1, 1);
    this.setOrientationSupport(OrientationSupport.EightWay);
  }

}
