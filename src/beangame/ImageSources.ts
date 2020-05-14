import {ImageSources} from "../engine/graphics/ImageResource";

export enum resId {
  Grass,
  CageWall1,
  Wheel,
  WheelLargeRhs,
  WheelLarge,
  Hamster,
  FoodBowl
}

export const imageSources: ImageSources = {
  [resId.Grass]: {
    src: 'res/grass-iso.png'
  },
  [resId.CageWall1]: {
    src: 'res/cage-wall-1.png'
  },
  [resId.Wheel]: {
    src: 'res/wheel.png'
  },
  [resId.WheelLarge]: {
    src: 'res/wheel-large.png'
  },
  [resId.WheelLargeRhs]: {
    src: 'res/wheel-large-rhs.png'
  },
  [resId.Hamster]: {
    src: 'res/hamster-iso.png'
  },
  [resId.FoodBowl]: {
  src: 'res/food-bowl.png'
}
};
