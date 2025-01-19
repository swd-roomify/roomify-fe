import React from 'react';
import "../../assets/style/css/camera.css";
import useMediasoup from "../../hooks/SFUWebsocketHandler";

const Camera = ({ nearbyPlayers }) => {

  const {openCamera, subscribe, setUser_id} = useMediasoup();

  return (
    <div className="camera-container">
      {nearbyPlayers.map((player) => (
        <div key={player.user_id} className="camera-placeholder">
          {/* <div className="camera-name">{player.username}</div> */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-[340px] h-[180px] bg-black"
          />
        </div>
      ))}
    </div>
  );
};

export default Camera;
import React from 'react';
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
