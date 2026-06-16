import express from "express";

import {
  askQuestion,
  getHistory,
  streamQuestion
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", askQuestion);

router.post("/stream", streamQuestion);

router.get("/history", getHistory);

export default router;
