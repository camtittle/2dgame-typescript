import {CanvasManager} from "../engine/CanvasManager";
import {DrawableManager} from "../engine/DrawableManager";
import {Scorebar} from "./ui/Scorebar";

export class UiInitializer {

  public constructor(private readonly canvasManager: CanvasManager,
                     private readonly drawableManager: DrawableManager) {
  }

  public initUi() {
    this.initScorebar();
  }

  private initScorebar() {
    const scorebar = new Scorebar(this.canvasManager.getWidth(), 5);
    this.drawableManager.registerDrawable(scorebar);
  }

}
