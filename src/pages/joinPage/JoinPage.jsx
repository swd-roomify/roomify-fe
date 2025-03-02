import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { generateUser } from "../../utils/generateUser";
import "../../assets/style/css/joinPage.css";
import { checkAuth } from "@/utils/AuthUtil";

const JoinPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!checkAuth()) {
      navigate("/login");
    }
    if (!location.state?.joinedRoom) {
      navigate("/room");
    }
  }, [location, navigate]);

  const joinedRoom = location.state?.joinedRoom;
  const account = JSON.parse(localStorage.getItem("user"));

  const characters = [
    { id: "character", name: "character" },
    { id: "character2", name: "character2" },
    { id: "character3", name: "character3" },
    { id: "character4", name: "character4" },
  ];

  const handleHopIn = async () => {
    if (username.trim()) {
      setLoading(true);
      try {
        const user = await generateUser(account.user_id, username, selectedCharacter);
        navigate("/play", { state: { user, joinedRoom } });
      } catch (error) {
        console.error("Error generating user:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="join-page-container">
      <h1 className="room-info">Room Code: {joinedRoom.room_code}</h1>
      <h1 className="room-info">Room Name: {joinedRoom.room_name}</h1>

      <div className="input-container">
        <label htmlFor="username" className="input-label">Enter Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Type your username..."
          className="input-field"
        />
      </div>

      <div className="character-selection">
        <h3>Choose a Character:</h3>
        <div className="character-list">
          {characters.map((char) => (
            <div key={char.id} className="character-item">
              <img
                src={`/assets/sprites/${char.id}.png`}
                alt={char.name}
                onClick={() => setSelectedCharacter(char.id)}
                className={selectedCharacter === char.id ? "selected" : ""}
              />
              <p className={selectedCharacter === char.id ? "selected-name" : ""}>
                {char.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleHopIn}
        disabled={loading || !username.trim()}
        className="hop-in-button"
      >
        {loading ? "Loading..." : "Hop In"}
      </button>

      {loading && <div className="loading-text">Loading...</div>}
    </div>
  );
};

export default JoinPage;
