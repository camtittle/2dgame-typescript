import {TileBoundIsometricEntity} from "../../engine/entity/TileBoundIsometricEntity";
import {resId} from "../ImageSources";

export class Wheel extends TileBoundIsometricEntity {
  protected imageIds = [resId.Wheel, resId.WheelLarge, resId.WheelLargeRhs];

  protected init() {
    super.init();
    this.setType('normal');
  }



  setType(type: 'normal' | 'large' | 'large-rhs') {
    if (type === 'large') {
      this.currentImageId = resId.WheelLarge;
      this.setTileFootprint(3, 1,5);
    } else if (type === 'normal') {
      this.currentImageId = resId.Wheel;
      this.setTileFootprint(2, 1, 3);
    } else if (type === 'large-rhs') {
      this.setTileFootprint(4, 6, 10);
      this.currentImageId = resId.WheelLargeRhs;
    }
  }

}
