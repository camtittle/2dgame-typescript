import {Entity} from "../../engine/entity/Entity";
import {resId} from "../ImageSources";
import {EntityManager} from "../../engine/entity/EntityManager";

export class Hamster extends Entity {
  protected _height: number = 300;
  protected _width: number = 300;

  protected currentImageId = resId.Hamster;
  imageIds = [resId.Hamster];

  private readonly entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    super();
    this.entityManager = entityManager;
    console.log('Spawning hamster');
  }

  update(progress: number) {
    // this.x += this.velocity * progress;
  }

  public onMouseDown(x: number, y: number): void {
    console.log(x, y);
    this.position.x = x - this._width / 2;
    this.position.y = y - this._height / 2;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
  }

}
