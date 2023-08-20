import WebSocket from "ws";

const emit = (server, msg) => {
    server.clients?.forEach((client) => {
        if (client.readyState === WebSocket.OPEN)
            client.send(msg);
    })
};

export { emit };