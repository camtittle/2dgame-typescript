import {Position} from "../interface/Position";
import {SpriteDrawable} from "../graphics/SpriteDrawable";
import {DrawableManager} from "../DrawableManager";

export abstract class Tile extends SpriteDrawable {

  private coords: Position;
  private elevation = 0; // in units of tileHeight

  constructor(coords: Position, drawableManager: DrawableManager) {
    super(drawableManager);
    this.coords = coords;
    this.init();
  }

  protected init() {
  }

  // Second pass of drawing, called after all tiles main draw method have been called
  drawOverlay(ctx: CanvasRenderingContext2D): void {
  }

  public getCoords(): Position {
    return {x: this.coords.x, y: this.coords.y};
  }

  public setSize(width: number, height?: number) {
    this.width = width;
    this.height = height === undefined ? width : height;
    this.recalcZIndex();
  }

  public setPosition(position: Position) {
    super.setPosition(position);
    this.recalcZIndex();
  }

  public recalcZIndex() {
    const pos = this.getCoords();
    this.setZIndex(pos.x + pos.y + this.elevation);
    this.drawableManager.refreshZIndexesOnNextUpdate();
  }

  // Requires a board refresh
  public setElevation(elevation: number) {
    this.elevation = elevation;
  }

  public getElevation(): number {
    return this.elevation;
  }


}

