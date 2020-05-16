import {ImageSourceMap} from "../engine/graphics/ImageResource";
import {Orientation} from "../engine/entity/Orientation";

export enum resourceId {
  Grass = 'grass',
  Sawdust = 'sawdustTile',
  BlueTile = 'blueTile',
  PinkTile = 'pinkTile',
  CageWall = 'cageWall',
  Wheel = 'wheel',
  WheelLargeRhs = 'wheelLargeRhs',
  WheelLarge = 'wheelLarge',
  Hamster = 'hamster',
  FoodBowl = 'foodBowl'
}

export const imageSources: ImageSourceMap<resourceId> = {
  [resourceId.Grass]: 'res/grass-iso.png',
  [resourceId.Sawdust]: 'res/sawdust.png',
  [resourceId.BlueTile]: 'res/bluetile.png',
  [resourceId.PinkTile]: 'res/pinktile.png',
  [resourceId.CageWall]: <ImageSourceMap<Orientation>> {
    [Orientation.NORTH]: 'res/cage-wall-left.png',
    [Orientation.EAST]: 'res/cage-wall-east.png',
  },
  [resourceId.Wheel]: 'res/wheel.png',
  [resourceId.WheelLarge]: 'res/wheel-large.png',
  [resourceId.WheelLargeRhs]: 'res/wheel-large-rhs.png',
  [resourceId.Hamster]: 'res/hamster-iso.png',
  [resourceId.FoodBowl]: 'res/food-bowl.png'
};
