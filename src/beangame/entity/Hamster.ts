import {TileBoundIsometricEntity} from "../../engine/entity/TileBoundIsometricEntity";
import {OrientationSupport} from "../../engine/entity/Orientation";
import {resourceId} from "../ResourceIds";
import {Tile} from "../../engine/board/Tile";
import {ClientNetworkManager} from "../../engine/network/ClientNetworkManager";
import {PlayerLocationUpdate} from "../network/PlayerLocationUpdate";
import {MessageType} from "../network/MessageType";

export class Hamster extends TileBoundIsometricEntity {

  private networkManager: ClientNetworkManager;

  resourceId = resourceId.Hamster;

  protected init() {
    super.init();
    this.setZIndex(0.3);
    this.setTileFootprint(1, 1, 1);
    this.setOrientationSupport(OrientationSupport.EightWay);
  }

  public setNetworkManager(nm: ClientNetworkManager) {
    this.networkManager = nm;
  }

  public setOriginTile(tile: Tile) {
    super.setOriginTile(tile);
    this.sendLocationUpdateToServer();
  }

  private sendLocationUpdateToServer() {
    if (!this.networkManager) {
      console.warn('Cannot send location update - no network manager provided to hamster entity');
      return;
    }

    const update: PlayerLocationUpdate = {
      messageType: MessageType.ConnectionResponse,
      originTileCoords: this.getCurrentTile().getCoords()
    };
    this.networkManager.send(update);
  }

}
