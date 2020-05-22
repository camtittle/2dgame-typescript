export interface Drawable {

  draw(context: CanvasRenderingContext2D): void;

  getZIndex(): number;
  setZIndex(index: number): void;

}
