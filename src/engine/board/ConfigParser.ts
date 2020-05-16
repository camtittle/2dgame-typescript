import {IsometricBoardConfig} from "./IsometricBoardConfig";
import {IsometricBoard} from "./IsometricBoard";
import {TileFactory} from "./IsometricBoardBuilder";
import {ImageProvider} from "../graphics/ImageProvider";
import {Tile} from "./Tile";
import {IsometricEntityManager} from "../entity/IsometricEntityManager";
import {TileBoundIsometricEntity} from "../entity/TileBoundIsometricEntity";

export class ConfigParser {

  constructor(private imageProvider: ImageProvider, private entityManager: IsometricEntityManager) {
  }

  buildBoardFromConfig(config: IsometricBoardConfig, tileFactories: TileFactories): IsometricBoard {
    const board = new IsometricBoard();

    board.setTileDimensions({width: config.width, height: config.height});

    const tileFactory = this.getTileFactory(config, tileFactories);
    const tiles = this.buildTiles(config.width, config.height, tileFactory);
    board.setTiles(tiles);

    return board;
  }

  spawnEntitiesFromConfig(board: IsometricBoard, config: IsometricBoardConfig, entityFactories: EntityFactories) {
    this.spawnEntities(board, config, entityFactories);
  }

  private getTileFactory(config: IsometricBoardConfig, tileFactories: TileFactories): TileFactory {
    return coords => {
      // find tile type at coords
      const tileTypeName = config.tiles[coords.y][coords.x];
      if (!tileTypeName) throw new Error("Cannot create tile at " + JSON.stringify(coords) + ". No tile specified at these coordinates");

      // find factory for tile type
      const tileType = config.tileTypes[tileTypeName];
      if (!tileType) throw new Error("Cannot create tile. No tile type specified with name: " + tileTypeName);

      const thisTileFactory = tileFactories[tileType.factoryName];
      if (!thisTileFactory) throw new Error("Cannot create tile. No tile factory provided for factoryName: " + tileType.factoryName);

      const tile = thisTileFactory(coords);
      if (!tile) throw new Error("Error: Tile factory " + tileType.factoryName + " returned null");

      const tileResources = this.imageProvider.getImagesByResourceId([tileType.resourceId]);
      if (!tileResources) throw new Error("Cannot set resources for tile type " + tileTypeName + ". Does the resourceId correspond to a resource in the ImageProvider?");
      tile.setResources(tileResources);

      return tile;
    };
  }

  private buildTiles(width: number, height: number, tileFactory: TileFactory): Tile[][] {
    let tiles: Tile[][] = [];
    for (let x = 0; x < width; x++) {
      tiles[x] = [];
      for (let y = 0; y < height; y++) {
        tiles[x][y] = tileFactory({x: x, y: y});
      }
    }
    return tiles;
  }

  private spawnEntities(board: IsometricBoard, config: IsometricBoardConfig, factories: EntityFactories) {
    // spawn plain entities first
    if (config.plainEntities) {
      if (!factories.plainEntity) {
        throw new Error("Cannot spawn plain entities: No Plain entity factory provided");
      }

      // for each plain entity...
      Object.keys(config.plainEntities).forEach(entityName => {
        const entityConfig = config.plainEntities[entityName];
        // for each set of coordinates provided, spawn an instance of the entity at those coords
        for (let coordinates of entityConfig.originTileCoordinates) {
          const entity = factories.plainEntity();
          const fp = entityConfig.footprint;
          entity.setTileFootprint(fp.height, fp.width, fp.depth);
          entity.setResources(this.imageProvider.getImagesByResourceId([entityConfig.resourceId]));
          entity.setOriginTile(board.getTile(coordinates));
          entity.setBoard(board);
          this.entityManager.register(entity);
        }
      });
    }
  }

}

export type TileFactories = {
  [factoryName: string]: TileFactory
}

export type EntityFactories = {
  plainEntity: () => TileBoundIsometricEntity,
  richEntities: {
    [factoryName: string]: () => TileBoundIsometricEntity
  }
}