import {Message} from "../../beangame/network/Message";
import {MessageType} from "../../beangame/network/MessageType";
import {isPlayerLocationUpdate} from "../../beangame/network/PlayerLocationUpdate";
import {IsometricEntityManager} from "../../engine/entity/IsometricEntityManager";
import {EntitySpawner} from "../../beangame/entity/EntitySpawner";
import {Hamster} from "../../beangame/entity/Hamster";
import {Position} from "../../engine/interface/Position";
import {MessageSender} from "./MessageSender";

export class ServerMessageHandler {

  constructor(private entityManager: IsometricEntityManager,
              private entitySpawner: EntitySpawner,
              private messageSender: MessageSender) {}

  handleMessage(clientId: string, message: Message) {
    switch (message.messageType) {
      case MessageType.PlayerLocationUpdate: this.handlePlayerLocationUpdate(clientId, message);
    }
  }

  handlePlayerConnect(clientId: string) {
    const currentPlayers = this.entityManager.entities.filter(e => e instanceof Hamster);
    this.messageSender.sendConnectionResponse(currentPlayers, clientId);

    const startingPosition: Position = {x: 0, y: 0};
    const hamster = this.entitySpawner.spawnHamsterNonPlayable(clientId, startingPosition);
    this.messageSender.broadcastNewPlayer(hamster);
  }

  handlePlayerDisconnect(clientId: string) {
    this.entitySpawner.despawnEntity(clientId);
    this.messageSender.broadcastPlayerDisconnect(clientId);
  }

  private handlePlayerLocationUpdate(clientId: string, message: Message) {
    if (!isPlayerLocationUpdate(message)) {
      throw new Error('Malformed message: ' + JSON.stringify(message));
    }

    const entity = this.entityManager.getEntityWithId(clientId);
    if (!entity) {
      throw new Error('Entity not found. Cannot update location of entity with ID ' + clientId);
    }

    console.log('setting origin tile of entity: ', message.destinationTileCoords);
    entity.setDestinationTileCoordinates(message.destinationTileCoords);
    this.messageSender.broadcastEntityPosition(entity);
  }

}
