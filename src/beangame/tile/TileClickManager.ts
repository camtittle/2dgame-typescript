import {Hamster} from "../entity/Hamster";
import {IsometricBoard} from "../../engine/board/IsometricBoard";
import {Tile} from "../../engine/board/Tile";

export class TileClickManager {

  private board: IsometricBoard;

  constructor() {
  }

  public setBoard(board: IsometricBoard) {
    this.board = board;
  }

  public registerHamsterBehaviour(hamster: Hamster) {
    if (!this.board) {
      throw new Error('Cannot register hamster behaviour. No board set');
    }

    this.board.addTileMouseDownBehaviour(function() {
      hamster.setDestinationTile(this as Tile)
    })
  }

}
