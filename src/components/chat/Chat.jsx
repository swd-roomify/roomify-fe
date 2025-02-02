import React, { useState } from 'react';
import "../../assets/style/css/chat.css";
import Draggable from 'react-draggable';

const Chat = ({ user, chatMessages, sendChatMessage }) => {
    const [input, setInput] = useState('');

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
