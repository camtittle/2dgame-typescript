import {IsometricBoard} from "./IsometricBoard";
import {ClickManager} from "../mouse/ClickManager";
import {CanvasManager} from "../canvas/CanvasManager";
import {Position} from "../interface/Position";
import {Dimensions} from "../interface/Dimensions";
import {Updatable} from "../interface/Updatable";
import {IsometricEntityManager} from "../entity/IsometricEntityManager";

export class BoardPanner implements Updatable {

  private edgeThresholdPercentage = 0.05;
  private panIntervalPercent = 0.01;  // configurable
  private currentPanDirection = PanDirection.None;
  private panInterval = 0;

  constructor(private board: IsometricBoard,
              private clickManager: ClickManager,
              private entityManager: IsometricEntityManager) {
  }

  enableCanvasEdgePanning(canvasManager: CanvasManager) {
    if (!this.board || !this.clickManager) {
      throw new Error('Cannot set up board panning. Missing Board or ClickManager');
    }

    this.clickManager.addMouseMoveListener((x, y) => {

      const mousePos: Position = {x, y};
      const canvasSize: Dimensions = {width: canvasManager.getWidth(), height: canvasManager.getHeight()};

      if (this.isLeftEdge(mousePos, canvasSize)) {
        this.currentPanDirection = PanDirection.Left;
      } else if (this.isRightEdge(mousePos, canvasSize)) {
        this.currentPanDirection = PanDirection.Right;
      } else if (this.isTopEdge(mousePos, canvasSize)) {
        this.currentPanDirection = PanDirection.Up;
      } else if (this.isBottomEdge(mousePos, canvasSize)) {
        this.currentPanDirection = PanDirection.Down;
      } else {
        this.currentPanDirection = PanDirection.None;
      }

      this.panInterval = canvasSize.width * this.panIntervalPercent;

    });

  }

  private isLeftEdge(mouse: Position, canvasSize: Dimensions): boolean {
    return mouse.x / canvasSize.width < this.edgeThresholdPercentage;
  }

  private isRightEdge(mouse: Position, canvasSize: Dimensions): boolean {
    return (canvasSize.width - mouse.x) / canvasSize.width < this.edgeThresholdPercentage;
  }

  private isTopEdge(mouse: Position, canvasSize: Dimensions): boolean {
    return mouse.y / canvasSize.height < this.edgeThresholdPercentage;
  }

  private isBottomEdge(mouse: Position, canvasSize: Dimensions): boolean {
    return (canvasSize.height - mouse.y) / canvasSize.height < this.edgeThresholdPercentage;
  }

  update(progress: number): void {
    const boardPos = this.board.getBoardPosition();

    let changed = true;
    switch (this.currentPanDirection) {
      case PanDirection.Left:  boardPos.x += this.panInterval; break;
      case PanDirection.Right: boardPos.x -= this.panInterval; break;
      case PanDirection.Up:    boardPos.y += this.panInterval; break;
      case PanDirection.Down:  boardPos.y -= this.panInterval; break;
      default: changed = false;
    }

    if (changed) {
      this.board.setBoardPosition(boardPos);
      this.entityManager.refreshPositions();
    }
  }

}

export enum PanDirection {
  None,
  Left,
  Right,
  Up,
  Down
}
