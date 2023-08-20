import WebSocket from "ws";

export const sendMessage = (server, msg) => {
    server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    })
};