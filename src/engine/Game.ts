import {ImageSources} from "./graphics/ImageResource";
import {ImageLoader} from "./graphics/ImageLoader";
import {ClickManager} from "./mouse/ClickManager";
import {EntityManager} from "./entity/EntityManager";
import {CanvasManager} from "./CanvasManager";
import {DrawableManager} from "./DrawableManager";

export default abstract class Game {

  private lastRender = performance.now();

  protected abstract resources: ImageSources;

  protected constructor(protected readonly entityManager: EntityManager,
                        protected readonly drawableManager: DrawableManager,
                        protected readonly canvasManager: CanvasManager,
                        protected readonly clickManager:  ClickManager) {
  }

  // Main entry point
  public async boot(imageLoader: ImageLoader): Promise<void> {
    this.drawLoadingScreen(this.canvasManager.getContext());
    await this.loadImages(imageLoader);
    this.initialise();
    this.start();
  }

  // Lifecycle hook: setup and load things
  protected initialise() {
  }

  protected abstract drawLoadingScreen(ctx: CanvasRenderingContext2D): void;

  protected async loadImages(imageLoader: ImageLoader) {
    await imageLoader.loadImagesIntoProvider(this.resources);
  }

  // Lifecycle hook: starts the game
  protected start(): void {
    window.requestAnimationFrame(this.loop.bind(this));
  }

  private loop(timestamp: number): void {
    const progress = timestamp - this.lastRender;

    this.update(progress);
    this.canvasManager.clear();
    this.draw();

    this.lastRender = timestamp;
    window.requestAnimationFrame(this.loop.bind(this))
  }

  private update(progress: number): void {
    this.entityManager.updateEntities(progress);
  }

  private draw(): void {
    this.canvasManager.drawBg();

    const context = this.canvasManager.getContext();
    this.drawableManager.draw(context);
    this.entityManager.drawEntities(context);
  }
}
