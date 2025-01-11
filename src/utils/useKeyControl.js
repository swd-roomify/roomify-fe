// hooks/useKeyControl.js
import { useEffect } from 'react';

const useKeyControl = (currentUser, users, updatePositionCallback) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!currentUser || !users[currentUser]) return;

      const currentPosition = users[currentUser];
      let newPosition = { ...currentPosition };

      const step = 10;
      const maxBoundary = 360;

      switch (event.key) {
        case 'ArrowUp':
          newPosition.position_y = Math.max(0, currentPosition.position_y - step);
          break;
        case 'ArrowDown':
          newPosition.position_y = Math.min(maxBoundary, currentPosition.position_y + step);
          break;
        case 'ArrowLeft':
          newPosition.position_x = Math.max(0, currentPosition.position_x - step);
          break;
        case 'ArrowRight':
          newPosition.position_x = Math.min(maxBoundary, currentPosition.position_x + step);
          break;
        default:
          return;
      }

      updatePositionCallback(newPosition);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentUser, users, updatePositionCallback]);
};

export default useKeyControl;
