import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Map from '../../components/game/Map';
import Camera from '../../components/camera/Camera';
import '../../assets/style/css/game.css';
import Chat from '../../components/chat/Chat';
import Draggable from 'react-draggable';

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

  return (
    <>
      <Camera nearbyPlayers={nearbyPlayers} />
      <Map onNearbyPlayersUpdate={setNearbyPlayers} user={user} />
      <Chat />
    </>
  );
};

export default Game;
