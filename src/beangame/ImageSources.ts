import {ImageSourceMap} from "../engine/graphics/ImageResource";
import {Orientation} from "../engine/entity/Orientation";
import {GameEnvironment} from "../engine/GameEnvironment";
import {resourceId} from "./ResourceIds";

export function getImageSources(): ImageSourceMap<resourceId> {
  if (GameEnvironment.SERVER) {
    return null;
  }

  return {
    [resourceId.Grass]: require('./img/grass-iso.png').default,
    [resourceId.Sawdust]: require('./img/sawdust.png').default,
    [resourceId.BlueTile]: require('./img/bluetile.png').default,
    [resourceId.PinkTile]: require('./img/pinktile.png').default,
    [resourceId.CageWall]: <ImageSourceMap<Orientation>> {
      [Orientation.NORTH]: require('./img/cage-wall-north.png').default,
      [Orientation.WEST]: require('./img/cage-wall-east.png').default,
    },
    [resourceId.Wheel]: require('./img/wheel.png').default,
    [resourceId.WheelLarge]: require('./img/wheel-large.png').default,
    [resourceId.WheelLargeRhs]: require('./img/wheel-large-rhs.png').default,
    [resourceId.Hamster]: require('./img/hamster').default,
    [resourceId.FoodBowl]: require('./img/food-bowl.png').default,
    [resourceId.Ramp]: require('./img/ramp.png').default
  }
}
