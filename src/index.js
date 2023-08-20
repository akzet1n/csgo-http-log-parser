import express from "express";
import { config } from "./config.js";

const app = express();
app.use(express.text());

import parserRoutes from "./routes/parser.route.js";
app.use("/", parserRoutes);

app.listen(config.backend.port, () => {
    console.log(`>> App running on port ${config.backend.port}`);
})