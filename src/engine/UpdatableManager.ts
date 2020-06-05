import {Updatable} from "./interface/Updatable";

export class UpdatableManager {

  private readonly updatables: Updatable[];

  public constructor() {
    this.updatables = [];
  }

  public registerUpdatable(updatable: Updatable) {
    this.updatables.push(updatable);
  }

  public deregisterUpdatable(updatable: Updatable) {
    const index = this.updatables.indexOf(updatable);
    if (index >= 0) this.updatables.splice(index, 1);
  }

  public update(progress: number) {
    for (let updatable of this.updatables) {
      updatable.update(progress);
    }
  }

}
