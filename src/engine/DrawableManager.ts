import {Drawable} from "./interface/Drawable";

export class DrawableManager {

  private readonly drawables: Drawable[];

  public constructor() {
    this.drawables = [];
  }

  public registerDrawable(drawable: Drawable) {
    this.drawables.push(drawable);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    for (let drawable of this.drawables) {
      drawable.draw(ctx);
    }
  }

}
