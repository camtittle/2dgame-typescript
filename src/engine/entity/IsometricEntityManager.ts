import {TileBoundIsometricEntity} from "./TileBoundIsometricEntity";
import {Updatable} from "../interface/Updatable";

export class IsometricEntityManager implements Updatable {

  // Entities stores sorted by zIndex
  public entities: TileBoundIsometricEntity[] = [];

  public constructor() {
    this.entities = [];
  }

  public update(progress: number): void {
    for (let entity of this.entities) {
      entity.update(progress);
    }
  }

  public register(entity: TileBoundIsometricEntity) {
    this.entities.push(entity);
  }

  public deregister(id: string) {
    const index = this.entities.findIndex(e => e.id === id);
    if (index >= 0) this.entities.splice(index, 1);
  }

  public getIntersectingEntities(x: number, y: number): TileBoundIsometricEntity[] {
    const entities: TileBoundIsometricEntity[] = [];
    for (let entity of this.entities) {
      const pos = entity.getPosition();
      if (pos.x < x && pos.x+entity.width > x &&
        pos.y < y && pos.y+entity.height > y) {
        entities.push(entity);
      }
    }

    return entities;
  }

  public getEntityWithId(id: string) {
    for (let entity of this.entities) {
      if (entity.id === id) return entity;
    }

    return null;
  }

  public refreshPositions() {
    this.entities.forEach(e => e.recalcSizeAndPosition())
  }

}
