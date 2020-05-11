import {Position} from "../interface/Position";
import {SpriteDrawable} from "../graphics/SpriteDrawable";

export abstract class Tile extends SpriteDrawable {

  id: string;
  private coords: Position;

  constructor(coords: Position) {
    super();
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
  }

  public setZIndex(zIndex: number) {
  }

}

