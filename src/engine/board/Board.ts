import {Tile} from "./Tile";
import {Dimensions} from "../interface/Dimensions";
import {Drawable} from "../interface/Drawable";
import {ImageProvider} from "../graphics/ImageProvider";

export class Board implements Drawable {

  private tiles: Tile[][];
  private tileDimensions: Dimensions;
  private gameDimensions: Dimensions;

  draw(context: CanvasRenderingContext2D): void {
    for (let x = 0; x < this.tiles.length; x++) {
      for (let y = 0; y < this.tiles[x].length; y++) {
        this.tiles[x][y].draw(context);
      }
    }
  }

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
      const tileSize = this.gameDimensions.width / this.tileDimensions.width;
      this.forEachTile((tile, x, y) => {
        tile.position = {x: x*tileSize, y: y*tileSize};
        tile.setSize(tileSize);
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

}
