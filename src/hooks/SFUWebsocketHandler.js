import { useEffect, useRef, useState } from 'react';
import { Device } from 'mediasoup-client';
import io from 'socket.io-client';
import mediasoupServerConstants from '../constants/mediasoupServerConstants';
import mediasoupErrorMessage from '../constants/mediasoupErrorMessage';
import { payload, verifyPayload } from './SFUPlayloadUtils';

export const useMediasoup = () => {
    const videoRef = useRef(null);
    const socketRef = useRef(null);
    const deviceRef = useRef(null);
    const producerRef = useRef(null);
    const transportRef = useRef(null);
    const consumerTransportRef = useRef(null);

    const [user_id, setUser_id] = useState('');
    const [isCamera, setIsCamera] = useState(false);
    const [publishStatus, setPublishStatus] = useState('');

    useEffect(() => {
        if (!user_id) return;

        socketRef.current = io.connect(mediasoupServerConstants.sfuServerUrl);

        socketRef.current.onAny(async (event, data) => {
            if (!await verifyPayload(data)) {
                console.log('Invalid payload:', data);
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
                    console.log('Producer ID:', payload);
                    break;
                case mediasoupServerConstants.err:
                    console.error(mediasoupErrorMessage.unknow, payload);
                    setPublishStatus(mediasoupErrorMessage.unknow);
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
        socketRef.current.emit(type, data ? await payload(data) : undefined);
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
            setPublishStatus(mediasoupErrorMessage.loadDeviceFailed);
        }
    };

    const handleCloseProducerTransport = async ({ user_id }) => {
        const mediaElement = document.getElementById('remoteVideo_' + user_id);
        if (mediaElement) {
            mediaElement.parentNode.removeChild(mediaElement);
        }
    };

    const handleSubTransportCreated = async (payload) => {
        const transportInfo = payload[0];
        const [{ id, iceParameters, iceCandidates, dtlsParameters }] = transportInfo;

        const transport = deviceRef.current.createRecvTransport({
            id,
            iceParameters,
            iceCandidates,
            dtlsParameters
        });

        handleConsumer();

        transport.on(mediasoupServerConstants.connect, async ({ dtlsParameters }, callback, errback) => {
            try {
                send(mediasoupServerConstants.connectConsumerTransport, { dtlsParameters });
                callback();
            } catch (error) {
                errback(error);
            }
        });

        transport.on(mediasoupServerConstants.connectionstatechange, async (state) => {
            switch (state) {
                case mediasoupServerConstants.connecting:
                    // console.log('Consumer transport connecting...');
                    break;
                case mediasoupServerConstants.connected:
                    // console.log('Consumer transport connected');
                    break;
                case mediasoupServerConstants.failed:
                    // console.error('Consumer transport failed');
                    transport.close();
                    break;
                default:
                    break;
            }
        });

        consumerTransportRef.current = transport;
    };

    const handleConsumer = async () => {
        const rtpCapabilities = deviceRef.current.rtpCapabilities;
        send(mediasoupServerConstants.consume, { rtpCapabilities });
    };

    const subscribe = async () => {
        send(mediasoupServerConstants.createConsumerTransport);
    };

    const openCamera = async () => {
        if (isCamera) {
            // user press on camera button again to close camera
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            setIsCamera(false);
            send(mediasoupServerConstants.closeProducerTransport, videoRef.current.srcObject.id);
            setPublishStatus('');
        } else {
            // open camera
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            const userId = stream.id;
            videoRef.current.srcObject = stream;
            setIsCamera(true);

            await send(mediasoupServerConstants.createProducerTransport, userId);
            setPublishStatus('Publishing...');
        }
    };

    const handleProducerTransportCreated = async (payload) => {
        const [{ id, iceParameters, iceCandidates, dtlsParameters }] = payload;
        const transport = deviceRef.current.createSendTransport({
            id,
            iceParameters,
            iceCandidates,
            dtlsParameters
        });

        transportRef.current = transport;

        transport.on(mediasoupServerConstants.connect, async ({ dtlsParameters }, callback, errback) => {
            try {
                await send(mediasoupServerConstants.transportConnect, {
                    userId: videoRef.current.srcObject.id,
                    dtlsParameters
                });
                callback({ id });
            } catch (error) {
                errback(error);
            }
        });

        transport.on(mediasoupServerConstants.produce, async ({ kind, rtpParameters }, callback, errback) => {
            try {
                const response = await new Promise((resolve, reject) => {
                    send(mediasoupServerConstants.transportProduce, {
                        userId: videoRef.current.srcObject.id,
                        kind,
                        rtpParameters
                    });

                    socketRef.current.once(mediasoupServerConstants.producerId, (data) => resolve(JSON.parse(data)));
                });
        
                callback({ id: response.producerId });
            } catch (error) {
                errback(error);
            }
        });

        try {
            const stream = videoRef.current.srcObject;
            
            if (!stream) {
                throw new Error('No media stream available');
            }
        
            const videoTrack = stream.getVideoTracks()[0];
            const audioTrack = stream.getAudioTracks()[0];
        
            if (!videoTrack) {
                throw new Error('No video track available');
            }
            if (!audioTrack) {
                throw new Error('No audio track available');
            }

            const videoProducer = await transport.produce({
                track: videoTrack,
                encodings: [{ maxBitrate: 900000 }],
            });
            
            const audioProducer = await transport.produce({
                track: audioTrack,
            });
        
            if (!videoProducer || !audioProducer) {
                throw new Error('Failed to create producers');
            }
            
            producerRef.current = { videoProducer, audioProducer };
            console.log('Producer transport connected', producerRef.current);
        } catch (error) {
            console.error('Detailed error:', {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
            setPublishStatus(mediasoupErrorMessage.unknow);
        }
    };

    const onSubscribed = async (payload) => {
        let consumersList = [];
        consumersList = payload;

        if (payload.length == 0) {
            console.log('No consumer found');
            return;
        }

        for (const consumerInfo of consumersList) {
            for (const key in consumerInfo) {
                try {
                    const { id, producerId, kind, rtpParameters } = consumerInfo[key];
    
                    const codecOptions = {};
                    const consumer = await consumerTransportRef.current.consume({
                        id,
                        producerId,
                        kind,
                        rtpParameters,
                        codecOptions,
                    });
    
                    console.log('Consumer created:', consumer);
    
                    const stream = new MediaStream();
                    stream.addTrack(consumer.track);
    
                    if (consumer.kind === "audio") {
                        const audioElement = document.createElement("audio");
                        audioElement.id = `remoteVideo_${user_id}`;
                        audioElement.srcObject = stream;
                        audioElement.autoplay = true;
                        audioElement.controls = false;
                        audioElement.style.display = "none";
                        document.body.appendChild(audioElement);
                    } else if (consumer.kind === "video") {
                        const videoElement = document.createElement("video");
                        videoElement.id = `remoteVideo_${user_id}`;
                        videoElement.srcObject = stream;
                        videoElement.autoplay = true;
                        videoElement.playsInline = true;
                        videoElement.style.width = "340px";
                        videoElement.style.height = "180px";
    
                        const container = document.getElementById("remoteVideosContainer");
                        if (container) {
                            container.appendChild(videoElement);
                        }
                    }
                } catch (error) {
                    console.error(mediasoupErrorMessage.unknow, error);
                }
            }
        }
    };

    return {
        videoRef,
        user_id,
        setUser_id,
        isCamera,
        publishStatus,
        openCamera,
        subscribe
    };
};