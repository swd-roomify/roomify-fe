import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../home/logout";
const MenuPage = ({ setIsLoggedIn }) => {
  const username = localStorage.getItem("username");
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const characters = ["character", "character2", "character3", "character4"];
  const token = localStorage.getItem("token");
  const handleJoinRoom = async () => {
    if (username) {
      setLoading(true);

      try {
        const response = await fetch(
          "http://localhost:8081/api/user/generate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Add the token here
            },
            body: JSON.stringify({
              username: username,
              character: selectedCharacter,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to generate user");
        }

        const user = await response.json();
        console.log(user);

        navigate("/demo", { state: { user } });
      } catch (error) {
        console.error("Error generating user:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <Logout setIsLoggedIn={setIsLoggedIn} />
      <h1>User {username} join the Game</h1>
      <div style={{ marginBottom: "20px" }}>
        <h3>Choose a Character:</h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          {characters.map((char) => (
            <img
              key={char}
              src={`/assets/sprites/${char}.png`}
              alt={char}
              onClick={() => setSelectedCharacter(char)}
              style={{
                width: "80px",
                height: "80px",
                border:
                  selectedCharacter === char
                    ? "3px solid #4CAF50"
                    : "2px solid transparent",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
      <button
        onClick={handleJoinRoom}
        disabled={loading || !username}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Loading..." : "Join Room"}
      </button>

      {loading && (
        <div style={{ marginTop: "20px" }}>
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
