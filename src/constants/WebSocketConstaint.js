import SockJS from 'sockjs-client';
import { BASE_API_URL } from './apiBaseUrlConstants';



export const WS_ENDPOINT = import.meta.env.VITE_REACT_APP_WS_URL || `${BASE_API_URL}/ws`;

export const WS_TOPICS = {
    POSITIONS: '/topic/positions/',
    CHAT: '/topic/chat/',
};

export const WS_ROUTES = {
    JOIN: '/app/join',
    MOVE: '/app/move/',
    CHAT: '/app/chat/',
};

export const WS_CONFIG = {
    RECONNECT_DELAY: 5000,
    HEARTBEAT: {
        INCOMING: 4000,
        OUTGOING: 4000
    }
};


export const createStompConfig = () => ({
    webSocketFactory: () => {
        const sockJs = new SockJS(WS_ENDPOINT, null, {
            withCredentials: true,
        });
        return sockJs;
    },
    // debug: (str) => console.log(str),
    reconnectDelay: WS_CONFIG.RECONNECT_DELAY,
    heartbeatIncoming: WS_CONFIG.HEARTBEAT.INCOMING,
    heartbeatOutgoing: WS_CONFIG.HEARTBEAT.OUTGOING,
});
