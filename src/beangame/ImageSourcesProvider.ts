import {ImageSources} from "../engine/graphics/ImageResource";
import {imageSources} from "./ImageSources";

export class ImageSourcesProvider {

  public getImageSources(): ImageSources {
    return imageSources;
  }

}
