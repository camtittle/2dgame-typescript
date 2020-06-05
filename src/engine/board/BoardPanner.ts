import {IsometricBoard} from "./IsometricBoard";
import {ClickManager} from "../mouse/ClickManager";
import {CanvasManager} from "../canvas/CanvasManager";
import {Position} from "../interface/Position";
import {Dimensions} from "../interface/Dimensions";
import {Updatable} from "../interface/Updatable";
import {IsometricEntityManager} from "../entity/IsometricEntityManager";

export class BoardPanner implements Updatable {

  private edgeThresholdPercentage = 0.05;
  private panInterval = 10;
  private currentPanDirection = PanDirection.None;


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
      let newPanMode: PanDirection;

      if (this.isLeftEdge(mousePos, canvasSize)) {
        this.currentPanDirection = PanDirection.Left;
      } else if (this.isRightEdge(mousePos, canvasSize)) {
        this.currentPanDirection = PanDirection.Right;
      } else {
        this.currentPanDirection = PanDirection.None;
      }

    });

  }

  private isLeftEdge(mouse: Position, canvasSize: Dimensions): boolean {
    return mouse.x / canvasSize.width < this.edgeThresholdPercentage;
  }

  private isRightEdge(mouse: Position, canvasSize: Dimensions): boolean {
    return (canvasSize.width - mouse.x) / canvasSize.width < this.edgeThresholdPercentage;
  }

  update(progress: number): void {
    const boardPos = this.board.getBoardPosition();
    if (this.currentPanDirection === PanDirection.Left) {
      boardPos.x += this.panInterval;
      this.board.setBoardPosition(boardPos);
      this.entityManager.refreshPositions();
    } else if (this.currentPanDirection === PanDirection.Right) {
      boardPos.x -= this.panInterval;
      this.board.setBoardPosition(boardPos);
      this.entityManager.refreshPositions();
    }

  }

}

export enum PanDirection {
  None,
  Left,
  Right
}
