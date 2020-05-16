import {EntityFactories, TileFactories} from "../../engine/board/ConfigParser";
import {PlainTile} from "./PlainTile";
import {IsometricBoardConfig} from "../../engine/board/IsometricBoardConfig";

export const cageBoardConfig: IsometricBoardConfig = {
  width: 16,
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
          x: 1,
          y: 1,
          orientation: 'nw'
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
        { x: 0, y: 0, orientation: 'nw' },
        { x: 0, y: 2, orientation: 'nw' },
        { x: 0, y: 4, orientation: 'nw' },
        { x: 0, y: 6, orientation: 'nw' },
        { x: 0, y: 8, orientation: 'nw' },
        { x: 0, y: 10, orientation: 'nw' },
        { x: 0, y: 12, orientation: 'nw' },
        { x: 0, y: 14, orientation: 'nw' },
      ]
    },
  },
  richEntities: {
    wheel: {
      className: 'Wheel',
      originTileCoordinates: [
        {
          x: 0,
          y: 4,
          orientation: 'nw'
        }
      ]
    }
  },
  tiles: [
    ['blue', 'blue', 'blue', 'blue', 'blue', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['blue', 'blue', 'blue', 'blue', 'blue', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['blue', 'blue', 'blue', 'blue', 'blue', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['blue', 'blue', 'blue', 'blue', 'blue', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'pink', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'pink', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'pink', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
    ['sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust', 'sawdust'],
  ]
};

export const cageTileFactories: TileFactories = {
  PlainTile: coords => {
    return new PlainTile(coords);
  }
};
