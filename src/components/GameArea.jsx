import React from 'react';

function GameArea({ users }) {
  return (
    <div
      id="game-area"
      style={{
        width: "90vw",
        maxWidth: "400px",
        height: "90vw",
        maxHeight: "400px",
        backgroundColor: "#f9f9f9",
        border: "2px solid #ccc",
        position: "relative",
        margin: "0 auto",
        backgroundImage: "url('/background.png')"
      }}
    >
      {Object.entries(users).map(([username, userData]) => (
        <div
          key={username}
          className="box"
          style={{
            position: "absolute",
            left: `${Math.min(Math.max(userData.position_x, 0), 360)}px`, // Giới hạn tọa độ trong vùng game
            top: `${Math.min(Math.max(userData.position_y, 0), 360)}px`,
            width: "10%",
            maxWidth: "40px",
            height: "10%",
            maxHeight: "40px",
            backgroundColor: username === "your-username" ? "blue" : "red",
          }}
        />
      ))}
    </div>
  );
}


export default GameArea;
