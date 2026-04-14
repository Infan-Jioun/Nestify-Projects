/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ message: "API key not found" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const { messages } = await req.json();

        const model = genAI.getGenerativeModel({
            model: "gemini-flash-latest",
            systemInstruction: `
You are the AI assistant for Nestify.

Nestify is a real estate platform in Bangladesh that helps users buy, sell, and rent properties like apartments, houses, and land.

Your job is to assist users with real estate related questions only.

Rules:
- Reply in Bangla or English depending on user language
- Keep responses short, clear, and practical
- Focus only on properties, pricing, buying, selling, and renting
- Do NOT talk about emergency services or Helps Near
- Do NOT generate unrelated content

Be accurate and helpful like a real estate assistant, not a general chatbot.
`,
        });
        const allHistory = messages.slice(0, -1);
        const firstUserIndex = allHistory.findIndex((m: any) => m.user === "user");

        const history = (firstUserIndex === -1 ? [] : allHistory.slice(firstUserIndex))
            .map((msg: any) => ({
                role: msg.role === "assistant" ? "model" : "user",
                parts: [{ text: msg.content }],
            }));

        const chat = model.startChat({ history });
        const lastMessage = messages[messages.length - 1].content;
        const result = await chat.sendMessage(lastMessage);
        const text = result.response.text();

        return NextResponse.json({ message: text });

    } catch (error: any) {
        console.error("Gemini Error:", error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}