import {TileBoundIsometricEntity} from "../../engine/entity/TileBoundIsometricEntity";
import {resourceId} from "../ImageSources";

export class Wheel extends TileBoundIsometricEntity {
  // TODO fix wheel resources
  protected resourceId = resourceId.Wheel;

  protected init() {
    super.init();
    this.setType('normal');
  }

  setType(type: 'normal' | 'large' | 'large-rhs') {
    // if (type === 'large') {
    //   this.currentImage = this.getImageResource(resourceId.WheelLarge);
    //   this.setTileFootprint(3, 1,5);
    // } else if (type === 'normal') {
    //   this.currentImage = this.getImageResource(resourceId.Wheel);
    //   this.setTileFootprint(2, 1, 3);
    // } else if (type === 'large-rhs') {
    //   this.setTileFootprint(4, 6, 10);
    //   this.currentImage = this.getImageResource(resourceId.WheelLargeRhs);
    // }
  }

}
