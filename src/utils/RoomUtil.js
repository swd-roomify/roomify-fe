import axios from 'axios';

const BASE_API_URL = 'http://localhost:5000/api/room';

const token = localStorage.getItem('token');

export const GetRoomUserUtil = async (roomId, roomName, roomCode, hostId, createAt) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/getRoomUser`, {
            params: {
                roomId,
                roomName,
                roomCode,
                hostId,
                createAt,
            },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error getting room:', error);
        throw error;
    }
};

export const CreateRoomUserUtil = async (roomName, hostId) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/createRoom`, {
            roomName,
            hostId,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error creating room:', error);
        throw error;
    }
};

// Join a room
export const JoinRoomUserUtil = async (roomCode) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/joinRoom/${roomCode}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error joining room:', error);
        throw error;
    }
};