/**
 * Responsible for holding the board
 */
import {Board} from "./Board";

export class BoardManager {

  private _board: Board;

  constructor(board: Board) {
    this._board = board;
  }

  public get board(): Board {
    return this._board;
  }


}
