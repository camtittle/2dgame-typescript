import {Drawable} from "../interface/Drawable";
import {ImageMap} from "./ImageResource";
import {Position} from "../interface/Position";
import {ImageProvider} from "./ImageProvider";
import {Intersectable} from "../interface/Intersectable";
import {MouseBehaviour} from "../interface/MouseBehaviour";

export abstract class SpriteDrawable implements Drawable, Intersectable {

  protected showDebugOutline = false;

  // Image stuff
  protected abstract resourceIds: string[];
  protected resources: ImageMap;
  protected currentImage: HTMLImageElement;

  // Canvas coordinates
  public width: number;
  public height: number;
  protected position: Position = {x: 0, y: 0};

  // Mouse behaviours
  private mouseDownBehaviours: MouseBehaviour[] = [];
  private mouseEnterBehaviours: MouseBehaviour[] = [];
  private mouseLeaveBehaviours: MouseBehaviour[] = [];

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.currentImage) {
      if (this.showDebugOutline) {
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.rect(this.position.x, this.position.y, this.width, this.height);
        ctx.stroke();
      }

      ctx.drawImage(this.currentImage, this.position.x, this.position.y, this.width, this.height);
    }
  }

  // Uses ImageProvider to get defined internal image resources
  public setupResources(imageProvider: ImageProvider) {
    this.resources = imageProvider.getImagesByResourceId(this.resourceIds);
    this.setCurrentImageToDefault();
  }

  // Directly sets the image resources, bypassing defined internal resources
  public setResources(images: ImageMap) {
    this.resources = images;
    this.resourceIds = Object.keys(images);
    this.setCurrentImageToDefault();
  }

  private setCurrentImageToDefault() {
    let resource = this.resources[this.resourceIds[0]];
    while (!this.isImage(resource)) {
      resource = resource[Object.keys(resource)[0]];
    }
    this.currentImage = resource;
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

  protected getImageResource(resourceId: string): HTMLImageElement {
    const image = this.resources[resourceId];
    if ('src' in image) {
      return image as HTMLImageElement;
    } else {
      throw new Error(`Error: Attempt to get image with Resource ID ${resourceId}, found collection of resources`);
    }
  }

  protected isImage(resource: ImageMap | HTMLImageElement): resource is HTMLImageElement{
    return 'src' in resource;
  }

}
