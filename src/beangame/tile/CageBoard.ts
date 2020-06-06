import {IsometricBoardConfig, OrientationConfig} from "../../engine/board/IsometricBoardConfig";

export const cageBoardConfig: IsometricBoardConfig = {
  width: 12,
  height: 16,
  tileTypes: {
    empty: {
      resourceId: 'empty',
      factoryName: 'PlainTile',
      walkable: false
    },
    sawdust: {
      resourceId: 'sawdustTile',
      factoryName: 'PlainTile',
      depth: 1
    },
    blue: {
      resourceId: 'blueTile',
      factoryName: 'PlainTile',
      depth: 1
    },
    blueElev1: {
      resourceId: 'blueTile',
      factoryName: 'PlainTile',
      elevation: 1,
      depth: 1
    },
    pink: {
      resourceId: 'pinkTile',
      factoryName: 'PlainTile'
    }
  },
  plainEntities: {
    foodBowl: {
      footprint: {
        width: 2,
        height: 2,
        depth: 3
      },
      resourceId: 'foodBowl',
      label: 'foodBowl',
      originTileCoordinates: [
        {
          x: 3,
          y: 1
        }
      ]
    },
    ramp: {
      footprint: {
        width: 1,
        height: 1,
        depth: 2
      },
      resourceId: 'ramp',
      label: 'ramp',
      originTileCoordinates: [
        {
          x: 2,
          y: 3
        }
      ]
    },
    wall: {
      footprint: {
        width: 1,
        height: 2,
        depth: 7
      },
      resourceId: 'cageWall',
      label: 'wall',
      originTileCoordinates: [
        { x: 0, y: 1, orientation:  OrientationConfig.NORTH },
        { x: 0, y: 3, orientation:  OrientationConfig.NORTH },
        { x: 0, y: 5, orientation:  OrientationConfig.NORTH },
        { x: 0, y: 7, orientation:  OrientationConfig.NORTH },
        { x: 0, y: 9, orientation:  OrientationConfig.NORTH },
        { x: 0, y: 11, orientation: OrientationConfig.NORTH },
        { x: 0, y: 13, orientation: OrientationConfig.NORTH },
        { x: 1, y: 0, orientation:  OrientationConfig.WEST },
        { x: 3, y: 0, orientation:  OrientationConfig.WEST },
        { x: 5, y: 0, orientation:  OrientationConfig.WEST },
        { x: 7, y: 0, orientation:  OrientationConfig.WEST },
        { x: 9, y: 0, orientation:  OrientationConfig.WEST },
      ]
    },
  },
  richEntities: {
    wheel: {
      className: 'Wheel',
      originTileCoordinates: [
        {
          x: 0,
          y: 4
        }
      ]
    }
  },
  tiles: [
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'blueElev1', 'blueElev1', 'blue', 'blue', 'blue', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['empty', 'blueElev1', 'blueElev1', 'blue', 'blue', 'blue', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['empty', 'blue', 'pink', 'blue', 'blue', 'blue', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['empty', 'blue', 'pink', 'blue', 'blue', 'blue', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['empty', 'sawdust', 'sawdust', 'pink', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['empty', 'sawdust', 'sawdust', 'pink', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['empty', 'sawdust', 'sawdust', 'pink', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['empty', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['empty', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['empty', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['empty', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['empty', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['empty', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['empty', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['empty', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['empty', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust']
  ]
};
