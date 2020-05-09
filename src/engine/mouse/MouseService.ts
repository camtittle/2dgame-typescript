import {CanvasManager} from "../CanvasManager";

export class MouseService {

  private _x = 0;
  public get x() { return this._x; }

  private _y = 0;
  public get y() { return this._y; }

  constructor(private readonly canvasManager: CanvasManager) {
    window.onmousemove = (event: MouseEvent) => {
      event.preventDefault();
      this.updateMousePos(event.pageX, event.pageY);
    };

    window.ontouchmove = (event: TouchEvent) => {
      event.preventDefault();
      const touch = event.touches[0];
      this.updateMousePos(touch.pageX, touch.pageY);
    };
  }

  private updateMousePos(x: number, y: number) {
    this._x = this.canvasManager.getScaledXCoord(x);
    this._y = this.canvasManager.getScaledYCoord(y);

  }
}
