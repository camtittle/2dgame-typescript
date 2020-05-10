import {Tile} from "./Tile";
import {Dimensions} from "../interface/Dimensions";
import {ImageProvider} from "../graphics/ImageProvider";
import {Position} from "../interface/Position";
import {EntityManager} from "../entity/EntityManager";

export class Board {

  private tiles: Tile[][];
  private tileDimensions: Dimensions;
  private gameDimensions: Dimensions;
  private isometric = false;

  public setTiles(tiles: Tile[][]) {
    this.tiles = tiles;
    this.updateTileSizeAndPositions();
  }

  public setTileDimensions(dimensions: Dimensions) {
    this.tileDimensions = dimensions;
    this.updateTileSizeAndPositions();
  }

  public setGameDimensions(dimensions: Dimensions) {
    this.gameDimensions = dimensions;
    this.updateTileSizeAndPositions();
  }

  // Recalculate size of each tile to fit tiles horizontally
  private updateTileSizeAndPositions() {
    if (this.gameDimensions && this.tileDimensions && this.tiles) {
      const tileWidth = this.gameDimensions.width / this.tileDimensions.width;
      this.forEachTile((tile, x, y) => {

        if (this.isometric) {
          const tileHeight = tileWidth / 2;
          tile.setPosition({x: tileWidth/2 * (x-y-1) + (this.gameDimensions.width/2), y: tileHeight/2 * (x+y)});
          tile.setSize(tileWidth, tileHeight);

        } else {
          tile.setPosition({x: x*tileWidth, y: y*tileWidth});
          tile.setSize(tileWidth);
        }

      })
    }
  }

  public setupTileImages(imageProvider: ImageProvider) {
    this.forEachTile(tile => {
      tile.setupImages(imageProvider);
    })
  }

  private forEachTile(func: (tile: Tile, x: number, y: number) => void) {
    for (let x = 0; x < this.tiles.length; x++) {
      for (let y = 0; y < this.tiles[x].length; y++) {
        func(this.tiles[x][y], x, y);
      }
    }
  }

  public getTile(coords: Position) {
    if (coords.x > this.tileDimensions.width || coords.y > this.tileDimensions.height) {
      throw new Error('Tile out of bounds: Cannot get tile with coords ' + JSON.stringify(coords));
    }

    return this.tiles[coords.x][coords.y];
  }

  public registerTileOnClickListener(listener: (tile: Tile) => void) {
    this.forEachTile(tile => {
      tile.addMouseDownListener(listener);
    })
  }

  public registerTilesAsEntities(entityManager: EntityManager) {
    this.forEachTile(tile => {
      entityManager.register(tile);
    })
  }

  public setIsometric(isometric: boolean) {
    this.isometric = isometric;
    this.updateTileSizeAndPositions();
  }

}
