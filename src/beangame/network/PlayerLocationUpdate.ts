import {Message} from "./Message";
import {Position} from "../../engine/interface/Position";

export interface PlayerLocationUpdate extends Message {
  id: string;
  originTileCoords: Position;
}

export function isPlayerLocationUpdate(msg: any): msg is PlayerLocationUpdate {
  return !!msg.originTileCoords;
}
