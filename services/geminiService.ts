// Client-side proxy to server-side AI endpoint.
export const generateTravelResponse = async (userPrompt: string, history: { role: string; text: string }[]): Promise<string> => {
  try {
    const resp = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userPrompt, history })
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      console.error('AI server error', err);
      return 'AI service currently unavailable. Please try again later.';
    }

    const data = await resp.json();
    return data.text || 'No response from AI.';
  } catch (error) {
    console.error('Failed to call AI endpoint', error);
    return 'AI service currently unavailable. Please try again later.';
  }
};