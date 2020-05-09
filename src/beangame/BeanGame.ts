import Game from "../engine/Game";
import {EntityManager} from "../engine/entity/EntityManager";
import {CanvasManager} from "../engine/CanvasManager";
import {ClickManager} from "../engine/mouse/ClickManager";
import {UiInitializer} from "./UiInitializer";
import {DrawableManager} from "../engine/DrawableManager";
import {ImageSourcesProvider} from "./ImageSourcesProvider";
import {EntitySpawner} from "./EntitySpawner";
import {EntityClickManager} from "./EntityMouseService";
import {NetworkManager} from "../engine/network/NetworkManager";
import {config} from "./config";
import {BoardManager} from "../engine/board/BoardManager";
import {BoardBuilder} from "../engine/board/BoardBuilder";
import {Board} from "../engine/board/Board";
import {Position} from "../engine/interface/Position";
import {Dimensions} from "../engine/interface/Dimensions";
import {GrassTile} from "./tile/GrassTile";

export class BeanGame extends Game {

  protected resources = new ImageSourcesProvider().getImageSources();

  public constructor(entityManager: EntityManager, drawableManager: DrawableManager, canvasManager: CanvasManager,
                     clickManager: ClickManager, private entitySpawner: EntitySpawner,
                     private boardBuilder: BoardBuilder) {
    super(entityManager, drawableManager, canvasManager, clickManager);
  }

  public async initialise() {
    super.initialise();

    this.entitySpawner.spawnJeremy();
    this.entitySpawner.spawnTestPerson();

    const entityClickManager = new EntityClickManager(this.entityManager, this.clickManager);
    entityClickManager.addEntityMousedownListeners();

    const uiInitializer = new UiInitializer(this.canvasManager, this.drawableManager);
    uiInitializer.initUi();

    const networkManager = new NetworkManager(config.websocketUrl).connect(() => {
      networkManager.send({action: 'hello'});
    });

    const boardManager = new BoardManager(this.buildBoard());
    this.drawableManager.registerDrawable(boardManager.board);
  }

  private buildBoard(): Board {
    const dimen = this.canvasManager.getScaledDimensions();

    const tileFactory = (position: Position, dimensions: Dimensions) => {
      return new GrassTile(position, dimensions);
    };

    return this.boardBuilder
      .withGameDimensions(this.canvasManager.getWidth(), this.canvasManager.getHeight())
      .withTileDimensions(5, 5)
      .populatedWithTile(tileFactory)
      .build();
  }

  protected drawLoadingScreen(ctx: CanvasRenderingContext2D): void {
    ctx.font = '60px Arial';
    ctx.textAlign = "center";
    ctx.fillStyle = 'white';
    ctx.fillText("Loading...", this.canvasManager.getWidth() / 2, this.canvasManager.getHeight() / 2);
  }

}
