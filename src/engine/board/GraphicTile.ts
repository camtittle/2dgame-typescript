import {Tile} from "./Tile";
import {Position} from "../interface/Position";
import {Dimensions} from "../interface/Dimensions";

export abstract class GraphicTile extends Tile {
  id: string;
  position: Position;

  protected _height: number;
  protected _width: number;

  constructor(position: Position, dimensions: Dimensions) {
    super();
    this.position = position;
    this._width = dimensions.width;
    this._height = dimensions.height;
  }

}

