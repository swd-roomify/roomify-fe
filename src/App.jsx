import { Client } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react';
import './App.css';
import GameArea from './components/GameArea';
import UserList from './components/UserList';
import { WS_ROUTES, WS_TOPICS, createStompConfig } from './WebSocketConstaint';

function App() {
  const [users, setUsers] = useState({});
  const [stompClient, setStompClient] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const username = prompt('Enter your username: ');
    setCurrentUser(username);

    const client = new Client(createStompConfig());

    client.onConnect = (frame) => {
      console.log('Connected:', frame);
      setStompClient(client);

      client.publish({
        destination: WS_ROUTES.JOIN,
        body: JSON.stringify({ username }),
      });

      client.subscribe(WS_TOPICS.POSITIONS, (message) => {
        const userMap = JSON.parse(message.body);
        setUsers(userMap);
      });
    };

    client.onStompError = (frame) => console.error('STOMP error:', frame);

    client.activate();

    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, []);

  const sendPosition = (position) => {
    if (stompClient?.active) {
      stompClient.publish({
        destination: WS_ROUTES.MOVE,
        body: JSON.stringify({ username: currentUser, ...position }),
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!currentUser || !users[currentUser]) return;
    
      const currentPosition = users[currentUser];
      let newPosition = { ...currentPosition };
    
      const step = 10; // Bước di chuyển
      const maxBoundary = 360; // Giới hạn tọa độ trong game area (400px - 40px box)
    
      switch (event.key) {
        case "ArrowUp":
          newPosition.position_y = Math.max(0, currentPosition.position_y - step);
          break;
        case "ArrowDown":
          newPosition.position_y = Math.min(maxBoundary, currentPosition.position_y + step);
          break;
        case "ArrowLeft":
          newPosition.position_x = Math.max(0, currentPosition.position_x - step);
          break;
        case "ArrowRight":
          newPosition.position_x = Math.min(maxBoundary, currentPosition.position_x + step);
          break;
        default:
          return;
      }
    
      setUsers((prevUsers) => ({
        ...prevUsers,
        [currentUser]: newPosition,
      }));
    
      sendPosition(newPosition);
    };
    

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [users, currentUser, sendPosition]);

  return (
    <div>
      <h1>WebSocket Box Control</h1>
      <UserList users={users} />
      <GameArea users={users} />
    </div>
  );
}

export default App;