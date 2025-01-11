import React, { useState } from 'react';
import useWebSocket from './utils/useWebSocket';
import useKeyControl from './utils/useKeyControl';
import GameArea from './components/phaser/GameArea';
import UserList from './components/phaser/UserList';
import { WS_ROUTES, WS_TOPICS, createStompConfig } from './WebSocketConstaint';
import './App.css';

function App() {
  const [currentUser] = useState(localStorage.getItem('username'));
  const [nearbyUsers, setNearbyUsers] = useState([]);

  const { users, sendPosition } = useWebSocket(createStompConfig, WS_ROUTES, WS_TOPICS, currentUser);

  const handleNearbyUsersChange = (users) => {
    setNearbyUsers(users);
  };

  const updatePositionCallback = (newPosition) => {
    sendPosition(newPosition);
  };

  useKeyControl(currentUser, users, updatePositionCallback);

  return (
    <div>
      <h1>WebSocket Box Control</h1>
      <GameArea
        users={users}
        currentUser={currentUser}
        onNearbyUsersChange={handleNearbyUsersChange}
      />
      <UserList users={users} />
      <div
        id="camera-placeholders"
        style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          width: '100%',
          backgroundColor: '#000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
          overflowX: 'auto',
        }}
      >
        {nearbyUsers.map((username) => (
          <div
            key={username}
            style={{
              width: '150px',
              height: '100px',
              margin: '0 10px',
              backgroundColor: '#333',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
              fontSize: '14px',
            }}
          >
            {username}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
