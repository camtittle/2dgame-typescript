import {Dimensions} from "./interface/Dimensions";

export class CanvasManager {

  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  private readonly bgColor = "#cccccc";

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  public getWidth() {
    return this.canvas.width;
  }

  public getHeight() {
    return this.canvas.height;
  }

  public getScaledDimensions(): Dimensions {
    const sf = this.getCanvasScaleFactor();
    return {
      width: this.canvas.width * sf,
      height: this.canvas.height * sf
    }
  }

  public getScaledXCoord(pageX: number) {
    const sf = this.getCanvasScaleFactor();
    return (pageX - this.canvas.offsetLeft) / sf;
  }

  public getScaledYCoord(pageY: number) {
    const sf = this.getCanvasScaleFactor();
    return (pageY - this.canvas.offsetTop) / sf;
  }

  public getContext() {
    return this.ctx;
  }

  public clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public drawBg(): void {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fill();
  }

  public addEventListener<K extends keyof HTMLElementEventMap>(eventType: K, handler: (e: HTMLElementEventMap[K]) => any) {
    this.canvas.addEventListener(eventType, handler);
  }

  private getCanvasScaleFactor(): number {
    const bounds = this.canvas.getBoundingClientRect();
    return bounds.height / this.canvas.height;
  }


}
