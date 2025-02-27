import React, { useState } from "react";
import "../../assets/style/css/listRoom/roomJoin.css";

const RoomJoin = ({ onJoin }) => {
  const [roomCode, setRoomCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomCode.trim() === "") return;
    onJoin(roomCode);
    setRoomCode("");
  };

  return (
    <div className="room-join">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="room-join-input"
          placeholder="Enter room code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <button type="submit" className="room-join-btn">
          Join Room
        </button>
      </form>
    </div>
  );
};

export default RoomJoin;
