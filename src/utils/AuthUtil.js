import { BASE_API_URL } from '@/constants/apiBaseUrlConstants';
import axios from 'axios';

export const checkAuth = () => {
    return (localStorage.getItem('token') != null && localStorage.getItem('user') != null)
}

export const SignUpUtil = async (username, email, password) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/api/auth/register-account`, {
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
        const response = await axios.post(`${BASE_API_URL}/api/user/v1/signin`, {
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

export const getUserUtil = async (username) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.get(`${BASE_API_URL}/api/auth/me/${username}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};