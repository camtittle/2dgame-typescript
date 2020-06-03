import {Message} from "./Message";
import {Position} from "../../engine/interface/Position";

export interface ConnectionResponse extends Message {
  clientId: string;
  players: {
    id: string;
    originTileCoords: Position
  }[]
}
