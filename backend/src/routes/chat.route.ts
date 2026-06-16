import express from "express";

import {
  askQuestion,
  getHistory
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", askQuestion);

router.get("/history", getHistory);

export default router;