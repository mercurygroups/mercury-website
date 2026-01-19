import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // Cast process to any to avoid "Property 'cwd' does not exist on type 'Process'" error if node types are missing
  const env = loadEnv(mode, (process as any).cwd(), '');

  // Check for various common naming conventions for the API key
  // We prioritize keys found in .env files or system environment variables
  const apiKey = env.GEMINI_API_KEY || 
                 env.VITE_GEMINI_API_KEY || 
                 env.API_KEY || 
                 env.VITE_API_KEY || 
                 process.env.GEMINI_API_KEY || 
                 process.env.API_KEY || 
                 ''; // No hardcoded fallback to prevent using invalid keys

  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey.trim())
    }
  };
});