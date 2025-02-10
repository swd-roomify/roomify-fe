import React, { useState } from "react";
import "../../assets/style/css/listRoom/createRoom.css";

const CreateRoom = ({ onCreate }) => {
  const [roomName, setRoomName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomName.trim() === "") return;
    onCreate(roomName);
    setRoomName("");
  };

  return (
    <div className="create-room">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="create-room-input"
          placeholder="Enter room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button type="submit" className="create-room-btn">
          Create Room
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;
