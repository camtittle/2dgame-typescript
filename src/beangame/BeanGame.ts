import Game from "../engine/Game";
import {ImageSourcesProvider} from "./ImageSourcesProvider";
import {IsometricBoardBuilder} from "../engine/board/IsometricBoardBuilder";
import {IsometricBoard} from "../engine/board/IsometricBoard";
import {Position} from "../engine/interface/Position";
import {GrassTile} from "./tile/GrassTile";
import {TileClickManager} from "./tile/TileClickManager";
import {config} from "./config";
import {HamsterSpawner} from "./factory/HamsterSpawner";

export class BeanGame extends Game {

  protected resources = new ImageSourcesProvider().getImageSources();

  private tileClickManager = new TileClickManager();
  private board: IsometricBoard;

  public async initialise() {
    super.initialise();
    this.buildBoard();
    this.spawnHamsterOntoBoard();
  }

  private initNetwork() {
    // const networkManager = new NetworkManager(config.websocketUrl).connect(() => {
    //   networkManager.send({action: 'hello'});
    // });
  }

  private buildBoard() {
    const dimen = this.canvasManager.getScaledDimensions();

    const tileFactory = (position: Position) => {
      return new GrassTile(position);
    };

    this.board = new IsometricBoardBuilder()
      .withGameDimensions(this.canvasManager.getWidth(), this.canvasManager.getHeight())
      .withTileDimensions(config.boardWidth, config.boardHeight)
      .populatedWithTile(tileFactory)
      .withClickManager(this.clickManager)
      .withImageProvider(this.imageProvider)
      .withDrawableManager(this.drawableManager)
      .build();

    this.tileClickManager.setBoard(this.board);
  }

  private spawnHamsterOntoBoard() {
    const startingTile = this.board.getTile({x: 0, y: 0});
    const hamsterSpawner = new HamsterSpawner(this.entityManager, this.imageProvider);
    const spawnedHamster = hamsterSpawner.spawnHamster(this.board, startingTile);
    this.tileClickManager.registerHamsterBehaviour(spawnedHamster);
  }

  protected drawLoadingScreen(ctx: CanvasRenderingContext2D): void {
    ctx.font = '60px Arial';
    ctx.textAlign = "center";
    ctx.fillStyle = 'white';
    ctx.fillText("Loading...", this.canvasManager.getWidth() / 2, this.canvasManager.getHeight() / 2);
  }

}
