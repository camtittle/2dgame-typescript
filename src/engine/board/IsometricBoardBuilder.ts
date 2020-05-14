import {IsometricBoard} from "./IsometricBoard";
import {Tile} from "./Tile";
import {Position} from "../interface/Position";
import {ImageProvider} from "../graphics/ImageProvider";
import {ClickManager} from "../mouse/ClickManager";
import {DrawableManager} from "../DrawableManager";

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
  private isometric = false;

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

  isIsometric() {
    this.isometric = true;
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

  build(): IsometricBoard {
    if (!this.tileHeight || !this.tileWidth || !this.guHeight || !this.guWidth || !this.tileGeneratorFn) {
      throw new Error("Cannot build board - missing parameters");
    }

    if (!this.imageProvider) {
      throw new Error("Cannot build IsometricBoard without ImageProvider");
    }

    if (!this.drawableManager) {
      console.warn("Building IsometricBoard without a DrawableManager - board may not be drawn");
    }

    const board = new IsometricBoard();
    board.setTileDimensions({ width: this.tileWidth, height: this.tileHeight});
    board.setGameDimensions({ width: this.guWidth, height: this.guHeight });
    board.setTiles(this.tileGeneratorFn(this.tileWidth, this.tileHeight));
    board.setupTileImages(this.imageProvider);
    board.setBoardPosition({x: this.boardPosX, y: this.boardPosY});

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
