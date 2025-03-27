import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateRoom from "../../components/listRoom/RoomCreate";
import RoomJoin from "../../components/listRoom/RoomJoin";
import ListRoom from "../../components/listRoom/ListRoom";
import OtherUserRooms from "../../components/listRoom/OtherUserRooms.jsx"; // Import thêm
import "../../assets/style/css/listRoom/userRoomList.css";
import { CreateRoomUserUtil, GetRoomUserUtil, JoinRoomUserUtil } from "@/utils/RoomUtil";

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

        // Dummy data - 15 phòng của user khác
        const dummyRooms = Array.from({ length: 15 }, (_, i) => ({
          room_name: `Room ${i + 1}`,
          room_code: `CODE${i + 100}`,
          host_id: `user_${i + 10}`,
          created_at: new Date(2025, 2, i + 1, 14, 30).toISOString(),
        }));

        setOtherRooms(dummyRooms);
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

  // Lấy danh sách phòng theo trang hiện tại
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = otherRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // Hàm chuyển trang
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
