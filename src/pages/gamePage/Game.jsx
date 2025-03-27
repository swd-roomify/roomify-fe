import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Map from '../../components/game/Map';
import Camera from '../../components/camera/Camera';
// import Chat from '../../components/chat/Chat'; // Uncomment if needed
import { createStompConfig, WS_ROUTES, WS_TOPICS } from '../../constants/WebSocketConstaint';
import '../../assets/style/css/game.css';
import useWebSocketRefined from '@/hooks/useWebSocketRefined';

const Game = () => {
  const [nearbyPlayers, setNearbyPlayers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const account = localStorage.getItem('user');
    if (!token || !account) {
      navigate('/login');
      return;
    }
    if (!location.state || !location.state.user || !location.state.joinedRoom) {
      navigate('/room');
      return;
    }
    
  }, [location, navigate]);

  const user = location.state.user;
  const room = location.state.joinedRoom;

  const { sendPosition, sendMessage, users, chatMessages } = useWebSocketRefined(
    createStompConfig,
    WS_ROUTES,
    WS_TOPICS,
    user,
    room.room_id,
  );

  return (
    <div className="game-container">
      <Camera nearbyPlayers={nearbyPlayers} user={user} />
      <Map
        onNearbyPlayersUpdate={setNearbyPlayers}
        user={user}
        users={users}
        chatMessages={chatMessages}
        sendPosition={sendPosition}
      />
      {/* <Chat user={user} /> */}
    </div>
  );
};

export default Game;
