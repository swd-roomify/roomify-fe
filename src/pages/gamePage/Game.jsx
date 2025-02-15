import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Map from '../../components/game/Map';
import Camera from '../../components/camera/Camera';
import Chat from '../../components/chat/Chat';
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
    }
    if(!location.state.user || location.state.room){
      navigate('/room');
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
    <>
      <Camera nearbyPlayers={nearbyPlayers} user={user} />
      <Map onNearbyPlayersUpdate={setNearbyPlayers}
        user={user}
        users={users}
        chatMessages={chatMessages}
        sendPosition={sendPosition}
      />
      {/* <Chat user={user} /> */}
    </>
  );
};

export default Game;
