import React, { useState } from 'react';
import Map from '../../components/game/Map';
import Camera from '../../components/camera/Camera';
import "../../assets/style/css/game.css"

const Game = () => {
  const [nearbyPlayers, setNearbyPlayers] = useState([]); 

  return (
    <>
      <Camera nearbyPlayers={nearbyPlayers} />
      <Map onNearbyPlayersUpdate={setNearbyPlayers} />
    </>
  );
};

export default Game;
