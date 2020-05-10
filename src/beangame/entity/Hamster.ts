import {resId} from "../ImageSources";
import {TileBoundEntity} from "../../engine/entity/TileBoundEntity";
import {EntityManager} from "../../engine/entity/EntityManager";

export class Hamster extends TileBoundEntity {

  imageIds = [resId.Hamster];

  constructor(protected entityManager: EntityManager) {
    super(entityManager);
    this.setZIndex(99999);
  }

}
