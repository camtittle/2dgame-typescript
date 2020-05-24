import {TileBoundIsometricEntity} from "../../engine/entity/TileBoundIsometricEntity";
import {OrientationSupport} from "../../engine/entity/Orientation";
import {resourceId} from "../ResourceIds";

export class Hamster extends TileBoundIsometricEntity {

  resourceId = resourceId.Hamster;

  protected init() {
    super.init();
    this.setZIndex(0.3);
    this.setTileFootprint(1, 1, 1);
    this.setOrientationSupport(OrientationSupport.EightWay);
  }

}
