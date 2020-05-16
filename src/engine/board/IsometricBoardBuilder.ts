import {IsometricBoard} from "./IsometricBoard";
import {Tile} from "./Tile";
import {Position} from "../interface/Position";
import {ImageProvider} from "../graphics/ImageProvider";
import {ClickManager} from "../mouse/ClickManager";
import {DrawableManager} from "../DrawableManager";
import {IsometricBoardConfig} from "./IsometricBoardConfig";
import {ConfigParser, EntityFactories, TileFactories} from "./ConfigParser";
import {IsometricEntityManager} from "../entity/IsometricEntityManager";

export class IsometricBoardBuilder {

  private tileWidth: number;
  private tileHeight: number;
  private guWidth: number;
  private guHeight: number;
  private boardPosX = 0;
  private boardPosY = 0;
  private tileGeneratorFn: (width: number, height: number) => Tile[][];
  private imageProvider: ImageProvider;
  private drawableManager: DrawableManager;
  private clickManager: ClickManager;
  private entityManager: IsometricEntityManager;

  private config: IsometricBoardConfig;
  private tileFactoriesForConfig: TileFactories;
  private entityFactories: EntityFactories;

  withTileDimensions(tileWidth: number, tileHeight: number) {
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    return this;
  }

  withBoardDimensions(guWidth: number, guHeight: number) {
    this.guWidth = guWidth;
    this.guHeight = guHeight;
    return this;
  }

  withDrawableManager(drawableManager: DrawableManager) {
    this.drawableManager = drawableManager;
    return this;
  }

  withClickManager(clickManager: ClickManager) {
    this.clickManager = clickManager;
    return this;
  }

  withImageProvider(imageProvider: ImageProvider) {
    this.imageProvider = imageProvider;
    return this;
  }

  withEntityManager(entityManager: IsometricEntityManager) {
    this.entityManager = entityManager;
    return this;
  }

  withPosition(x: number, y: number) {
    this.boardPosX = x;
    this.boardPosY = y;
    return this;
  }

  populatedWithTile(tileFactory: TileFactory) {
    this.tileGeneratorFn = (width: number, height: number) => {
      let tiles: Tile[][] = [];
      for (let x = 0; x < width; x++) {
        tiles[x] = [];
        for (let y = 0; y < height; y++) {
          tiles[x][y] = tileFactory({x: x, y: y});
        }
      }
      return tiles;
    };
    return this;
  }

  fromConfig(config: IsometricBoardConfig, tileFactories: TileFactories, entityFactories: EntityFactories) {
    this.config = config;
    this.tileFactoriesForConfig = tileFactories;
    this.entityFactories = entityFactories;
    return this;
  }

  build(): IsometricBoard {
    if (!this.guHeight || !this.guWidth) {
      throw new Error("Cannot build board - missing parameters");
    }

    if (!this.imageProvider) {
      throw new Error("Cannot build IsometricBoard without ImageProvider");
    }

    if (!this.drawableManager) {
      console.warn("Building IsometricBoard without a DrawableManager - board may not be drawn");
    }

    // Build board either from config file if provided, else use provided parameters, else error
    let board: IsometricBoard;
    if (this.config) {

      if (!this.entityManager) throw new Error("Cannot build board from config: No EntityFactory provided");

      const configParser = new ConfigParser(this.imageProvider, this.entityManager);
      board = configParser.buildBoardFromConfig(this.config, this.tileFactoriesForConfig);

      board.setBoardDimensions({ width: this.guWidth, height: this.guHeight });
      board.setBoardPosition({x: this.boardPosX, y: this.boardPosY});

      configParser.spawnEntitiesFromConfig(board, this.config, this.entityFactories);

    } else if (this.tileGeneratorFn && this.tileHeight && this.tileWidth) {
      board = new IsometricBoard();
      board.setTiles(this.tileGeneratorFn(this.tileWidth, this.tileHeight));
      board.setTileDimensions({ width: this.tileWidth, height: this.tileHeight});
      board.setupTileImages(this.imageProvider);
    } else {
      throw new Error("ERROR: Cannot build board without either a BoardConfig or tile size/factories provided");
    }


    if (this.clickManager) {
      this.clickManager.addMouseMoveListener((x, y) => {
        board.onMouseMove(x, y);
      });

      this.clickManager.addMouseDownListener((x, y) => {
        board.onMouseDown(x, y);
      });
    }

    if (this.drawableManager) {
      this.drawableManager.registerDrawable(board);
    }

    return board;
  }

}

export type TileFactory = (coords: Position) => Tile;


