import { BASE_API_URL } from '@/constants/apiBaseUrlConstants';
import axios from 'axios';

export const checkAuth = () => {
    return (localStorage.getItem('token') != null && localStorage.getItem('user') != null)
}

export const SignUpUtil = async (username, email, password) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/api/user/register`, {
            username,
            email,
            password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error during sign-up:', error);
        throw error;
    }
};

export const SignInUtil = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/api/user/signin`, {
            email,
            password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        return response.data;
    } catch (error) {
        console.error('Error during sign-in:', error);
        throw error;
    }
};
