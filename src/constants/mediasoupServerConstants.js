const mediasoupServerConstants = {

    sfuServerUrl: import.meta.env.VITE_SFU_SERVER_URL || "http://192.168.100.207:3000",
    routerRtpCapabilities: "router-rtp-capabilities",
    connectionstatechange: "connectionstatechange",
    serverLog: "server-log",
    err: "error",

    
    // producer
    createProducerTransport: "create-producer-transport",
    producerTransportCreated: "producer-transport-created",
    closeProducerTransport: "close-producer-transport",
    producerId: "producer-id",


    // consumer
    createConsumerTransport: "create-consumer-transport",
    connectConsumerTransport: "connect-consumer-transport",
    

    // transport
    transportConnect: "transport-connect",
    transportProduce: "transport-produce",
    subTransportCreated: "sub-transport-created",


    // utilities
    subscribed: "subscribed",
    consume: "consume",
    connect: "connect",
    produce: "produce",
    connecting: "connecting",
    connected: "connected",
    failed: "failed",
    disconnect: "user_disconnect",
};
  
export default mediasoupServerConstants;
  