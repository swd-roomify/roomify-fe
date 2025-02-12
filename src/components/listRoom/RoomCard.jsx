import React from "react";
import "../../assets/style/css/listRoom/roomCard.css";

const RoomCard = ({ roomName, roomCode, hostId, createdAt, onJoin }) => {
  return (
    <div className="room-card">
      <h3>{roomName}</h3>
      <p>
        <strong>Room Code:</strong> {roomCode}
      </p>
      <p>
        <strong>Room:</strong> {hostId}
      </p>
      <p>
        <strong>Created:</strong> {new Date(createdAt).toLocaleString()}
      </p>
      <button className="join-btn" onClick={onJoin}>
        JOIN
      </button>
    </div>
  );
};

export default RoomCard;
