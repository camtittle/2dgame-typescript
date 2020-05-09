import {Entity} from "../../engine/entity/Entity";
import {resId} from "../ImageSources";

export default class Jeremy extends Entity {

  protected _height: number = 300;
  protected _width: number = 300;

  protected currentImageId = resId.Jeremy;
  imageIds = [resId.Jeremy];

  // constructor() {
  //   super();
  // }


}
