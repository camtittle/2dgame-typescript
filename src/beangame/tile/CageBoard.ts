import {IsometricBoardConfig, OrientationConfig} from "../../engine/board/IsometricBoardConfig";

export const cageBoardConfig: IsometricBoardConfig = {
  width: 12,
  height: 16,
  tileTypes: {
    sawdust: {
      resourceId: 'sawdustTile',
      factoryName: 'PlainTile'
    },
    blue: {
      resourceId: 'blueTile',
      factoryName: 'PlainTile'
    },
    blueElev1: {
      resourceId: 'blueTile',
      factoryName: 'PlainTile',
      elevation: 1
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
      originTileCoordinates: [
        {
          x: 1,
          y: 2
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
      originTileCoordinates: [
        { x: 0, y: 0, orientation:  OrientationConfig.NORTH },
        { x: 0, y: 2, orientation:  OrientationConfig.NORTH },
        { x: 0, y: 4, orientation:  OrientationConfig.NORTH },
        { x: 0, y: 6, orientation:  OrientationConfig.NORTH },
        { x: 0, y: 8, orientation:  OrientationConfig.NORTH },
        { x: 0, y: 10, orientation: OrientationConfig.NORTH },
        { x: 0, y: 12, orientation: OrientationConfig.NORTH },
        { x: 0, y: 14, orientation: OrientationConfig.NORTH },
        { x: 0, y: 0, orientation:  OrientationConfig.WEST },
        { x: 2, y: 0, orientation:  OrientationConfig.WEST },
        { x: 4, y: 0, orientation:  OrientationConfig.WEST },
        { x: 6, y: 0, orientation:  OrientationConfig.WEST },
        { x: 8, y: 0, orientation:  OrientationConfig.WEST },
        { x: 10, y: 0, orientation:  OrientationConfig.WEST },
        { x: 12, y: 0, orientation:  OrientationConfig.WEST },
        { x: 14, y: 0, orientation:  OrientationConfig.WEST },
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
    ['blueElev1', 'blueElev1', 'blue', 'blue', 'blue', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['blueElev1', 'blueElev1', 'blue', 'blue', 'blue', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['blue', 'pink', 'blue', 'blue', 'blue', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['blue', 'pink', 'blue', 'blue', 'blue', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'pink', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'pink', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'pink', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust']
  ]
};
