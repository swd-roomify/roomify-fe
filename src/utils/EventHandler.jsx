import { useEffect } from 'react';

const cameraPlaceholder = 'camera-placeholder';

const useNavigationHandlers = (handleCleanup) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
      
      handleCleanup();
      
      return '';
    };

    const handlePopState = (event) => {
      handleCleanup();
    };

    const handleRouteChange = () => {
      const unloadEvent = new Event('beforeunload');
      window.dispatchEvent(unloadEvent);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    
    if (window.history?.listen) {
      const unlisten = window.history.listen(handleRouteChange);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        window.removeEventListener('popstate', handlePopState);
        unlisten();
      };
    }

    // Cleanup if not using React Router
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handleCleanup]);
};

function createMediaElement(kind, track, userId) {
  let mediaElement;
  const container = document.getElementById(cameraPlaceholder);
  if (!container) {
    console.error(`Container element '${cameraPlaceholder}' not found!`);
    return;
  }

  if (kind === "audio") {
    mediaElement = document.createElement("audio");
    mediaElement.id = `remoteAudio_${userId}`;
    mediaElement.srcObject = new MediaStream([track]);
    mediaElement.autoplay = true;
    mediaElement.controls = false;
    mediaElement.style.display = "none";
  } else if (kind === "video") {
    mediaElement = document.createElement("video");
    mediaElement.id = `remoteVideo_${userId}`;
    mediaElement.srcObject = new MediaStream([track]);
    mediaElement.autoplay = true;
    mediaElement.playsInline = true;
    mediaElement.muted = true;
    mediaElement.style.width = "340px";
    mediaElement.style.height = "180px";
  }

  container.appendChild(mediaElement);
}

// Remove the video and audio elements from the camera placeholder frontend
const handleCloseProducerTransport = async ({ userId }) => {
  console.log("Remove media element for user:", userId);
  const mediaElement = document.getElementById(cameraPlaceholder);

  ['video', 'audio'].forEach((type) => {
      const element = document.getElementById(`remote${type.charAt(0).toUpperCase() + type.slice(1)}_${userId}`);
      if (element && element.parentNode === mediaElement) {
          mediaElement.removeChild(element);
      }
  });
};

export default useNavigationHandlers;
export { createMediaElement, handleCloseProducerTransport };