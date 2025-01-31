import React, { useState, useEffect, useRef } from "react";
import "../../assets/style/css/camera.css";
import useMediasoup from "../../hooks/SFUWebsocketHandler";
import useNavigationHandlers from "../../utils/EventHandler";
import PropTypes from "prop-types";

const Camera = ({ nearbyPlayers, user }) => {
  const { videoRef, setUser_id, produce, consume, disconnect } = useMediasoup();

  const othersContainerRef = useRef(null);
  const [producers, setProducers] = useState([]);

  const retryCountRef = useRef(0);

  useEffect(() => {
    setUser_id(user.user_id);
  }, [user]);

  const startProducing = async () => {
    if (retryCountRef.current >= 3) return;

    try {
      if (videoRef.current) {
        await produce({ userId: user.user_id });
        retryCountRef.current = 0;
      } else {
        retryCountRef.current++;
        if (retryCountRef.current < 3) {
          setTimeout(startProducing, 1500);
        }
      }
    } catch (error) {
      console.error("Error producing media:", error);
      retryCountRef.current++;
      if (retryCountRef.current < 3) {
        setTimeout(startProducing, 1500);
      }
    }
  };

  useEffect(() => {
    const fetchAndUpdateProducers = async () => {
      const producerIds = new Set(producers.map((p) => p.user_id));
      const newPlayers = nearbyPlayers.filter((p) => !producerIds.has(p.user_id));
      const removedPlayers = producers.filter(
        (p) => !nearbyPlayers.some((player) => player.user_id === p.user_id)
      );
  
      if (newPlayers.length > 0 || removedPlayers.length > 0) {
        console.log("Updating producers list.", { newPlayers, removedPlayers });
        await consume({
          userId: user.user_id,
          newPlayers,
          removedPlayers,
          othersContainerRef,
        });
        setProducers(nearbyPlayers);
      }
    };
  
    fetchAndUpdateProducers();
  }, [nearbyPlayers, producers, user]);

  const handleCleanup = () => {
    console.log("Performing cleanup before page unload...");
    disconnect({ userId: user.user_id });
  };

  useNavigationHandlers(handleCleanup);

  return (
    <div className="camera-container">
      <div value></div>
      <div className="user-id-display">
        User ID: {user.user_id}
      </div>
      <button
        onClick={startProducing}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >Camera
      </button>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: "400px", height: "100%" }}
        className="sefl-video"
      />
      <div id="camera-placeholder" className="grid grid-cols-3 gap-4" ref={othersContainerRef}/>
    </div>
  );
};

Camera.propTypes = {
  nearbyPlayers: PropTypes.arrayOf(
    PropTypes.shape({
      user_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      username: PropTypes.string.isRequired,
      position_x: PropTypes.number,
      position_y: PropTypes.number,
    })
  ).isRequired,

  user: PropTypes.shape({
    user_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    username: PropTypes.string.isRequired,
    position_x: PropTypes.number,
    position_y: PropTypes.number,
  }).isRequired,
};

export default Camera;
