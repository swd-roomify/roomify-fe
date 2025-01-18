import { useState, useEffect } from 'react';

const usePlayerMovement = (initialPosition) => {
  const [position, setPosition] = useState(initialPosition);
  const [keysPressed, setKeysPressed] = useState({});

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeysPressed((prev) => ({ ...prev, [event.key]: true }));
    };

    const handleKeyUp = (event) => {
      setKeysPressed((prev) => {
        const newKeysPressed = { ...prev };
        delete newKeysPressed[event.key];
        return newKeysPressed;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const step = 5; // Speed of movement
    const interval = setInterval(() => {
      setPosition((prev) => {
        let { x, y } = prev;

        if (keysPressed.ArrowUp) y -= step;
        if (keysPressed.ArrowDown) y += step;
        if (keysPressed.ArrowLeft) x -= step;
        if (keysPressed.ArrowRight) x += step;

        return { x, y };
      });
    }, 16); // Approximately 60fps

    return () => clearInterval(interval);
  }, [keysPressed]);

  return position;
};

export default usePlayerMovement;
