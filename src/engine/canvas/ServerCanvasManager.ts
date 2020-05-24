import {CanvasManager} from "./CanvasManager";
import {Dimensions} from "../interface/Dimensions";

/**
 * This implementation of CanvasManager simply returns dummy values. It is used when running the game in server mode
 */
export class ServerCanvasManager implements CanvasManager {
  addEventListener<K extends keyof HTMLElementEventMap>(eventType: K, handler: (e: HTMLElementEventMap[K]) => any): void {
  }

  clear(): void {
  }

  drawBg(): void {
  }

  getHeight(): number {
    return 500;
  }

  getWidth(): number {
    return 500;
  }

  getScaledDimensions(): Dimensions {
    return {width: 500, height: 500};
  }

  getScaledXCoord(pageX: number): number {
    return pageX;
  }

  getScaledYCoord(pageY: number): number {
    return pageY;
  }

}
