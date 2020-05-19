import {ImageMap} from "./ImageResource";

export class ImageProvider {

  private images: ImageMap;

  public constructor() {
  }

  public setImages(images: ImageMap) {
    this.images = images;
  }

  public getImagesByResourceId(id: string): ImageMap | HTMLImageElement {
    if (!this.images) {
      throw new Error("Cannot get resources: No resources set");
    }

    const resources = this.images[id];
    if (!resources) {
      console.warn("ImageProvider: Resource ID requested do not correspond to any loaded resources.", id);
    }
    return resources;
  }


}
