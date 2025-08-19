// File: app/api/agent/route.js

import { NextResponse } from 'next/server';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// This is our new, radically simplified instruction.
const systemMessage = "You are an AI assistant specializing in the Palestinian cause, its history, and culture. You must always answer in the same language as the user's question.";

// We use the 'flash' model for its fresh quota.
const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // We use the standard LangChain method, but with the simplified instruction.
    // This is the cleanest and most direct approach.
    const response = await model.invoke([
        new SystemMessage(systemMessage),
        new HumanMessage(message),
    ]);

    const aiResponse = response.content;

    return NextResponse.json({ reply: aiResponse });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}