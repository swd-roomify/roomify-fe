import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateUser } from "../../utils/generateUser";

const MenuPage = () => {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const characters = ["character", "character2", "character3", "character4"];

  const handleJoinRoom = async () => {
    if (username.trim() && roomCode.trim()) {
      setLoading(true);
      try {
        const user = await generateUser(username, selectedCharacter);
        navigate("/demo", { state: { user, roomCode } });
      } catch (error) {
        console.error('Error generating user:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gradient-to-b from-blue-700 to-blue-300 relative">
      <div className="absolute inset-0 bg-[url('/pixel-bg.png')] bg-cover opacity-30"></div>
      <div className="relative bg-white p-10 md:p-20 rounded-2xl w-3/5 shadow-2xl text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mb-6">
          Join or Host a Game
        </h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          required
        />
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Choose a Character:
        </h3>
        <div className="flex justify-center space-x-4 mb-4">
          {characters.map((char) => (
            <img
              key={char}
              src={`/assets/sprites/${char}.png`}
              alt={char}
              onClick={() => setSelectedCharacter(char)}
              className={`h-16 w-16 cursor-pointer transition-all rounded-lg shadow-md border-4 ${
                selectedCharacter === char
                  ? "border-green-500 scale-110"
                  : "border-transparent"
              }`}
            />
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            placeholder="Enter Room Code"
            className="border-2 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-auto"
          />
          <button
            onClick={handleJoinRoom}
            disabled={loading || !username.trim() || !roomCode.trim()}
            className={`px-6 py-2 rounded-lg text-white font-semibold transition-all w-full md:w-auto ${
              loading || !username.trim() || !roomCode.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              "Join Room"
            )}
          </button>
          <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all w-full md:w-auto">
            Host Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
