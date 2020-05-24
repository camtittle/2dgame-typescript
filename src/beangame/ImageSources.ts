import {ImageSourceMap} from "../engine/graphics/ImageResource";
import {Orientation} from "../engine/entity/Orientation";
import {GameEnvironment} from "../engine/GameEnvironment";
import {resourceId} from "./ResourceIds";

export function getImageSources(): ImageSourceMap<resourceId> {
  if (GameEnvironment.SERVER) {
    return null;
  }

  return {
    [resourceId.Grass]: 'res/grass-iso.png',
    [resourceId.Sawdust]: 'res/sawdust.png',
    [resourceId.BlueTile]: 'res/bluetile.png',
    [resourceId.PinkTile]: 'res/pinktile.png',
    [resourceId.CageWall]: <ImageSourceMap<Orientation>> {
      [Orientation.NORTH]: 'res/cage-wall-left.png',
      [Orientation.WEST]: 'res/cage-wall-east.png',
    },
    [resourceId.Wheel]: 'res/wheel.png',
    [resourceId.WheelLarge]: 'res/wheel-large.png',
    [resourceId.WheelLargeRhs]: 'res/wheel-large-rhs.png',
    [resourceId.Hamster]: require('./img/hamster').default,
    [resourceId.FoodBowl]: 'res/food-bowl.png',
    [resourceId.Ramp]: require('./img/ramp.png').default
  }
}
