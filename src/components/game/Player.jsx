import React from 'react';
import PropTypes from 'prop-types';
import "../../assets/style/css/player.css";

const Player = ({ name, character }) => {
  const characterPath = `/assets/sprites/${character}.png`;

  return (
    <div className="player-container">
      <div className="player-name">{name}</div>
      
      <img className="player-character" src={characterPath} alt={`${character} sprite`} />
    </div>
  );
};

Player.propTypes = {
  name: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
};

export default Player;