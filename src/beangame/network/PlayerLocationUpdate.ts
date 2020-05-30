import {Message} from "./Message";
import {Position} from "../../engine/interface/Position";

export interface PlayerLocationUpdate extends Message {
  originTileCoords: Position;
}
