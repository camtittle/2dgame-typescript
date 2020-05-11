import {resId} from "../ImageSources";
import {IsometricEntityManager} from "../../engine/entity/IsometricEntityManager";
import {IsometricBoard} from "../../engine/board/IsometricBoard";
import {TileBoundIsometricEntity} from "../../engine/entity/TileBoundIsometricEntity";

export class Hamster extends TileBoundIsometricEntity {

  imageIds = [resId.Hamster];

  constructor(board: IsometricBoard, entityManager: IsometricEntityManager) {
    super(board, entityManager);
    this.setZIndex(3);
  }

}
