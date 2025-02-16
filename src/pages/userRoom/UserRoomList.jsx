import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateRoom from "../../components/listRoom/RoomCreate";
import RoomJoin from "../../components/listRoom/RoomJoin";
import ListRoom from "../../components/listRoom/ListRoom";
import "../../assets/style/css/listRoom/userRoomList.css";
import axios from "axios";
import { CreateRoomUserUtil, GetRoomUserUtil, JoinRoomUserUtil } from "@/utils/RoomUtil";

const BASE_API_URL = "http://localhost:8081";

const UserRoomList = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const account = JSON.parse(localStorage.getItem("user"));

    if (!token || !account) {
      navigate("/login");
      return;
    }
    const fetchRooms = async () => {
      try {
        const response = await GetRoomUserUtil(account.user_id);
        setRooms(response);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, [navigate]);

  const handleCreateRoom = async (roomName) => {
    try {
      const account = JSON.parse(localStorage.getItem("user"));
      if (!account) {
        navigate("/login");
        return;
      }

      const newRoom = await CreateRoomUserUtil(roomName, account.user_id);
      setRooms([newRoom, ...rooms]);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleJoinRoom = async (roomCode) => {
    try {
      const joinedRoom = await JoinRoomUserUtil(roomCode);
      if (joinedRoom) {
        console.log(joinedRoom);
        navigate(`/join`, { state: { joinedRoom } });
      } else {
        console.error("Room not found");
      }
    } catch (error) {
      console.error("Error joining room:", error);
    }
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
