import axios from 'axios';

const BASE_API_URL = 'http://localhost:5000';

export const SignUpUtil = async (username, email, password) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/signup`, {
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
        const response = await axios.post(`${BASE_API_URL}/signin`, {
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