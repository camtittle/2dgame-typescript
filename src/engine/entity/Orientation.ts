import {Position} from "../interface/Position";

export enum Orientation {
  NORTH = 'north',
  NORTHEAST = 'north-east',
  EAST = 'east',
  SOUTHEAST = 'south-east',
  SOUTH = 'south',
  SOUTHWEST = 'south-west',
  WEST = 'west',
  NORTHWEST = 'north-west',
}

export enum OrientationSupport {
  None,
  FourWay,
  EightWay
}

export class OrientationUtils {

  static isOppositeOrientation(oldOrientation: Orientation, newOrientation: Orientation) {
    return ((oldOrientation === Orientation.NORTH || oldOrientation === Orientation.SOUTH)
              && (newOrientation === Orientation.NORTH || newOrientation === Orientation.SOUTH)) ||
            ((oldOrientation === Orientation.EAST || oldOrientation === Orientation.WEST)
              && (newOrientation === Orientation.EAST || newOrientation === Orientation.WEST));
  }

  static calculateDirection(oldCoords: Position, newCoords: Position, type: OrientationSupport): Orientation {
    if (type === OrientationSupport.None) {
      throw new Error('Cannot calculate direction with OrientationSupport=None');
    }

    const eightWay = type === OrientationSupport.EightWay;
    const movingEast = newCoords.x > oldCoords.x;
    const movingWest = newCoords.x < oldCoords.x;
    const movingNorth = newCoords.y < oldCoords.y;
    const movingSouth = newCoords.y > oldCoords.y;

    if (movingNorth) {
      if (eightWay) {
        if (movingEast) return Orientation.NORTHEAST;
        if (movingWest) return Orientation.NORTHWEST;
      }
      return Orientation.NORTH;
    }

    if (movingEast) {
      if (eightWay) {
        if (movingSouth) return Orientation.SOUTHEAST;
      }
      return Orientation.EAST;
    }

    if (movingSouth) {
      if (eightWay) {
        if (movingWest) return Orientation.SOUTHWEST;
      }
      return Orientation.SOUTH;
    }

    if (movingWest) {
      return Orientation.WEST;
    }

    return null;
  }

}
