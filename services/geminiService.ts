// The Google GenAI SDK (@google/genai) is server-side and not suitable
// for bundling into a browser build. To keep the frontend build working
// we provide a safe client-side fallback that returns a helpful message
// when the SDK is not available. For full AI functionality, implement
// a server-side endpoint that calls Google GenAI and call that from the
// frontend.

export const generateTravelResponse = async (_userPrompt: string, _history: { role: string; text: string }[]): Promise<string> => {
  return "AI is not available in this deployment. For assistance, please email mercurygroups247@gmail.com or use the contact form.";
};