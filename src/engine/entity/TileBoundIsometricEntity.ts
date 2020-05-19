import * as uuidv1 from 'uuid/v1';
import {Updatable} from "../interface/Updatable";
import {IsometricEntityManager} from "./IsometricEntityManager";
import {SpriteDrawable} from "../graphics/SpriteDrawable";
import {IsometricBoard} from "../board/IsometricBoard";
import {Tile} from "../board/Tile";
import {TileFootprint} from "../board/TileFootprint";
import {Orientation, OrientationSupport, OrientationUtils} from "./Orientation";
import {Position} from "../interface/Position";

export abstract class TileBoundIsometricEntity extends SpriteDrawable implements Updatable {

  protected board: IsometricBoard;
  protected entityManager: IsometricEntityManager;
  protected zIndex = 0;
  protected readonly _id: string = uuidv1();

  protected currentOriginTile: Tile;
  protected destinationOriginTile: Tile;
  protected speedTilesPerSecond = 10;
  private timeSinceLastMove = 0;

  private _orientationSupport = OrientationSupport.None;
  private orientation: Orientation = null;

  protected showDebugOutline = false;

  // How many tiles does this entity occupy **in the NORTH orientation**
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

  public setOriginTile(tile: Tile) {
    this.currentOriginTile = tile;
    this.recalcSizeAndPosition();
  }

  private recalcSizeAndPosition() {
    const tile = this.currentOriginTile;
    if (!tile || !this.tileFootprint || !this.board) {
      return;
    }

    this.width = tile.width + ((this.tileFootprint.height-1)*tile.width/2) + ((this.tileFootprint.width-1)*tile.width/2);
    this.height = tile.height * this.tileFootprint.depth;
    const tilePosition = tile.getPosition();

    const yPos = tilePosition.y - ((this.tileFootprint.depth-1)*tile.height) + ((this.tileFootprint.height-1)*tile.height/2) + ((this.tileFootprint.width-1)*tile.height/2);
    const xPos = tilePosition.x - ((this.tileFootprint.height-1)*tile.width/2);
    this.setPosition({x: xPos, y: yPos});
    this.currentTiles = this.board.getTilesInFootprint(this.currentOriginTile, this.tileFootprint);
  }

  public setBoard(board: IsometricBoard) {
    this.board = board;
    this.recalcSizeAndPosition();
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

    this.setOriginTile(this.board.getTile(newCoords));

    if (this._orientationSupport !== OrientationSupport.None) {
      this.orientateTowardsDestination(currentCoords, newCoords);
    }
  }

  public getCurrentTile(): Tile {
    return this.currentOriginTile;
  }

  public setTileFootprint(height: number, width: number, depth: number) {
    this.tileFootprint = {
      height: height,
      depth: depth,
      width: width
    };
    this.recalcSizeAndPosition();
  }

  private orientateTowardsDestination(oldCoords: Position, newCoords: Position) {
    if (this._orientationSupport === OrientationSupport.None) {
      throw new Error("Cannot orientate entity with OrientationSupport=NONE");
    }

    let newOrientation = OrientationUtils.calculateDirection(oldCoords, newCoords, this._orientationSupport);
    if (newOrientation) {
      this.setOrientation(newOrientation);
    }
  }

  public setOrientation(orientation: Orientation) {
    if (this._orientationSupport === OrientationSupport.None) {
      throw new Error('Error: Cannot set orientation on entity with OrientationSupport=NONE');
    }

    // swap height and width
    if (!OrientationUtils.isOppositeOrientation(this.orientation, orientation)) {
      this.setTileFootprint(this.tileFootprint.width, this.tileFootprint.height, this.tileFootprint.depth);
    }

    this.orientation = orientation;
    try {
      this.currentImage = this.getImageResource(orientation);
    } catch (e) {
      console.error(e);
      console.warn('Image resource for orientation ' + orientation + ' not found');
    }
  }

  public get orientationSupport(): OrientationSupport {
    return this._orientationSupport;
  }

  public setOrientationSupport(orientationSupport: OrientationSupport) {
    this._orientationSupport = orientationSupport;

    if (orientationSupport === OrientationSupport.None) {
      this.orientation = null;
    } else {
      // Default orientation to north
      this.orientation = Orientation.NORTH;
    }
  }


}

