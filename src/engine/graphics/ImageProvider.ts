import {ImageMap} from "./ImageResource";

export class ImageProvider {

  private images: ImageMap;

  public constructor() {
  }

  public setImages(images: ImageMap) {
    this.images = images;
  }

  public getImagesByResourceId(ids: string[]): ImageMap {
    if (!this.images) {
      throw new Error("Cannot get resources: No resources set");
    }

    const resources: ImageMap = {};
    for (let id in this.images) {
      if (ids.includes(id)) {
        resources[id] = this.images[id];
      }
    }
    if (Object.keys(resources).length < ids.length) {
      console.warn("ImageProvider: Resource IDs requested do not correspond to any loaded resources.", ids);
    }
    return resources;
  }


}
