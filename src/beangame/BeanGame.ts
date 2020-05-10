import Game from "../engine/Game";
import {EntityManager} from "../engine/entity/EntityManager";
import {CanvasManager} from "../engine/CanvasManager";
import {ClickManager} from "../engine/mouse/ClickManager";
import {DrawableManager} from "../engine/DrawableManager";
import {ImageSourcesProvider} from "./ImageSourcesProvider";
import {BoardBuilder} from "../engine/board/BoardBuilder";
import {Board} from "../engine/board/Board";
import {Position} from "../engine/interface/Position";
import {GrassTile} from "./tile/GrassTile";
import {TileClickManager} from "./tile/TileClickManager";
import {config} from "./config";
import {HamsterSpawner} from "./factory/HamsterSpawner";
import {ImageProvider} from "../engine/graphics/ImageProvider";

export class BeanGame extends Game {

  protected resources = new ImageSourcesProvider().getImageSources();

  private tileClickManager = new TileClickManager();

  public constructor(entityManager: EntityManager, drawableManager: DrawableManager, canvasManager: CanvasManager,
                     clickManager: ClickManager, private imageProvider: ImageProvider, private boardBuilder: BoardBuilder) {
    super(entityManager, drawableManager, canvasManager, clickManager);
  }

  public async initialise() {
    super.initialise();

    // const networkManager = new NetworkManager(config.websocketUrl).connect(() => {
    //   networkManager.send({action: 'hello'});
    // });

    const board = this.buildBoard();

    this.spawnHamsterOntoBoard(board);

  }

  private buildBoard(): Board {
    const dimen = this.canvasManager.getScaledDimensions();

    const tileFactory = (position: Position) => {
      return new GrassTile(this.entityManager, position);
    };

    const board = this.boardBuilder
      .withGameDimensions(this.canvasManager.getWidth(), this.canvasManager.getHeight())
      .withTileDimensions(config.boardWidth, config.boardHeight)
      .populatedWithTile(tileFactory)
      .withEntityManager(this.entityManager)
      .isIsometric()
      .build();

    this.tileClickManager.setBoard(board);
    this.tileClickManager.registerTileHoverBehaviour();

    return board;
  }

  private spawnHamsterOntoBoard(board: Board) {
    const startingTile = board.getTile({x: 0, y: 0});
    const hamsterSpawner = new HamsterSpawner(this.entityManager, this.imageProvider);
    const spawnedHamster = hamsterSpawner.spawnHamster(board, startingTile);
    this.tileClickManager.registerHamsterBehaviour(spawnedHamster);
  }

  protected drawLoadingScreen(ctx: CanvasRenderingContext2D): void {
    ctx.font = '60px Arial';
    ctx.textAlign = "center";
    ctx.fillStyle = 'white';
    ctx.fillText("Loading...", this.canvasManager.getWidth() / 2, this.canvasManager.getHeight() / 2);
  }

}
