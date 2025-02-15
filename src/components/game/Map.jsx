import { useEffect, useRef, useState } from "react";
import "../../assets/style/css/map.css";
import Player from "./Player";
import usePlayerMovement from "../../hooks/usePlayerMovement";

const calculateDistance = (pos1, pos2) => {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const obstacles = [
  { width: 57, height: 41, left: 418, top: 164 },
  { width: 1131, height: 87, left: 40, top: 6 },
  { width: 16, height: 16, left: 494, top: 183 },
  { width: 43, height: 43, left: 120, top: 119 },
  { width: 219, height: 39, left: 780, top: 126 },
  { width: 36, height: 36, left: 1055, top: 85 },
  { width: 30, height: 760, left: 45, top: 10 },
  { width: 34, height: 316, left: 286, top: 5 },
  { width: 39, height: 279, left: 608, top: 3 },
  { width: 40, height: 766, left: 1133, top: 4 },
  { width: 1122, height: 75, left: 48, top: 247 },
  { width: 209, height: 27, left: 74, top: 496 },
  { width: 32, height: 116, left: 244, top: 448 },
  { width: 118, height: 62, left: 120, top: 379 },
  { width: 106, height: 123, left: 84, top: 566 },
  { width: 1132, height: 70, left: 45, top: 697 },
  { width: 37, height: 36, left: 364, top: 410 },
  { width: 41, height: 42, left: 324, top: 609 },
  { width: 35, height: 79, left: 487, top: 488 },
  { width: 32, height: 154, left: 1058, top: 532 },
  { width: 39, height: 204, left: 850, top: 408 },
  { width: 37, height: 35, left: 932, top: 489 },
  { width: 80, height: 38, left: 605, top: 612 },
  { width: 112, height: 34, left: 895, top: 411 },
  { width: 116, height: 36, left: 691, top: 448 },
  { width: 30, height: 35, left: 615, top: 495 },
  { width: 37, height: 77, left: 526, top: 448 },
  { width: 39, height: 39, left: 1010, top: 366 },
  { width: 42, height: 35, left: 728, top: 489 },
];

const teleportZones = [
  { width: 40, height: 5, left: 175, top: 338, target: { x: 175, y: 222 } },
  { width: 40, height: 5, left: 470, top: 338, target: { x: 470, y: 222 } },
  { width: 40, height: 2, left: 175, top: 242, target: { x: 175, y: 338 } },
  { width: 40, height: 2, left: 470, top: 242, target: { x: 470, y: 338 } },
];

const PLAYER_SIZE = 20;

const checkCollision = (x, y) => {
  return obstacles.some(
    (obs) =>
      x < obs.left + obs.width &&
      x + PLAYER_SIZE > obs.left &&
      y < obs.top + obs.height &&
      y + PLAYER_SIZE > obs.top
  );
};

const checkTeleport = (x, y) => {
  for (const zone of teleportZones) {
    if (
      x < zone.left + zone.width &&
      x + PLAYER_SIZE > zone.left &&
      y < zone.top + zone.height &&
      y + PLAYER_SIZE > zone.top
    ) {
      return zone.target;
    }
  }
  return null;
};

const Map = ({
  onNearbyPlayersUpdate,
  user,
  users,
  sendPosition,
  chatMessages,
}) => {
  const position = usePlayerMovement(
    { x: 550, y: 630 },
    checkCollision,
    checkTeleport
  );
  const prevPositionRef = useRef(position);
  const [chatBubbles, setChatBubbles] = useState({});

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

  useEffect(() => {
    if (chatMessages.length) {
      const latestMessage = chatMessages[chatMessages.length - 1];
      setChatBubbles((prev) => ({
        ...prev,
        [latestMessage.userId]: latestMessage.message,
      }));

      setTimeout(() => {
        setChatBubbles((prev) => {
          const { [latestMessage.userId]: _, ...rest } = prev;
          return rest;
        });
      }, 5000);
    }
  }, [chatMessages]);

  return (
    <div className="map">
      {obstacles.map((obs, index) => (
        <div
          key={index}
          className="obstacle"
          style={{
            position: "absolute",
            width: obs.width,
            height: obs.height,
            left: obs.left,
            top: obs.top,
            backgroundColor: "none",
            opacity: 0.5,
          }}
        ></div>
      ))}
      {Object.values(users).map((player) => (
        <div
          key={player.user_id}
          className="player"
          style={{
            position: "absolute",
            top: player.position_y,
            left: player.position_x,
          }}
        >
          <Player name={player.username} character={player.character} />
          {chatBubbles[player.user_id] && (
            <div className="chat-bubble">{chatBubbles[player.user_id]}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Map;
