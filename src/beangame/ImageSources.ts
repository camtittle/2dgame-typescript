import {ImageSources} from "../engine/graphics/ImageResource";

export enum resId {
  Grass,
  Woman1,
  Money,
  Hamster
}

export const imageSources: ImageSources = {
  [resId.Grass]: {
    src: 'res/grass-iso.png'
  },
  [resId.Woman1]: {
    src: 'res/woman.svg'
  },
  [resId.Money]: {
    src: 'res/pound-sterling.svg'
  },
  [resId.Hamster]: {
    src: 'res/hamster-iso.png'
  }
};
