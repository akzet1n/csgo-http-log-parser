import express from "express";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();

import parserRoutes from "./routes/parser.routes.js";
app.use("/api/", parserRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})
