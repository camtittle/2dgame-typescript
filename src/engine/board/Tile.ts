import {Entity} from "../entity/Entity";
import {Position} from "../interface/Position";

export abstract class Tile extends Entity {

  id: string;
  private coords: Position;

  constructor(coords: Position) {
    super();
    this.coords = coords;
  }

  public getCoords(): Position {
    return {x: this.coords.x, y: this.coords.y};
  }

  public setSize(width: number, height?: number) {
    this.width = width;
    this.height = height === undefined ? width : height;
  }

}

