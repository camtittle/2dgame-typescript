import {Message} from "../beangame/network/Message";
import {MessageType} from "../beangame/network/MessageType";
import {isPlayerLocationUpdate, PlayerLocationUpdate} from "../beangame/network/PlayerLocationUpdate";
import {IsometricEntityManager} from "../engine/entity/IsometricEntityManager";
import {WebsocketServer} from "./websocket/WebsocketServer";
import {ConnectionResponse} from "../beangame/network/ConnectionResponse";
import {EntitySpawner} from "../beangame/entity/EntitySpawner";
import {TileBoundIsometricEntity} from "../engine/entity/TileBoundIsometricEntity";
import {Hamster} from "../beangame/entity/Hamster";
import {Position} from "../engine/interface/Position";
import {NewPlayer} from "../beangame/network/NewPlayer";

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
    const currentPlayers = this.entityManager.entities.filter(e => e instanceof Hamster);

    const response: ConnectionResponse = {
      messageType: MessageType.ConnectionResponse,
      clientId: clientId,
      players: currentPlayers.map(p => ({
        id: p.id,
        originTileCoords: p.getCurrentTile().getCoords()
      }))
    };
    this.websocketServer.sendToClient(clientId, JSON.stringify(response));

    const startingPosition: Position = {x: 0, y: 0};
    const newPlayerNotification: NewPlayer = {
      messageType: MessageType.NewPlayer,
      id: clientId,
      originTileCoords: startingPosition
    };
    this.websocketServer.sendToAll(JSON.stringify(newPlayerNotification), clientId);

    this.entitySpawner.spawnHamsterNonPlayable(clientId, startingPosition);
  }

  handlePlayerDisconnect(clientId: string) {
    this.entitySpawner.despawnEntity(clientId);
  }

  private removePlayer(id: string) {
    const entity = this.entityManager.getEntityWithId(id);

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
    this.broadcastEntityPosition(entity);
  }

  private broadcastEntityPosition(entity: TileBoundIsometricEntity) {
    const update: PlayerLocationUpdate = {
      messageType: MessageType.PlayerLocationUpdate,
      id: entity.id,
      originTileCoords: entity.getCurrentTile().getCoords()
    };

    this.websocketServer.sendToAll(JSON.stringify(update), entity.id);
  }

}
