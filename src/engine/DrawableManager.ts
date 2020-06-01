import {Drawable} from "./interface/Drawable";

export class DrawableManager {

  private readonly drawables: Drawable[];

  private shouldRefreshZIndexes = false;

  public constructor() {
    this.drawables = [];
  }

  public registerDrawable(drawable: Drawable) {
    this.drawables.push(drawable);
    this.refreshZIndexesOnNextUpdate();
  }

  public deregisterDrawable(drawable: Drawable) {
    const index = this.drawables.indexOf(drawable);
    if (index >= 0) this.drawables.splice(index, 1);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (this.shouldRefreshZIndexes) {
      this.sortByZIndex();
      this.shouldRefreshZIndexes = false;
    }

    for (let drawable of this.drawables) {
      drawable.draw(ctx);
    }
  }

  public sortByZIndex() {
    // Keep entities sorted by z-index
    this.drawables.sort((a, b) => {
      return a.getZIndex() - b.getZIndex();
    });
  }

  // Notifies DrawableManager to re-sort the entity list by Z-index on next update
  public refreshZIndexesOnNextUpdate() {
    this.shouldRefreshZIndexes = true;
  }

}
