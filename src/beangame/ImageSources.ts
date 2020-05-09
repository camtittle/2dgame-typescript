import {ImageSources} from "../engine/graphics/ImageResource";

export enum resId {
  Jeremy,
  Woman1,
  Money,
  Hamster
}

export const imageSources: ImageSources = {
  [resId.Jeremy]: {
    src: 'res/employee.svg'
  },
  [resId.Woman1]: {
    src: 'res/woman.svg'
  },
  [resId.Money]: {
    src: 'res/pound-sterling.svg'
  },
  [resId.Hamster]: {
    src: 'res/hamster.svg'
  }
};
