import {Entity} from "../../engine/entity/Entity";
import {resId} from "../ImageSources";
import Jeremy from "./Jeremy";
import {EntityManager} from "../../engine/entity/EntityManager";

export class Coin extends Entity {
  protected _height: number = 150;
  protected _width: number = 150;

  protected currentImageId: number = resId.Money;
  imageIds = [resId.Money];

  private entityManager: EntityManager;

  private coinSource: CoinSource;
  private followCursor: boolean;

  constructor(entityManager: EntityManager, source: CoinSource, followCursor: boolean) {
    super();
    this.entityManager = entityManager;
    this.coinSource = source;
    this.followCursor = followCursor;
  }

  public update(progress: number): void {
    super.update(progress);
  }

  public onMouseMove(x: number, y: number): void {
    super.onMouseMove(x, y);

    if (this.followCursor) {
      this.position.x = x - this._width / 2;
      this.position.y = y - this._height / 2;
    }
  }

  public onMouseUp(x: number, y: number) {
    super.onMouseUp(x, y);

    if (this.followCursor) {
      this.followCursor = false;
    }

    // Identify where the coin has been dropped
    const droppedOnto = this.entityManager.getIntersectingEntities(x, y);
    if (droppedOnto.findIndex(entity => entity instanceof Jeremy) >= 0) {
      console.log('COLLISION ' + x + y);
      this.addCoinToBank();
    }
  }

  private addCoinToBank() {
    // this.scoreManager.doSomething
  }

}

export enum CoinSource {
  Person,
  Bank
}
