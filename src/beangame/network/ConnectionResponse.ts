import {Message} from "./Message";

export interface ConnectionResponse extends Message {
  clientId: string;
}
