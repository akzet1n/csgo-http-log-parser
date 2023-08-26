import WebSocket from "ws";
import { wss } from "../index.js";

const emit = (msg) => {
    wss.clients?.forEach((client) => {
        if (client.readyState === WebSocket.OPEN)
            client.send(JSON.stringify(msg));
    })
};

export { emit };