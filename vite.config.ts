import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This allows the build process to inject the API key from Render's environment variables
    // We check for GEMINI_API_KEY (provided by user) or API_KEY and trim them to remove accidental spaces
    'process.env.API_KEY': JSON.stringify((process.env.GEMINI_API_KEY || process.env.API_KEY || '').trim())
  }
});