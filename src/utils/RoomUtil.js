import axios from 'axios';

const BASE_API_URL = 'http://localhost:8081/api/rooms';

const token = localStorage.getItem('token');

export const GetRoomUserUtil = async (hostId) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/user/${hostId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
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
        const response = await axios.post(`${BASE_API_URL}`, {
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

export const JoinRoomUserUtil = async (roomCode) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/code/${roomCode}`, {}, {
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