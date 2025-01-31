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

  const view = async () => {
    await consume({
      userId: user.user_id,
      // players: nearbyPlayers,
      othersContainerRef,
    });
  };

  // useEffect(() => {
  //   const fetchAndUpdateProducers = async () => {
  //     const producerIds = new Set(producers.map((p) => p.user_id));
  //     const hasNewPlayers = nearbyPlayers.some(
  //       (newPlayer) => !producerIds.has(newPlayer.user_id)
  //     );
  //     const hasRemovedPlayers = producers.some(
  //       (producer) =>
  //         !nearbyPlayers.some((player) => player.user_id === producer.user_id)
  //     );

  //     if (hasNewPlayers || hasRemovedPlayers) {
  //       console.log("Updating producers list.");
  //       await consume({
  //         userId: user.user_id,
  //         players: nearbyPlayers,
  //         othersContainerRef,
  //       });
  //       setProducers(nearbyPlayers);
  //     }
  //   };

  //   fetchAndUpdateProducers();
  // }, [nearbyPlayers]);

  const handleCleanup = () => {
    console.log("Performing cleanup before page unload...");
    disconnect({ userId: user.user_id });
  };

  useNavigationHandlers(handleCleanup);

  return (
    <div className="camera-container">
      <button
        onClick={startProducing}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >Camera
      </button>
      <button
        onClick={view}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >View
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
