import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // We check for GEMINI_API_KEY or API_KEY in the environment.
    // We also provide the specific key you shared as a fallback so it works immediately.
    'process.env.API_KEY': JSON.stringify(
      (process.env.GEMINI_API_KEY || process.env.API_KEY || 'AIzaSyBq-Fz34dQt-vSZ9v2ToOsSmRFc3DgywkM').trim()
    )
  }
});