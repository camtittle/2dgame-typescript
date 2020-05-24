import {ImageProvider} from "./ImageProvider";
import {ImageMap} from "./ImageResource";

export class ServerImageProvider extends ImageProvider {

  public getImagesByResourceId(id: string): ImageMap | HTMLImageElement {
    return null;
  }

}
