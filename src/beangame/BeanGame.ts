import Game from "../engine/Game";
import {ImageSourcesProvider} from "./ImageSourcesProvider";
import {IsometricBoardBuilder} from "../engine/board/IsometricBoardBuilder";
import {IsometricBoard} from "../engine/board/IsometricBoard";
import {PlainTile} from "./tile/PlainTile";
import {TileClickManager} from "./tile/TileClickManager";
import {config} from "./config";
import {cageBoardConfig} from "./tile/CageBoard";
import {EntityFactories, TileFactories} from "../engine/board/ConfigParser";
import {PlainEntity} from "./entity/PlainEntity";
import {ImageSourceMap} from "../engine/graphics/ImageResource";
import {resourceId} from "./ResourceIds";
import {EntitySpawner} from "./entity/EntitySpawner";
import {HamsterFactory} from "./factory/HamsterFactory";
import {BoardPanner} from "../engine/board/BoardPanner";

export class BeanGame extends Game {

  protected tileClickManager = new TileClickManager();
  protected board: IsometricBoard;
  protected entitySpawner: EntitySpawner;

  public async initialise() {
    await super.initialise();
    this.buildBoard();
    const hamsterSpawner = new HamsterFactory(this.entityManager, this.drawableManager, this.imageProvider);
    this.entitySpawner = new EntitySpawner(this.board, this.entityManager, this.drawableManager, this.tileClickManager, hamsterSpawner);
  }

  private buildBoard() {
    const dimen = this.canvasManager.getScaledDimensions();

    this.board = new IsometricBoardBuilder()
      .fromConfig(cageBoardConfig, this.getTileFactories(), this.getEntityFactories())
      .withBoardDimensions(this.canvasManager.getWidth(), this.canvasManager.getHeight())
      .withPosition(0, config.boardOffsetTop)
      .withPanning()
      .withClickManager(this.clickManager)
      .withImageProvider(this.imageProvider)
      .withDrawableManager(this.drawableManager)
      .withEntityManager(this.entityManager)
      .build();

    const panner = new BoardPanner(this.board, this.clickManager, this.entityManager);
    panner.enableCanvasEdgePanning(this.canvasManager);
    this.updatableManager.registerUpdatable(panner);

    this.tileClickManager.setBoard(this.board);
  }

  protected getResources(): ImageSourceMap<resourceId> {
    return new ImageSourcesProvider().getImageSources();
  }

  private getEntityFactories(): EntityFactories {
    return {
      plainEntity: () => {
        return new PlainEntity(this.board, this.entityManager, this.drawableManager);
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
