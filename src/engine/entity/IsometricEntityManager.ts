import {TileBoundIsometricEntity} from "./TileBoundIsometricEntity";

export class IsometricEntityManager {

  // Entities stores sorted by zIndex
  public entities: TileBoundIsometricEntity[] = [];

  public constructor() {
    this.entities = [];
  }

  public updateEntities(progress: number): void {
    for (let entity of this.entities) {
      entity.update(progress);
    }
  }

  public register(entity: TileBoundIsometricEntity) {
    this.entities.push(entity);
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

}
