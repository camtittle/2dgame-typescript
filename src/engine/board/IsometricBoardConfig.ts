export interface IsometricBoardConfig {
  width: number;
  height: number;
  tileTypes: {
    [id: string]: {
      resourceId: string;
      factoryName: string;
    }
  },
  plainEntities?: {
    [id: string]: {
      footprint: {
        width: number;
        height: number;
        depth: number;
      },
      resourceId: string,
      originTileCoordinates: OriginTileCoordinates[]
    }
  },
  richEntities?: {
    [id: string]: {
      "className": string,
      "originTileCoordinates": OriginTileCoordinates[]
    }
  },
  tiles: string[][]
}

export type OriginTileCoordinates = {
  x: number,
  y: number,
  orientation: string
}
