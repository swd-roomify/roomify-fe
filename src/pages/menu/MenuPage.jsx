import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateUser } from '../../utils/generateUser';

const MenuPage = () => {
  const [username, setUsername] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const characters = ['character', 'character2', 'character3', 'character4'];

  const handleJoinRoom = async () => {
    if (username.trim() && roomCode.trim()) {
      setLoading(true);
      try {
        const user = await generateUser(username, selectedCharacter);
        console.log(user);
        navigate('/demo', { state: { user, roomCode } });
      } catch (error) {
        console.error('Error generating user:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleHostRoom = () => {
    console.log('Host Room clicked!'); 
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Join or Host a Game</h1>
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

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <div>
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            placeholder="Enter Room Code"
            style={{
              padding: '10px',
              fontSize: '16px',
              width: '200px',
              marginRight: '10px',
            }}
          />
          <button
            onClick={handleJoinRoom}
            disabled={loading || !username.trim() || !roomCode.trim()}
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
        </div>

        <button
          onClick={handleHostRoom}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Host Room
        </button>
      </div>

      {loading && (
        <div style={{ marginTop: '20px' }}>
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
