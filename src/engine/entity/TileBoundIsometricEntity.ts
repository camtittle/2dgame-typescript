import * as uuidv1 from 'uuid/v1';
import {Updatable} from "../interface/Updatable";
import {IsometricEntityManager} from "./IsometricEntityManager";
import {SpriteDrawable} from "../graphics/SpriteDrawable";
import {IsometricBoard} from "../board/IsometricBoard";
import {Tile} from "../board/Tile";

export abstract class TileBoundIsometricEntity extends SpriteDrawable implements Updatable {

  protected board: IsometricBoard;
  protected entityManager: IsometricEntityManager;
  protected zIndex = 0;
  protected readonly _id: string = uuidv1();
  protected currentTile: Tile;
  protected destinationTile: Tile;
  protected speedTilesPerSecond = 10;
  private timeSinceLastMove = 0;
  protected depth = 2;

  get id() { return this._id; }

  constructor(board: IsometricBoard, entityManager: IsometricEntityManager) {
    super();
    this.board = board;
    this.entityManager = entityManager;
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
    this.destinationTile = tile;
    this.timeSinceLastMove = 0;
  }

  public setTile(tile: Tile) {
    this.currentTile = tile;
    this.width = tile.width;
    this.height = tile.height * this.depth;
    const tilePosition = tile.getPosition();
    this.setPosition({x: tilePosition.x, y: tilePosition.y - tile.height*this.depth/2});
  }

  public setBoard(board: IsometricBoard) {
    this.board = board;
  }

  private moveTowardsDestinationTile(progress: number) {
    if (!this.destinationTile || this.destinationTile === this.currentTile) {
      return;
    }

    this.timeSinceLastMove += progress;
    const msBetweenMoves = (1 / this.speedTilesPerSecond) * 1000;
    if (this.timeSinceLastMove < msBetweenMoves) {
      return;
    }

    this.timeSinceLastMove = this.timeSinceLastMove - msBetweenMoves;

    const destCoords = this.destinationTile.getCoords();
    const currentCoords = this.currentTile.getCoords();
    const newCoords = this.currentTile.getCoords();

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
    return this.currentTile;
  }
}

