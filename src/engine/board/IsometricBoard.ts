import {Tile} from "./Tile";
import {Dimensions} from "../interface/Dimensions";
import {ImageProvider} from "../graphics/ImageProvider";
import {Position} from "../interface/Position";
import {Intersectable} from "../interface/Intersectable";
import {Drawable} from "../interface/Drawable";
import {MouseBehaviour} from "../interface/MouseBehaviour";
import {TileFootprint} from "./TileFootprint";

export class IsometricBoard implements Drawable, Intersectable {

  private tiles: Tile[][];
  private tileDimensions: Dimensions;
  private eachTileDimensions: Dimensions;
  private boardDimensions: Dimensions;
  private boardPosition: Position = {x: 0, y: 0};
  private zoomLevel = 1.5;

  private currentMouseOverTile: Tile;

  public setTiles(tiles: Tile[][]) {
    this.tiles = tiles;
    this.updateTileSizeAndPositions();
  }

  public setTileDimensions(dimensions: Dimensions) {
    this.tileDimensions = dimensions;
    this.updateTileSizeAndPositions();
  }

  public setBoardDimensions(dimensions: Dimensions) {
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

      const tileWidth = this.boardDimensions.width / this.tileDimensions.width * this.zoomLevel;
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

  draw(context: CanvasRenderingContext2D) {
    this.forEachTile(tile => {
      tile.draw(context);
    });
    this.forEachTile(tile => {
      tile.drawOverlay(context);
    });
  }

  public setupTileImages(imageProvider: ImageProvider) {
    this.forEachTile(tile => {
      tile.setupResources(imageProvider);
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

  public getTilesInFootprint(originTile: Tile | Position, footprint: TileFootprint): Tile[] {
    if (!(originTile instanceof Tile)) {
      originTile = this.getTile(originTile as Position);
    }

    if (originTile == null) {
      throw new Error('Error getting tiles in footprint - origin tile out of range of board');
    }

    const tiles: Tile[] = [];
    const origin = originTile.getCoords();
    for (let x = origin.x; x < origin.x + footprint.width; x++) {
      for (let y = origin.y; y < origin.y + footprint.height; y++) {
        const tile = this.getTile({x: x, y: y});
        if (tile) {
          tiles.push(tile);
        }
      }
    }

    return tiles;
  }

  public addTileMouseDownBehaviour(behaviour: MouseBehaviour) {
    this.forEachTile(tile => {
      tile.addMouseDownBehaviour(behaviour);
    });
  }

  public onMouseMove(x: number, y: number) {
    const newMouseOverTile = this.getTileAtPosition(x, y);
    const isNewTile = this.currentMouseOverTile !== newMouseOverTile;

    if (newMouseOverTile && isNewTile) {
      newMouseOverTile.triggerMouseEnter(x, y);
    }

    if (this.currentMouseOverTile && isNewTile) {
      this.currentMouseOverTile.triggerMouseLeave(x, y);
    }

    this.currentMouseOverTile = newMouseOverTile;
  }

  public onMouseDown(x: number, y: number) {
    const tile = this.getTileAtPosition(x, y);
    if (tile) {
      tile.triggerMouseDown(x, y);
    }
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
