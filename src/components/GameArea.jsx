import React from 'react';

function GameArea({ users }) {
  return (
    <div
      id="game-area"
      style={{
        width: "1000px",
        height: "1000px",
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {Object.entries(users).map(([username, userData]) => (
        <div
          key={username}
          className="box"
          style={{
            position: "absolute",
            left: `${userData.position_x}px`,
            top: `${userData.position_y}px`,
            width: "40px",
            height: "40px",
            backgroundColor: username === "your-username" ? "blue" : "red",
          }}
        />
      ))}
    </div>
  );
}

export default GameArea;
