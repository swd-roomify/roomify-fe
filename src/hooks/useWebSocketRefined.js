import { Client } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react'

const useWebSocketRefined = (createStompConfig, routes, topics, user, roomId) => {
    const [stompClient, setStompClient] = useState(null);
    const [users, setUsers] = useState({});
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const client = new Client(createStompConfig());
        client.onConnect = () => {
            console.log("Websocket connection established");
            setStompClient(client);
            if (user) {
                console.log(JSON.stringify({
                    userId: user.user_id.toString(), 
                    username: user.username,
                    character: user.character,
                }));
                client.publish({
                    destination: '/app/join', 
                    body: JSON.stringify({
                        userId: user.user_id, 
                        username: user.username,
                        character: user.character,
                    }),
                    headers: {
                        roomId: roomId
                    }
                });
                
            }

            client.subscribe(`/topic/join/${roomId}`, (message) => {
                setUsers(JSON.parse(message.body));
            });

            client.subscribe(`/topic/leave/${roomId}`, (message) => {
                setUsers(JSON.parse(message.body));
            });

            client.subscribe(`/topic/move/${roomId}`, (message) => {
                const userMap = JSON.parse(message.body);
                setUsers(userMap);
            });

            client.subscribe(`/chat/${roomId}`, (message) => {
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
    }, [createStompConfig, user, routes, topics, roomId]);

    const sendPosition = (positionX, positionY) => {
        if (stompClient && stompClient.connected) {
            const moveRequest = {
                userId: user.userId,
                positionX: positionX,
                positionY: positionY
            };
            stompClient.publish({
                destination: `/app/move/${roomId}`,
                body: JSON.stringify(moveRequest)
            });
        }
    };

    const sendMessage = (message) => {
        if (stompClient && stompClient.connected) {
            const chatRequest = {
                userId: user.userId,
                message: message
            };
            stompClient.publish({
                destination: `/app/chat/${roomId}`,
                body: JSON.stringify(chatRequest)
            });
        }
    };

    return { sendPosition, sendMessage, users, chatMessages };
}

export default useWebSocketRefined;