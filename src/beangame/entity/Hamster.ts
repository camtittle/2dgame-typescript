import {TileBoundIsometricEntity} from "../../engine/entity/TileBoundIsometricEntity";
import {OrientationSupport} from "../../engine/entity/Orientation";
import {resourceId} from "../ResourceIds";
import {Tile} from "../../engine/board/Tile";
import {ClientNetworkManager} from "../../engine/network/ClientNetworkManager";
import {PlayerLocationUpdate} from "../network/PlayerLocationUpdate";
import {MessageType} from "../network/MessageType";

export class Hamster extends TileBoundIsometricEntity {

  private networkManager: ClientNetworkManager;
  private playable = false;

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

  public setPlayable(playable: boolean) {
    this.playable = playable;
  }

  public setOriginTile(tile: Tile) {
    super.setOriginTile(tile);
    this.sendLocationUpdateToServer();
  }

  private sendLocationUpdateToServer() {
    if (this.playable && !this.networkManager) {
      console.warn('Cannot send location update - no network manager provided to hamster entity');
      return;
    } else if (!this.playable) {
      return;
    }

    const update: PlayerLocationUpdate = {
      messageType: MessageType.PlayerLocationUpdate,
      originTileCoords: this.getCurrentTile().getCoords()
    };
    this.networkManager.send(update);
  }

}
