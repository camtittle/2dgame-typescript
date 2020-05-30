import {Message} from "./Message";
import {MessageType} from "./MessageType";
import {ConnectionResponse} from "./ConnectionResponse";
import {EntitySpawner} from "../entity/EntitySpawner";

export class MessageHandler {

  constructor(private entitySpawner: EntitySpawner) {}

  handleMessage(msg: Message) {
    switch (msg.messageType) {
      case MessageType.ConnectionResponse: this.handleConnectionResponse(msg as ConnectionResponse);
    }
  }

  private handleConnectionResponse(msg: ConnectionResponse) {
    this.entitySpawner.spawnHamsterPlayable(msg.clientId);
  }

}
