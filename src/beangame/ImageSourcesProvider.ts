import {ImageSourceMap} from "../engine/graphics/ImageResource";
import {imageSources, resourceId} from "./ImageSources";

export class ImageSourcesProvider {

  public getImageSources(): ImageSourceMap<resourceId> {
    return imageSources;
  }

}
