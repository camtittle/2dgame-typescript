import {Position} from "../interface/Position";
import {SpriteDrawable} from "../graphics/SpriteDrawable";

export abstract class Tile extends SpriteDrawable {

  id: string;
  private coords: Position;
  private zIndex: number = 0;
  private elevation = 0; // in units of tileHeight

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

  public setElevation(elevation: number) {
    const elevationDiff = (this.elevation - elevation) * this.height / 2;
    this.elevation = elevation;
    const oldPos = this.getPosition();
    this.setPosition({x: oldPos.x, y: oldPos.y + elevationDiff});
  }

  private refreshElevation() {

  }

}

