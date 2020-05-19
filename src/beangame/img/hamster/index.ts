import North from './north.png';
import NorthEast from './north-east.png';
import East from './east.png';
import SouthEast from './south-east.png';
import South from './south.png';
import SouthWest from './south-west.png';
import West from './west.png';
import NorthWest from './north-west.png';
import {ImageSourceMap} from "../../../engine/graphics/ImageResource";
import {Orientation} from "../../../engine/entity/Orientation";

export default <ImageSourceMap<Orientation>> {
  [Orientation.NORTH]: North,
  [Orientation.NORTHEAST]: NorthEast,
  [Orientation.EAST]: East,
  [Orientation.SOUTHEAST]: SouthEast,
  [Orientation.SOUTH]: South,
  [Orientation.SOUTHWEST]: SouthWest,
  [Orientation.NORTH]: North,
  [Orientation.NORTHWEST]: NorthWest,
  [Orientation.WEST]: West
};
