import {Entity} from "./Entity";
import {Hamster} from "../../beangame/entity/Hamster";

export class EntityManager {

  // Entities stores sorted by zIndex
  public entities: Entity[] = [];

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

  public register(entity: Entity) {
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

  public getIntersectingEntities(x: number, y: number): Entity[] {
    const entities: Entity[] = [];
    for (let entity of this.entities) {
      const pos = entity.getPosition();
      if (pos.x < x && pos.x+entity.width > x &&
        pos.y < y && pos.y+entity.height > y) {
        entities.push(entity);
      }
    }

    return entities;
  }

  public handleMouseDown(x: number, y: number) {
    this.entities.forEach(entity => {
      if (entity.contains(x, y)) {
        entity.onMouseDown(x, y);
      }
    });
  }

  public handleMouseUp(x: number, y: number) {
    this.entities.forEach(entity => {
        entity.onMouseUp(x, y);
    });
  }

  public handleMouseMove(x: number, y: number) {
    this.entities.forEach(entity => {
        entity.onMouseMove(x, y);
    });
  }

  // Notifies EntityManager to resort the entity list by Z-index on next update
  public refreshZIndecesOnNextUpdate() {
    this.shouldRefreshZIndeces = true;
  }

}
