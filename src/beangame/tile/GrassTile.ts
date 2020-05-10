import {resId} from "../ImageSources";
import {Tile} from "../../engine/board/Tile";
import {Position} from "../../engine/interface/Position";

export class GrassTile extends Tile {

  protected imageIds: number[] = [resId.Grass];
  private highlightBorder = false;

  draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
    if (this.highlightBorder) {
      this.drawOutline(ctx, 'white');
    }
  }

  setHighlight(highlight: boolean) {
    this.highlightBorder = highlight;
    this.setZIndex(highlight ? 1 : 0);
  }

  private drawOutline(ctx: CanvasRenderingContext2D, strokeStyle: string) {
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.moveTo(this.position.x + this.width/2, this.position.y);
    ctx.lineTo(this.position.x + this.width, this.position.y + this.height / 2);
    ctx.moveTo(this.position.x + this.width, this.position.y + this.height / 2);
    ctx.lineTo(this.position.x + this.width/2, this.position.y + this.height);
    ctx.moveTo(this.position.x + this.width/2, this.position.y + this.height);
    ctx.lineTo(this.position.x, this.position.y + this.height/2);
    ctx.moveTo(this.position.x, this.position.y + this.height/2);
    ctx.lineTo(this.position.x + this.width/2, this.position.y);
    ctx.stroke();
  }

  onMouseOver(x: number, y: number): void {
    super.onMouseOver(x, y);
    this.setHighlight(true);
  }

  onMouseOff(x: number, y: number): void {
    super.onMouseOff(x, y);
    this.setHighlight(false);
  }

}
