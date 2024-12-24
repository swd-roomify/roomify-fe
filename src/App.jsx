import React, { useState, useEffect } from 'react';
import GameArea from './components/GameArea';
import UserList from './components/UserList';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

function App() {
  const [users, setUsers] = useState({});
  const [stompClient, setStompClient] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const username = prompt('Enter your username: ');
    setCurrentUser(username);

    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8081/ws'),
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = (frame) => {
      console.log('Connected:', frame);
      setStompClient(client);

      client.publish({
        destination: '/app/join',
        body: JSON.stringify({ username }),
      });

      client.subscribe('/topic/map', (message) => {
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
        destination: '/app/move',
        body: JSON.stringify({ username: currentUser, ...position }),
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!currentUser || !users[currentUser]) return;

      const currentPosition = users[currentUser];
      let newPosition = { ...currentPosition };

      switch (event.key) {
        case 'ArrowUp':
          newPosition.position_y = Math.max(0, currentPosition.position_y - 10);
          break;
        case 'ArrowDown':
          newPosition.position_y = Math.min(360, currentPosition.position_y + 10);
          break;
        case 'ArrowLeft':
          newPosition.position_x = Math.max(0, currentPosition.position_x - 10);
          break;
        case 'ArrowRight':
          newPosition.position_x = Math.min(360, currentPosition.position_x + 10);
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
<<<<<<< Updated upstream
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test Github action
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
=======
    <div>
      <h1>WebSocket Box Control</h1>
      <GameArea users={users} />
      <UserList users={users} />
    </div>
  );
>>>>>>> Stashed changes
}

export default App;
