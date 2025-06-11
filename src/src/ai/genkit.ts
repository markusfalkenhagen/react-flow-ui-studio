
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import fs from 'node:fs';
import path from 'node:path';

interface AppSettings {
  greetingMessage: string;
  userGoogleApiKey?: string;
}

let userApiKey: string | undefined;

try {
  const settingsPath = path.join(process.cwd(), 'src', 'data', 'settings.json');
  if (fs.existsSync(settingsPath)) {
    const fileContents = fs.readFileSync(settingsPath, 'utf-8');
    if (fileContents) {
      const settings: AppSettings = JSON.parse(fileContents);
      userApiKey = settings.userGoogleApiKey;
    }
  }
} catch (e) {
  console.warn("Genkit: Couldn't load API key from settings.json, will rely on environment variables.", e);
}

const googleAiConfig = userApiKey ? { apiKey: userApiKey } : undefined;

export const ai = genkit({
  plugins: [googleAI(googleAiConfig)],
  model: 'googleai/gemini-2.0-flash',
});
