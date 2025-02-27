import React, { useState } from 'react';
import "../../assets/style/css/hostProp.css";
import Draggable from 'react-draggable';
import { Copy, Eye, EyeOff } from 'lucide-react';

const HostProp = () => {
    const [showText, setShowText] = useState(false);
    const defaultLink = "http://localhost:3000/join?room=ABC123";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(defaultLink);
    };

    return (
        <Draggable>
            <div id='host-container' className="host-prop">
                <div className="input-container">
                    <input 
                        type={showText ? "text" : "password"} 
                        value={defaultLink} 
                        placeholder="Invite link..."
                    />
                    <button onClick={copyToClipboard} className="icon-button">
                        <Copy size={20} />
                    </button>
                    <button onClick={() => setShowText(!showText)} className="icon-button">
                        {showText ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                <p>Send this link to friends to invite them into the room</p>
            </div>
        </Draggable>
    );
};

export default HostProp;
