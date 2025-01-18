import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MenuPage = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleJoinRoom = async () => {
    if (username.trim()) {
      setLoading(true); 

      try {
        const response = await fetch('http://localhost:8081/api/user/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate user');
        }

        const user = await response.json(); 
        console.log(user); 

        navigate('/demo', { state: { user } });
      } catch (error) {
        console.error('Error generating user:', error);
      } finally {
        setLoading(false);
      }
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
        disabled={loading || !username.trim()}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Loading...' : 'Join Room'}
      </button>

      {loading && (
        <div style={{ marginTop: '20px' }}>
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
