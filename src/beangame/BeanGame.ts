import Game from "../engine/Game";
import {ImageSourcesProvider} from "./ImageSourcesProvider";
import {IsometricBoardBuilder} from "../engine/board/IsometricBoardBuilder";
import {IsometricBoard} from "../engine/board/IsometricBoard";
import {PlainTile} from "./tile/PlainTile";
import {TileClickManager} from "./tile/TileClickManager";
import {config} from "./config";
import {HamsterSpawner} from "./factory/HamsterSpawner";
import {cageBoardConfig} from "./tile/CageBoard";
import {EntityFactories, TileFactories} from "../engine/board/ConfigParser";
import {PlainEntity} from "./entity/PlainEntity";
import {Orientation} from "../engine/entity/Orientation";
import {ImageSourceMap} from "../engine/graphics/ImageResource";
import {resourceId} from "./ImageSources";

export class BeanGame extends Game {

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

    this.board = new IsometricBoardBuilder()
      .fromConfig(cageBoardConfig, this.getTileFactories(), this.getEntityFactories())
      .withBoardDimensions(this.canvasManager.getWidth(), this.canvasManager.getHeight())
      .withPosition(0, config.boardOffsetTop)
      .withClickManager(this.clickManager)
      .withImageProvider(this.imageProvider)
      .withDrawableManager(this.drawableManager)
      .withEntityManager(this.entityManager)
      .build();

    // todo: move these to config file
    this.board.setTileElevation(this.board.getTile({x: 0, y: 0}), 2);
    this.board.setTileElevation(this.board.getTile({x: 0, y: 1}), 1);
    this.board.setTileElevation(this.board.getTile({x: 1, y: 0}), 1);
    this.board.setTileElevation(this.board.getTile({x: 1, y: 1}), 1);
    this.board.setTileElevation(this.board.getTile({x: 5, y: 3}), 1.5);

    this.tileClickManager.setBoard(this.board);
  }

  private spawnHamsterOntoBoard() {
    const startingTile = this.board.getTile({x: 0, y: 0});
    const hamsterSpawner = new HamsterSpawner(this.drawableManager, this.imageProvider);
    const spawnedHamster = hamsterSpawner.spawnHamster(this.board, startingTile);
    spawnedHamster.setOrientation(Orientation.WEST);
    this.entityManager.register(spawnedHamster);
    this.tileClickManager.registerHamsterBehaviour(spawnedHamster);
  }

  protected drawLoadingScreen(ctx: CanvasRenderingContext2D): void {
    ctx.font = '60px Arial';
    ctx.textAlign = "center";
    ctx.fillStyle = 'white';
    ctx.fillText("Loading...", this.canvasManager.getWidth() / 2, this.canvasManager.getHeight() / 2);
  }

  protected getResources(): ImageSourceMap<resourceId> {
    return new ImageSourcesProvider().getImageSources();
  }

  private getEntityFactories(): EntityFactories {
    return {
      plainEntity: () => {
        return new PlainEntity(this.board, this.drawableManager);
      },
      richEntities: {}
    }
  }

  private getTileFactories(): TileFactories {
    return {
      PlainTile: coords => {
        return new PlainTile(coords, this.drawableManager);
      }
    };
  }

}
