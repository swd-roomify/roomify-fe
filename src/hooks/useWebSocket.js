import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

const useWebSocket = (createStompConfig, routes, topics, user) => {
  const [stompClient, setStompClient] = useState(null);
  const [users, setUsers] = useState({});
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const client = new Client(createStompConfig());

    client.onConnect = () => {
      setStompClient(client);

      if (user) {
        client.publish({
          destination: routes.JOIN,
          body: JSON.stringify({ userId: user.user_id, username: user.username, character: user.character }),
        });
      }

      client.subscribe(topics.POSITIONS, (message) => {
        const userMap = JSON.parse(message.body);
        setUsers(userMap);
      });

      client.subscribe(topics.CHAT, (message) => {
        const chatMessage = JSON.parse(message.body);
        setChatMessages((prev) => [...prev, chatMessage]);
      });
    };

    client.onStompError = (frame) => console.error('STOMP error:', frame);

    client.activate();

    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, [createStompConfig, user, routes, topics]);

  const sendPosition = (position) => {
    if (stompClient?.active) {
      stompClient.publish({
        destination: routes.MOVE,
        body: JSON.stringify({ userId: user.user_id, username: user.username, character:user.character , ...position }),
      });
    }
  };

  const sendChatMessage = (message) => {
    console.log("Test resource: " + user.user_id);
    if (stompClient?.active) {
      stompClient.publish({
        destination: routes.CHAT,
        body: JSON.stringify({ userId: user.user_id, username: user.username, message: message }),
      });
    }
  };

  return { users, chatMessages, sendPosition, sendChatMessage };
};

export default useWebSocket;
