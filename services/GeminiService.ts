import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { TrendResponse } from "../types";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const getMarketInsight = async (topic: string): Promise<TrendResponse> => {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          trend: { type: SchemaType.STRING },
          analysis: { type: SchemaType.STRING },
          sentiment: { type: SchemaType.STRING },
        },
        required: ["trend", "analysis", "sentiment"],
      },
    },
  });

  const prompt = `Analyze the future trend of the virtual economy focusing on: ${topic}.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text) as TrendResponse;
  } catch (e) {
    console.error("Gemini Error:", e);
    return {
      trend: "Error",
      analysis: "Unable to reach AI.",
      sentiment: "neutral"
    };
  }
};