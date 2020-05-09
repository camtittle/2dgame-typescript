import {EntityManager} from "../engine/entity/EntityManager";
import {PersonFactory} from "./factory/PersonFactory";

export class EntitySpawner {

  public constructor(private readonly entityManager: EntityManager,
                     private readonly personFactory: PersonFactory) {
  }

  public spawnJeremy() {
    const jeremy = this.personFactory.createJeremy();
    this.entityManager.spawnEntity(jeremy);
  }

  public spawnTestPerson() {
    const testPerson = this.personFactory.createTestPerson();
    this.entityManager.spawnEntity(testPerson);
  }

}
