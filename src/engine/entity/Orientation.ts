export enum Orientation {
  NORTH = 'north',
  EAST = 'east',
  SOUTH = 'south',
  WEST = 'west'
}

export class OrientationUtils {

  static isOppositeOrientation(oldOrientation: Orientation, newOrientation: Orientation) {
    return ((oldOrientation === Orientation.NORTH || oldOrientation === Orientation.SOUTH)
              && (newOrientation === Orientation.NORTH || newOrientation === Orientation.SOUTH)) ||
            ((oldOrientation === Orientation.EAST || oldOrientation === Orientation.WEST)
              && (newOrientation === Orientation.EAST || newOrientation === Orientation.WEST));
  }

}
