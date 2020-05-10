import {Hamster} from "../entity/Hamster";
import {Board} from "../../engine/board/Board";
import {GrassTile} from "./GrassTile";

export class TileClickManager {

  private board: Board;

  constructor() {
  }

  public setBoard(board: Board) {
    this.board = board;
  }

  public registerTileHoverBehaviour() {
    if (!this.board) {
      throw new Error('Cannot register tile hover behaviour. No board set');
    }

    // this.board.registerTileOnClickListener(tile => {
    //   if (tile instanceof GrassTile) {
    //     tile.setHighlight(true);
    //   }
    // })
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
