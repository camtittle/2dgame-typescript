import {ImageMap, ImageSourceMap} from "./ImageResource";
import {ImageProvider} from "./ImageProvider";

export class ImageLoader {

  public constructor(private readonly imageProvider: ImageProvider) {
  }

  public async loadImagesIntoProvider<T extends string>(sources: ImageSourceMap<T>) {
    const images = await this.loadImages(sources);
    this.imageProvider.setImages(images);
  }

  // Load each image from list of sources.
  // Promise resolves once all resources have loaded
  private async loadImages<T extends string>(sources: ImageSourceMap<T>): Promise<ImageMap> {

    let images: ImageMap = {};

    return new Promise<ImageMap>((resolve) => {

      let loadedCount = 0;
      const total = this.getTotalSourceCount(sources);

      const loadedFn = () => {
        loadedCount++;
        if (loadedCount === total) {
          resolve(images);
        }
      };

      const loadSourcesFn = (sources: ImageSourceMap<T>, images: ImageMap) => {
        for (let key in sources) {
          if (sources.hasOwnProperty(key)) {
            if (this.hasSubTree(sources[key])) {
              images[key] = {};
              loadSourcesFn(sources[key] as ImageSourceMap<any>, images[key] as ImageMap);
            } else {
              let img = new Image();
              img.onload = loadedFn.bind(this);
              img.src = sources[key] as string;
              images[key] = img;
            }
          }
        }
      };

      loadSourcesFn(sources, images);

    });
  }

  private getTotalSourceCount(sources: ImageSourceMap<any>): number {
    let total = 0;
    for (let key in sources) {
      if (sources.hasOwnProperty(key)) {
        const subTree = sources[key];
        if (typeof subTree === 'object') {
          total += this.getTotalSourceCount(sources[key] as ImageSourceMap<any>);
        } else if (typeof subTree === 'string') {
          total += 1;
        }
      }
    }

    return total;
  }

  private hasSubTree(sources: ImageSourceMap<any> | string): sources is ImageSourceMap<any> {
    return typeof sources === 'object';
  }

}
