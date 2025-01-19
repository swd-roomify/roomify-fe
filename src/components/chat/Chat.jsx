import React, { useState } from 'react';
import "../../assets/style/css/chat.css";
import Draggable from 'react-draggable';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, input]);
            setInput('');
        }
    };

    return (
        <Draggable>
            <div id='chat-container'>
                <div id='chat-log'>
                    {messages.map((message, index) => (
                        <div key={index} className='chat-message'>
                            {message}
                        </div>
                    ))}
                </div>
                <div id='chat-input-container'>
                    <input
                        id='chat-input'
                        type='text'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Type a message...'
                    />
                    <button id='send-button' onClick={handleSend}>Send</button>
                </div>
            </div>
        </Draggable>
    );
};

export default Chat;
