export interface IsometricBoardConfig {
  width: number;
  height: number;
  tileTypes: {
    [id: string]: {
      resourceId: string;
      factoryName: string;
      elevation?: number;
      depth?: number;
    }
  },
  plainEntities?: {
    [id: string]: PlainEntityConfig
  },
  richEntities?: {
    [id: string]: {
      "className": string,
      "originTileCoordinates": OriginTileCoordinates[]
    }
  },
  tiles: string[][]
}

export interface PlainEntityConfig {
  footprint: {
    width: number;
    height: number;
    depth: number;
  },
  resourceId: string,
  originTileCoordinates: OriginTileCoordinates[]
}

export type OriginTileCoordinates = {
  x: number,
  y: number,
  orientation?: OrientationConfig
}

export enum OrientationConfig {
  NORTH = 'n',
  EAST = 'e',
  SOUTH = 's',
  WEST = 'w'
}
