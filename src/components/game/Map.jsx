import { useEffect, useRef, useState } from 'react';
import "../../assets/style/css/map.css";
import Player from './Player';
import usePlayerMovement from '../../hooks/usePlayerMovement';

const Map = () => {
  const [currentPlayer, setCurrentPlayer] = useState({
    name: `Player${Math.floor(100000 + Math.random() * 900000)}`,
    character: 'character',
  });

  // Hardcoded other players for viewing
  const [allPlayers, setAllPlayers] = useState([
    { name: 'Player001', character: 'character4', x: 15, y: 5 },
    { name: 'Player002', character: 'character2', x: 400, y: 400 },
    { name: 'Player003', character: 'character3', x: 700, y: 100 },
    { name: 'Player004', character: 'character4', x: 1460, y: 475 },
  ]);

  const position = usePlayerMovement({ x: 300, y: 200 });

  const prevPositionRef = useRef(position);

  useEffect(() => {
    if (
      position.x !== prevPositionRef.current.x ||
      position.y !== prevPositionRef.current.y
    ) {
      console.log(`Position: x=${position.x}, y=${position.y}`);
      prevPositionRef.current = position;
    }
  }, [position]);

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

      {allPlayers.map((player, index) => (
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
