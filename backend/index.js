import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { config } from "./config.js";

const app = express();
app.use(express.text());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static("./frontend"));

import parserRoutes from "./routes/parser.route.js";
app.use("/", parserRoutes);

server.listen(config.backend.port, () => {
    console.log(`>> Receiving logs on port ${config.backend.port}`);
});

export { wss };