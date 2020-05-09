import {Board} from "./Board";
import {Tile} from "./Tile";
import {Dimensions} from "../interface/Dimensions";
import {Position} from "../interface/Position";
import {ImageProvider} from "../graphics/ImageProvider";
import {EntityManager} from "../entity/EntityManager";

export class BoardBuilder {

  private tileWidth: number;
  private tileHeight: number;
  private guWidth: number;
  private guHeight: number;
  private tileGeneratorFn: (width: number, height: number) => Tile[][];
  private imageProvider: ImageProvider;
  private entityManager: EntityManager;

  constructor(imageProvider: ImageProvider) {
    this.imageProvider = imageProvider;
  }

  withTileDimensions(tileWidth: number, tileHeight: number) {
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    return this;
  }

  withGameDimensions(guWidth: number, guHeight: number) {
    this.guWidth = guWidth;
    this.guHeight = guHeight;
    return this;
  }

  withEntityManager(entityManager: EntityManager) {
    this.entityManager = entityManager;
    return this;
  }

  populatedWithTile(tileFactory: TileFactory) {
    this.tileGeneratorFn = (width: number, height: number) => {
      let tiles: Tile[][] = [];
      for (let x = 0; x < width; x++) {
        tiles[x] = [];
        for (let y = 0; y < height; y++) {
          tiles[x][y] = tileFactory({x: x, y: y});
        }
      }
      return tiles;
    };
    return this;
  }

  build(): Board {
    if (!this.tileHeight || !this.tileWidth || !this.guHeight || !this.guWidth || !this.tileGeneratorFn) {
      throw new Error("Cannot build board - missing parameters");
    }

    const board = new Board();
    board.setTileDimensions({ width: this.tileWidth, height: this.tileHeight});
    board.setGameDimensions({ width: this.guWidth, height: this.guHeight });
    board.setTiles(this.tileGeneratorFn(this.tileWidth, this.tileHeight));
    board.setupTileImages(this.imageProvider);

    if (this.entityManager) {
      board.registerTilesAsEntities(this.entityManager);
    }

    return board;
  }

}

export type TileFactory = (coords: Position) => Tile;
