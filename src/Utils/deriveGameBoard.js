import { INITIAL_GAME_BOARD } from "./gameBoard.js";

// Derive the game board state based on the game turns, with a brand new array (thanks to deep copy)
export function deriveGameBoard(gameTurns) {
  // Create a deep copy of the initial game board to avoid mutation.
  // (not using the inital game board, but make a copy of it)
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  // Populate the game board based on the game turns
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player; // Set the player symbol in the respective square
    // when im setting the player symbol im doing it on the original array, so after resetting the game,
    // the inital game board will be still this edited old array.
    // The solution is to make a deep copy of the initial game board, and then edit it. (let gameBoard = [...INITIAL_GAME_BOARD], and [...array])
  }
  return gameBoard;
}
