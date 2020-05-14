import {Drawable} from "../interface/Drawable";
import {ImagesById} from "./ImageResource";
import {Position} from "../interface/Position";
import {ImageProvider} from "./ImageProvider";
import {Intersectable} from "../interface/Intersectable";
import {MouseBehaviour} from "../interface/MouseBehaviour";

export abstract class SpriteDrawable implements Drawable, Intersectable {

  protected showDebugOutline = false;

  // Image stuff
  protected abstract imageIds: number[];
  protected images: ImagesById;
  protected currentImageId: number;

  // Canvas coordinates
  public width: number;
  public height: number;
  protected position: Position = {x: 0, y: 0};

  // Mouse behaviours
  private mouseDownBehaviours: MouseBehaviour[] = [];
  private mouseEnterBehaviours: MouseBehaviour[] = [];
  private mouseLeaveBehaviours: MouseBehaviour[] = [];

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.images[this.currentImageId]) {
      if (this.showDebugOutline) {
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.rect(this.position.x, this.position.y, this.width, this.height);
        ctx.stroke();
      }
      ctx.drawImage(this.images[this.currentImageId], this.position.x, this.position.y, this.width, this.height);
    }
  }

  public setupImages(imageProvider: ImageProvider) {
    this.images = imageProvider.getImagesByResourceId(this.imageIds);
    this.currentImageId = this.imageIds[0];
  }

  public getPosition(): Position {
    return this.position;
  }

  public setPosition(position: Position) {
    this.position.x = position.x;
    this.position.y = position.y;
  }

  public intersects(x: number, y: number): boolean {
    return y > this.position.y && y < this.position.y + this.height
      && x > this.position.x && x < this.position.x + this.width;
  }

  public addMouseEnterBehaviour(behaviour: MouseBehaviour) { this.mouseEnterBehaviours.push(behaviour) }
  public triggerMouseEnter(x: number, y: number): void {
    for (let b of this.mouseEnterBehaviours) {
      b.bind(this)(x, y);
    }
  }

  public addMouseLeaveBehaviour(behaviour: MouseBehaviour) { this.mouseLeaveBehaviours.push(behaviour) }
  public triggerMouseLeave(x: number, y: number): void {
    for (let b of this.mouseLeaveBehaviours) {
      b.bind(this)(x, y);
    }
  }

  public addMouseDownBehaviour(behaviour: MouseBehaviour) { this.mouseDownBehaviours.push(behaviour) }
  public triggerMouseDown(x: number, y: number): void {
    for (let b of this.mouseDownBehaviours) {
      b.bind(this)(x, y);
    }
  }

}
