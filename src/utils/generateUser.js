import { BASE_API_URL } from '@/constants/apiBaseUrlConstants';
import axios from 'axios';

export const generateUser = async (userId, username, character) => {
  const token = localStorage.getItem('token');
  const header = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }
  const body = { 
    user_id: userId, 
    username: username,
    character:character 
  }

  try {
    const response = await axios.post(`${BASE_API_URL}/api/user/v1/generate`, body, header);

    return response.data;
  } catch (error) {
    console.error('Error generating user:', error);
    throw error;
  }
};
