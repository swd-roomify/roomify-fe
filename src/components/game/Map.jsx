import { useEffect, useRef, useState } from 'react';
import "../../assets/style/css/map.css";
import Player from './Player';
import usePlayerMovement from '../../hooks/usePlayerMovement';
import useWebSocket from '../../hooks/useWebSocket';
import { createStompConfig, WS_ROUTES, WS_TOPICS } from '../../WebSocketConstaint';

const Map = () => {
  const [currentPlayer, setCurrentPlayer] = useState({
    name: `Player${Math.floor(100000 + Math.random() * 900000)}`,
    character: 'character',
  });

  const position = usePlayerMovement({ x: 300, y: 200 });
  const prevPositionRef = useRef(position);

  const { users, sendPosition } = useWebSocket(createStompConfig, WS_ROUTES, WS_TOPICS, currentPlayer.name);

  useEffect(() => {
    if (
      position.x !== prevPositionRef.current.x ||
      position.y !== prevPositionRef.current.y
    ) {
      prevPositionRef.current = position;
      sendPosition({ position_x: position.x, position_y: position.y });
    }
  }, [position, sendPosition]);

  useEffect(() => {
    // Log the users object whenever it changes (optional)
    console.log('Users updated:', users);
  }, [users]);

  return (
    <div className="map">
      {Object.values(users).map((player, index) => (
        <div
          key={index}
          className="player"
          style={{
            position: 'absolute',
            top: player.position_y,  // Changed to position_y
            left: player.position_x,  // Changed to position_x
          }}
        >
          <Player name={player.username} character={"character2"} />
        </div>
      ))}
    </div>
  );
};

export default Map;
