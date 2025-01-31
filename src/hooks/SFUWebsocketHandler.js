import { useEffect, useRef, useState } from "react";
import { Device } from "mediasoup-client";
import io from "socket.io-client";
import mediasoupServerConstants from "../constants/mediasoupServerConstants";
import mediasoupErrorMessage from "../constants/mediasoupErrorMessage";
import { payload, verifyPayload } from "./SFUPlayloadUtils";
import {
  createMediaElement,
  handleCloseProducerTransport,
} from "../utils/EventHandler";

const cameraPlaceholder = "camera-placeholder";

const useMediasoup = () => {
  const count = useRef(0);

  const videoRef = useRef(null);
  const socketRef = useRef(null);
  const deviceRef = useRef(null);
  const producerRef = useRef(null);
  const transportRef = useRef(null);
  const newPlayersRef = useRef([]);
  const consumerTransportRef = useRef(null);

  const [user_id, setUser_id] = useState("");
  const [isCamera, setIsCamera] = useState(false);

  useEffect(() => {
    if (!user_id) return;

    socketRef.current = io(mediasoupServerConstants.sfuServerUrl);

    socketRef.current.onAny(async (event, data) => {
      if (!(await verifyPayload(data))) {
        console.log("Invalid payload:", data);
        return;
      }

      const payload = JSON.parse(data);

      switch (event) {
        case mediasoupServerConstants.routerRtpCapabilities:
          loadDevice(payload);
          break;
        case mediasoupServerConstants.subTransportCreated:
          handleSubTransportCreated(payload);
          break;
        case mediasoupServerConstants.producerTransportCreated:
          handleProducerTransportCreated(payload);
          break;
        case mediasoupServerConstants.subscribed:
          onSubscribed(payload);
          break;
        case mediasoupServerConstants.serverLog:
          // TO DO
          // Better enhance this next time
          // console.log('Server log:', ...args);
          break;
        case mediasoupServerConstants.closeProducerTransport:
          handleCloseProducerTransport(payload);
          break;
        case mediasoupServerConstants.producerId:
          // const [{ kind, producerId }] = payload;
          // console.log("Producer   ", kind, producerId);
          break;
        case mediasoupServerConstants.otherUsersDisconnect:
          otherUsersDisconnect(payload);
          break;
        case mediasoupServerConstants.err:
          console.error(mediasoupErrorMessage.unknow, payload);
          break;
        default:
          console.warn(mediasoupErrorMessage.unknowServerMessage + event);
          break;
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [user_id]);

  const send = async (type, data) => {
    if (!socketRef.current) {
      console.error("Socket is not connected, trying to reconnect");
    } else if (socketRef.current.connected && deviceRef.current !== null) {
      socketRef.current.emit(type, data ? await payload(data) : undefined);
    }
  };

  const loadDevice = async (payload) => {
    try {
      const [{ codecs, headerExtensions }] = payload;
      const routerRtpCapabilities = { codecs, headerExtensions };

      const newDevice = new Device();
      await newDevice.load({ routerRtpCapabilities });
      deviceRef.current = newDevice;
    } catch (error) {
      console.error(mediasoupErrorMessage.loadDeviceFailed, error);
    }
  };

  const consume = async (payload) => {
    const { userId, newPlayers, removedPlayers, othersContainerRef } = payload;
    othersContainerRef.current = othersContainerRef;
    newPlayersRef.current = newPlayers;
    await send(mediasoupServerConstants.createConsumerTransport, { userId, newPlayers, removedPlayers });
  };

  // open camera
  const produce = async (parameters) => {
    if (isCamera) {
      console.log("Not yet! Still under development");
      // videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      // const streamId = videoRef.current.srcObject.id;
      // const { userId } = parameters;

      // send(mediasoupServerConstants.closeProducerTransport, {
      //   userId,
      //   streamId,
      // });
      // setIsCamera(false);
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const streamId = stream.id;
      const { userId } = parameters;

      await send(mediasoupServerConstants.createProducerTransport, {
        userId,
        streamId,
      });
      videoRef.current.srcObject = stream;
      setIsCamera(true);
    }
  };

  const handleSubTransportCreated = async (payload) => {
    const transportInfo = payload[0];
    const [{ id, iceParameters, iceCandidates, dtlsParameters }] =
      transportInfo;

    const transport = deviceRef.current.createRecvTransport({
      id,
      iceParameters,
      iceCandidates,
      dtlsParameters,
    });

    handleConsumer();

    transport.on(
      mediasoupServerConstants.connect,
      async ({ dtlsParameters }, callback, errback) => {
        try {
          send(mediasoupServerConstants.connectConsumerTransport, {
            dtlsParameters,
          });
          callback();
        } catch (error) {
          errback(error);
        }
      }
    );

    transport.on(
      mediasoupServerConstants.connectionstatechange,
      async (state) => {
        switch (state) {
          case mediasoupServerConstants.connecting:
            console.log('Consumer transport connecting...');
            break;
          case mediasoupServerConstants.connected:
            console.log('Consumer transport connected');
            break;
          case mediasoupServerConstants.failed:
            console.error('Consumer transport failed');
            transport.close();
            break;
          default:
            break;
        }
      }
    );

    consumerTransportRef.current = transport;
  };

  const handleConsumer = async () => {
    const rtpCapabilities = deviceRef.current.rtpCapabilities;
    send(mediasoupServerConstants.consume, {
      rtpCapabilities,
      nearbyPlayers: newPlayersRef.current,
    });
  };

  const handleProducerTransportCreated = async (payload) => {
    console.log("ICE", payload);

    const [{ id, iceParameters, iceCandidates, dtlsParameters }] = payload;
    const transport = deviceRef.current.createSendTransport({
      id,
      iceParameters,
      iceCandidates,
      dtlsParameters,
    });

    transportRef.current = transport;

    transport.on(
      mediasoupServerConstants.connect,
      async ({ dtlsParameters }, callback, errback) => {
        try {
          await send(mediasoupServerConstants.transportConnect, {
            streamId: videoRef.current.srcObject.id,
            dtlsParameters,
          });
          callback({ id });
        } catch (error) {
          errback(error);
        }
      }
    );

    transport.on(
      mediasoupServerConstants.produce,
      async ({ kind, rtpParameters }, callback, errback) => {
        try {
          const response = await new Promise((resolve, reject) => {
            send(mediasoupServerConstants.transportProduce, {
              streamId: videoRef.current.srcObject.id,
              kind,
              rtpParameters,
            });

            socketRef.current.once(
              mediasoupServerConstants.producerId,
              (data) => resolve(JSON.parse(data))
            );
          });

          callback({ id: response.producerId });
        } catch (error) {
          errback(error);
        }
      }
    );

    await transport.on(
      "icegatheringstatechange",
      async ({ iceGatheringState }, callback, errback) => {
        try {
          console.log("iceGatheringState", iceGatheringState);
        } catch (error) {
          errback(error);
        }
      }
    );

    await transport.on(
      "connectionstatechange",
      async ({ connectionState }, callback, errback) => {
        try {
          console.log("connectionState", connectionState);
        } catch (error) {
          errback(error);
        }
      }
    );

    await transport.on("close", async (callback, errback) => {
      console.log("close");
    });

    try {
      const stream = videoRef.current.srcObject;

      if (!stream) {
        throw new Error("No media stream available");
      }

      const videoTrack = stream.getVideoTracks()[0];
      const audioTrack = stream.getAudioTracks()[0];

      if (!videoTrack) {
        throw new Error("No video track available");
      }
      if (!audioTrack) {
        throw new Error("No audio track available");
      }

      const videoProducer = await transport.produce({
        track: videoTrack,
        encodings: [{ maxBitrate: 900000 }],
      });

      const audioProducer = await transport.produce({
        track: audioTrack,
      });

      if (!videoProducer || !audioProducer) {
        throw new Error("Failed to create producers");
      }

      producerRef.current = { videoProducer, audioProducer };
      console.log("Producer transport connected", producerRef.current);
    } catch (error) {
      console.error("Detailed error:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }
  };

  const onSubscribed = async (payload) => {
    let consumersList = [];
    consumersList = payload;

    for (const consumerInfo of consumersList) {
      for (const key in consumerInfo) {
        try {
          const { userId, id, producerId, kind, rtpParameters } = consumerInfo[key];

          const consumer = await consumerTransportRef.current.consume({
            id,
            producerId,
            kind,
            rtpParameters,
          });

          const { track } = consumer;
          createMediaElement(kind, track, userId);
        } catch (error) {
          console.error(mediasoupErrorMessage.unknow, error);
        }
      }
    }
  };

  const otherUsersDisconnect = async (payload) => {
    const [{ userId }] = payload;
    await handleCloseProducerTransport({ userId });
  }

  const disconnect = async (payload) => {
    const { userId } = payload;
    await send(mediasoupServerConstants.disconnect, { userId });
  };

  return {
    videoRef,
    setUser_id,
    produce,
    consume,
    disconnect,
  };
};

export default useMediasoup;