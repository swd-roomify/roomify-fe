import React, { useState } from 'react';
import "../../assets/style/css/map.css";
import Player from './Player';
import usePlayerMovement from '../../hooks/usePlayerMovement';

const Map = () => {
  const [currentPlayer, setCurrentPlayer] = useState({
    name: `Player${Math.floor(100000 + Math.random() * 900000)}`,
    character: 'character',
  });

  const position = usePlayerMovement({ x: 300, y: 200 });

  const [players, setPlayers] = useState([]);

  return (
    <div className="map">
      <div
        className="player"
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
        }}
      >
        <Player name={currentPlayer.name} character={currentPlayer.character} />
      </div>

      {players.map((player, index) => (
        <div
          key={index}
          className="player"
          style={{
            position: 'absolute',
            top: player.y,
            left: player.x,
          }}
        >
          <Player name={player.name} character={player.character} />
        </div>
      ))}
    </div>
  );
};

export default Map;
