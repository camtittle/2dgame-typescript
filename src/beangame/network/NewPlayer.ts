import {Message} from "./Message";
import {Position} from "../../engine/interface/Position";

export interface NewPlayer extends Message {
  id: string;
  originTileCoords: Position;
}
