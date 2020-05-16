import {ImageSourceMap} from "./graphics/ImageResource";
import {ImageLoader} from "./graphics/ImageLoader";
import {ClickManager} from "./mouse/ClickManager";
import {IsometricEntityManager} from "./entity/IsometricEntityManager";
import {CanvasManager} from "./CanvasManager";
import {DrawableManager} from "./DrawableManager";
import {EntityClickManager} from "./entity/EntityClickManager";
import {ImageProvider} from "./graphics/ImageProvider";

export default abstract class Game {

  private lastRender = performance.now();

  protected abstract resources: ImageSourceMap<any>;
  protected entityManager: IsometricEntityManager;
  protected drawableManager: DrawableManager;
  protected canvasManager: CanvasManager;
  protected clickManager: ClickManager;
  protected imageProvider: ImageProvider;
  protected imageLoader: ImageLoader;

  public constructor(canvasElementId: string) {
    let canvas;
    try {
      canvas = <HTMLCanvasElement>document.getElementById(canvasElementId);
    } catch {
      throw new Error("Cannot find canvas element with ID: " + canvasElementId);
    }
    this.entityManager = new IsometricEntityManager();
    this.drawableManager = new DrawableManager();
    this.canvasManager = new CanvasManager(canvas);
    this.clickManager = new ClickManager(this.canvasManager, this.entityManager);
    this.imageProvider = new ImageProvider();
    this.imageLoader = new ImageLoader(this.imageProvider);
  }

  // Main entry point
  public async boot(): Promise<void> {
    this.drawLoadingScreen(this.canvasManager.getContext());
    await this.loadImages(this.imageLoader);
    this.initialise();
    this.startGameLoop();
  }

  // Lifecycle hook: setup and load things
  protected initialise() {
  }

  protected abstract drawLoadingScreen(ctx: CanvasRenderingContext2D): void;

  protected async loadImages(imageLoader: ImageLoader) {
    await imageLoader.loadImagesIntoProvider(this.resources);
  }

  // Lifecycle hook: starts the game
  protected startGameLoop(): void {
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
