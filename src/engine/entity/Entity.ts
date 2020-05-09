import {Drawable} from "../interface/Drawable";
import * as uuidv1 from 'uuid/v1';
import {Updatable} from "../interface/Updatable";
import {ImagesById} from "../graphics/ImageResource";
import {ImageProvider} from "../graphics/ImageProvider";
import {Position} from "../interface/Position";

export abstract class Entity implements Drawable, Updatable {

  protected abstract imageIds: number[];
  protected images: ImagesById;
  protected currentImageId: number;

  private readonly _id: string = uuidv1();
  get id() { return this._id; }

  protected abstract _width: number;
  public get width() { return this._width }

  protected abstract _height: number;
  public get height() { return this._height }

  public position: Position = {x: 0, y: 0};

  public constructor() {
  }

  public setupImages(imageProvider: ImageProvider) {
    this.images = imageProvider.getImagesByResourceId(this.imageIds);
    this.currentImageId = this.imageIds[0];
  }

  public update(progress: number): void {
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (this.images[this.currentImageId]) {
      ctx.beginPath();
      ctx.strokeStyle = 'red';
      ctx.rect(this.position.x, this.position.y, this._width, this._height);
      ctx.stroke();
      ctx.drawImage(this.images[this.currentImageId], this.position.x, this.position.y, this._width, this._height);
    }
  }

  public contains(x: number, y: number): boolean {
    return y > this.position.y && y < this.position.y + this.height && x > this.position.x && x < this.position.x + this.width;
  }

  // Override this to hook in to on mouse down event
  public onMouseDown(x: number, y: number): void {
  }

  // Override this to hook in to mouse move event
  public onMouseMove(x: number, y: number): void {
  }

  // Override this to hook in to mouse move event
  public onMouseUp(x: number, y: number): void {
  }

  }
