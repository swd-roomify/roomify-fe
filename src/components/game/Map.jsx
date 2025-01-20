import { useEffect, useRef, useState } from 'react';
import "../../assets/style/css/map.css";
import Player from './Player';
import usePlayerMovement from '../../hooks/usePlayerMovement';
import useWebSocket from '../../hooks/useWebSocket';
import { createStompConfig, WS_ROUTES, WS_TOPICS } from '../../constants/WebSocketConstaint';

const calculateDistance = (pos1, pos2) => {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const Map = ({ onNearbyPlayersUpdate, user }) => {
  const position = usePlayerMovement({ x: 300, y: 200 });
  const prevPositionRef = useRef(position);

  const { users, sendPosition } = useWebSocket(createStompConfig, WS_ROUTES, WS_TOPICS, user);

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
    const nearbyPlayers = Object.values(users).filter((player) => {
      const distance = calculateDistance(position, {
        x: player.position_x,
        y: player.position_y,
      });
      return distance <= 50 && player.user_id !== user.user_id;
    });

    onNearbyPlayersUpdate(nearbyPlayers);
  }, [users, position, onNearbyPlayersUpdate]);

  return (
    <div className="map">
      {Object.values(users).map((player) => (
        <div
          key={player.user_id}
          className="player"
          style={{
            position: 'absolute',
            top: player.position_y,
            left: player.position_x,
          }}
        >
          <Player name={player.username} character={player.character} />
        </div>
      ))}
    </div>
  );
};

export default Map;
