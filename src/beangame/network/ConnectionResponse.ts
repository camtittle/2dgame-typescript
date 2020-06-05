import {Message} from "./Message";
import {Position} from "../../engine/interface/Position";

export interface ConnectionResponse extends Message {
  clientId: string;
  username: string;
  players: {
    id: string;
    username: string;
    originTileCoords: Position
  }[]
}
