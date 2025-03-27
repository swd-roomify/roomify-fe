import React from "react";
import RoomCard from "./RoomCard"; // Adjust the import path if needed
import "../../assets/style/css/listRoom/listRoom.css";

const ListRoom = ({ rooms, onJoin }) => {
  return (
    <div className="list-room">
      {rooms.map((room, index) => (
        <RoomCard
          key={index}
          roomName={room.room_name}
          roomCode={room.room_code}
          hostId={room.host.username}
          createdAt={room.created_at}
          onJoin={() => onJoin(room.room_code)}
        />
      ))}
    </div>
  );
};

export default ListRoom;
