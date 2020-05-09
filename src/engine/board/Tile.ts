import {Entity} from "../entity/Entity";
import {Position} from "../interface/Position";
import {Dimensions} from "../interface/Dimensions";

export abstract class Tile extends Entity {

  id: string;
  coords: Position;

  constructor(coords: Position) {
    super();
    this.coords = coords;
  }

  public setSize(widthHeight: number) {
    this.width = widthHeight;
    this.height = widthHeight;
  }

}

