import * as uuidv1 from 'uuid/v1';
import {Updatable} from "../interface/Updatable";
import {IsometricEntityManager} from "./IsometricEntityManager";
import {SpriteDrawable} from "../graphics/SpriteDrawable";
import {IsometricBoard} from "../board/IsometricBoard";
import {Tile} from "../board/Tile";
import {TileFootprint} from "../board/TileFootprint";

export abstract class TileBoundIsometricEntity extends SpriteDrawable implements Updatable {

  protected board: IsometricBoard;
  protected entityManager: IsometricEntityManager;
  protected zIndex = 0;
  protected readonly _id: string = uuidv1();

  protected currentOriginTile: Tile;
  protected destinationOriginTile: Tile;
  protected speedTilesPerSecond = 10;
  private timeSinceLastMove = 0;

  protected showDebugOutline = false;

  // How many tiles does this entity occupy
  protected tileFootprint: TileFootprint = {
    depth: 1,
    height: 1,
    width: 1,
  };
  protected currentTiles: Tile[];

  get id() { return this._id; }

  constructor(board: IsometricBoard, entityManager: IsometricEntityManager) {
    super();
    this.board = board;
    this.entityManager = entityManager;
    this.init();
    console.log(this.tileFootprint);
  }

  protected init() {
  }

  update(progress: number): void {
    this.moveTowardsDestinationTile(progress);
  }

  public setZIndex(z: number) {
    this.zIndex = z;
    this.entityManager.refreshZIndecesOnNextUpdate();
  }

  public getZIndex() {
    return this.zIndex;
  }


  public setDestinationTile(tile: Tile) {
    this.destinationOriginTile = tile;
    this.timeSinceLastMove = 0;
  }

  public setTile(tile: Tile) {
    this.currentOriginTile = tile;
    this.recalcSizeAndPosition();
  }

  private recalcSizeAndPosition() {
    const tile = this.currentOriginTile;
    if (!this.currentOriginTile) {
      return;
    }
    this.width = tile.width + ((this.tileFootprint.height-1)*tile.width/2) + ((this.tileFootprint.width-1)*tile.width/2);
    this.height = tile.height * this.tileFootprint.depth;
    const tilePosition = tile.getPosition();

    const yPos = tilePosition.y - ((this.tileFootprint.depth-1)*tile.height) + ((this.tileFootprint.height-1)*tile.height/2) + ((this.tileFootprint.width-1)*tile.height/2);
    const xPos = tilePosition.x - ((this.tileFootprint.height-1)*tile.width/2);
    this.setPosition({x: xPos, y: yPos});
    this.currentTiles = this.board.getTilesInFootprint(this.currentOriginTile, this.tileFootprint);
    console.log({type: this.constructor.name, tiles: this.currentTiles});
  }

  public setBoard(board: IsometricBoard) {
    this.board = board;
  }

  private moveTowardsDestinationTile(progress: number) {
    if (!this.destinationOriginTile || this.destinationOriginTile === this.currentOriginTile) {
      return;
    }

    this.timeSinceLastMove += progress;
    const msBetweenMoves = (1 / this.speedTilesPerSecond) * 1000;
    if (this.timeSinceLastMove < msBetweenMoves) {
      return;
    }

    this.timeSinceLastMove = this.timeSinceLastMove - msBetweenMoves;

    const destCoords = this.destinationOriginTile.getCoords();
    const currentCoords = this.currentOriginTile.getCoords();
    const newCoords = this.currentOriginTile.getCoords();

    const xDiff = destCoords.x - currentCoords.x;
    if (xDiff !== 0) {
      if (xDiff > 0) {
        newCoords.x++
      } else {
        newCoords.x--;
      }
    }

    const yDiff = destCoords.y - currentCoords.y;
    if (yDiff !== 0) {
      if (yDiff > 0) {
        newCoords.y++
      } else {
        newCoords.y--;
      }
    }

    this.setTile(this.board.getTile(newCoords));
  }

  public getCurrentTile(): Tile {
    return this.currentOriginTile;
  }

  protected setTileFootprint(height: number, width: number, depth: number) {
    this.tileFootprint = {
      height: height,
      depth: depth,
      width: width
    };
    this.recalcSizeAndPosition();
  }


}

