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
  private username: string;

  resourceId = resourceId.Hamster;

  protected init() {
    super.init();
    this.setZIndex(0.3);
    this.setTileFootprint(1, 1, 1);
    this.setOrientationSupport(OrientationSupport.EightWay);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
    this.drawNickname(ctx);
  }

  private drawNickname(ctx: CanvasRenderingContext2D) {
    ctx.font = "15px Arial";
    const yPos = this.position.y - 10;
    const xPos = this.position.x + this.width / 2;
    const textWidth = ctx.measureText(this.username).width;
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(xPos - (textWidth / 2) - 4, yPos - 14, textWidth + 8, 19);

    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(this.username, xPos, yPos);
  }

  protected canMoveBetweenTiles(from: Tile, to: Tile): boolean {
    return super.canMoveBetweenTiles(from, to) &&
      (from.getElevation() >= to.getElevation() || this.isWalkingUpRamp(from, to));
  }

  private isWalkingUpRamp(from: Tile, to: Tile): boolean {
    return to.getElevation() - from.getElevation() === 1 &&
      this.entityManager.getEntitiesInTile(from).findIndex(e => e.getLabel() === 'ramp') > -1
  }

  public setNetworkManager(nm: ClientNetworkManager) {
    this.networkManager = nm;
  }

  public setPlayable(playable: boolean) {
    this.playable = playable;
  }

  public setDestinationTile(tile: Tile) {
    super.setDestinationTile(tile);
    this.sendLocationUpdateToServer();
  }

  public setUsername(username: string) {
    this.username = username;
  }

  public getUsername(): string {
    return this.username;
  }

  private sendLocationUpdateToServer() {
    if (this.playable && !this.networkManager) {
      console.warn('Cannot send location update - no network manager provided to hamster entity');
      return;
    } else if (!this.playable) {
      return;
    }

    const update: PlayerLocationUpdate = {
      id: this.id,
      messageType: MessageType.PlayerLocationUpdate,
      destinationTileCoords: this.getDestinationTile().getCoords()
    };
    this.networkManager.send(update);
  }

}
