import {IsometricEntityManager} from "./IsometricEntityManager";
import {ClickManager} from "../mouse/ClickManager";

export class EntityClickManager {

  public constructor(private entityManager: IsometricEntityManager, private clickManager: ClickManager) {
  }

  public addTopDownEntityMouseListeners(): EntityClickManager {
    this.clickManager.addMouseDownListener((x, y) => {
      // this.entityManager.handleMouseDown(x, y);
    });

    this.clickManager.addMouseMoveListener((x, y) => {
      // this.entityManager.handleMouseMove(x, y);
    });

    this.clickManager.addMouseUpListener((x, y) => {
      // this.entityManager.handleMouseUp(x, y);
    });

    return this;
  }


}
