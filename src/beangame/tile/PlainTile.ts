import {resourceId} from "../ImageSources";
import {Tile} from "../../engine/board/Tile";

export class PlainTile extends Tile {

  protected resourceId = resourceId.Grass;
  private highlightBorder = false;

  protected init() {
    super.init();

    this.addMouseEnterBehaviour((x: number, y: number) => {
      this.setHighlight(true);
    });

    this.addMouseLeaveBehaviour((x: number, y: number) => {
      this.setHighlight(false);
    })
  }

  drawOverlay(ctx: CanvasRenderingContext2D): void {
    if (this.highlightBorder) {
      this.drawOutline(ctx, 'white');
    }
  }

  setHighlight(highlight: boolean) {
    this.highlightBorder = highlight;
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

}
