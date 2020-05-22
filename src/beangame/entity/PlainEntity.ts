import {TileBoundIsometricEntity} from "../../engine/entity/TileBoundIsometricEntity";

export class PlainEntity extends TileBoundIsometricEntity {

  protected init() {
    super.init();
    this.setZIndex(0.1);
  }

}
