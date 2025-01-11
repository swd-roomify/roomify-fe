import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MenuPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (username.trim()) {
      localStorage.setItem('username', username);
      navigate('/demo');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Join the Game</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        style={{
          padding: '10px',
          fontSize: '16px',
          width: '300px',
          marginBottom: '20px',
        }}
      />
      <br />
      <button
        onClick={handleJoinRoom}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Join Room
      </button>
    </div>
  );
};

export default MenuPage;
