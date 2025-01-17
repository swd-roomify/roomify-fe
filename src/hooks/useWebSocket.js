import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

const useWebSocket = (createStompConfig, routes, topics, currentPlayer) => {
  const [stompClient, setStompClient] = useState(null);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const client = new Client(createStompConfig());

    client.onConnect = () => {
      setStompClient(client);

      if (currentPlayer) {
        client.publish({
          destination: routes.JOIN,
          body: JSON.stringify({ userId: currentPlayer.userId, username: currentPlayer.name }),
        });
      }

      client.subscribe(topics.POSITIONS, (message) => {
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
  }, [createStompConfig, currentPlayer, routes.JOIN, topics.POSITIONS]);

  const sendPosition = (position) => {
    if (stompClient?.active) {
      stompClient.publish({
        destination: routes.MOVE,
        body: JSON.stringify({ userId: currentPlayer.userId, username: currentPlayer.name, ...position }),
      });
    }
  };

  return { users, sendPosition };
};

export default useWebSocket;
