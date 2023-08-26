import express from "express";
import { getLogs, displayPage } from "../controllers/parser.controller.js";

const router = express.Router();

router.post("/log", getLogs);
router.get("/", displayPage);

export default router;