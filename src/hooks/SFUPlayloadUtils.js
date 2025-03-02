export const payload = async (...args) => {
    try {
        const jsonString = JSON.stringify(args);
        return jsonString;
    } catch (error) {
        console.error('Error converting payload to JSON:', error);
        return JSON.stringify({ error: 'Failed to convert payload' });
    }
};

export const verifyPayload = async (payload) => {
    try {
        JSON.parse(payload);
        return true;
    } catch (error) {
        console.error('Error parsing payload:', error);
        return false;
    }
};