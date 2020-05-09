import {ImagesById} from "./ImageResource";

export class ImageProvider {

  private images: ImagesById;

  public constructor() {
  }

  public setImages(images: ImagesById) {
    this.images = images;
  }

  public getImagesByResourceId(ids: number[]): ImagesById {
    if (!this.images) {
      throw new Error("Cannot get images: No images set");
    }

    const resources: ImagesById = {};
    for (let id in this.images) {
      if (ids.includes(parseInt(id))) {
        resources[id] = this.images[id];
      }
    }
    return resources;
  }


}
