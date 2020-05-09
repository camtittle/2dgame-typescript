import {ImagesById, ImageSources} from "./ImageResource";
import {ImageProvider} from "./ImageProvider";

export class ImageLoader {

  public constructor(private readonly imageProvider: ImageProvider) {
  }

  public async loadImagesIntoProvider(sources: ImageSources) {
    const images = await this.loadImages(sources);
    this.imageProvider.setImages(images);
  }

  // Load each image from list of sources.
  // Promise resolves once all images have loaded
  private async loadImages(sources: ImageSources): Promise<ImagesById> {

    const images: ImagesById = {};

    return new Promise<ImagesById>((resolve) => {

      let loadedCount = 0;
      const total = Object.keys(sources).length;
      const loadedFn = () => {
        loadedCount++;
        if (loadedCount === total) {
          console.log(images);
          resolve(images);
        }
      };

      for (let key in sources) {
        let img = new Image();
        img.onload = loadedFn.bind(this);
        img.src = sources[key].src;
        console.log(img.src);
        images[key] = img;
      }

    });
  }

}
