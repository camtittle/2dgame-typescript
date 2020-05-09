import {Entity} from "../entity/Entity";
import {Position} from "../interface/Position";

export abstract class Tile extends Entity {

  id: string;
  position: Position;

  public setSize(widthHeight: number) {
    this._width = widthHeight;
    this._height = widthHeight;
  }

}

