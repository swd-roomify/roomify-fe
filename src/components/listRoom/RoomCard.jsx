import React from "react";
import "../../assets/style/css/listRoom/roomCard.css"; 

const RoomCard = ({ roomName, roomCode, hostId, createdAt, onJoin }) => {
  return (
    <div className="room-card">
      <div className="room-info">
        <h3 className="room-title">{roomName}</h3>
        <p><strong>Room Code:</strong> {roomCode}</p>
        <p><strong>Host:</strong> {hostId}</p>
        <p><strong>Created:</strong> {new Date(createdAt).toLocaleString()}</p>
      </div>

      {/* Join Button */}
      <button className="join-btn" onClick={onJoin}>JOIN</button>
    </div>
  );
};

export default RoomCard;
