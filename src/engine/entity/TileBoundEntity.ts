import {Entity} from "./Entity";
import {Tile} from "../board/Tile";

// Entity that is aligned to the board and occupies
// one tile at a time
export abstract class TileBoundEntity extends Entity {

  private currentTile: Tile;

  public setTile(tile: Tile) {
    this.currentTile = tile;
    this.width = tile.width;
    this.height = tile.height;
    this.setPosition(tile.getPosition());
  }

  public getCurrentTile(): Tile {
    return this.currentTile;
  }

}
