import {ImageSourceMap} from "./graphics/ImageResource";
import {ImageLoader} from "./graphics/ImageLoader";
import {ClickManager} from "./mouse/ClickManager";
import {IsometricEntityManager} from "./entity/IsometricEntityManager";
import {ClientCanvasManager} from "./canvas/ClientCanvasManager";
import {DrawableManager} from "./DrawableManager";
import {ImageProvider} from "./graphics/ImageProvider";
import {GameEnvironment} from "./GameEnvironment";
import {CanvasManager} from "./canvas/CanvasManager";
import {ServerCanvasManager} from "./canvas/ServerCanvasManager";
import {ServerImageProvider} from "./graphics/ServerImageProvider";
import {UpdatableManager} from "./UpdatableManager";

export default abstract class Game {

  private lastRender = Date.now();
  private lastUpdate = Date.now();
  private updatesPerSecond = 30;

  protected entityManager: IsometricEntityManager;
  protected drawableManager: DrawableManager;
  protected updatableManager: UpdatableManager;
  protected canvasManager: CanvasManager;
  protected clickManager: ClickManager;
  protected imageProvider: ImageProvider;
  protected imageLoader: ImageLoader;

  public constructor(server = false, canvasElementId?: string) {

    if (!server && !canvasElementId) {
      throw new Error("Error: cannot create game without providing canvas element ID (unless running in server mode");
    } else if (!server) {
      this.imageProvider = new ImageProvider();
      this.imageLoader = new ImageLoader(this.imageProvider);
    } else {
      GameEnvironment.SERVER = true;
      this.imageProvider = new ServerImageProvider();
    }

    this.setupCanvasManager(canvasElementId);
    this.drawableManager = new DrawableManager();
    this.updatableManager = new UpdatableManager();

    this.entityManager = new IsometricEntityManager();
    this.updatableManager.registerUpdatable(this.entityManager);

    this.clickManager = new ClickManager(this.canvasManager, this.entityManager);
  }

  private setupCanvasManager(canvasElementId?: string) {
    if (canvasElementId) {
      try {
        const canvas = <HTMLCanvasElement>document.getElementById(canvasElementId);
        this.canvasManager = new ClientCanvasManager(canvas);
      } catch {
        throw new Error("Cannot find canvas element with ID: " + canvasElementId);
      }
    } else {
      this.canvasManager = new ServerCanvasManager();
    }
  }

  // Main entry point
  public async boot(): Promise<void> {
    if (!GameEnvironment.SERVER && this.canvasManager instanceof ClientCanvasManager) {
      this.drawLoadingScreen(this.canvasManager.getContext());
      await this.loadImages(this.imageLoader);
    }

    this.initialise();
    this.startGameLoop();

    if (!GameEnvironment.SERVER) {
      this.startDrawLoop();
    }
  }

  // Lifecycle hook: setup and load things
  protected initialise() {
    console.log('Game init');
  }

  protected drawLoadingScreen(ctx: CanvasRenderingContext2D): void { }

  protected abstract getResources(): ImageSourceMap<any>;

  private async loadImages(imageLoader: ImageLoader) {
    await imageLoader.loadImagesIntoProvider(this.getResources());
  }

  private startGameLoop(): void {
    setInterval(() => {
      const now = Date.now();
      this.update(now - this.lastUpdate);
      this.lastUpdate = now;
    }, 1000 / this.updatesPerSecond);
  }

  private startDrawLoop(): void {
    window.requestAnimationFrame(this.drawLoop.bind(this));
  }

  private drawLoop(timestamp: number): void {
    const progress = timestamp - this.lastRender;
    this.draw();
    this.lastRender = timestamp;
    window.requestAnimationFrame(this.drawLoop.bind(this))
  }

  private update(progress: number): void {
    this.updatableManager.update(progress);
  }

  private draw(): void {
    this.canvasManager.clear();
    this.canvasManager.drawBg();
    if (this.canvasManager instanceof ClientCanvasManager) {
      const context = this.canvasManager.getContext();
      this.drawableManager.draw(context);
    }
  }
}
