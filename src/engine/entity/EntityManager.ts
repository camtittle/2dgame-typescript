import {Entity} from "./Entity";
import {Hamster} from "../../beangame/entity/Hamster";

export class EntityManager {

  public entities: Entity[] = [];

  public constructor() {
    this.entities = [];
  }

  public drawEntities(ctx: CanvasRenderingContext2D): void {
    for (let entity of this.entities) {
      entity.draw(ctx);
    }
  }

  public updateEntities(progress: number): void {
    for (let entity of this.entities) {
      entity.update(progress);
    }
  }

  public register(entity: Entity) {
    this.entities.push(entity);
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

}
