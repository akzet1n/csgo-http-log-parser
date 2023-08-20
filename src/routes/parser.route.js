import express from "express";
import { getLogs } from "../controllers/parser.controller.js";

const router = express.Router();

router.post("/log", getLogs);

export default router;