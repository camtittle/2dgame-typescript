import {Dimensions} from "../interface/Dimensions";

export interface CanvasManager {
  getWidth(): number;
  getHeight(): number;
  getScaledDimensions(): Dimensions;
  getScaledXCoord(pageX: number): number;
  getScaledYCoord(pageY: number): number;
  clear(): void;
  drawBg(): void;
  addEventListener<K extends keyof HTMLElementEventMap>(eventType: K, handler: (e: HTMLElementEventMap[K]) => any): void;
}
