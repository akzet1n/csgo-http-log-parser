import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";
import config from "./config.js";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(express.text({ limit: "50mb" }));

import parserRoutes from "./routes/parser.route.js";
app.use("/", parserRoutes);

server.listen(config.port, () => {
    console.log(`[csgo-http-log-parser] Application started`);
});

export { wss };