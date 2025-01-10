import React, { useEffect, useRef } from 'react';

function GameArea({ users, currentUser, onNearbyUsersChange }) {
  // Kiểm tra khoảng cách giữa hai người dùng
  const isNearby = (user1, user2) => {
    const dx = Math.abs(user1.position_x - user2.position_x);
    const dy = Math.abs(user1.position_y - user2.position_y);
    return dx <= 80 && dy <= 80;
  };

  // Xác định danh sách người chơi gần `currentUser`
  const nearbyUsers = Object.entries(users).filter(
    ([username, userData]) =>
      username !== currentUser &&
      currentUser &&
      users[currentUser] &&
      isNearby(users[currentUser], userData)
  );

  // Lưu trữ danh sách `nearbyUsers` trước đó để so sánh
  const previousNearbyUsers = useRef([]);

  useEffect(() => {
    const currentNearbyUsernames = nearbyUsers.map(([username]) => username);
    if (
      JSON.stringify(previousNearbyUsers.current) !==
      JSON.stringify(currentNearbyUsernames)
    ) {
      previousNearbyUsers.current = currentNearbyUsernames; // Cập nhật danh sách trước đó
      onNearbyUsersChange(currentNearbyUsernames); // Gửi danh sách mới
    }
  }, [nearbyUsers, onNearbyUsersChange]);

  return (
    <div
      id="game-area"
      style={{
        width: '90vw',
        maxWidth: '400px',
        height: '90vw',
        maxHeight: '400px',
        backgroundImage: "url('/background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        margin: '0 auto',
      }}
    >
      {Object.entries(users).map(([username, userData]) => (
        <div
          key={username}
          className="box"
          style={{
            position: 'absolute',
            left: `${userData.position_x}px`,
            top: `${userData.position_y}px`,
            width: '40px',
            height: '40px',
            backgroundColor: username === currentUser ? 'blue' : 'red',
          }}
        />
      ))}
    </div>
  );
}

export default GameArea;
