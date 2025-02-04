import SockJS from 'sockjs-client';



export const WS_ENDPOINT = import.meta.env.VITE_REACT_APP_WS_URL || 'http://192.168.100.207:8081/ws';

export const WS_TOPICS = {
    POSITIONS: '/topic/positions',
    CHAT: '/topic/chat',
};

export const WS_ROUTES = {
    JOIN: '/app/join',
    MOVE: '/app/move',
    CHAT: '/app/chat',
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
