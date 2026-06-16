import Conversation from "../models/conversation.model.js";
import { getAIResponse } from "../services/ai.service.js";
import type { Request, Response } from "express";

export const askQuestion = async (
  req: Request,
  res: Response
) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Question is required"
      });
    }

    const answer =
      await getAIResponse(question);

    const conversation =
      await Conversation.create({
        question,
        answer
      });

    res.status(200).json({
      success: true,
      data: conversation
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

export const getHistory = async (
  _req: Request,
  res: Response
) => {
  try {
    const conversations =
      await Conversation.find()
        .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: conversations
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
