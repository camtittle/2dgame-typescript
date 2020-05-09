import {Hamster} from "../entity/Hamster";
import {Board} from "../../engine/board/Board";

export class TileClickManager {

  private board: Board;

  constructor() {
  }

  public setBoard(board: Board) {
    this.board = board;
  }

  public registerHamsterBehaviour(hamster: Hamster) {
    if (!this.board) {
      throw new Error('Cannot register hamster behaviour. No board set');
    }

    this.board.registerTileOnClickListener(tile => {
      hamster.setDestinationTile(tile);
    })
  }

}
