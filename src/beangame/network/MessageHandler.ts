import {Message} from "./Message";
import {MessageType} from "./MessageType";
import {ConnectionResponse} from "./ConnectionResponse";
import {EntitySpawner} from "../entity/EntitySpawner";
import {ClientNetworkManager} from "../../engine/network/ClientNetworkManager";
import {PlayerLocationUpdate} from "./PlayerLocationUpdate";
import {IsometricEntityManager} from "../../engine/entity/IsometricEntityManager";
import {NewPlayer} from "./NewPlayer";

export class MessageHandler {

  constructor(private entitySpawner: EntitySpawner,
              private entityManager: IsometricEntityManager,
              private networkManager: ClientNetworkManager) {}

  handleMessage(msg: Message) {
    switch (msg.messageType) {
      case MessageType.ConnectionResponse: {
        this.handleConnectionResponse(msg as ConnectionResponse);
        break;
      }
      case MessageType.PlayerLocationUpdate: {
        this.handlePlayerLocationUpdate(msg as PlayerLocationUpdate);
        break;
      }
      case MessageType.NewPlayer: {
        this.handleNewPlayerNotification(msg as NewPlayer);
        break;
      }
    }
  }

  private handleConnectionResponse(msg: ConnectionResponse) {
    this.entitySpawner.spawnHamsterPlayable(msg.clientId, this.networkManager);
    msg.players.forEach(player => {
      this.entitySpawner.spawnHamsterNonPlayable(player.id, player.originTileCoords);
    });
  }

  private handlePlayerLocationUpdate(msg: PlayerLocationUpdate) {
    const entity = this.entityManager.getEntityWithId(msg.id);
    if (entity) {
      entity.setOriginTileCoordinates(msg.originTileCoords);
    }
  }

  private handleNewPlayerNotification(msg: NewPlayer) {
    this.entitySpawner.spawnHamsterNonPlayable(msg.id, msg.originTileCoords);
  }

}
