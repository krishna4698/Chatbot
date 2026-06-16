import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is required");
}

const genAI = new GoogleGenerativeAI(
  apiKey
);

const getModel = () =>
  genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

export const getAIResponse = async (
  question: string
) => {
  const model = getModel();

  const result = await model.generateContent(
    question
  );

  return result.response.text();
};

export async function* streamAIResponse(
  question: string
) {
  const model = getModel();
  const result = await model.generateContentStream(
    question
  );

  for await (const chunk of result.stream) {
    const text = chunk.text();

    if (text) {
      yield text;
    }
  }
}
