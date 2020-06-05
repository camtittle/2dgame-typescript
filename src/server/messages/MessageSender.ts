import {TileBoundIsometricEntity} from "../../engine/entity/TileBoundIsometricEntity";
import {PlayerLocationUpdate} from "../../beangame/network/PlayerLocationUpdate";
import {MessageType} from "../../beangame/network/MessageType";
import {WebsocketServer} from "../websocket/WebsocketServer";
import {Hamster} from "../../beangame/entity/Hamster";
import {NewPlayer} from "../../beangame/network/NewPlayer";
import {ConnectionResponse} from "../../beangame/network/ConnectionResponse";
import {PlayerDisconnect} from "../../beangame/network/PlayerDisconnect";

export class MessageSender {

  constructor(private websocketServer: WebsocketServer) {}

  sendConnectionResponse(currentPlayers: Hamster[], clientId: string, username: string) {
    const response: ConnectionResponse = {
      messageType: MessageType.ConnectionResponse,
      clientId: clientId,
      username: username,
      players: currentPlayers.map(p => ({
        id: p.id,
        username: p.getUsername(),
        originTileCoords: p.getCurrentTile().getCoords()
      }))
    };
    this.websocketServer.sendToClient(clientId, JSON.stringify(response));
  }

  broadcastNewPlayer(player: Hamster) {
    const newPlayerNotification: NewPlayer = {
      messageType: MessageType.NewPlayer,
      id: player.id,
      username: player.getUsername(),
      originTileCoords: player.getCurrentTile().getCoords()
    };
    this.websocketServer.sendToAll(JSON.stringify(newPlayerNotification), player.id);
  }

  broadcastPlayerDisconnect(clientId: string) {
    const notification: PlayerDisconnect = {
      messageType: MessageType.PlayerDisconnect,
      clientId: clientId
    };
    this.websocketServer.sendToAll(JSON.stringify(notification), clientId);
  }

  broadcastEntityPosition(entity: TileBoundIsometricEntity) {
    const update: PlayerLocationUpdate = {
      messageType: MessageType.PlayerLocationUpdate,
      id: entity.id,
      destinationTileCoords: entity.getDestinationTile().getCoords()
    };

    this.websocketServer.sendToAll(JSON.stringify(update), entity.id);
  }
}
