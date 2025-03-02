import { useState } from "react";

import "./App.css";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver.jsx";
import { deriveActivePlayer } from "./Utils/deriveActivePlayer.js";
import { deriveGameBoard } from "./Utils/deriveGameBoard.js";
import { deriveWinner } from "./Utils/deriveWinner.js";

// object to store player names associated with their symbols
const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns); // Derive the game board state based on the game turns
  const winner = deriveWinner(gameBoard, players); // Determine the winner based on the game board state
  const hasDraw = gameTurns.length === 9 && !winner;

  const handlPlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayer) => {
      console.log(symbol, newName);
      return { ...prevPlayer, [symbol]: newName };
    });
  };

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  const handleRestart = () => {
    setGameTurns([]);
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            isActive={activePlayer === "X"}
            initialName="Player 1"
            symbol="X"
            updatePlayerName={handlPlayerNameChange}
          />
          <Player
            isActive={activePlayer === "O"}
            initialName="Player 2"
            symbol="O"
            updatePlayerName={handlPlayerNameChange}
          />
        </ol>

        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        <Log turns={gameTurns} />
      </div>
    </main>
  );
}

export default App;
