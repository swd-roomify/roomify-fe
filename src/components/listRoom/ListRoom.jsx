import React from "react";
import RoomCard from "./RoomCard"; // Adjust the import path if needed
import "../../assets/style/css/listRoom/listRoom.css";

const ListRoom = ({ rooms, onJoin }) => {
  return (
    <div className="list-room">
      {rooms.map((room, index) => (
        <RoomCard
          key={index}
          roomName={room.roomName}
          roomCode={room.roomCode}
          hostId={room.hostId}
          createdAt={room.createdAt}
          onJoin={() => onJoin(room.roomCode)}
        />
      ))}
    </div>
  );
};

export default ListRoom;
