import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Map from '../../components/game/Map';
import Camera from '../../components/camera/Camera';
import '../../assets/style/css/game.css';

const Game = () => {
  const [nearbyPlayers, setNearbyPlayers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { state } = location;
    if (!state || !state.username) {
      navigate('/');
    }
  }, [location, navigate]);

  const username = location.state?.username;

  return (
    <>
      <Camera nearbyPlayers={nearbyPlayers} />
      <Map onNearbyPlayersUpdate={setNearbyPlayers} />
    </>
  );
};

export default Game;
