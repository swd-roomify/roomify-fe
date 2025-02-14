import { BASE_API_URL } from '@/constants/apiBaseUrlConstants';
import axios from 'axios';

export const generateUser = async (userId, username, character) => {
  const token = localStorage.getItem('token');

  try {
    console.log("About to generate with user id",userId);
    const response = await axios.post(
      `${BASE_API_URL}/api/user/generate`,
      { user_id: userId, 
        username: username,
        character:character },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error generating user:', error);
    throw error;
  }
};
