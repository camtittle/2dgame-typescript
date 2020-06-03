import {Message} from "./Message";

export interface PlayerDisconnect extends Message {
  clientId: string;
}
