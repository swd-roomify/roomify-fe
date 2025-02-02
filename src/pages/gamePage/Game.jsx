import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Map from '../../components/game/Map';
import Camera from '../../components/camera/Camera';
import Chat from '../../components/chat/Chat';
import useWebSocket from '../../hooks/useWebSocket';
import { createStompConfig, WS_ROUTES, WS_TOPICS } from '../../constants/WebSocketConstaint';
import '../../assets/style/css/game.css';

const Game = () => {
  const [nearbyPlayers, setNearbyPlayers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { state } = location;
    if (!state || state.user == null) {
      navigate('/');
    }
  }, [location, navigate]);

  const user = location.state?.user;
  
  const { users, chatMessages, sendPosition, sendChatMessage } = useWebSocket(
    createStompConfig, 
    WS_ROUTES, 
    WS_TOPICS, 
    user
  );

  return (
    <>
      <Camera nearbyPlayers={nearbyPlayers} />
      <Map 
        onNearbyPlayersUpdate={setNearbyPlayers} 
        user={user} 
        users={users} 
        sendPosition={sendPosition} 
        chatMessages={chatMessages} 
      />
      <Chat 
        user={user} 
        chatMessages={chatMessages} 
        sendChatMessage={sendChatMessage} 
      />
    </>
  );
};

export default Game;
