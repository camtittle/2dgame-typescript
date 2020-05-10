import {Tile} from "./Tile";
import {Dimensions} from "../interface/Dimensions";
import {ImageProvider} from "../graphics/ImageProvider";
import {Position} from "../interface/Position";
import {EntityManager} from "../entity/EntityManager";
import {Intersectable} from "../interface/Intersectable";

export class Board implements Intersectable {

  private tiles: Tile[][];
  private tileDimensions: Dimensions;
  private eachTileDimensions: Dimensions;
  private boardDimensions: Dimensions;
  private boardPosition: Position = {x: 0, y: 0};
  private isometric = false;

  private currentMouseOverTile: Tile;

  public setTiles(tiles: Tile[][]) {
    this.tiles = tiles;
    this.updateTileSizeAndPositions();
  }

  public setTileDimensions(dimensions: Dimensions) {
    this.tileDimensions = dimensions;
    this.updateTileSizeAndPositions();
  }

  public setGameDimensions(dimensions: Dimensions) {
    this.boardDimensions = dimensions;
    this.updateTileSizeAndPositions();
  }

  public setBoardPosition(position: Position) {
    this.boardPosition = position;
    this.updateTileSizeAndPositions();
  }

  // Recalculate size of each tile to fit tiles horizontally
  private updateTileSizeAndPositions() {
    if (this.boardDimensions && this.tileDimensions && this.boardPosition && this.tiles) {

      const tileWidth = this.boardDimensions.width / this.tileDimensions.width;
      const tileHeight = tileWidth / 2;
      this.eachTileDimensions = {width: tileWidth, height: tileHeight};

      this.forEachTile((tile, x, y) => {
        const tileXPos = tileWidth/2 * (x-y-1) + (this.boardDimensions.width/2) + this.boardPosition.x;
        const tileYPos = tileHeight/2 * (x+y) + this.boardPosition.y;

        tile.setPosition({x: tileXPos, y: tileYPos});
        tile.setSize(tileWidth, tileHeight);

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
    if (coords.x >= this.tileDimensions.width || coords.y >= this.tileDimensions.height) {
      return null;
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

  public onMouseMove(x: number, y: number) {
    const newMouseOverTile = this.getTileAtPosition(x, y);
    const isNewTile = this.currentMouseOverTile !== newMouseOverTile;

    if (newMouseOverTile && isNewTile) {
      newMouseOverTile.onMouseOver(x, y);
    }

    if (this.currentMouseOverTile && isNewTile) {
      this.currentMouseOverTile.onMouseOff(x, y);
    }

    this.currentMouseOverTile = newMouseOverTile;
  }

  public onMouseDown(x: number, y: number) {
    const tile = this.getTileAtPosition(x, y);
    tile.onMouseDown(x, y);
  }

  private getTileAtPosition(x: number, y: number): Tile {
    if (!this.intersects(x, y)) {
      return null;
    }

    const tileWidthHalf = this.eachTileDimensions.width / 2;
    const tileHeightHalf = this.eachTileDimensions.height / 2;
    // const tileX = (x / tileWidthHalf + y / tileHeightHalf) / 2;
    x -= tileWidthHalf;
    const xComponent = ((x - this.boardDimensions.width/2 - this.boardPosition.x) / tileWidthHalf);
    const yComponent = ((y - this.boardPosition.y) / tileHeightHalf);
    const tileY = (yComponent - xComponent - 1) / 2;
    const tileX = (xComponent + yComponent + 1) / 2;

    if (tileX < 0 || tileY < 0) {
      return null;
    }

    return this.getTile({x: Math.trunc(tileX), y: Math.trunc(tileY)});
  }

  intersects(x: number, y: number): boolean {
    return y > this.boardPosition.y && y < this.boardPosition.y + this.boardDimensions.height && x > this.boardPosition.x && x < this.boardPosition.x + this.boardDimensions.width;
  }

}
