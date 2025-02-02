export const generateUser = async (username, character) => {
    try {
      const response = await fetch('http://localhost:8081/api/user/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, character }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate user');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error generating user:', error);
      throw error;
    }
  };