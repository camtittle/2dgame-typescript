import {ConnectionResponse} from "./ConnectionResponse";

export enum MessageType {
  ConnectionResponse
}

export interface MessageTypeMap {
  [MessageType.ConnectionResponse]: ConnectionResponse;
}
