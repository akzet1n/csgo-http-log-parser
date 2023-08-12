import express from "express";
import { parseData } from "../controllers/parser.controller.js";

const router = express.Router();

router.get("/", parseData);

export default router;