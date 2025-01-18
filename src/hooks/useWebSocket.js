import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

const useWebSocket = (createStompConfig, routes, topics, user) => {
  const [stompClient, setStompClient] = useState(null);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const client = new Client(createStompConfig());

    client.onConnect = () => {
      setStompClient(client);

      if (user) {
        console.log(`About to connect user ${user.user_id} with the user name ${user.username} to backend websocket`);
        client.publish({
          destination: routes.JOIN,
          body: JSON.stringify({ userId: user.user_id, username: user.username }),
        });
      }

      client.subscribe(topics.POSITIONS, (message) => {
        const userMap = JSON.parse(message.body);
        console.log('Received user positions:', userMap);
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
  }, [createStompConfig, user, routes.JOIN, topics.POSITIONS]);

  const sendPosition = (position) => {
    console.log(`Send position from user ${user.user_id} `)
    if (stompClient?.active) {
      stompClient.publish({
        destination: routes.MOVE,
        body: JSON.stringify({ userId: user.user_id, username: user.username, ...position }),
      });
    }
  };

  return { users, sendPosition };
};

export default useWebSocket;


