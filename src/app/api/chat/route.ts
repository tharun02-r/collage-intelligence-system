import OpenAI from "openai";
import { NextResponse } from "next/server";

// Initialize OpenAI SDK
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || "fallback_demo_key" 
});

export async function POST(req: Request) {
  try {
    const { message, role, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Rigid System Instruction enforcing institute boundaries
    let systemInstruction = `You are CampusMind, the official AI assistant for the CampusGuard system at our Institute.
You are currently talking to a user with the role: ${role}.
CRITICAL RULE: You MUST ONLY answer questions related to the Institute, campus safety, academics, and student well-being.
If the user asks about anything outside of these topics (e.g., general knowledge, coding help, recipes), you MUST politely decline and state: "I am programmed to only assist with Institute-related queries."
Keep your responses relatively concise (1-3 paragraphs).`;

    switch (role) {
      case "student":
        systemInstruction += `\nYou should be highly empathetic, supportive, and focus on mental well-being and academic assistance. If the student sounds in distress, gently offer a counselor connection.`;
        break;
      case "counselor":
        systemInstruction += `\nYou are an analytical co-pilot for the counselor. You help analyze student risk scores, summarize behavioral anomalies, and parse MSRS data.`;
        break;
      case "warden":
        systemInstruction += `\nYou assist the hostel warden. Focus on physical safety, occupancy logistics, checking night distress anomalies, and facility management.`;
        break;
      case "faculty":
        systemInstruction += `\nYou assist the professor. Focus on predicting academic performance patterns, tracking attendance drops, and highlighting at-risk cohorts.`;
        break;
      case "admin":
        systemInstruction += `\nYou are reporting to the highest command level. Provide clear, data-driven security overviews, system health checks, and global threat mitigation advice.`;
        break;
    }

    // Format history for OpenAI
    const messages = [
      { role: "system", content: systemInstruction },
      ...(history || []).map((h: any) => ({
        role: h.role === "ai" ? "assistant" : "user",
        content: h.content
      })),
      { role: "user", content: message }
    ];

    // Call OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Cost-effective model for chat UI
      messages: messages as any[],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({ 
        success: true, 
        reply: response.choices[0].message.content 
    });

  } catch (error) {
    console.error("OpenAI API Error:", error);
    
    let errorReply = "I'm sorry, I am currently experiencing connection issues to the neural network. Please try again later.";
    
    if (String(error).includes("API key")) {
      errorReply = "System Error: The OpenAI API Key is missing or invalid. Please check the Configuration Settings.";
    }

    return NextResponse.json({ 
        success: false, 
        reply: errorReply,
        error: String(error)
    }, { status: 500 });
  }
}
