import {Message} from "../beangame/network/Message";
import {MessageType} from "../beangame/network/MessageType";
import {isPlayerLocationUpdate, PlayerLocationUpdate} from "../beangame/network/PlayerLocationUpdate";
import {IsometricEntityManager} from "../engine/entity/IsometricEntityManager";
import {WebsocketServer} from "./websocket/WebsocketServer";
import {ConnectionResponse} from "../beangame/network/ConnectionResponse";
import {EntitySpawner} from "../beangame/entity/EntitySpawner";

export class ServerMessageHandler {

  constructor(private entityManager: IsometricEntityManager,
              private entitySpawner: EntitySpawner,
              private websocketServer: WebsocketServer) {}

  handleMessage(clientId: string, message: Message) {
    switch (message.messageType) {
      case MessageType.PlayerLocationUpdate: this.handlePlayerLocationUpdate(clientId, message);
    }
  }

  handlePlayerConnect(clientId: string) {
    const response: ConnectionResponse = {
      messageType: MessageType.ConnectionResponse,
      clientId: clientId
    };

    this.entitySpawner.spawnHamsterNonPlayable(clientId);
    this.websocketServer.sendToClient(clientId, JSON.stringify(response));
  }

  private handlePlayerLocationUpdate(clientId: string, message: Message) {
    if (!isPlayerLocationUpdate(message)) {
      throw new Error('Malformed message: ' + JSON.stringify(message));
    }

    const entity = this.entityManager.getEntityWithId(clientId);
    if (!entity) {
      throw new Error('Entity not found. Cannot update location of entity with ID ' + clientId);
    }

    console.log('setting origin tile of entity: ', message.originTileCoords);
    entity.setOriginTileCoordinates(message.originTileCoords);
  }

}
