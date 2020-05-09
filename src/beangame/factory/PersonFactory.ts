import Jeremy from "../entity/Jeremy";
import {ImageProvider} from "../../engine/graphics/ImageProvider";
import {CanvasManager} from "../../engine/CanvasManager";
import {Hamster} from "../entity/Hamster";
import {EntityManager} from "../../engine/entity/EntityManager";

export class PersonFactory {

  public constructor(private readonly imageProvider: ImageProvider,
                     private readonly entityManager: EntityManager,
                     private readonly canvasManager: CanvasManager) {
  }

  public createJeremy(): Jeremy {
    const jeremy = new Jeremy();
    jeremy.setupImages(this.imageProvider);
    jeremy.position.x = this.canvasManager.getWidth() / 2 - jeremy.width;
    jeremy.position.y = this.canvasManager.getHeight() - jeremy.height;
    return jeremy;
  }

  public createTestPerson(): Hamster {
    const testPerson = new Hamster(this.entityManager);
    testPerson.setupImages(this.imageProvider);
    testPerson.position.x = 300;
    testPerson.position.y = 500;
    return testPerson;
  }

}
