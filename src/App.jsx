import "./App.css";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./assets/winning-combinations.js";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let activePlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    activePlayer = "O";
  }
  return activePlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;
  turns.forEach((turn) => {
    const { player, square } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  });

  WINNING_COMBINATIONS.forEach((combination) => {
    combination.forEach((square) => {
      console.log(square);
    });
  });

  const handleSelectSqure = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          player: currentPlayer,
          square: { row: rowIndex, col: colIndex },
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            isActive={activePlayer === "X"}
            initialName="Player 1"
            symbol="X"
          />
          <Player
            isActive={activePlayer === "O"}
            initialName="Player 2"
            symbol="O"
          />
        </ol>
        <GameBoard onSelectSqure={handleSelectSqure} board={gameTurns} />
        <Log turns={gameTurns} />
      </div>
    </main>
  );
}

export default App;
