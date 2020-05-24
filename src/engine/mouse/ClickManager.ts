import {IsometricEntityManager} from "../entity/IsometricEntityManager";
import {ClientCanvasManager} from "../canvas/ClientCanvasManager";
import {CanvasManager} from "../canvas/CanvasManager";

export class ClickManager {

  private readonly canvasManager: CanvasManager;
  private readonly entityManager: IsometricEntityManager;

  private mouseDownListeners: Listener[] = [];
  private mouseMoveListeners: Listener[] = [];
  private mouseUpListeners: Listener[] = [];

  constructor(canvasManager: CanvasManager, entityManager: IsometricEntityManager) {
    this.canvasManager = canvasManager;
    this.entityManager = entityManager;

    this.setupMouseListener('mousedown', 'touchstart', this.mouseDownListeners);
    this.setupMouseListener('mousemove', 'touchmove', this.mouseMoveListeners);
    this.setupMouseListener('mouseup', 'touchend', this.mouseUpListeners);
  }

  private setupMouseListener(mouseEventName: EventType, touchEventName: EventType, listeners: Listener[]) {
    // Handle both touch and mouse events
    this.canvasManager.addEventListener(touchEventName, (e: TouchEvent) => {
      e.preventDefault();
      const target = e.changedTouches[0];
      this.fireListeners(target.pageX, target.pageY, listeners);
    });

    this.canvasManager.addEventListener(mouseEventName, (e: MouseEvent) => {
      e.preventDefault();
      this.fireListeners(e.pageX, e.pageY, listeners);
    });
  }

  private fireListeners(pageX: number, pageY: number, listeners: Listener[]) {
    // Scale coordinates based on canvas scale factor
    const x = this.canvasManager.getScaledXCoord(pageX);
    const y = this.canvasManager.getScaledYCoord(pageY);

    for (let listener of listeners) {
      listener(x, y);
    }
  }

  public addMouseDownListener(listener: Listener) {
    this.mouseDownListeners.push(listener);
  }

  public addMouseMoveListener(listener: Listener) {
    this.mouseMoveListeners.push(listener);
  }

  public addMouseUpListener(listener: Listener) {
    this.mouseUpListeners.push(listener);
  }

}

type Listener = (x: number, y: number) => void;
type EventType = keyof HTMLElementEventMap;
