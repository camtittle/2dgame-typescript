import {ImageSourceMap} from "../engine/graphics/ImageResource";
import {GameEnvironment} from "../engine/GameEnvironment";
import {resourceId} from "./ImageSources";

export class ImageSourcesProvider {

  public getImageSources(): ImageSourceMap<resourceId> {
    if (GameEnvironment.SERVER) {
      return null;
    }
    return require('./ImageSources').getImageSources();
  }

}
