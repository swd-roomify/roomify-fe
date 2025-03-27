import React, { useState } from "react";
import RoomCard from "./RoomCard";
import "../../assets/style/css/listRoom/listRoom.css";

const OtherUserRooms = ({ rooms, onJoin }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRooms = rooms.filter((room) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      room.room_name.toLowerCase().includes(lowerSearch) ||
      room.room_code.toLowerCase().includes(lowerSearch) ||
      room.host.username.toLowerCase().includes(lowerSearch) ||
      room.host.email.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <div className="list-room-container">
      <input
        type="text"
        placeholder="Search by name, code, host..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="list-room">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room, index) => (
            <RoomCard
              key={index}
              roomName={room.room_name}
              roomCode={room.room_code}
              hostId={room.host.username}
              createdAt={room.created_at}
              onJoin={() => onJoin(room.room_code)}
            />
          ))
        ) : (
          <p className="no-results">No rooms found.</p>
        )}
      </div>
    </div>
  );
};

export default OtherUserRooms;
