import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { generateUser } from '../../api/generateUser'; // Import the function

const JoinPage = () => {
  const [username, setUsername] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const roomCode = new URLSearchParams(location.search).get('room') || '';

  const characters = ['character', 'character2', 'character3', 'character4'];

  const handleHopIn = async () => {
    if (username.trim() && roomCode.trim()) {
      setLoading(true);
      try {
        const user = await generateUser(username, selectedCharacter);
        console.log(user);
        navigate('/play', { state: { user, roomCode } });
      } catch (error) {
        console.error('Error generating user:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Join Room: {roomCode}</h1>
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
      <div style={{ marginBottom: '20px' }}>
        <h3>Choose a Character:</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {characters.map((char) => (
            <img
              key={char}
              src={`/assets/sprites/${char}.png`}
              alt={char}
              onClick={() => setSelectedCharacter(char)}
              style={{
                width: '80px',
                height: '80px',
                border: selectedCharacter === char ? '3px solid #4CAF50' : '2px solid transparent',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleHopIn}
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
        {loading ? 'Loading...' : 'Hop In'}
      </button>

      {loading && (
        <div style={{ marginTop: '20px' }}>
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
};

export default JoinPage;
