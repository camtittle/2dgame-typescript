import {Message} from "./Message";
import {MessageType} from "./MessageType";
import {ConnectionResponse} from "./ConnectionResponse";
import {EntitySpawner} from "../entity/EntitySpawner";
import {ClientNetworkManager} from "../../engine/network/ClientNetworkManager";

export class MessageHandler {

  constructor(private entitySpawner: EntitySpawner, private networkManager: ClientNetworkManager) {}

  handleMessage(msg: Message) {
    switch (msg.messageType) {
      case MessageType.ConnectionResponse: this.handleConnectionResponse(msg as ConnectionResponse);
    }
  }

  private handleConnectionResponse(msg: ConnectionResponse) {
    this.entitySpawner.spawnHamsterPlayable(msg.clientId, this.networkManager);
  }

}
