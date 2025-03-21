import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  updatePlayerName,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setNewName] = useState(initialName);

  const toggleEditing = () => {
    setIsEditing((isEditing) => !isEditing);
    if (isEditing) {
      updatePlayerName(symbol, playerName);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input type="text" value={playerName} onChange={handleNameChange} />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={toggleEditing}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
