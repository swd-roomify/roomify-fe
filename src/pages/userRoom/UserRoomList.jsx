import { useState } from "react";
import CreateRoom from "../../components/listRoom/RoomCreate";  
import RoomJoin from "../../components/listRoom/RoomJoin";      
import ListRoom from "../../components/listRoom/ListRoom";     
import "../../assets/style/css/listRoom/userRoomList.css";

const UserRoomList = () => {
  const initialRooms = [
    {
      roomId: "3112r23tfdf3",
      roomName: "Alpha Room",
      roomCode: "ALPHA123",
      hostId: "user1",
      createdAt: new Date("2025-02-08T10:00:00"),
    },
    {
      roomName: "Beta Room",
      roomCode: "BETA456",
      hostId: "user2",
      createdAt: new Date("2025-02-07T12:30:00"),
    },
    {
      roomName: "Gamma Room",
      roomCode: "GAMMA789",
      hostId: "user3",
      createdAt: new Date("2025-02-06T15:45:00"),
    },
  ];

  const [rooms, setRooms] = useState(initialRooms);


  const handleCreateRoom = (roomName) => {
    const newRoom = {
      roomName,
      roomCode: `ROOM${Math.floor(Math.random() * 1000)}`, 
      hostId: "currentUser", 
      createdAt: new Date(),
    };
    setRooms([newRoom, ...rooms]);
  };


  const handleJoinRoom = (roomCode) => {
    alert(`Joining room with code: ${roomCode}`);
  };

  return (
    <div className="user-room-list">
      <h2>User Rooms</h2>
      <CreateRoom onCreate={handleCreateRoom} />
      <RoomJoin onJoin={handleJoinRoom} />
      <ListRoom rooms={rooms} onJoin={handleJoinRoom} />
    </div>
  );
};

export default UserRoomList;
