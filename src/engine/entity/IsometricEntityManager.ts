import {TileBoundIsometricEntity} from "./TileBoundIsometricEntity";

export class IsometricEntityManager {

  // Entities stores sorted by zIndex
  public entities: TileBoundIsometricEntity[] = [];

  private shouldRefreshZIndeces = false;

  public constructor() {
    this.entities = [];
  }

  public drawEntities(ctx: CanvasRenderingContext2D): void {
    for (let entity of this.entities) {
      entity.draw(ctx);
    }
  }

  public updateEntities(progress: number): void {
    if (this.shouldRefreshZIndeces) {
      this.sortEntitiesByZIndex();
    }

    for (let entity of this.entities) {
      entity.update(progress);
    }
  }

  public register(entity: TileBoundIsometricEntity) {
    this.entities.push(entity);
    this.refreshZIndecesOnNextUpdate();
  }

  public sortEntitiesByZIndex() {
    // Keep entities sorted by z-index
    this.entities.sort((a, b) => {
      return a.getZIndex() - b.getZIndex();
    });
    this.shouldRefreshZIndeces = false;
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

  // Notifies IsometricEntityManager to resort the entity list by Z-index on next update
  public refreshZIndecesOnNextUpdate() {
    this.shouldRefreshZIndeces = true;
  }

}
