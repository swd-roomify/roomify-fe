import React, { useState } from 'react';
import "../../assets/style/css/chat.css";
import Draggable from 'react-draggable';
import useWebSocket from '../../hooks/useWebSocket';
import { createStompConfig, WS_ROUTES, WS_TOPICS } from '../../constants/WebSocketConstaint';

const Chat = ({ user }) => {
    const [input, setInput] = useState('');
    const { chatMessages, sendChatMessage } = useWebSocket(createStompConfig, WS_ROUTES, WS_TOPICS, user);

    const handleSend = () => {
        if (input.trim()) {
            sendChatMessage(input);
            setInput('');
        }
    };

    return (
        <Draggable>
            <div id="chat-container">
                <div id="chat-log">
                    {chatMessages.map((msg, index) => (
                        <div key={index} className="chat-message">
                            <strong>{msg.username}:</strong> {msg.message}
                        </div>
                    ))}
                </div>
                <div id="chat-input-container">
                    <input
                        id="chat-input"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button id="send-button" onClick={handleSend}>
                        Send
                    </button>
                </div>
            </div>
        </Draggable>
    );
};

export default Chat;