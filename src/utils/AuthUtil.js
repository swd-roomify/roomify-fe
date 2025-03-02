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

export const SignInUtil = async (username, password) => {
    const response = await axios.post(`${BASE_API_URL}/api/v1/login/non-type`, {
        username,
        password,
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const token = response.data?.data?.token;
    const user_id = response.data?.data?.user_id;

    if (!token) {
        throw new Error("Token not found in response");
    }

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ user_id: user_id }));

    return response.data?.data;
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