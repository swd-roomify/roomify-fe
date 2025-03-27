import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateRoom from "../../components/listRoom/RoomCreate";
import RoomJoin from "../../components/listRoom/RoomJoin";
import ListRoom from "../../components/listRoom/ListRoom";
import OtherUserRooms from "../../components/listRoom/OtherUserRooms.jsx";
import "../../assets/style/css/listRoom/userRoomList.css";
import { CreateRoomUserUtil, GetRoomUserUtil, JoinRoomUserUtil, GetAllRooms } from "@/utils/RoomUtil"; // Import GetAllRooms

const UserRoomList = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]); // Phòng của user
  const [otherRooms, setOtherRooms] = useState([]); // Phòng của user khác
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 5; // Số phòng mỗi trang

  useEffect(() => {
    const token = localStorage.getItem("token");
    const account = JSON.parse(localStorage.getItem("user"));

    if (!token || !account) {
      navigate("/login");
      return;
    }

    const fetchRooms = async () => {
      try {
        const userRooms = await GetRoomUserUtil(account.user_id);
        setRooms(userRooms);

        const allRooms = await GetAllRooms();
        const filteredRooms = allRooms.filter(room => room.host.user_id != account.user_id);
        setOtherRooms(filteredRooms);
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
        navigate(`/join`, { state: { joinedRoom } });
      } else {
        console.error("Room not found");
      }
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = otherRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const nextPage = () => {
    if (currentPage < Math.ceil(otherRooms.length / roomsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="user-room-container">
      <div className="user-rooms">
        <h2>Your Rooms</h2>
        <CreateRoom onCreate={handleCreateRoom} />
        <RoomJoin onJoin={handleJoinRoom} />
        <ListRoom rooms={rooms} onJoin={handleJoinRoom} />
      </div>

      <div className="other-rooms">
        <h2>Other User Rooms</h2>
        <OtherUserRooms rooms={currentRooms} onJoin={handleJoinRoom} />

        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage}</span>
          <button onClick={nextPage} disabled={currentPage === Math.ceil(otherRooms.length / roomsPerPage)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default UserRoomList;
