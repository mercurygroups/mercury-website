import { GoogleGenAI } from "@google/genai";

// Trim the API key to remove any accidental whitespace from environment variables
const apiKey = (process.env.API_KEY || '').trim();

if (!apiKey) {
  console.warn("API Key is missing. AI features will not work. Please set GEMINI_API_KEY or API_KEY in your environment variables.");
}

const ai = new GoogleGenAI({ apiKey });

export const generateTravelResponse = async (userPrompt: string, history: { role: string; text: string }[]): Promise<string> => {
  if (!apiKey) {
    return "I am unable to connect to the server right now (Missing API Key). Please contact support.";
  }

  try {
    const model = 'gemini-3-flash-preview';
    
    // Construct a context-aware prompt
    const systemInstruction = `
      You are Mercury AI, the intelligent virtual assistant for Mercury Groups.
      Mercury Groups is a premium travel and logistics agency.
      
      Our Services:
      1. Flight Processing: Domestic and International bookings.
      2. Documentation: Passport processing, Travel Insurance, Visa Assistance (Tour & Conference).
      3. Luxury Travel: Private Jet renting, Luxury Cars and Buses for interstate travel in Nigeria.
      4. Logistics: Delivery bikes for goods in Lagos, Port Harcourt (PH), and Abuja.
      
      Your Tone: Professional, helpful, concise, and polite.
      Your Goal: Answer user queries about our services, suggest booking options, and provide general travel advice.
      If a user wants to book, guide them to use the contact form or email mercurygroups247@gmail.com.
      
      Limit responses to 150 words.
    `;

    const contents = [
      ...history.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      })),
      { role: 'user', parts: [{ text: userPrompt }] }
    ];

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    
    // Check for specific error indications (invalid key, permission denied)
    if (error.message && (error.message.includes('API key') || error.message.includes('403') || error.message.includes('400'))) {
      return "Configuration Error: The API key provided is invalid. Please check your settings.";
    }
    
    return "I am currently experiencing high traffic. Please try again later or contact support directly.";
  }
};