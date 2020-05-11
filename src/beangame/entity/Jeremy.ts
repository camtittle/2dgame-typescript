import {TileBoundIsometricEntity} from "../../engine/entity/TileBoundIsometricEntity";
import {resId} from "../ImageSources";

export default class Jeremy extends TileBoundIsometricEntity {

  protected _height: number = 300;
  protected _width: number = 300;

  protected currentImageId = resId.Grass;
  imageIds = [resId.Grass];

  // constructor() {
  //   super();
  // }


}
