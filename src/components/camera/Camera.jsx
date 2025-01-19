import React from "react";
import "../../assets/style/css/camera.css";

const Camera = ({ nearbyPlayers }) => {
  return (
    <div className="camera-container">
      {nearbyPlayers.map((player) => (
        <div key={player.user_id} className="camera-placeholder">
          <div className="camera-name">{player.username}</div>
        </div>
      ))}
    </div>
  );
};

export default Camera;
