import {Drawable} from "../../engine/interface/Drawable";
import {ImagesById} from "../../engine/graphics/ImageResource";

export class Scorebar implements Drawable {

  private currentScore = 0;

  private x = 0;
  private y = 0;
  private readonly width: number = 0;
  private readonly height: number = 150;
  private readonly font = '100px Arial';
  private readonly bgColor = '#cd700a';
  private readonly textColor = '#fff';

  public constructor(width: number, startingScore: number) {
    this.width = width;
    this.currentScore = startingScore;
  }

  imageIds: number[];

  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.bgColor;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.fillStyle = this.textColor;
    context.font = this.font;
    context.textBaseline = 'middle';
    context.textAlign = 'left';
    context.fillText('' + this.currentScore, 35, 85);
  }

  setImages(images: ImagesById): void {
  }

  public setScore(score: number) {
    console.log('score = ' + this.currentScore);
    this.currentScore = score;
  }


}
