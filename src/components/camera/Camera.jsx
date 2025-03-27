import React, { useState, useEffect, useRef } from "react";
import "../../assets/style/css/camera.css";
import useMediasoup from "../../hooks/SFUWebsocketHandler";
import useNavigationHandlers from "../../utils/EventHandler";
import PropTypes from "prop-types";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa";

const Camera = ({ nearbyPlayers, user }) => {
  const { videoRef, setUser_id, produce, consume, disconnect } = useMediasoup();
  const othersContainerRef = useRef(null);
  const [producers, setProducers] = useState([]);
  const retryCountRef = useRef(0);

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

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

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };

  const toggleCamera = async () => {
    if (isCameraOn) {
      console.log("Turning off camera...");
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      disconnect({ userId: user.user_id }); // 🔥 Thông báo Mediasoup dừng stream
    } else {
      console.log("Turning on camera...");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        startProducing(); // 🔥 Khi bật lại camera, gọi lại `produce()`
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }
  
    setIsCameraOn(!isCameraOn);
  };

  return (
    <>
      <div className="user-camera">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={!isMicOn}
          className="user-video"
          style={{ display: isCameraOn ? "block" : "none" }}
        />
        {!isCameraOn && <div className="camera-off">Camera Off</div>}
      </div>

      <div className="camera-controls">
        <button onClick={toggleMic} className={`control-btn ${isMicOn ? "active" : "inactive"}`}>
          {isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </button>
        <button onClick={toggleCamera} className={`control-btn ${isCameraOn ? "active" : "inactive"}`}>
          {isCameraOn ? <FaVideo /> : <FaVideoSlash />}
        </button>
      </div>

      {/* 🔥 Thêm lại phần hiển thị camera của người chơi gần nhau */}
      <div id="camera-placeholder" className="grid grid-cols-3 gap-4" ref={othersContainerRef} />
    </>
  );
};

Camera.propTypes = {
  nearbyPlayers: PropTypes.arrayOf(
    PropTypes.shape({
      user_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      username: PropTypes.string.isRequired,
      position_x: PropTypes.number,
      position_y: PropTypes.number,
    })
  ).isRequired,

  user: PropTypes.shape({
    user_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    username: PropTypes.string.isRequired,
    position_x: PropTypes.number,
    position_y: PropTypes.number,
  }).isRequired,
};

export default Camera;
