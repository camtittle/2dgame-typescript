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

  setHighlight(highlight: boolean) {
    this.highlightBorder = highlight;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);

    if (this.highlightBorder) {
      this.drawOutline(ctx, 'white');
    }
  }

  private drawOutline(ctx: CanvasRenderingContext2D, strokeStyle: string) {
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.moveTo(this.position.x + this.width/2, this.position.y + 1);
    ctx.lineTo(this.position.x + this.width - 1, this.position.y + this.height / 2);
    ctx.moveTo(this.position.x + this.width, this.position.y + this.height / 2 - 1);
    ctx.lineTo(this.position.x + this.width/2, this.position.y + this.height - 1);
    ctx.moveTo(this.position.x + this.width/2 + 1, this.position.y + this.height);
    ctx.lineTo(this.position.x + 1, this.position.y + this.height/2);
    ctx.moveTo(this.position.x + 1, this.position.y + this.height/2);
    ctx.lineTo(this.position.x + this.width/2, this.position.y + 1);
    ctx.stroke();
  }

}
