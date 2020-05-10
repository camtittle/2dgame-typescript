import {Entity} from "./Entity";
import {Tile} from "../board/Tile";
import {Board} from "../board/Board";

// Entity that is aligned to the board and occupies
// one tile at a time
export abstract class TileBoundEntity extends Entity {

  private board: Board;
  private currentTile: Tile;
  private destinationTile: Tile;
  protected speedTilesPerSecond = 10;
  private timeSinceLastMove = 0;

  public setDestinationTile(tile: Tile) {
    this.destinationTile = tile;
    this.timeSinceLastMove = 0;
  }

  public setTile(tile: Tile) {
    this.currentTile = tile;
    this.width = tile.width;
    this.height = tile.height;
    this.setPosition(tile.getPosition());
  }

  public setBoard(board: Board) {
    this.board = board;
  }

  update(progress: number): void {
    super.update(progress);
    this.moveTowardsDestinationTile(progress);
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

    console.log('moving');

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
