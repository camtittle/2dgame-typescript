import {Position} from "../interface/Position";
import {SpriteDrawable} from "../graphics/SpriteDrawable";
import {DrawableManager} from "../DrawableManager";

export abstract class Tile extends SpriteDrawable {

  private coords: Position;
  private elevation = 0; // in units of half-tileHeight
  private depth = 0;     // in units of half-tileHeight

  constructor(coords: Position, drawableManager: DrawableManager) {
    super(drawableManager);
    this.coords = coords;
    this.init();
  }

  protected init() {
  }

  protected drawImage(ctx: CanvasRenderingContext2D) {
    const depthDiff = this.depth * this.height / 2;
    ctx.drawImage(this.currentImage, this.position.x, this.position.y, this.width, this.height + depthDiff);
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

  public setDepth(depth: number) {
    this.depth = depth;
  }

  public getDepth(): number {
    return this.depth;
  }


}

